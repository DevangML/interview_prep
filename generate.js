const fs = require('fs');
const state = JSON.parse(fs.readFileSync('_bmad-output/proving_ground/SAVE_GAME_STATE.json', 'utf8'));
const oldUpdates = JSON.parse(fs.readFileSync('scratch_updates.json', 'utf8')).updates;

const quests = state.active_campaign.quests;
const newUpdates = {};

for (const q of quests) {
  if (['Q3', 'Q4', 'Q9', 'Q12'].includes(q.id)) continue;
  
  let desc = '🚀 **Quest: ' + q.title + '**\n\n';
  desc += '## 🧩 Context within the Puzzle\n' + (q.why || q.premise) + '\n\n';
  
  if (q.builds && q.builds.length > 0) {
    desc += '## 🏗️ Builds\n' + q.builds.map(b => '- `' + b + '`').join('\n') + '\n\n';
  }
  
  if (q.resources && q.resources.length > 0) {
    desc += '## 📚 Resources to Consume\n';
    for (const r of q.resources) {
      desc += '- **[' + r.id + ']** ' + (r.ref ? r.ref : (r.topic ? 'Scout: ' + r.topic : '')) + ' — *' + (r.why || r.kind) + '*\n';
    }
    desc += '\n';
  }
  
  if (q.challenges && q.challenges.length > 0) {
    desc += '## ⚔️ Challenges\n';
    for (const c of q.challenges) {
      desc += '### ' + c.id + '\n' + c.task + '\n';
      if (c.edge_cases && c.edge_cases.length > 0) {
        desc += '\n**Edge Cases:**\n' + c.edge_cases.map(e => '- ⚠️ ' + e).join('\n') + '\n';
      }
      desc += '\n';
    }
  }
  
  if (q.gate) {
    desc += '## 🚧 Gate\n> ' + q.gate + '\n\n';
  }
  
  desc += '---\n\n';
  desc += oldUpdates[q.id];
  
  newUpdates[q.id] = desc.trim();
}

fs.writeFileSync('scratch_updates3.json', JSON.stringify(newUpdates, null, 2));
console.log('done');
