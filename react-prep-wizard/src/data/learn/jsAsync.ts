import type { LearnTopic } from './types';

/** Concurrency: the loop, promises, cancellation. */
export const jsAsyncTopics: LearnTopic[] = [
  {
    id: 'js-event-loop',
    area: 'JavaScript',
    group: 'Async',
    title: 'The event loop, microtasks and macrotasks',
    status: 'covered',
    minutes: 8,
    summary:
      'One thread, two queues, and a strict order. Ordering questions are the most reliable way an interviewer separates people who have read about async from people who have reasoned about it.',
    body: [
      'JavaScript runs on a single thread with a call stack. When the stack empties, the event loop takes work from queues. There are two, and their priority is not equal: the **microtask queue** (promise callbacks, `queueMicrotask`, `MutationObserver`) is drained **completely** before a single **macrotask** (timers, I/O, UI events, `setTimeout`, `setInterval`, `MessageChannel`) is taken.',
      'That asymmetry produces the canonical output: synchronous code first, then every promise callback, then the first timer — even a `setTimeout(fn, 0)`. A microtask that schedules another microtask is also drained in the same pass, which means an infinite microtask chain can starve the loop and freeze the page, while an infinite timer chain cannot.',
      '`await` is syntax over `.then`: everything after an `await` is a microtask continuation. An `async` function runs synchronously up to its first `await` — a detail that decides ordering answers and surprises people who assume the whole body is deferred.',
      'Rendering fits between macrotasks. The browser aims for one paint per frame (~16.7ms at 60Hz); `requestAnimationFrame` callbacks run just before paint, which is why animation belongs there and not in `setTimeout`. `requestIdleCallback` runs when the browser has spare time — appropriate for analytics, wrong for anything the user is waiting on.',
      'Long synchronous work blocks everything: layout, paint, input. That is why heavy computation belongs in a Web Worker, and why the app you are building runs Babel and Prettier in workers rather than on the main thread.',
    ],
    keyPoints: [
      'Microtasks drain fully before the next macrotask. Promises always beat timers.',
      'An `async` function body runs synchronously until the first `await`.',
      '`setTimeout(fn, 0)` does not mean "now"; it means "next macrotask, at least 0ms".',
      '`requestAnimationFrame` runs before paint; `setTimeout` has no such guarantee.',
    ],
    interview:
      'Expect a snippet mixing `console.log`, `setTimeout`, `Promise.then` and sometimes `await`, asked for exact output order. Walk it aloud: sync → microtasks → macrotasks. Saying "the microtask queue drains completely first" is the sentence being listened for.',
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
(async () => { console.log('D'); await null; console.log('E'); })();
console.log('F');
// A D F C E B`,
    resources: [
      { label: 'MDN — The event loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', kind: 'docs' },
      { label: 'Jake Archibald — In the loop (talk)', url: 'https://www.youtube.com/watch?v=cCOL7MC4Pl0', kind: 'video', note: 'The clearest 30 minutes on this subject that exists.' },
      { label: 'JS Visualizer 9000', url: 'https://www.jsv9000.app/', kind: 'practice', note: 'Paste a snippet and watch the queues drain. Best way to build intuition.' },
    ],
  },
  {
    id: 'js-promises',
    area: 'JavaScript',
    group: 'Async',
    title: 'Promises, async/await and cancellation',
    status: 'partial',
    minutes: 8,
    summary:
      'Beyond `then` and `await` lie the combinators, error propagation rules, and cancellation — the parts that appear in real code review and in senior interviews.',
    body: [
      'A promise is a value that will settle exactly once, into fulfilled or rejected, and never changes afterwards. `then` returns a **new** promise, which is what makes chaining work; returning a promise from inside `then` adopts its state rather than nesting it.',
      'The four combinators are frequently confused. `Promise.all` rejects as soon as any input rejects and resolves with an array otherwise — use it when you need everything. `Promise.allSettled` never rejects and reports `{status, value|reason}` for each — use it when partial success is acceptable. `Promise.race` settles with the first to settle, **including rejection**. `Promise.any` resolves with the first *fulfilment*, rejecting only if all fail (with an `AggregateError`).',
      'Error handling: `try/catch` around `await` catches rejections; a `.catch` anywhere in a chain handles everything upstream of it. An unhandled rejection is a real error event, not a silent no-op. `finally` runs regardless and — importantly — passes the value through untouched.',
      '**Cancellation** is the part most candidates have never used. Promises are not cancellable, so the platform provides `AbortController`: create one, pass `controller.signal` to `fetch`, and call `controller.abort()` to reject the fetch with an `AbortError`. In React this is the correct cleanup for a request started in an effect, and it is the answer to "how do you avoid setting state after unmount".',
      'Sequential `await` in a loop is a common performance bug: each iteration waits for the last. If the operations are independent, build the array of promises first and `await Promise.all(...)`.',
    ],
    keyPoints: [
      '`Promise.all` fails fast; `allSettled` never rejects; `race` includes rejections; `any` wants the first success.',
      '`AbortController` is how you cancel a fetch — and how you clean up an effect.',
      'An `await` inside a loop serialises independent work.',
      '`finally` passes the value through; it cannot change the result.',
    ],
    interview:
      '"How do you cancel a fetch?" and "difference between `Promise.all` and `allSettled`" are both common. The strong follow-up answer is showing an effect that aborts on cleanup — it demonstrates React and platform knowledge in one snippet.',
    code: `useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal })
    .then(r => r.json())
    .then(setData)
    .catch(e => { if (e.name !== 'AbortError') setError(e); });
  return () => ctrl.abort();   // cleanup cancels the in-flight request
}, [url]);`,
    resources: [
      { label: 'MDN — Using promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', kind: 'docs' },
      { label: 'MDN — AbortController', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', kind: 'docs' },
      { label: 'MDN — Promise.allSettled', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled', kind: 'docs' },
    ],
  },
];
