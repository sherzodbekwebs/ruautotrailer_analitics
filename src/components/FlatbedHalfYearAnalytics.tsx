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
  return (
    <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="flatbed-half-year">
      <header className="bg-[#112e50] px-5 py-7 text-white md:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Регистрации • январь–июнь</p>
        <h2 id="flatbed-half-year" className="text-2xl font-black md:text-3xl">Бортовые полуприцепы</h2>
        <p className="mt-2 text-sm text-slate-200">Регистрации по производителям · 6 месяцев 2025 / 2026</p>
      </header>

      {/* Top total cards with month/year placed on the side and reduced clean sizing */}
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
          {[...rows].sort((a, b) => (b[2] ?? -1) - (a[2] ?? -1)).map(([brand, a, b, p25, p26]) => (
            <div key={brand} className="break-inside-avoid">
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">{brand}</h4>
              </div>
              {[a, b].map((n, i) =>
                n === null ? (
                  <p key={i} className="mb-1.5 text-xs font-medium text-slate-500">
                    2025: в источнике не указано
                  </p>
                ) : (
                  <div
                    key={i}
                    className="mb-1.5 flex items-center gap-2.5 sm:gap-3"
                    aria-label={`${brand}, ${2025 + i}: ${n} регистраций, ${i ? p26 : p25}%`}
                  >
                    <div className="h-3 sm:h-3.5 flex-1 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${i ? 'bg-[#0073b9]' : 'bg-slate-400'}`}
                        style={{ width: `${(n / 240) * 100}%` }}
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
                )
              )}
            </div>
          ))}
        </div>

        <details className="mt-6 rounded-xl border border-slate-200 p-4" open>
          <summary className="cursor-pointer font-bold text-[#1E3A5F] text-base">Состав категории «Прочие»</summary>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {others.map((items, i) => (
              <div key={i}>
                <h4 className="mb-2.5 text-base sm:text-lg font-black text-[#1E3A5F]">
                  6 мес. {2025 + i} · <span className="text-[#00529B]">{i ? 144 : 186} ед.</span> · {i ? 22 : 26}%
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
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#00529B]">{i ? 144 : 186}</td>
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#1E3A5F]">{i ? 22 : 26}%</td>
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
        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Источник: VOLLKRAFT, слайд 20, 27.07.2026. Числа, проценты и подписи периодов перенесены без пересчёта.
        </p>
      </div>
    </section>
  );
}
