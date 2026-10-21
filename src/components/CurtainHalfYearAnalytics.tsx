import React from 'react';

// Counts transcribed from the supplied VOLLKRAFT slide dated 27.07.2026.
export const rows = [
  ['Группа компаний «КАМАЗ»', 291, 339, 12, 14], ['ТОНАР', 671, 418, 27, 17],
  ['WAGNERMAIER', 158, 384, 6, 16], ['BONUM', 105, 367, 4, 15], ['ЦТТМ', 66, 188, 3, 8],
  ['GRUNWALD', 155, 126, 6, 5], ['Новтрак', 35, 111, 1, 6], ['ORTHAUS', 158, 108, 6, 5],
  ['KRONE', 217, 67, 9, 3], ['ПРОЧИЕ', 649, 285, 26, 12],
] as const;
export const others = [
  [['KAESSBOHRER',153,6],['SOTRANS',68,3],['CIMC',68,3],['GUT TRAILER',55,2],['FLIEGL',39,2],['KOLUMAN',39,2],['Другие',227,9]],
  [['GUT TRAILER',43,2],['KOLUMAN',39,2],['SOTRANS',34,1],['KAILE',27,1],['FLIEGL',23,1],['CIMC',14,1],['Другие',105,4]],
] as const;
export const totals = [2505, 2393];
export const uat = [[166,7],[76,3]] as const;
const fmt = (n: number) => n.toLocaleString('ru-RU');

export function CurtainHalfYearAnalytics() {
  return <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="curtain-half-year">
    <header className="bg-[#112e50] px-5 py-7 text-white md:px-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Регистрации • январь–июнь</p>
      <h2 id="curtain-half-year" className="text-2xl font-black md:text-3xl">Шторные полуприцепы</h2>
      <p className="mt-2 text-sm text-slate-200">Общий рынок 3- и 4-осных полуприцепов · 6 месяцев 2025 / 2026</p>
    </header>
    <div className="grid gap-3 p-5 sm:grid-cols-2 md:px-8">
      {totals.map((total,i)=><div key={i} className="rounded-xl bg-slate-50 p-5"><p className="text-xs font-semibold text-slate-500">6 мес. {2025+i}</p><p className="mt-1 text-3xl font-black text-[#1E3A5F]">{fmt(total)} <span className="text-sm font-medium">ед.</span></p></div>)}

    </div>
    <div className="px-5 pb-6 md:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold text-[#1E3A5F]">По производителям</h3><div className="flex gap-5 text-xs font-semibold"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-400"/>2025</span><span className="flex items-center gap-2"><i className="h-3 w-3 rounded bg-[#0073b9]"/>2026</span></div></div>
      <div className="grid gap-x-10 gap-y-5 lg:grid-cols-2">
        {[...rows].sort((a,b)=>b[2]-a[2]).map(([brand,a,b,p25,p26])=><div key={brand} className="break-inside-avoid">
          <div className="mb-2 flex items-baseline justify-between gap-2"><h4 className="text-sm font-bold text-slate-700">{brand}</h4></div>
          {[a,b].map((n,i)=><div key={i} className="mb-1.5 flex items-center gap-3" aria-label={`${brand}, ${2025+i}: ${n} регистраций, ${i ? p26 : p25}%`}><div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${i?'bg-[#0073b9]':'bg-slate-400'}`} style={{width:`${n/700*100}%`}}/></div><span className="w-28 shrink-0 text-right text-xs tabular-nums text-slate-600"><strong className="text-slate-900">{fmt(n)}</strong> · {i ? p26 : p25}%</span></div>)}
        </div>)}
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {totals.map((total,i)=><div key={i} className="rounded-xl border border-sky-100 bg-sky-50 p-4"><p className="text-xs font-semibold text-sky-800">UAT · 6 мес. {2025+i}</p><p className="mt-1 text-xl font-black text-[#1E3A5F]">{uat[i][0]} <span className="text-sm font-medium">ед. · {uat[i][1]}%</span></p></div>)}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">UAT показан отдельно, как в источнике, и не прибавляется к общему итогу: сумма основных категорий уже равна объёму рынка.</p>
      <details className="mt-6 rounded-xl border border-slate-200 p-4" open><summary className="cursor-pointer font-bold text-[#1E3A5F]">Состав категории «Прочие»</summary><div className="mt-4 grid gap-6 sm:grid-cols-2">{others.map((items,i)=><div key={i}><h4 className="mb-2 text-sm font-bold">6 мес. {2025+i} · {i?285:649} ед. · {i?12:26}%</h4><table className="w-full text-sm"><thead><tr className="text-left text-xs text-slate-500"><th className="py-2">Марка</th><th className="text-right">Ед.</th><th className="text-right">Доля рынка</th></tr></thead><tbody>{items.map(([name,n,p])=><tr key={name} className="border-t border-slate-100"><td className="py-2">{name}</td><td className="text-right tabular-nums">{n}</td><td className="text-right tabular-nums text-slate-500">{p}%</td></tr>)}</tbody></table></div>)}</div></details>
      <p className="mt-5 text-xs leading-relaxed text-slate-500">Источник: VOLLKRAFT, слайд 6, 27.07.2026. Все количества и проценты перенесены из источника без пересчёта. Данные объединяют 3- и 4-осные модели.</p>
    </div>
  </section>;
}

