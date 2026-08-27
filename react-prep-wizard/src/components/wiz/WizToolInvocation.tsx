import React, { useState } from 'react';
import { ChevronDown, Database, Globe, Zap, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ToolInvocation {
  id: string;
  type: 'data_query' | 'mcp_call' | 'skill_invoke';
  tool: string;
  status: 'pending' | 'complete' | 'error';
  result?: any;
}

interface WizToolInvocationProps {
  tool: ToolInvocation;
}

export function WizToolInvocation({ tool }: WizToolInvocationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (tool.type) {
      case 'data_query':
        return <Database size={14} className="text-blue-400" />;
      case 'mcp_call':
        return <Globe size={14} className="text-green-400" />;
      case 'skill_invoke':
        return <Zap size={14} className="text-yellow-400" />;
    }
  };

  const getLabel = () => {
    switch (tool.type) {
      case 'data_query':
        return 'Data Query';
      case 'mcp_call':
        return 'Web MCP';
      case 'skill_invoke':
        return 'Skill';
    }
  };

  const getStatusIcon = () => {
    switch (tool.status) {
      case 'pending':
        return <Loader size={12} className="text-yellow-400 animate-spin" />;
      case 'complete':
        return <CheckCircle size={12} className="text-emerald-400" />;
      case 'error':
        return <AlertCircle size={12} className="text-red-400" />;
    }
  };

  const getStatusColor = () => {
    switch (tool.status) {
      case 'pending':
        return 'border-yellow-500/20 bg-yellow-500/5';
      case 'complete':
        return 'border-emerald-500/20 bg-emerald-500/5';
      case 'error':
        return 'border-red-500/20 bg-red-500/5';
    }
  };

  return (
    <div className={`border rounded-lg p-3 text-xs ${getStatusColor()}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:opacity-80 transition"
      >
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium text-slate-300">
            {getLabel()}: <span className="text-slate-400">{tool.tool}</span>
          </span>
          {getStatusIcon()}
        </div>
        <ChevronDown
          size={12}
          className={`transition-transform text-slate-500 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && tool.result && (
        <div className="mt-2 pt-2 border-t border-slate-700/30">
          <div className="bg-slate-800/30 rounded p-2 max-h-48 overflow-auto">
            {typeof tool.result === 'string' ? (
              <pre className="text-slate-300 whitespace-pre-wrap break-words">{tool.result}</pre>
            ) : (
              <pre className="text-slate-300 text-[10px]">
                {JSON.stringify(tool.result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}

      {isExpanded && tool.status === 'error' && (
        <div className="mt-2 pt-2 border-t border-red-700/30">
          <div className="text-red-300">{tool.result || 'Unknown error'}</div>
        </div>
      )}
    </div>
  );
}
