import React from 'react';

// Counts transcribed from the supplied VOLLKRAFT slide dated 27.07.2026.
// UAT is now included in the main rows chart list so it renders identically to all other manufacturers.
export const rows = [
  ['Группа компаний «КАМАЗ»', 291, 339, 12, 14], ['ТОНАР', 671, 418, 27, 17],
  ['WAGNERMAIER', 158, 384, 6, 16], ['BONUM', 105, 367, 4, 15], ['ЦТТМ', 66, 188, 3, 8],
  ['GRUNWALD', 155, 126, 6, 5], ['Новтрак', 35, 111, 1, 6], ['ORTHAUS', 158, 108, 6, 5],
  ['KRONE', 217, 67, 9, 3], ['UAT', 166, 76, 7, 3], ['ПРОЧИЕ', 649, 285, 26, 12],
] as const;
export const others = [
  [['KAESSBOHRER',153,6],['SOTRANS',68,3],['CIMC',68,3],['GUT TRAILER',55,2],['FLIEGL',39,2],['KOLUMAN',39,2],['Другие',227,9]],
  [['GUT TRAILER',43,2],['KOLUMAN',39,2],['SOTRANS',34,1],['KAILE',27,1],['FLIEGL',23,1],['CIMC',14,1],['Другие',105,4]],
] as const;
export const totals = [2505, 2393];
const fmt = (n: number) => n.toLocaleString('ru-RU');

export function CurtainHalfYearAnalytics() {
  return (
    <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="curtain-half-year">
      <header className="bg-[#112e50] px-5 py-6 text-white md:px-8">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Регистрации • январь–июнь</p>
        <h2 id="curtain-half-year" className="text-xl font-bold md:text-2xl">Шторные полуприцепы</h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-200">Общий рынок 3- и 4-осных полуприцепов · 6 месяцев 2025 / 2026</p>
      </header>

      {/* Selector 1: Top total cards with slightly reduced, balanced typography */}
      <div className="grid gap-3 p-3.5 sm:p-4 sm:grid-cols-2 md:px-8">
        {totals.map((total, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-slate-50 p-3.5 sm:p-4 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1E3A5F]">
                {fmt(total)}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                ед.
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-sm sm:text-base font-bold text-[#00529B] tracking-wide">
                6 мес. {2025 + i}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selector 2: Manufacturer chart section with slightly reduced, clean typography */}
      <div className="px-5 pb-6 md:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base md:text-lg font-bold text-[#1E3A5F]">По производителям</h3>
          <div className="flex gap-5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-600">
              <i className="h-3.5 w-3.5 rounded bg-slate-400" />
              2025
            </span>
            <span className="flex items-center gap-1.5 text-[#0073b9]">
              <i className="h-3.5 w-3.5 rounded bg-[#0073b9]" />
              2026
            </span>
          </div>
        </div>

        {/* Chart with manufacturers */}
        <div className="grid gap-x-10 gap-y-4 lg:grid-cols-2">
          {[...rows].sort((a, b) => b[2] - a[2]).map(([brand, a, b, p25, p26]) => (
            <div key={brand} className="break-inside-avoid">
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">{brand}</h4>
              </div>
              {[a, b].map((n, i) => (
                <div
                  key={i}
                  className="mb-1.5 flex items-center gap-2.5 sm:gap-3"
                  aria-label={`${brand}, ${2025 + i}: ${n} регистраций, ${i ? p26 : p25}%`}
                >
                  <div className="h-3 sm:h-3.5 flex-1 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${i ? 'bg-[#0073b9]' : 'bg-slate-400'}`}
                      style={{ width: `${(n / 700) * 100}%` }}
                    />
                  </div>
                  <div className="shrink-0 text-right tabular-nums min-w-[130px] sm:min-w-[155px] flex items-baseline justify-end gap-1">
                    <span className="text-sm sm:text-base font-bold text-[#1E3A5F]">
                      {fmt(n)}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      ед.
                    </span>
                    <span className="text-slate-300 font-bold px-0.5">·</span>
                    <span className={`text-sm sm:text-base font-bold ${i ? 'text-[#0073b9]' : 'text-slate-600'}`}>
                      {i ? p26 : p25}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <details className="mt-5 rounded-xl border border-slate-200 p-3.5" open>
          <summary className="cursor-pointer font-bold text-[#1E3A5F] text-sm sm:text-base">Состав категории «Прочие»</summary>
          <div className="mt-3.5 grid gap-5 sm:grid-cols-2">
            {others.map((items, i) => (
              <div key={i}>
                <h4 className="mb-2.5 text-base sm:text-lg font-black text-[#1E3A5F]">
                  6 мес. {2025 + i} · <span className="text-[#00529B]">{i ? 285 : 649} ед.</span> · {i ? 12 : 26}%
                </h4>
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 font-bold border-b border-slate-200">
                      <th className="py-2">Марка</th>
                      <th className="text-right py-2">Ед.</th>
                      <th className="text-right py-2">Доля рынка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Boshida turadigan umumiy qator */}
                    <tr className="border-b-2 border-slate-200 bg-slate-100/80 font-black text-[#1E3A5F]">
                      <td className="py-2.5 font-black uppercase text-xs sm:text-sm">ИТОГО «ПРОЧИЕ»</td>
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#00529B]">{i ? 285 : 649}</td>
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#1E3A5F]">{i ? 12 : 26}%</td>
                    </tr>
                    {items.map(([name, n, p]) => (
                      <tr key={name} className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors">
                        <td className="py-2 font-medium">{name}</td>
                        <td className="text-right tabular-nums font-bold text-slate-800">{n}</td>
                        <td className="text-right tabular-nums text-slate-600 font-bold">{p}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </details>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
          Источник: VOLLKRAFT, слайд 6, 27.07.2026. Все количества и проценты перенесены из источника без пересчёта. Данные объединяют 3- и 4-осные модели.
        </p>
      </div>
    </section>
  );
}
