import React, { useRef, useState } from 'react';
import { TrailerSpec } from '../types';
import { ExternalLink, Image as ImageIcon, MoveHorizontal } from 'lucide-react';

export interface DimensionItem {
  label: string;
  value: string;
}

export function formatDimensions(raw?: string): DimensionItem[] {
  if (!raw || raw.trim() === '—' || raw.trim() === '') {
    return [{ label: '', value: '—' }];
  }

  const str = raw.trim();

  // Pattern 1: Explicit labels like "дл: ...; шир: ...; выс: ..." or "длина: ...; ширина: ...; высота: ..."
  if (/дл(ина)?\s*:/i.test(str) || /шир(ина)?\s*:/i.test(str) || /выс(ота)?\s*:/i.test(str)) {
    const items: DimensionItem[] = [];
    const parts = str.split(/[;\n]/).map(p => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (/^дл(ина)?\s*:\s*(.*)/i.test(part)) {
        items.push({
          label: 'длина',
          value: part.replace(/^дл(ина)?\s*:\s*/i, '').trim()
        });
      } else if (/^шир(ина)?\s*:\s*(.*)/i.test(part)) {
        items.push({
          label: 'ширина',
          value: part.replace(/^шир(ина)?\s*:\s*/i, '').trim()
        });
      } else if (/^выс(ота)?(\s*бортов)?\s*:\s*(.*)/i.test(part)) {
        const match = part.match(/^выс(ота)?(\s*бортов)?\s*:\s*(.*)/i);
        const sub = match?.[2] ? `высота ${match[2].trim()}` : 'высота';
        items.push({
          label: sub,
          value: match?.[3]?.trim() || ''
        });
      } else if (/^ССУ\s*:\s*(.*)/i.test(part)) {
        items.push({
          label: 'ССУ',
          value: part.replace(/^ССУ\s*:\s*/i, '').trim()
        });
      } else {
        const colonIdx = part.indexOf(':');
        if (colonIdx > 0) {
          items.push({
            label: part.slice(0, colonIdx).trim(),
            value: part.slice(colonIdx + 1).trim()
          });
        } else {
          items.push({ label: '', value: part });
        }
      }
    }
    if (items.length > 0) return items;
  }

  // Pattern 2: Dimension format with "х" or "x" or "*", e.g.
  // "внеш: 12 700 х 2 500 х 2 575 мм; ССУ: 1 250 мм" or "12600 х 2550 х 2100 мм"
  const extraItems: DimensionItem[] = [];
  let mainSegment = str;

  if (str.includes(';')) {
    const segs = str.split(';');
    mainSegment = segs[0].trim();
    for (let i = 1; i < segs.length; i++) {
      const seg = segs[i].trim();
      if (!seg) continue;
      if (/^ССУ\s*:\s*(.*)/i.test(seg)) {
        extraItems.push({ label: 'ССУ', value: seg.replace(/^ССУ\s*:\s*/i, '').trim() });
      } else {
        const colonIdx = seg.indexOf(':');
        if (colonIdx > 0) {
          extraItems.push({ label: seg.slice(0, colonIdx).trim(), value: seg.slice(colonIdx + 1).trim() });
        } else {
          extraItems.push({ label: '', value: seg });
        }
      }
    }
  }

  let tag = '';
  if (/^(внеш|внутр|габариты)\s*:\s*/i.test(mainSegment)) {
    const m = mainSegment.match(/^(внеш|внутр|габариты)\s*:\s*/i);
    tag = m ? ` (${m[1].toLowerCase()})` : '';
    mainSegment = mainSegment.replace(/^(внеш|внутр|габариты)\s*:\s*/i, '').trim();
  }

  // Split by "х" (cyrillic or latin) or "*"
  const dTokens = mainSegment.split(/\s+[хx*]\s+/i).map(t => t.trim());
  if (dTokens.length === 3) {
    let l = dTokens[0];
    let w = dTokens[1];
    let h = dTokens[2];
    let unit = '';
    const unitM = h.match(/\s*(мм|м|см)$/i);
    if (unitM) {
      unit = ' ' + unitM[1];
      h = h.replace(/\s*(мм|м|см)$/i, '').trim();
    }
    return [
      { label: `длина${tag}`, value: l.includes('мм') || l.includes('м') ? l : `${l}${unit}` },
      { label: `ширина${tag}`, value: w.includes('мм') || w.includes('м') ? w : `${w}${unit}` },
      { label: `высота${tag}`, value: `${h}${unit}` },
      ...extraItems
    ];
  }

  // Single label like "ССУ: 1 100 мм"
  if (/^ССУ\s*:\s*(.*)/i.test(str)) {
    return [{ label: 'ССУ', value: str.replace(/^ССУ\s*:\s*/i, '').trim() }];
  }

  // Fallback return
  return [{ label: '', value: str }];
}

export const SpecificationTable = ({ data }: { data: TrailerSpec[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag-to-scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="spec-panel w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 md:mb-12 print:border-none">
      <div className="p-4 md:p-6 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base md:text-xl font-black text-[#1E3A5F] tracking-tight uppercase">
            Технические характеристики
          </h4>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Полный перечень параметров и спецификаций моделей ({data.length} ед.)
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500 select-none">
          <MoveHorizontal size={14} className="text-[#00529B]" />
          <span>Зажмите и тяните мышкой для прокрутки</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`spec-scroll relative overflow-x-auto ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        tabIndex={0}
        role="region"
        aria-label="Технические характеристики — прокрутка таблицы"
      >
        <table className="w-full text-left border-separate border-spacing-0 border-l border-t border-slate-100 min-w-[1750px]">
          <thead>
            <tr className="bg-slate-50/95 text-[10px] md:text-[11px] font-black text-slate-700 uppercase tracking-wider select-none">
              {/* 1. № - FIXED STICKY */}
              <th className="sticky left-0 top-0 z-30 bg-slate-100 p-3.5 border-r border-b border-slate-200 text-center w-[48px] min-w-[48px]">
                №
              </th>
              {/* 2. Наименование - FIXED STICKY */}
              <th className="sticky left-[48px] top-0 z-30 bg-slate-100 p-3.5 border-r border-b border-slate-200 min-w-[160px] w-[160px]">
                Наименование
              </th>
              {/* 3. Фото - FIXED STICKY (with shadow to separate fixed columns from scroll) */}
              <th className="sticky left-[208px] top-0 z-30 bg-slate-100 p-3.5 border-r-2 border-b border-slate-200 text-center w-[140px] min-w-[140px] shadow-[4px_0_10px_-2px_rgba(0,0,0,0.08)]">
                Фото
              </th>
              {/* 4. Оси */}
              <th className="p-3.5 border-r border-b border-slate-200 text-center w-[100px]">Оси</th>
              {/* 5. Цена */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[170px]">Цена</th>
              {/* 6. Собственный вес (Масса) - Tushunarli qilib yozildi */}
              <th className="p-3.5 border-r border-b border-slate-200 text-center min-w-[140px]">
                <div className="leading-tight">Собственный вес, кг</div>
                <div className="text-[9px] font-semibold text-slate-400 lowercase tracking-normal">(масса без груза)</div>
              </th>
              {/* 7. Объём */}
              <th className="p-3.5 border-r border-b border-slate-200 text-center min-w-[110px]">Объём</th>
              {/* 8. Г/п, тн - перенесена сразу после Объёма */}
              <th className="p-3.5 border-r border-b border-slate-200 text-center min-w-[110px] bg-blue-50/40 text-[#00529B]">
                Г/п, тн
              </th>
              {/* 9. Размеры */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[200px]">Размеры</th>
              {/* 10. Тормозная система */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[200px]">Тормозная система</th>
              {/* 11. Подвеска */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[180px]">Подвеска</th>
              {/* 12. Оси (Бренд) */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[160px]">Оси (Бренд)</th>
              {/* 13. Шины */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[150px]">Шины</th>
              {/* 14. Крыша / Тент */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[160px]">Крыша / Тент</th>
              {/* 15. Надстройка */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[230px]">Надстройка</th>
              {/* 16. Окраска / Шасси */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[200px]">Окраска / Рама</th>
              {/* 17. Электрика */}
              <th className="p-3.5 border-r border-b border-slate-200 min-w-[170px]">Электрика</th>
              {/* 18. Источник */}
              <th className="p-3.5 border-r border-b border-slate-200 text-center min-w-[140px]">Источник</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const dimensions = formatDimensions(item.dimensions);

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 group transition-colors">
                  {/* 1. № - FIXED STICKY */}
                  <td className="sticky left-0 z-20 bg-white group-hover:bg-slate-50 transition-colors p-3.5 text-xs font-bold text-slate-400 border-r border-b border-slate-100 text-center w-[48px] min-w-[48px]">
                    {index + 1}
                  </td>

                  {/* 2. Наименование - FIXED STICKY */}
                  <td className="sticky left-[48px] z-20 bg-white group-hover:bg-slate-50 transition-colors p-3.5 border-r border-b border-slate-100 w-[160px] min-w-[160px]">
                    <span className="text-sm font-black text-[#1E3A5F] uppercase block leading-tight">
                      {item.brand}
                    </span>
                  </td>

                  {/* 3. Фото - FIXED STICKY (with shadow separator) */}
                  <td className="sticky left-[208px] z-20 bg-white group-hover:bg-slate-50 transition-colors p-2.5 border-r-2 border-b border-slate-200 text-center w-[140px] min-w-[140px] shadow-[4px_0_10px_-2px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-center min-h-[50px]">
                      {item.foto ? (
                        <img
                          src={item.foto}
                          alt={item.brand}
                          className="max-w-[120px] max-h-16 object-contain drop-shadow-sm pointer-events-none"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-slate-300">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* 4. Оси */}
                  <td className="p-3.5 text-xs font-bold text-slate-800 border-r border-b border-slate-100 text-center whitespace-nowrap">
                    {item.type}
                  </td>

                  {/* 5. Цена */}
                  <td className="p-3.5 border-r border-b border-slate-100">
                    <p className="text-xs font-black text-emerald-600 leading-tight mb-1">
                      {item.priceSum || '—'}
                    </p>
                    <p className="text-sm font-black text-[#1E3A5F]">
                      {item.priceUsd ? `$${item.priceUsd.toLocaleString()}` : '—'}
                    </p>
                    {item.priceR ? (
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                        {item.priceR.toLocaleString()} ₽
                      </p>
                    ) : null}
                  </td>

                  {/* 6. Собственный вес (Масса техники) */}
                  <td className="p-3.5 text-xs font-black text-slate-800 border-r border-b border-slate-100 text-center tabular-nums">
                    {item.mass ? (
                      <div>
                        <span>{item.mass.toLocaleString()} кг</span>
                        <span className="block text-[10px] font-bold text-slate-400 mt-0.5">собств. вес</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* 7. Объём */}
                  <td className="p-3.5 text-xs font-black text-slate-800 border-r border-b border-slate-100 text-center">
                    {item.volume !== undefined && item.volume !== null
                      ? typeof item.volume === 'number'
                        ? `${item.volume} м³`
                        : `${item.volume}`
                      : '—'}
                  </td>

                  {/* 8. Г/п, тн (Перенесена сразу после Объёма) */}
                  <td className="p-3.5 text-xs font-black text-[#00529B] bg-blue-50/20 border-r border-b border-slate-100 text-center">
                    {item.loadCapacity || '—'}
                  </td>

                  {/* 9. Размеры (Форматированные длина, ширина, высота друг под другом) */}
                  <td className="p-3.5 border-r border-b border-slate-100">
                    <div className="flex flex-col gap-1 text-xs">
                      {dimensions.map((dim, dIdx) => (
                        <div key={dIdx} className="flex items-baseline gap-1.5 whitespace-nowrap">
                          {dim.label ? (
                            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider min-w-[55px]">
                              {dim.label}:
                            </span>
                          ) : null}
                          <span className="font-semibold text-slate-800">
                            {dim.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* 10. Тормозная система */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.braking || '—'}
                  </td>

                  {/* 11. Подвеска */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.suspension || '—'}
                  </td>

                  {/* 12. Оси (Бренд) */}
                  <td className="p-3.5 text-xs font-bold text-slate-800 border-r border-b border-slate-100 leading-snug">
                    {item.axleBrand || '—'}
                  </td>

                  {/* 13. Шины */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 whitespace-nowrap">
                    {item.tires || '—'}
                  </td>

                  {/* 14. Крыша / Тент */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.roof || '—'}
                  </td>

                  {/* 15. Надстройка */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.superstructure || '—'}
                  </td>

                  {/* 16. Окраска / Шасси */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.painting || '—'}
                  </td>

                  {/* 17. Электрика */}
                  <td className="p-3.5 text-xs font-medium text-slate-700 border-r border-b border-slate-100 leading-snug">
                    {item.electrical || '—'}
                  </td>

                  {/* 18. Источник с ссылкой */}
                  <td className="p-3.5 border-r border-b border-slate-100 text-center whitespace-nowrap">
                    {item.from ? (
                      <a
                        href={item.from}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00529B] text-white rounded-lg text-xs font-black uppercase hover:bg-[#1E3A5F] transition-all shadow-xs"
                      >
                        Ссылка <ExternalLink size={12} />
                      </a>
                    ) : item.source ? (
                      <span className="text-xs font-bold text-slate-500">{item.source}</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
