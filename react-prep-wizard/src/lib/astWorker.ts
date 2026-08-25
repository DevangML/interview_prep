import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';

export interface AstCheckResult {
  valid: boolean;
  error?: string;
  checks: { label: string; ok: boolean; actual: string }[];
}

self.onmessage = (e: MessageEvent<{ code: string; unitId: string }>) => {
  const { code, unitId } = e.data;
  
  try {
    const ast = parse(code, { 
      sourceType: 'module', 
      plugins: ['jsx', 'typescript'] 
    });

    const checks: { label: string; ok: boolean; actual: string }[] = [];
    
    // Default architectural checks (Adversarial constraints)
    let usedQuerySelector = false;
    let usedUseStateInLoop = false;
    let hasConsoleLog = false;
    let usesUseRef = false;
    let usesClearInterval = false;
    let usesUseEffect = false;

    // Because this is a web worker and Babel is a CJS module sometimes, 
    // we must ensure traverse is the default export
    const traverse = typeof _traverse === 'function' ? _traverse : (_traverse as any).default;
    
    traverse(ast, {
      CallExpression(path: any) {
        const callee = path.node.callee;
        
        // Check for direct DOM mutation
        if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
          if (['querySelector', 'getElementById', 'getElementsByClassName'].includes(callee.property.name)) {
            usedQuerySelector = true;
          }
        }
        
        // Check for console.log
        if (callee.type === 'MemberExpression' && callee.object.name === 'console') {
          hasConsoleLog = true;
        }
        
        // Check for hooks in loops/conditions
        if (callee.type === 'Identifier' && callee.name.startsWith('use')) {
           let parent = path.parentPath;
           while (parent) {
             if (['ForStatement', 'WhileStatement', 'IfStatement', 'ForInStatement', 'ForOfStatement'].includes(parent.type)) {
                usedUseStateInLoop = true;
             }
             parent = parent.parentPath;
           }
           
           if (callee.name === 'useRef') {
             usesUseRef = true;
           }
           if (callee.name === 'useEffect') {
             usesUseEffect = true;
           }
        }
        
        // Check for clearInterval
        if (callee.type === 'Identifier' && callee.name === 'clearInterval') {
          usesClearInterval = true;
        }
      }
    });

    // We map specific AST rules to specific unitIds, acting as the ultimate semantic grader.
    if (unitId === 'practical-stopwatch-useref') {
      checks.push({
        label: 'AST Rule: Uses useRef for interval ID',
        ok: usesUseRef,
        actual: usesUseRef ? 'useRef detected' : 'useRef missing in AST'
      });
      checks.push({
        label: 'AST Rule: Clears interval on unmount',
        ok: usesClearInterval,
        actual: usesClearInterval ? 'clearInterval detected' : 'clearInterval missing in AST'
      });
    }

    // Global Architectural Rules applied to all React Units
    if (unitId.includes('react') || unitId.includes('build-') || unitId.startsWith('practical-')) {
      checks.push({
        label: 'Architectural constraint: No direct DOM queries (e.g. querySelector)',
        ok: !usedQuerySelector,
        actual: usedQuerySelector ? 'Found direct DOM query (use Refs instead)' : 'Clean'
      });
      
      checks.push({
        label: 'Architectural constraint: Rules of Hooks (No hooks inside loops/conditionals)',
        ok: !usedUseStateInLoop,
        actual: usedUseStateInLoop ? 'Hook found inside loop or conditional block' : 'Clean'
      });
    }

    const valid = checks.every(c => c.ok);
    
    self.postMessage({ valid, checks } as AstCheckResult);
  } catch (err: any) {
    self.postMessage({ valid: false, error: "Syntax Error: " + err.message, checks: [] } as AstCheckResult);
  }
};
