const fs = require('fs');

let c = fs.readFileSync('src/pages/MasteryPage.tsx', 'utf8');

c = c.replace(/const \[activeUnitId, setActiveUnitId\] = useState<string>\(MASTERY_UNITS\[0\]\.id\);/, `const [activeUnitId, setActiveUnitId] = useState<string>(() => {
    return localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id;
  });`);

c = c.replace(/const \[userCode, setUserCode\] = useState<string>\(MASTERY_UNITS\[0\]\.practice\.starterCode\);/, `const [userCode, setUserCode] = useState<string>(() => {
    const savedUnitId = localStorage.getItem('mastery:activeUnit') || MASTERY_UNITS[0].id;
    const savedCode = localStorage.getItem('mastery:code:' + savedUnitId);
    if (savedCode) return savedCode;
    const idx = UNIT_INDEX.get(savedUnitId) ?? 0;
    return MASTERY_UNITS[idx]?.practice.starterCode || MASTERY_UNITS[0].practice.starterCode;
  });`);

c = c.replace(/const \[activeEditorTab, setActiveEditorTab\] = useState<'editor' \| 'jsx_view'>\('editor'\);/, `const [activeEditorTab, setActiveEditorTab] = useState<'editor' | 'jsx_view'>(() => {
    return (localStorage.getItem('mastery:activeTab') as 'editor' | 'jsx_view') || 'editor';
  });`);

c = c.replace(/const \[isPortalOpen, setIsPortalOpen\] = useState\(false\);/, `const [isPortalOpen, setIsPortalOpen] = useState(() => localStorage.getItem('mastery:portalOpen') === 'true');`);

// Add useEffects after the activeUnitIndex declaration
const target = `const cur = MASTERY_UNITS[activeUnitIndex] || MASTERY_UNITS[0];`;
const insertion = `const cur = MASTERY_UNITS[activeUnitIndex] || MASTERY_UNITS[0];

  useEffect(() => {
    localStorage.setItem('mastery:activeUnit', activeUnitId);
  }, [activeUnitId]);

  useEffect(() => {
    localStorage.setItem('mastery:code:' + activeUnitId, userCode);
  }, [activeUnitId, userCode]);

  useEffect(() => {
    localStorage.setItem('mastery:activeTab', activeEditorTab);
  }, [activeEditorTab]);

  useEffect(() => {
    localStorage.setItem('mastery:portalOpen', String(isPortalOpen));
  }, [isPortalOpen]);`;

c = c.replace(target, insertion);

// Inside handleSelectUnit, we also need to load the saved code for the newly selected unit, rather than always starterCode!
// Wait, currently handleSelectUnit does: `setUserCode(unit.practice.starterCode);`
// We should change it to load from localStorage or fallback to starterCode.
const handleSelectOld = `const handleSelectUnit = (unit: MasteryUnit) => {
    setActiveUnitId(unit.id);
    setUserCode(unit.practice.starterCode);`;
    
const handleSelectNew = `const handleSelectUnit = (unit: MasteryUnit) => {
    setActiveUnitId(unit.id);
    const saved = localStorage.getItem('mastery:code:' + unit.id);
    setUserCode(saved || unit.practice.starterCode);`;

c = c.replace(handleSelectOld, handleSelectNew);

fs.writeFileSync('src/pages/MasteryPage.tsx', c);
