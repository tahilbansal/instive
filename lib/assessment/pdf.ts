import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
export async function reportPdf(text: string, fontBytes: Uint8Array) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(fontBytes, { subset: true });
  doc.setTitle('Instive AI | Operations Efficiency Assessment');
  doc.setAuthor('Instive AI');
  const ink = rgb(14/255,26/255,36/255), amber = rgb(1,178/255,62/255);
  let page: ReturnType<typeof doc.addPage>, y = 0;
  const addPage = () => { page = doc.addPage([595,842]); page.drawRectangle({ x:0,y:778,width:595,height:64,color:ink }); page.drawText('INSTIVE AI / OPERATIONS ASSESSMENT', { x:40,y:803,size:12,font,color:rgb(1,1,1) }); page.drawRectangle({ x:40,y:776,width:70,height:3,color:amber }); y = 748; };
  addPage();
  // Wrap by measured glyph widths, including unbroken references and long custom answers.
  for (const raw of text.replace(/\r/g,'').replace(/[−–—]/g, '-').replace(/→/g, '->').split('\n')) {
    const line = raw.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');
    const heading = /^[A-Z &]+$/.test(line) && line.length > 3;
    const size = heading ? 11 : 9.5;
    if (!line) { y -= 9; continue; }
    if (heading) { if (y < 110) addPage(); y -= 8; }
    let current = '';
    const draw = (part: string) => { if (y < 52) addPage(); page.drawText(part, { x:40,y,size,font,color:ink }); y -= 15; };
    for (const char of line) {
      if (font.widthOfTextAtSize(current + char, size) > 515 && current) {
        const split = current.lastIndexOf(' ');
        if (split > current.length / 2) { draw(current.slice(0, split)); current = current.slice(split + 1) + char; }
        else { draw(current); current = char; }
      } else current += char;
    }
    if (current) draw(current);
  }
  doc.getPages().forEach((p,i) => { p.drawText(`Instive AI · Planning estimate, not guaranteed savings · ${i+1} / ${doc.getPageCount()}`, { x:40,y:25,size:8,font,color:ink }); });
  return doc.save();
}
