import type { CanonicalConcept } from './types';

export const jsMettlTraps: CanonicalConcept[] = [
  {
    id: 'cc-mettl-coercion-chains',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'Esoteric Type Coercion Chains ([] == ![], +[], !+[]+!+[])',
    subtopics: ['[] == ![] -> true', '+[] -> 0', '!+[]+!+[] -> 2', '[] == false -> true', 'ToPrimitive Symbol.toPrimitive'],
    mechanismSummary: '![] becomes boolean false; [] converts to string "" and number 0; loose equality 0 == 0 evaluates to true.',
    interviewSignificance: 'Classic Mettl assessment trap testing deep ECMAScript Type Conversion Specification algorithms.'
  },
  {
    id: 'cc-mettl-four-equalities',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'The 4 ECMAScript Equalities (Object.is, SameValueZero, ===, ==)',
    subtopics: ['NaN === NaN (false)', 'Object.is(NaN, NaN) (true)', '+0 === -0 (true)', 'Object.is(+0, -0) (false)', 'Array.includes vs indexOf (SameValueZero)'],
    mechanismSummary: '=== treats +0 and -0 as equal and NaN != NaN; Object.is differentiates signed zero and equates NaNs; SameValueZero equates signed zeros and NaNs.',
    interviewSignificance: 'Directly explains React state bailout mechanisms (Object.is) and Set/Map key uniqueness.'
  },
  {
    id: 'cc-mettl-typeof-quirks',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'Primitive Type Anomalies, typeof null & IEEE 754 Float Precision',
    subtopics: ['typeof null === "object"', 'typeof typeof 1 === "string"', '0.1 + 0.2 !== 0.3', 'Number.EPSILON', 'isNaN() vs Number.isNaN()'],
    mechanismSummary: 'typeof null is a legacy 31-bit type tag bug; IEEE 754 floating point arithmetic introduces binary representation rounding inaccuracies.',
    interviewSignificance: 'Essential for financial order books and sound runtime type verification.'
  },
  {
    id: 'cc-mettl-tdz-hoisting',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'Temporal Dead Zone (TDZ), Hoisting & Function Scoping',
    subtopics: ['var Initialized to undefined', 'let/const Uninitialized in TDZ (ReferenceError)', 'Function Declarations vs Expressions', 'Block Scoping'],
    mechanismSummary: 'Creation phase hoists let/const declarations without initialization into the TDZ until evaluation reaches declaration.',
    interviewSignificance: 'Underpins lexical scoping and prevents silent variable access bugs.'
  },
  {
    id: 'cc-mettl-this-binding-loss',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'this Binding Context Loss & Lexical Arrow Traps in Object Literals',
    subtopics: ['Object Literals Lack Lexical Scope', 'Arrow Methods Capturing Outer Scope (NaN)', 'Method Detachment', 'Function.prototype.bind Purity'],
    mechanismSummary: 'Arrow functions do not bind their own this; object literal braces do not create closures, causing arrow methods to resolve to outer window/module.',
    interviewSignificance: 'Prevents runtime TypeError exceptions when passing methods as callbacks.'
  },
  {
    id: 'cc-mettl-cloning-boundaries',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'Shallow vs Deep Copying & structuredClone Throw Boundaries',
    subtopics: ['Spread {...obj} Shallow References', 'structuredClone() vs JSON.stringify()', 'DataCloneError on Functions/DOM', 'Object.freeze Shallow Immutability'],
    mechanismSummary: 'structuredClone safely deep-copies cyclic graphs, Dates, and Maps, but throws DataCloneError on functions, symbols, and DOM nodes.',
    interviewSignificance: 'Critical for state immutability, Web Worker transfer, and zero-leak state management.'
  },
  {
    id: 'cc-mettl-async-combinators',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'Promise Combinators, AggregateError & Sync Async Execution',
    subtopics: ['Promise.all (Fast Fail)', 'Promise.allSettled (Never Rejects)', 'Promise.race vs Promise.any', 'Async Function Synchronous Prelude', 'Microtask Starvation'],
    mechanismSummary: 'async functions execute synchronously up to the first await; Promise.any returns the first fulfillment or an AggregateError.',
    interviewSignificance: 'Mandatory for high-reliability data fetching, concurrent timeouts, and race condition handling.'
  },
  {
    id: 'cc-mettl-jsx-falsy-zero',
    pillar: 'JavaScript Mettl OA Traps',
    title: 'JSX Falsy Number Zero Trap ({items.length && ...})',
    subtopics: ['0 Renders as DOM Text "0"', 'Short-Circuit 0 && <Component />', 'Ternary Fix items.length ? ... : null', 'Boolean Coercion (!!items.length)'],
    mechanismSummary: 'React renders numeric 0 directly to the DOM; writing length && renders "0" when length is 0 rather than empty markup.',
    interviewSignificance: 'One of the most common visual bug traps in React technical interviews.'
  }
];
