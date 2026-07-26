# Low-Level Design (LLD) & Object-Oriented Design (OOD) — Technical Syllabus (2026)

- **Produced by:** Technical & Domain Research Specialist
- **Date:** 2026-07-26
- **Question asked:** What is the 98%+ complete 2026 Low-Level Design & Object-Oriented Design syllabus for 2-3 YOE software engineering interviews?
- **Method:** web search / doc fetch / curriculum synthesis
- **Confidence:** HIGH
- **Decay class:** SLOW
- **Supersedes:** nothing

---

## 1. Overview & Tier Requirements

Low-Level Design (LLD) and Object-Oriented Design (OOD) test a developer's ability to translate business requirements into extensible, maintainable, thread-safe code structures. For 2-3 YOE engineers, interviews focus on applying SOLID principles, selecting appropriate Gang of Four (GoF) design patterns, drawing clean UML class diagrams, and producing working, code-complete implementations of standard LLD problems.

---

## 2. Topic Inventory & Core Frameworks

### A. Object-Oriented Programming (OOP) Pillars & Internals
- **Abstraction:** Hiding internal complexity and exposing only necessary interfaces.
- **Encapsulation:** Bundling data (attributes) and methods operating on that data within a single class, restricting direct access via private/protected modifiers.
- **Inheritance:** Code reuse mechanism (`is-a` relationship). Multiple inheritance diamond problem and how interface-based inheritance solves it.
- **Polymorphism:**
  - **Compile-Time (Static):** Method Overloading (same method name, different signatures).
  - **Runtime (Dynamic):** Method Overriding (subclass provides specific implementation of base class method).
  - **Virtual Tables (vtable & vptr):** Internal C++/JVM mechanism where dynamic dispatch resolves overridden method addresses at runtime via a pointer array lookup.

### B. SOLID Design Principles
- **S — Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change.
- **O — Open/Closed Principle (OCP):** Software entities should be open for extension, but closed for modification (achieved via interfaces and abstract base classes).
- **L — Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering the correctness of the program (avoid throwing `NotImplementedException` in subclasses).
- **I — Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use (prefer small, role-specific interfaces over fat interfaces).
- **D — Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules; both should depend on abstractions (Dependency Injection via constructors/setters).

### C. Design Patterns Taxonomy (Gang of Four - GoF)

#### 1. Creational Patterns
- **Singleton:** Ensures a class has only one instance and provides a global point of access.
  - *Thread-safe Double-Checked Locking:*
    ```python
    import threading

    class Singleton:
        _instance = None
        _lock = threading.Lock()

        def __new__(cls):
            if not cls._instance:
                with cls._lock:
                    if not cls._instance:
                        cls._instance = super().__new__(cls)
            return cls._instance
    ```
- **Factory Method:** Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
- **Abstract Factory:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- **Builder:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations (Fluent Interface API).
- **Prototype:** Creates new objects by cloning an existing instance (Deep copy vs Shallow copy).

#### 2. Structural Patterns
- **Adapter:** Converts the interface of a class into another interface clients expect (Incompatible interface bridge).
- **Decorator:** Attaches additional responsibilities to an object dynamically without modifying the underlying class (e.g., I/O Streams, Coffee topping pricing).
- **Facade:** Provides a unified, simplified high-level interface to a complex subsystem.
- **Proxy:** Provides a surrogate or placeholder for another object to control access to it (Virtual Proxy / Lazy Loading, Protection Proxy, Caching Proxy).
- **Flyweight:** Minimizes memory usage by sharing common constant state across multiple objects (Intrinsic vs Extrinsic state).
- **Composite:** Composes objects into tree structures to represent part-whole hierarchies.

#### 3. Behavioral Patterns
- **Strategy:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime (e.g., Payment strategies: CreditCard, UPI, PayPal; Sorting strategies).
- **Observer:** Defines a 1-to-N dependency between objects so that when one object changes state, all its dependents are notified automatically (Publish-Subscribe event handling).
- **Command:** Encapsulates a request as an object, enabling parameterization of clients with queues, requests, and undo/redo operations.
- **Chain of Responsibility:** Passes a request along a chain of handlers until one of them processes it (e.g., Logging frameworks, Middleware filters).
- **State:** Allows an object to alter its behavior when its internal state changes (State machine representation).
- **Template Method:** Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.

### D. Concurrency & Multithreading Design Patterns
- **Producer-Consumer:** Shared bounded buffer synchronized with Mutex and Condition Variables (`wait()`, `notify()`).
- **Thread Pool:** Queue of Runnable tasks processed by a fixed worker thread pool.
- **Reader-Writer Lock:** Multiple concurrent readers OR single writer (prevents write starvation).

### E. Class Diagramming & UML Notation
- **Classes & Modifiers:** `+` Public, `-` Private, `#` Protected, `~` Package.
- **Relationships:**
  - **Association (`───>`):** General "uses" relationship.
  - **Aggregation (`◇───>`):** "Has-a" relationship where child can exist independently of parent (e.g., Department and Teacher).
  - **Composition (`◆───>`):** "Owns-a" relationship where child lifetime is strictly bound to parent (e.g., Building and Room).
  - **Generalization (`───▷`):** Inheritance (`is-a`).
  - **Realization (`- - -▷`):** Interface implementation.

---

## 3. High-Frequency Practical LLD Case Studies

### Case Study 1: Rate Limiter Design
- **Algorithms:** Token Bucket, Leaky Bucket, Sliding Window Counter, Sliding Window Log.
- **Key Classes:** `RateLimiter` (Interface), `TokenBucketRateLimiter`, `UserRateLimiterService`, `TokenBucket` (Atomic Integer, LastRefillTimestamp).
- **Concurrency:** Thread-safe execution using atomic operations or locks.

### Case Study 2: LRU Cache Design
- **Requirements:** $O(1)$ `get(key)` and `put(key, value)` with fixed capacity eviction.
- **Data Structures:** `HashMap<Key, Node>` + `DoublyLinkedList` (Head/Tail dummy nodes).
- **Thread-Safety:** ReentrantReadWriteLock or `synchronized` block wrappers.

### Case Study 3: Parking Lot System
- **Requirements:** Multi-floor parking, support vehicle types (Motorcycle, Car, Bus/Truck), spot allocation strategy (Nearest to entrance), billing/fee calculation based on time, receipt generation.
- **Key Entities:**
  - Enums: `VehicleType`, `ParkingSlotType`, `PaymentStatus`.
  - Classes: `Vehicle` (Base), `Car`, `Bike`, `Truck`, `ParkingSlot`, `ParkingFloor`, `ParkingLot` (Singleton), `FeeCalculationStrategy` (Interface), `HourlyFeeStrategy`, `Ticket`, `PaymentGateway`.

---

## 4. Recommended Study Plan & Hour Allocations

| # | Topic Block | Target Hours | Core Objective |
|---|---|---|---|
| 1 | OOP Pillars & SOLID Principles | 8 h | Refactor code to conform to SOLID guidelines |
| 2 | Creational Design Patterns (Singleton, Factory, Builder) | 8 h | Master thread-safe Singleton & Builder API |
| 3 | Structural Patterns (Adapter, Decorator, Proxy) | 8 h | Implement Decorator & Proxy with clean interfaces |
| 4 | Behavioral Patterns (Strategy, Observer, Command) | 10 h | Implement Strategy & Observer event loops |
| 5 | UML Diagrams & Concurrency Patterns | 6 h | Practice UML notation & Thread Pool concurrency |
| 6 | Practical LLD: Rate Limiter | 8 h | Code complete Token Bucket & Sliding Window Limiter |
| 7 | Practical LLD: LRU Cache & Parking Lot | 10 h | Write complete OOD classes for LRU & Parking Lot |
| **Total** | **LLD & OOD Mastery** | **58 h** | **Complete 98%+ Interview Readiness** |

---

## Sources
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/interview-prep/oops-interview-questions/ — OOP fundamentals core bank
- [VERIFIED 2026-07-26] https://www.interviewbit.com/oops-interview-questions/ — Advanced OOP & SOLID principles
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/system-design/top-low-level-system-designlld-interview-questions-2024/ — 50 LLD interview questions & case studies
- [VERIFIED 2026-07-26] https://github.com/donnemartin/system-design-primer — OOD pattern references & class diagramming
