import React from 'react';

// Counts transcribed from the supplied VOLLKRAFT slide dated 27.07.2026.
// Counts and percentages are literal source labels, not recalculated shares.
export const rows = [
 ['Группа компаний «КАМАЗ»',219,129,30,20], ['УСТ',106,176,15,27],
 ['ПОЛИТРАНС',107,79,15,12], ['BONUM',57,37,8,6], ['ЧМЗАП',14,26,2,4],
 ['МАЗ',29,25,4,4], ['GARTEK',2,22,0,3], ['LUXUDA',0,22,0,3], ['ПРОЧИЕ',186,144,26,22],
] as const;
export const others = [
 [['УЗСТ',45,6],['ИнтерПрицеп',22,3],['ТФК Феникс',15,2],['СЗА',12,2],['ATLANT',11,2],['САВ',9,1],['Другие',72,10]],
 [['УЗСТ',18,3],['ТФК Феникс',16,2],['Планета',16,2],['ТОНАР',14,2],['Машино-Деталь',10,2],['ИнтерПрицеп',9,1],['Другие',61,9]],
] as const;
export const totals = [720,660];
const fmt = (n: number) => n.toLocaleString('ru-RU');

export function FlatbedHalfYearAnalytics() {
  return <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="flatbed-half-year">
    <header className="bg-[#112e50] px-5 py-7 text-white md:px-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Регистрации • январь–июнь</p>
      <h2 id="flatbed-half-year" className="text-2xl font-black md:text-3xl">Бортовые полуприцепы</h2>
      <p className="mt-2 text-sm text-slate-200">Регистрации по производителям · 6 месяцев 2025 / 2026</p>
    </header>
    <div className="grid gap-3 p-5 sm:grid-cols-2 md:px-8">
      {totals.map((total,i)=><div key={i} className="rounded-xl bg-slate-50 p-5"><p className="text-xs font-semibold text-slate-500">6 мес. {2025+i}</p><p className="mt-1 text-3xl font-black text-[#1E3A5F]">{fmt(total)} <span className="text-sm font-medium">ед.</span></p></div>)}

    </div>
    <div className="px-5 pb-6 md:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold text-[#1E3A5F]">По производителям</h3><div className="flex gap-5 text-xs font-semibold"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-400"/>2025</span><span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-[#0073b9]"/>2026</span></div></div>
      <div className="grid gap-x-10 gap-y-5 lg:grid-cols-2">
        {[...rows].sort((a,b)=>(b[2] ?? -1)-(a[2] ?? -1)).map(([brand,a,b,p25,p26])=><div key={brand} className="break-inside-avoid">
          <div className="mb-2 flex items-baseline justify-between gap-2"><h4 className="text-sm font-bold text-slate-700">{brand}</h4></div>
          {[a,b].map((n,i)=>n === null ? <p key={i} className="mb-1.5 text-xs text-slate-500">2025: в источнике не указано</p> : <div key={i} className="mb-1.5 flex items-center gap-3" aria-label={`${brand}, ${2025+i}: ${n} регистраций, ${i ? p26 : p25}%`}><div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${i?'bg-[#0073b9]':'bg-slate-400'}`} style={{width:`${n/240*100}%`}}/></div><span className="w-28 shrink-0 text-right text-xs tabular-nums text-slate-600"><strong className="text-slate-900">{fmt(n)}</strong> · {i ? p26 : p25}%</span></div>)}
        </div>)}
      </div>
      <details className="mt-6 rounded-xl border border-slate-200 p-4" open><summary className="cursor-pointer font-bold text-[#1E3A5F]">Состав категории «Прочие»</summary><div className="mt-4 grid gap-6 sm:grid-cols-2">{others.map((items,i)=><div key={i}><h4 className="mb-2 text-sm font-bold">6 мес. {2025+i} · {i?144:186} ед. · {i?22:26}%</h4><table className="w-full text-sm"><thead><tr className="text-left text-xs text-slate-500"><th className="py-2">Марка</th><th className="text-right">Ед.</th><th className="text-right">Доля рынка</th></tr></thead><tbody>{items.map(([name,n,p])=><tr key={name} className="border-t border-slate-100"><td className="py-2">{name}</td><td className="text-right tabular-nums">{n}</td><td className="text-right tabular-nums text-slate-500">{p}%</td></tr>)}</tbody></table></div>)}</div></details>
      <p className="mt-5 text-xs leading-relaxed text-slate-500">Источник: VOLLKRAFT, слайд 20, 27.07.2026. Числа, проценты и подписи периодов перенесены без пересчёта.</p>
    </div>
  </section>;
}



