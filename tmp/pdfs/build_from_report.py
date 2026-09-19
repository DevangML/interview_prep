from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.colors import HexColor
import re

SRC = '/Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/research/technical-epic-vedic-chronology-argument-audit-research-2026-09-11.md'
OUT = '/Users/devang/Desktop/interview_prep/output/pdf/ramayana_vedic_chronology_evidence_audit.pdf'

ss = getSampleStyleSheet()
ss.add(ParagraphStyle(name='TitleX', parent=ss['Title'], fontName='Helvetica-Bold', fontSize=23, leading=28, textColor=HexColor('#17324D'), spaceAfter=12))
ss.add(ParagraphStyle(name='H1X', parent=ss['Heading1'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=HexColor('#17324D'), spaceBefore=12, spaceAfter=7, keepWithNext=True))
ss.add(ParagraphStyle(name='H2X', parent=ss['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=13, textColor=HexColor('#265A78'), spaceBefore=8, spaceAfter=4, keepWithNext=True))
ss.add(ParagraphStyle(name='BodyX', parent=ss['BodyText'], fontName='Helvetica', fontSize=8.8, leading=12.2, textColor=HexColor('#1D2A33'), spaceAfter=5))
ss.add(ParagraphStyle(name='SmallX', parent=ss['BodyText'], fontName='Helvetica', fontSize=7.2, leading=9.5, textColor=HexColor('#41515D'), spaceAfter=3))
ss.add(ParagraphStyle(name='VerdictX', parent=ss['BodyText'], fontName='Helvetica-Bold', fontSize=9.2, leading=12.5, textColor=HexColor('#8C2F39'), spaceAfter=6))

def clean(s):
    s = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<link href="\2" color="#1769AA"><u>\1</u></link>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'`([^`]+)`', r'<font name="Courier">\1</font>', s)
    s = s.replace('&', '&amp;').replace('&amp;lt;', '&lt;').replace('&amp;gt;', '&gt;')
    return s.replace('—','-').replace('–','-').replace('‑','-')

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(HexColor('#D7E0E5')); canvas.line(18*mm,14*mm,192*mm,14*mm)
    canvas.setFont('Helvetica',7.2); canvas.setFillColor(HexColor('#667781'))
    canvas.drawString(18*mm,9*mm,'Evidence audit | 11 September 2026'); canvas.drawRightString(192*mm,9*mm,str(doc.page)); canvas.restoreState()

lines=open(SRC,encoding='utf8').read().splitlines(); story=[]
story += [Spacer(1,28*mm), Paragraph('Ramayana and Vedic Chronology', ss['TitleX']), Paragraph('A systematic evidence audit of the transcript\'s historical and scientific arguments', ss['BodyX']), Spacer(1,6*mm)]
box=Table([[Paragraph('<b>Conclusion</b><br/>The transcript contains real evidence for ancient traditions, settlements, river histories, and later Krishna devotion. It does not establish the proposed epic dates, a 21,000-year Rigveda, a global 2900 BCE flood, or independently documented Rama and Krishna before that boundary.',ss['BodyX'])]],colWidths=[165*mm])
box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#EAF2F5')),('BOX',(0,0),(-1,-1),0.5,HexColor('#A9C1CD')),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)])); story += [box, PageBreak()]
def add_table(block):
    rows=[]
    for raw in block:
        cells=[x.strip() for x in raw.strip().strip('|').split('|')]
        if cells and all(set(x.replace(':','').replace('-','').strip())==set() for x in cells): continue
        if cells: rows.append([Paragraph(clean(x), ss['SmallX']) for x in cells])
    if not rows: return
    t=Table(rows, colWidths=[40*mm,43*mm,58*mm,24*mm], repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#265A78')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,HexColor('#F3F6F7')]),('GRID',(0,0),(-1,-1),0.3,HexColor('#C9D4DA')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
    story.append(t); story.append(Spacer(1,5))

i=0
while i < len(lines):
    line=lines[i]
    if not line.strip() or line.startswith('---') or line.startswith(('stepsCompleted','workflowType','research_','user_name','date:','web_','source_')):
        i += 1
        continue
    if line.startswith('|'):
        block=[]
        while i < len(lines) and lines[i].startswith('|'):
            block.append(lines[i]); i += 1
        add_table(block); continue
    if line.startswith('# '):
        if 'Research report' not in line: story.append(Paragraph(clean(line[2:]), ss['H1X']))
    elif line.startswith('## '): story.append(Paragraph(clean(line[3:]), ss['H1X']))
    elif line.startswith('### '): story.append(Paragraph(clean(line[4:]), ss['H2X']))
    elif line.startswith('|'): continue
    elif line.startswith('- '): story.append(Paragraph('&bull; '+clean(line[2:]), ss['BodyX']))
    else: story.append(Paragraph(clean(line), ss['BodyX']))
    i += 1
doc=SimpleDocTemplate(OUT,pagesize=A4,rightMargin=18*mm,leftMargin=18*mm,topMargin=17*mm,bottomMargin=20*mm,title='Ramayana and Vedic Chronology Evidence Audit',author='Devang')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
