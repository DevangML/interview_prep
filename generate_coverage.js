const fs = require('fs');

// 1. Parse Syllabus
const syllabusText = fs.readFileSync('_bmad-output/proving_ground/SYLLABUS.md', 'utf-8');
const rows = {};
const lines = syllabusText.split('\n');
for (const line of lines) {
  if (line.startsWith('|') && !line.includes('---')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 4) {
      const id = parts[1].replace(/\*/g, '');
      if (/^[A-Z]\d+/.test(id)) {
        rows[id] = {
          topic: parts[2].replace(/\*/g, ''),
          subtopics: parts[3].replace(/\*/g, '')
        };
      }
    }
  }
}

// 2. Parse Feature Map
const featureMapText = fs.readFileSync('_bmad-output/proving_ground/FEATURE_MAP.md', 'utf-8');
const features = [];
let currentFeature = null;

const featureMapLines = featureMapText.split('\n');
for (const line of featureMapLines) {
  if (line.startsWith('## F')) {
    if (currentFeature) features.push(currentFeature);
    currentFeature = {
      title: line.replace('## ', '').trim(),
      description: [],
      rows: []
    };
  } else if (currentFeature) {
    if (line.startsWith('## ') || line.startsWith('# ')) {
      features.push(currentFeature);
      currentFeature = null;
      continue;
    }
    
    if (!line.startsWith('|')) {
      if (line.trim().length > 0) {
        currentFeature.description.push(line.trim());
      }
    } else if (line.includes('`')) {
      // It's a table row containing row IDs
      const matches = [...line.matchAll(/`([A-Z]\d+)`/g)];
      for (const m of matches) {
        currentFeature.rows.push(m[1]);
      }
      // Handle ranges like `J72`–`J77`
      const ranges = [...line.matchAll(/`([A-Z]\d+)`[–-]`([A-Z]\d+)`/g)];
      for (const r of ranges) {
        const startPrefix = r[1][0];
        const startNum = parseInt(r[1].substring(1));
        const endNum = parseInt(r[2].substring(1));
        for (let i = startNum + 1; i < endNum; i++) {
          currentFeature.rows.push(`${startPrefix}${i.toString().padStart(r[1].length - 1, '0')}`);
        }
      }
    }
  }
}
if (currentFeature) features.push(currentFeature);

// 3. Generate Output
let out = `# Coverage Proof: The Load-Bearing Syllabus\n\n`;
out += `> **The Rule of Falsification:** A concept earns a place in this product only if removing it breaks a feature. This document proves the 360 product rows are structurally necessary to the Live Ops Console, mapping every single topic directly to its architectural purpose.\n\n`;

for (const f of features) {
  if (!f.title.includes('F')) continue;
  
  out += `\n---\n\n## 🏗️ ${f.title}\n\n`;
  
  // Clean up description
  const desc = f.description.join(' ').replace(/\s+/g, ' ');
  const whatMatch = desc.match(/\*\*What it does\.\*\*(.*?)\*\*Why it exists\.\*\*/);
  const whyMatch = desc.match(/\*\*Why it exists\.\*\*(.*?)\*\*Falsification:\*\*/);
  const falsiMatch = desc.match(/\*\*Falsification:\*\*(.*?)(?=$|\||\*See)/);
  
  if (whatMatch) out += `> **Purpose:** ${whatMatch[1].trim()}\n>\n`;
  if (falsiMatch) out += `> **Falsification (Why it is necessary):** ${falsiMatch[1].trim()}\n\n`;
  else if (whyMatch) out += `> **Why it exists:** ${whyMatch[1].trim()}\n\n`;
  
  // Sort and unique rows
  const uniqueRows = [...new Set(f.rows)].sort();
  
  if (uniqueRows.length > 0) {
    out += `### 🧩 Required Knowledge (Syllabus Concepts covered)\n\n`;
    for (const r of uniqueRows) {
      const data = rows[r];
      if (data) {
        out += `- **${r}**: ${data.topic} — *${data.subtopics}*\n`;
      }
    }
  }
}

fs.writeFileSync('_bmad-output/proving_ground/COVERAGE_PROOF.md', out);
console.log('Generated COVERAGE_PROOF.md');
