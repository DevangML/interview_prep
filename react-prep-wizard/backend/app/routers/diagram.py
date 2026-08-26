import logging
import urllib.request
import urllib.parse
from fastapi import APIRouter, HTTPException, Query, status

log = logging.getLogger("api.diagram")
router = APIRouter(prefix="/api/diagram", tags=["diagram"])

@router.get("/fetch-gdrive")
def fetch_gdrive_diagram(file_id: str = Query(..., min_length=15, max_length=100)):
    """Downloads raw drawio / XML file content from a public Google Drive sharing link."""
    download_url = f"https://drive.google.com/uc?export=download&id={urllib.parse.quote(file_id)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    try:
        req = urllib.request.Request(download_url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            content_bytes = response.read()
            text_content = content_bytes.decode("utf-8", errors="replace")

            # Check if it looks like Draw.io XML or svg
            if "<mxfile" in text_content or "<mxGraphModel" in text_content or "<svg" in text_content or "<diagram" in text_content:
                return {"ok": True, "xml": text_content, "file_id": file_id}
            
            # Google Drive large file virus scan confirm link fallback
            if "confirm=" in text_content:
                # Try with confirm=t
                confirm_url = f"{download_url}&confirm=t"
                confirm_req = urllib.request.Request(confirm_url, headers=headers)
                with urllib.request.urlopen(confirm_req, timeout=12) as confirm_res:
                    confirm_text = confirm_res.read().decode("utf-8", errors="replace")
                    if "<mxfile" in confirm_text or "<mxGraphModel" in confirm_text:
                        return {"ok": True, "xml": confirm_text, "file_id": file_id}

            return {
                "ok": True,
                "xml": text_content,
                "file_id": file_id,
                "warning": "Content may not be standard draw.io XML"
            }

    except Exception as e:
        log.warning("Failed to fetch diagram from Google Drive file %s: %s", file_id, e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Could not download diagram from Google Drive ({e})"
        )
