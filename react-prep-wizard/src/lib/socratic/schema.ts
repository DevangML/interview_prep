/**
 * Strict JSON Schema for XGrammar constrained decoding (2026 Impartial Judge & Appellate Schema)
 */
export const SocraticJsonSchema = {
  type: 'object',
  properties: {
    isSemanticPass: {
      type: 'boolean',
      description: 'Strict boolean: true if student attempt satisfies requirements/specs and achieves semantic correctness, even if it failed deterministic checks due to formatting, valid alternative architecture, or brittle test assertions.'
    },
    adjudicationVerdict: {
      type: 'string',
      description: 'One of: [STUDENT_CORRECT, STUDENT_ERRED, AMBIGUOUS_SPEC, ALTERNATIVE_VALID]'
    },
    confidence: {
      type: 'number',
      description: 'Calibrated certainty: 1.0 (exact certainty), 0.9 (high certainty), 0.7 (probable).'
    },
    defectCategory: {
      type: 'string',
      description: 'One of: [NONE_VALID_CODE, SYNTAX_ERROR, RUNTIME_EXCEPTION, MUTATION_BUG, CLOSURE_LEAK, EVENT_LOOP_ORDER, CSS_BOX_MODEL, ASSERTION_FAILURE, TEST_HARNESS_FALSE_NEGATIVE, ALTERNATIVE_IMPLEMENTATION]'
    },
    diagnosticSummary: {
      type: 'string',
      description: 'Objective, impartial adjudication explaining whether the student actually erred against the problem contract, or if the test failed on a brittle check.'
    },
    impartialComparison: {
      type: 'object',
      properties: {
        specRequirements: {
          type: 'string',
          description: 'Concise distillation of what the problem specification strictly requires.'
        },
        studentBehavior: {
          type: 'string',
          description: 'What the student code actually computes, renders, or mutates in runtime/DOM.'
        },
        testHarnessStatus: {
          type: 'string',
          description: 'Impartial assessment of the deterministic test failure: real violation or brittle false negative?'
        },
        impartialReasoning: {
          type: 'string',
          description: 'Definitive impartial verdict weighing the student implementation against the specification.'
        }
      },
      required: ['specRequirements', 'studentBehavior', 'testHarnessStatus', 'impartialReasoning']
    },
    socraticHintLevel1: {
      type: 'string',
      description: 'High-level conceptual inquiry highlighting the concept without giving away code.'
    },
    socraticHintLevel2: {
      type: 'string',
      description: 'Targeted clue naming the exact variable, property, or state causing the deviation.'
    },
    socraticHintLevel3: {
      type: 'string',
      description: 'Concrete structural direction explaining how to resolve the flaw without copying the solution.'
    },
    disputePromptSuggestion: {
      type: 'string',
      description: 'Suggested point of debate or counter-argument the student can raise if their implementation is valid.'
    },
    findings: {
      type: 'array',
      description: 'Line-anchored defects. Empty if student is correct. At most 3 distinct items.',
      items: {
        type: 'object',
        properties: {
          anchorCode: {
            type: 'string',
            description: 'VERBATIM copy of the exact code substring from the STUDENT ATTEMPT that contains the problem.'
          },
          severity: {
            type: 'string',
            description: 'One of: bug, smell, missing'
          },
          concept: {
            type: 'string',
            description: 'The underlying computer-science concept.'
          },
          hint: {
            type: 'string',
            description: 'Targeted clue naming the identifier, property or state.'
          },
          fix: {
            type: 'string',
            description: 'Structural direction in prose.'
          }
        },
        required: ['anchorCode', 'severity', 'concept', 'hint', 'fix']
      }
    }
  },
  required: [
    'isSemanticPass',
    'adjudicationVerdict',
    'confidence',
    'defectCategory',
    'diagnosticSummary',
    'impartialComparison',
    'socraticHintLevel1',
    'socraticHintLevel2',
    'socraticHintLevel3',
    'disputePromptSuggestion',
    'findings'
  ]
};
