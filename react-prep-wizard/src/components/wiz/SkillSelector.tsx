import React, { useState, useMemo } from 'react';
import { Search, X, ChevronDown, Tag, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { skillRegistry, skillsByCategory, searchSkills, type SkillMetadata } from '../../lib/ai/skill-registry';

interface SkillSelectorProps {
  selectedSkillIds: string[];
  onSelectSkill: (skillId: string) => void;
  onDeselectSkill: (skillId: string) => void;
  excludedSkillIds: string[];
  onExcludeSkill: (skillId: string) => void;
}

export function SkillSelector({
  selectedSkillIds,
  onSelectSkill,
  onDeselectSkill,
  excludedSkillIds,
  onExcludeSkill
}: SkillSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter skills based on search and category
  const filteredSkills = useMemo(() => {
    let skills = searchQuery
      ? searchSkills(searchQuery)
      : selectedCategory
      ? skillsByCategory[selectedCategory as keyof typeof skillsByCategory] || []
      : Object.values(skillRegistry);

    return skills
      .filter(s => !excludedSkillIds.includes(s.id))
      .sort((a, b) => (b.successRate || 0) - (a.successRate || 0));
  }, [searchQuery, selectedCategory, excludedSkillIds]);

  const selectedSkills = selectedSkillIds
    .map(id => skillRegistry[id])
    .filter(Boolean);

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'text-emerald-400';
      case 'low': return 'text-blue-400';
      case 'medium': return 'text-yellow-400';
      case 'expensive': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getCostBgColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'bg-emerald-500/10';
      case 'low': return 'bg-blue-500/10';
      case 'medium': return 'bg-yellow-500/10';
      case 'expensive': return 'bg-red-500/10';
      default: return 'bg-slate-500/10';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-white">Select Skills</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedSkillIds.length} selected • {Object.keys(skillRegistry).length} available
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2 py-1 rounded text-xs transition ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2 py-1 rounded text-xs transition ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search skills by name, description, or tag..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory(null);
            }}
            className="w-full bg-slate-800/50 border border-slate-600/30 rounded px-3 py-2 pl-9 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-950/50 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              !selectedCategory && !searchQuery
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {Object.keys(skillsByCategory).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(selectedCategory === category ? null : category);
                setSearchQuery('');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition capitalize ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Skills (Chips) */}
      {selectedSkills.length > 0 && (
        <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-950/50">
          <p className="text-xs text-slate-400 mb-2">Active in this session:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-indigo-600/20 border border-indigo-500/30 rounded-full px-3 py-1 flex items-center gap-2 text-xs"
              >
                <span className="text-indigo-300">{skill.name}</span>
                <button
                  onClick={() => onDeselectSkill(skill.id)}
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Grid/List */}
      <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}`}>
        {filteredSkills.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-slate-400">
            <p>No skills found</p>
            <p className="text-xs mt-1 text-slate-500">Try different search terms or category</p>
          </div>
        ) : (
          filteredSkills.map((skill) => {
            const isSelected = selectedSkillIds.includes(skill.id);
            const isExpanded = expandedSkillId === skill.id;

            return (
              <div
                key={skill.id}
                className={`border rounded-lg transition ${
                  isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'border-slate-700/30 bg-slate-800/30 hover:border-slate-600/50'
                }`}
              >
                {/* Skill Header */}
                <div
                  className="p-3 cursor-pointer"
                  onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {skill.description}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) {
                          onDeselectSkill(skill.id);
                        } else {
                          onSelectSkill(skill.id);
                        }
                      }}
                      className={`ml-2 px-2 py-1 rounded text-xs font-medium transition flex-shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {isSelected ? '✓ Active' : 'Add'}
                    </button>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {skill.estimatedLatency}ms
                    </div>
                    <div className={`flex items-center gap-1 ${getCostColor(skill.cost)}`}>
                      <DollarSign size={12} />
                      {skill.cost}
                    </div>
                    {skill.successRate && (
                      <div className="flex items-center gap-1 text-emerald-400">
                        <TrendingUp size={12} />
                        {(skill.successRate * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-300"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                    {skill.tags.length > 3 && (
                      <span className="text-xs text-slate-500">+{skill.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-slate-700/30 space-y-2 text-xs text-slate-300">
                    <div>
                      <p className="text-slate-400 font-medium mb-1">Input:</p>
                      <div className="flex flex-wrap gap-1">
                        {skill.inputFields.map((field) => (
                          <code
                            key={field}
                            className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300"
                          >
                            {field}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium mb-1">Output:</p>
                      <code className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300 block overflow-auto">
                        {skill.outputFormat}
                      </code>
                    </div>
                    {skill.prerequisites && skill.prerequisites.length > 0 && (
                      <div>
                        <p className="text-slate-400 font-medium mb-1">Requires:</p>
                        <div className="flex flex-wrap gap-1">
                          {skill.prerequisites.map((prereq) => (
                            <span
                              key={prereq}
                              className="bg-yellow-500/10 text-yellow-300 px-1.5 py-0.5 rounded"
                            >
                              {skillRegistry[prereq]?.name || prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                      <span className="text-slate-500">v{skill.version}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onExcludeSkill(skill.id);
                        }}
                        className="text-red-400 hover:text-red-300 transition text-xs"
                      >
                        Permanently disable
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
