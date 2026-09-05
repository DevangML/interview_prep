export interface XRayLayerStep {
  action: string;
  artifact: string;
  artifactType: 'syntax' | 'ir' | 'asm' | 'kernel' | 'hardware';
  detail: string;
}

export interface XRaySlice {
  id: string;
  name: string;
  syntax: string;
  lang: string;
  layers: Record<number, XRayLayerStep>;
}

export const XRAY_SLICES: XRaySlice[] = [
  {
    id: 'heap_box',
    name: 'Heap Box Allocation',
    syntax: 'let x = Box::new(42);',
    lang: 'Rust',
    layers: {
      8: {
        action: 'Human Intent & Ergonomics',
        artifact: 'let x = Box::new(42);',
        artifactType: 'syntax',
        detail: 'Expresses single unique heap ownership without manual free() or GC overhead.',
      },
      7: {
        action: 'Resource Management Contract',
        artifact: 'RAII / Affine Type Invariant',
        artifactType: 'syntax',
        detail: 'Values have exactly one owner. Drop glue is statically scheduled at scope exit.',
      },
      6: {
        action: 'Compile-Time Lifetime Proof',
        artifact: 'Box<i32> : Deref<Target=i32> + Drop',
        artifactType: 'syntax',
        detail: 'Borrow checker enforces exclusive mutability and prevents use-after-free statically.',
      },
      5: {
        action: 'Runtime Allocator Dispatch',
        artifact: 'alloc::alloc::exchange_malloc(size=4, align=4)',
        artifactType: 'kernel',
        detail: 'Queries jemalloc/system thread-local cache arena (tcache) for a free 8-byte bin.',
      },
      4: {
        action: 'LLVM IR Lowering & Inlining',
        artifact: '%1 = tail call noalias dereferenceable_or_null(4) @malloc(i64 4)',
        artifactType: 'ir',
        detail: 'Inlines constructor; flags pointer as non-null and uniquely aliased (noalias).',
      },
      3: {
        action: 'OS Virtual Memory & Syscall Trap',
        artifact: 'brk(new_addr) or mmap(PROT_READ|PROT_WRITE, MAP_ANON)',
        artifactType: 'kernel',
        detail: 'Kernel allocates virtual memory pages; maps anonymous VMA in process mm_struct.',
      },
      2: {
        action: 'Processor ISA Machine Instructions',
        artifact: 'mov rdi, 4; call malloc; mov dword ptr [rax], 42',
        artifactType: 'asm',
        detail: 'Sets argument register RDI, jumps to allocator, then writes 32-bit int to RAX address.',
      },
      1: {
        action: 'Silicon Voltage & DRAM Capacitor Charge',
        artifact: '1T-1C Trench Capacitor Charging (~30 fF)',
        artifactType: 'hardware',
        detail: 'Wordline activates access transistor; bitline charges memory capacitor on RAM chip.',
      },
    },
  },
  {
    id: 'print_io',
    name: 'Standard Output I/O',
    syntax: 'println!("Hello, World!");',
    lang: 'Rust / C',
    layers: {
      8: {
        action: 'Ergonomic Macro Expansion',
        artifact: 'println!("Hello, World!");',
        artifactType: 'syntax',
        detail: 'Type-safe string interpolation macro; verifies format tokens at compile time.',
      },
      7: {
        action: 'I/O Stream Model',
        artifact: 'Standard Out (fd 1) Shared Stream',
        artifactType: 'syntax',
        detail: 'Sequential character stream abstraction decoupling terminal from application code.',
      },
      6: {
        action: 'Buffer Lifetime & String Slices',
        artifact: '&\'static str -> [u8; 14]',
        artifactType: 'syntax',
        detail: 'Zero-copy immutable slice referencing static readonly text data segment (.rodata).',
      },
      5: {
        action: 'Line Buffering Flush',
        artifact: 'std::io::BufWriter::flush()',
        artifactType: 'kernel',
        detail: 'Accumulates bytes in user-space buffer to minimize expensive syscall boundaries.',
      },
      4: {
        action: 'Compiler ABI Linkage',
        artifact: 'call @write(i32 1, i8* nonnull getelementptr(...), i64 14)',
        artifactType: 'ir',
        detail: 'Passes file descriptor 1, string address, and length conforming to SysV ABI.',
      },
      3: {
        action: 'Kernel Ring-0 Syscall & TTY Driver',
        artifact: 'sys_write(1, buf, 14) -> pty_write()',
        artifactType: 'kernel',
        detail: 'CPU transitions from Ring 3 to Ring 0; kernel copies buffer to terminal device buffer.',
      },
      2: {
        action: 'CPU Syscall Instruction & Registers',
        artifact: 'mov rax, 1; mov rdi, 1; mov rsi, msg; syscall',
        artifactType: 'asm',
        detail: 'Loads syscall number 1 into RAX and executes hardware SYSCALL trap instruction.',
      },
      1: {
        action: 'UART/PCIe Physical Bus Signaling',
        artifact: 'Differential Voltage Signaling (PCIe / HDMI / UART TX)',
        artifactType: 'hardware',
        detail: 'Transceiver pulses high-speed voltage swings transmitting byte packets to display controller.',
      },
    },
  },
];
