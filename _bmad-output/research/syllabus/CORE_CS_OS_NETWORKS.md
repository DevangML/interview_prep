# Core CS: Operating Systems & Computer Networks — Complete Technical Syllabus (2026)

- **Produced by:** Technical & Domain Research Specialist
- **Date:** 2026-07-26
- **Question asked:** What is the 98%+ complete 2026 technical syllabus for Operating Systems and Computer Networks for 2-3 YOE software engineering interviews?
- **Method:** web search / doc fetch / curriculum synthesis
- **Confidence:** HIGH
- **Decay class:** SLOW
- **Supersedes:** nothing

---

## 1. Overview & Tier Requirements

Core Computer Science fundamentals—specifically Operating Systems (OS) and Computer Networks (CN)—are routinely evaluated in technical rounds for 2-3 YOE software engineers. Interviewers use these topics to test your comprehension of resource management, concurrency, latency, network protocols, and system-level performance.

---

## 2. Operating Systems (OS) Topic Inventory

### A. Processes, Threads & Concurrency
- **Process vs Thread:**
  - **Process:** Independent execution environment with its own virtual address space (Code, Data, Heap, Stack). High isolation, expensive context switching.
  - **Thread:** Lightweight unit of execution within a process. Shares Heap, Data, and Code segments with peer threads, but maintains its own Stack and Registers. Low context switching cost, risk of shared data corruption.
- **Process Control Block (PCB):** Stores Process ID (PID), State, Program Counter (PC), CPU registers, Memory management info, Open file descriptors.
- **Process States:** New $\rightarrow$ Ready $\rightarrow$ Running $\rightarrow$ Waiting/Blocked $\rightarrow$ Terminated.
- **Context Switching:** CPU switching from one process/thread to another. Involves saving register state to PCB/TCB, flushing/updating TLB, reloading cache lines, and switching CPU page table pointer (CR3 register in x86).
- **User Mode vs Kernel Mode:** Ring 3 vs Ring 0 execution. Privilege separation preventing user space programs from modifying kernel memory or hardware directly. Triggered via System Calls (`sys_enter`, software interrupts `int 0x80`).

### B. Memory Management & Virtual Memory
- **Virtual Memory Architecture:** Abstraction mapping virtual addresses used by processes to physical RAM addresses.
- **Paging & Page Tables:** Virtual memory divided into fixed-size Pages (e.g., 4KB); physical memory divided into Frame. Page Table translates Virtual Page Number (VPN) to Physical Frame Number (PFN). Multi-level Page Tables (e.g., 4-level paging in x86_64) reduce memory footprint of page tables.
- **TLB (Translation Lookaside Buffer):** Hardware CPU cache for page table translations. TLB Hit ($O(1)$) vs TLB Miss (page table walk).
- **Page Faults:** Occur when a requested page is not in RAM (invalid bit in page table). CPU triggers interrupt, OS fetches page from Disk Swap space into RAM, updates page table, and resumes instruction.
- **Thrashing:** Excessive page swapping when total Working Set of running processes exceeds physical RAM capacity, reducing CPU utilization to near zero.
- **Page Replacement Algorithms:**
  - **LRU (Least Recently Used):** Evicts page unused for longest time ($O(1)$ via HashMap + Doubly LinkedList).
  - **FIFO (First In First Out):** Subject to **Belady's Anomaly** (increasing RAM frames can increase page faults).
  - **Clock / Second Chance:** Circular list with reference bit; approximates LRU with $O(1)$ overhead.

### C. CPU Scheduling
- **Preemptive vs Non-Preemptive:** Preemptive forces CPU yield on timer interrupt or priority interrupt; Non-preemptive allows process to run until block/termination.
- **Algorithms:**
  - **First-Come, First-Served (FCFS):** Non-preemptive. Suffers from **Convoy Effect** (short jobs wait behind long job).
  - **Shortest Job First (SJF) / Shortest Remaining Time First (SRTF):** Optimal average wait time, but prone to starvation.
  - **Round Robin (RR):** Preemptive with fixed Time Quantum. Small quantum increases context switch overhead; large quantum degrades to FCFS.
  - **Multilevel Feedback Queue (MLFQ):** Dynamic priority queues adjusting to CPU-bound vs I/O-bound process behavior.

### D. Deadlocks & Synchronization
- **Four Coffman Conditions (Must ALL hold for Deadlock):**
  1. **Mutual Exclusion:** Resource cannot be shared.
  2. **Hold and Wait:** Process holds resource while waiting for another.
  3. **No Preemption:** Resource cannot be forcibly taken from a process.
  4. **Circular Wait:** Closed chain of processes where each waits for a resource held by the next.
- **Deadlock Handling Strategies:**
  - **Prevention:** Eliminate at least one Coffman condition (e.g., total resource ordering).
  - **Avoidance:** Banker's Algorithm (checks if state is "Safe" before allocation).
  - **Detection & Recovery:** Resource Allocation Graph (RAG) cycle detection; process termination or resource preemption.
- **Synchronization Primitives & Problems:**
  - **Mutex vs Spinlock:** Mutex puts thread to sleep (context switch); Spinlock busy-waits in a loop (best for ultra-short lock holds).
  - **Semaphores:** Counting Semaphore (integer counter) vs Binary Semaphore (0 or 1).
  - **Classic Problems:** Producer-Consumer (Bounded Buffer), Reader-Writer (Read-preference vs Write-preference), Dining Philosophers.

---

## 3. Computer Networks (CN) Topic Inventory

### A. Network Models & Architecture
- **OSI 7-Layer vs TCP/IP 4-Layer Model:**
  - **Application (7) / Transport (4) / Internet (3) / Link (2-1)**
  - **Encapsulation:** Data $\rightarrow$ Segment (Transport) $\rightarrow$ Packet (Network) $\rightarrow$ Frame (Data Link) $\rightarrow$ Bits (Physical).

### B. Transport Layer Protocols & Handshakes
- **TCP vs UDP:**
  - **TCP:** Connection-oriented, reliable, ordered, byte-stream, flow control (sliding window), congestion control (Slow Start, Congestion Avoidance, Fast Retransmit / Fast Recovery).
  - **UDP:** Connectionless, unreliable, unordered, datagram-based, low latency (DNS, VoIP, Live Streaming, QUIC).
- **TCP 3-Way Handshake:**
  1. Client $\xrightarrow{\text{SYN (Seq}=x\text{)}}$ Server
  2. Server $\xrightarrow{\text{SYN-ACK (Seq}=y\text{, Ack}=x+1\text{)}}$ Client
  3. Client $\xrightarrow{\text{ACK (Ack}=y+1\text{)}}$ Server
- **TCP 4-Way Teardown:**
  1. Client $\xrightarrow{\text{FIN}}$ Server $\rightarrow$ 2. Server $\xrightarrow{\text{ACK}}$ Client $\rightarrow$ 3. Server $\xrightarrow{\text{FIN}}$ Client $\rightarrow$ 4. Client $\xrightarrow{\text{ACK}}$ Server.
  - **TIME_WAIT State:** Client waits $2 \times \text{MSL}$ (Maximum Segment Lifetime, ~60s) to ensure final ACK was received and prevent stale packets from corrupting new connections.
- **TLS Handshake (TLS 1.2 vs TLS 1.3):**
  - **TLS 1.2:** 2 RTTs. RSA/ECDHE key exchange, certificate exchange, cipher suite negotiation.
  - **TLS 1.3:** 1 RTT (or 0-RTT resumption). Mandatory Ephemeral Diffie-Hellman (PFS - Perfect Forward Secrecy), encrypted certificates.

### C. Web Application Protocols & HTTP Evolution
- **HTTP/1.1:** Persistent connections (`Connection: keep-alive`), Pipelining (rarely used), **Head-of-Line (HOL) Blocking at HTTP level** (sequential request processing per TCP connection).
- **HTTP/2:** Single TCP connection per domain, **Multiplexing** via binary framing (interleaved request/response streams), **HPACK** header compression, Server Push. Suffers from **TCP-level HOL Blocking** (packet loss stalls all streams).
- **HTTP/3:** Replaces TCP with **QUIC** over UDP. Per-stream multiplexing (packet loss on stream A does not block stream B), **0-RTT connection establishment**, Connection Migration (survives client IP changes, e.g., WiFi to 4G).
- **Real-Time Communication Protocols:**
  | Protocol | Direction | Transport | Overhead | Use Case |
  |---|---|---|---|---|
  | **Short Polling** | Client $\rightarrow$ Server | HTTP | High | Simple periodic status check |
  | **Long Polling** | Client $\leftrightarrow$ Server | HTTP (held open) | Medium | Notifications when WebSockets blocked |
  | **Server-Sent Events (SSE)**| Server $\rightarrow$ Client | HTTP (stream) | Low | Real-time text feed, LLM streaming output |
  | **WebSockets** | Full-Duplex | TCP (WSS) | Minimal | Chat, Collaborative editing, Gaming |

### D. Network Infrastructure & Web Security
- **DNS Resolution Flow:**
  - Browser Cache $\rightarrow$ OS Cache $\rightarrow$ Router Cache $\rightarrow$ Recursive Resolver ISP $\rightarrow$ Root Name Server (`.`) $\rightarrow$ TLD Name Server (`.com`) $\rightarrow$ Authoritative Name Server (`example.com`) $\rightarrow$ IP address returned & cached.
  - **Record Types:** `A` (IPv4), `AAAA` (IPv6), `CNAME` (Alias), `MX` (Mail), `TXT` (SPF/DKIM/verification).
- **CORS (Cross-Origin Resource Sharing):**
  - **Same-Origin Policy (SOP):** Browsers block scripts from origin A (`http://app.com:80`) from reading responses from origin B (`http://api.com:443`).
  - **Preflight Request:** Browser sends `OPTIONS` request with `Access-Control-Request-Method` and `Access-Control-Request-Headers`. Server responds with `Access-Control-Allow-Origin`.
- **REST Architectural Constraints & Method Idempotency:**
  - **Constraints:** Client-Server, Stateless, Cacheable, Uniform Interface, Layered System.
  - **Idempotency Matrix:**
    - **Safe (no side effects):** `GET`, `HEAD`, `OPTIONS`.
    - **Idempotent (multiple identical requests have same result as one):** `GET`, `PUT`, `DELETE`, `HEAD`.
    - **Non-Idempotent:** `POST`, `PATCH`.

---

## 4. Recommended Study Plan & Hour Allocations

| # | Topic Block | Target Hours | Core Objective |
|---|---|---|---|
| 1 | OS Processes, Threads & Context Switching | 8 h | Understand PCB, user/kernel mode, syscalls |
| 2 | Virtual Memory, Paging & Page Replacement | 10 h | Solve TLB, page fault, LRU & thrashing scenarios |
| 3 | CPU Scheduling & Deadlocks | 8 h | Master Coffman conditions, Banker's algorithm, MLFQ |
| 4 | Synchronization & Concurrency Primitives | 8 h | Implement Mutex, Semaphore & Producer-Consumer |
| 5 | OSI/TCP-IP & TCP/TLS Handshakes | 10 h | Tracing 3-way handshake, 4-way teardown, TLS 1.3 |
| 6 | HTTP/1.1 vs HTTP/2 vs HTTP/3 & WebSockets | 10 h | Understand HOL blocking, QUIC, SSE, WebSockets |
| 7 | DNS, CORS & REST Idempotency | 8 h | Master CORS preflight, DNS flow & REST methods |
| **Total** | **Core CS (OS & Networks)** | **62 h** | **Complete 98%+ Interview Readiness** |

---

## Sources
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/operating-systems/last-minute-notes-operating-systems/ — OS revision & virtual memory
- [VERIFIED 2026-07-26] https://www.interviewbit.com/operating-system-interview-questions/ — OS 70-question interview bank
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/top-50-computer-networking-interview-questions-and-answers/ — Computer networks top 50
- [VERIFIED 2026-07-26] https://www.interviewbit.com/networking-interview-questions/ — Networking 3-tier bank & HTTP protocols
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/interview-prep/os-cn-dbms-interview-questions/ — Core CS combined questions
