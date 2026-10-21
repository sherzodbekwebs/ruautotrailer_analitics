import React from 'react';

// Counts transcribed from the supplied VOLLKRAFT slide dated 27.07.2026.
// Counts and percentages are literal source labels, not recalculated shares.
export const rows = [
  ['ЦТТМ',457,295,38,42], ['GRUNWALD',17,98,1,14], ['ТОНАР',null,93,null,13],
  ['ВБ ЛЭНД',0,69,0,10], ['КУПАВА',42,55,4,8], ['KAESSBOHRER',10,23,1,3],
  ['SCHMITZ',117,17,6,6], ['Трейд Дьюти Фри',4,15,0,2], ['KRONE',null,11,null,1],
  ['MAMMUT',37,6,3,1], ['ПРОЧИЕ',390,28,32,4],
] as const;
export const others = [
  [['SUNHUNK',262,22],['YILDIZ TREYLER',50,4],['Альфа Трейлер',21,2],['KAILE',14,1],['Другие',43,4]],
  [['KAILE',4,1],['Техпро',4,1],['РЕФАВТО',4,1],['Автоспецтехник',4,1],['Другие',12,1]],
] as const;
export const totals = [1208,710];
const fmt = (n: number) => n.toLocaleString('ru-RU');

export function ReeferHalfYearAnalytics() {
  return (
    <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="reefer-half-year">
      <header className="bg-[#112e50] px-5 py-7 text-white md:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Регистрации • январь–июнь</p>
        <h2 id="reefer-half-year" className="text-2xl font-black md:text-3xl">Рефрижераторы и изотермические полуприцепы</h2>
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
          <div className="flex gap-5 sm:gap-6 text-sm sm:text-base font-bold">
            <span className="flex items-center gap-2 text-slate-700">
              <i className="h-4 w-4 rounded bg-slate-400 shrink-0" />
              2025
            </span>
            <span className="flex items-center gap-2 text-[#0073b9]">
              <i className="h-4 w-4 rounded bg-[#0073b9] shrink-0" />
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
                        style={{ width: `${(n / 500) * 100}%` }}
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
                  6 мес. {2025 + i} · <span className="text-[#00529B]">{i ? 28 : 390} ед.</span> · {i ? 4 : 32}%
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
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#00529B]">{i ? 28 : 390}</td>
                      <td className="py-2.5 text-right tabular-nums text-xs sm:text-sm font-black text-[#1E3A5F]">{i ? 4 : 32}%</td>
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
          Источник: VOLLKRAFT, слайд 38, 27.07.2026. Числа, проценты и подписи периодов перенесены без пересчёта. Для ТОНАР и KRONE за 2025 год на слайде нет числовых подписей; значения не дополнены расчётами.
        </p>
      </div>
    </section>
  );
}
