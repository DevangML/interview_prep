import http.server
import socketserver
import json
import os
import sys

from okf_engine import HDOKFMemoryEngine
from repl_evaluator import REPLEvaluator
from bmad_party_panel import BMadPartyPanel

PORT = 8085

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

class OKFServerRequestHandler(http.server.SimpleHTTPRequestHandler):
    
    def __init__(self, *args, **kwargs):
        self.okf_engine = HDOKFMemoryEngine()
        self.repl_evaluator = REPLEvaluator()
        self.party_panel = BMadPartyPanel()
        super().__init__(*args, **kwargs)

    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            gui_path = os.path.join(os.path.dirname(__file__), "web_gui.html")
            with open(gui_path, "rb") as f:
                self.wfile.write(f.read())
            return

        elif self.path == "/api/state":
            self._send_json(self.okf_engine.state)
            return

        elif self.path == "/api/decay":
            self.okf_engine.load_state()
            decayed = self.okf_engine.get_decayed_topics(threshold=0.70)
            
            # Gather all subtopics for full list view
            all_subtopics = []
            curriculum = self.okf_engine.state.get("curriculum", {})
            for t_name, t_val in curriculum.items():
                for s_name, s_val in t_val.get("subtopics", {}).items():
                    sm2 = s_val.get("sm2", {})
                    all_subtopics.append({
                        "topic": t_name,
                        "subtopic": s_name,
                        "retention_r": sm2.get("retention_r", 1.0),
                        "stability_s": sm2.get("stability_s", 7.0),
                        "last_reviewed_days": sm2.get("last_reviewed_days", 0),
                        "status": s_val.get("status", "pending"),
                        "mastery": s_val.get("mastery", 0.0)
                    })

            self._send_json({
                "decayed": decayed,
                "all": all_subtopics
            })
            return

        elif self.path == "/api/profile":
            profile = self.okf_engine.get_filtered_target_roles()
            self._send_json(profile)
            return

        else:
            # Fallback to standard static file server
            super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
        try:
            payload = json.loads(body_bytes.decode("utf-8"))
        except Exception:
            payload = {}

        if self.path == "/api/eval":
            problem_id = payload.get("problem_id", "two_sum")
            code = payload.get("code", "")
            eval_res = self.repl_evaluator.eval_code(problem_id, code)
            self._send_json(eval_res)
            return

        elif self.path == "/api/chat":
            topic = payload.get("topic", "dsa_two_sum")
            user_msg = payload.get("message", "")
            code = payload.get("code", "")
            persona = payload.get("persona", "all")

            # Execute REPL first if code is provided
            repl_res = self.repl_evaluator.eval_code(topic, code) if code else None
            review_res = self.party_panel.evaluate_submission(
                topic=topic,
                user_input=user_msg,
                code_submission=code,
                repl_result=repl_res
            )
            self._send_json(review_res)
            return

        elif self.path == "/api/review_sm2":
            topic = payload.get("topic")
            subtopic = payload.get("subtopic")
            quality = payload.get("quality", 5)

            if topic and subtopic:
                success = self.okf_engine.update_sm2_review(topic, subtopic, quality)
                self._send_json({"success": success, "decayed": self.okf_engine.get_decayed_topics(0.70)})
            else:
                self._send_json({"success": False, "message": "Missing topic or subtopic"}, status=400)
            return

        else:
            self.send_error(404, "Endpoint not found")

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))

def run_server(port=PORT):
    handler = OKFServerRequestHandler
    handler.protocol_version = "HTTP/1.0"
    
    # Try preferred port, fallback if bound
    current_port = port
    max_tries = 5
    httpd = None

    for attempt in range(max_tries):
        try:
            httpd = ReusableTCPServer(("", current_port), handler)
            break
        except OSError:
            current_port += 1

    if not httpd:
        print(f"Could not bind to port {port} or next {max_tries} ports.")
        sys.exit(1)

    print(f"============================================================")
    print(f"🚀 HD-OKF Web Server running on http://localhost:{current_port}")
    print(f"   DCI-P3 OLED WCG HDR Studio active.")
    print(f"============================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down web server.")

if __name__ == "__main__":
    run_server(PORT)
