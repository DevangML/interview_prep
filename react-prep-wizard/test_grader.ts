import { MASTERY_UNITS } from './src/data/masteryStream';

const unit = MASTERY_UNITS.find(u => u.id === 'FLEX-11');
console.log("Solution Code:");
console.log(unit.practice.solutionCode);
