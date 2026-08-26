import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';

export interface AstCheckResult {
  id?: number;
  valid: boolean;
  error?: string;
  checks: { label: string; ok: boolean; actual: string }[];
}

self.onmessage = (e: MessageEvent<{ id?: number; code: string; unitId: string }>) => {
  const { id, code, unitId } = e.data;
  
  try {
    const ast = parse(code, { 
      sourceType: 'module', 
      plugins: ['jsx', 'typescript'] 
    });

    const checks: { label: string; ok: boolean; actual: string }[] = [];
    
    let usedQuerySelector = false;
    let usedUseStateInLoop = false;
    let hasConsoleLog = false;
    let usesUseRef = false;
    let usesClearInterval = false;
    let usesUseEffect = false;

    const traverse = typeof _traverse === 'function' ? _traverse : (_traverse as any).default;
    
    traverse(ast, {
      CallExpression(path: any) {
        const callee = path.node.callee;
        
        if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
          if (['querySelector', 'getElementById', 'getElementsByClassName'].includes(callee.property.name)) {
            usedQuerySelector = true;
          }
        }
        
        if (callee.type === 'MemberExpression' && callee.object.name === 'console') {
          hasConsoleLog = true;
        }
        
        if (callee.type === 'Identifier' && callee.name.startsWith('use')) {
           let parent = path.parentPath;
           while (parent) {
             if (['ForStatement', 'WhileStatement', 'IfStatement', 'ForInStatement', 'ForOfStatement'].includes(parent.type)) {
                usedUseStateInLoop = true;
             }
             parent = parent.parentPath;
           }
           
           if (callee.name === 'useRef') usesUseRef = true;
           if (callee.name === 'useEffect') usesUseEffect = true;
        }
        
        if (callee.type === 'Identifier' && callee.name === 'clearInterval') {
          usesClearInterval = true;
        }
      }
    });

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
    self.postMessage({ id, valid, checks } as AstCheckResult);
  } catch (err: any) {
    self.postMessage({ id, valid: false, error: "Syntax Error: " + err.message, checks: [] } as AstCheckResult);
  }
};
