import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, ExternalLink } from 'lucide-react';
import { TrailerSpec } from '../types';

const categoryImages: Record<string, string> = {
  'curtain-3': '/uat3os.png',
  'curtain-4': '/uat4.png',
  'container-3': '/kuat3.png',
  'container-4': '/kuat4.png',
  'reefer-3': '/ref.png',
  'flatbed-container': '/vollkraft_bort.png',
};

interface PriceComparisonChartProps {
  data: TrailerSpec[];
  activeCategory: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  activeItem?: any;
  onTooltipEnter?: () => void;
  onTooltipLeave?: () => void;
}

const CustomTooltip = ({ active, payload, activeItem, onTooltipEnter, onTooltipLeave }: CustomTooltipProps) => {
  const current = (active && payload && payload.length) ? payload[0].payload : activeItem;
  if (!current) return null;

  return (
    <div
      onMouseEnter={onTooltipEnter}
      onMouseLeave={onTooltipLeave}
      className="bg-white p-4 md:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 pointer-events-auto select-auto z-50 min-w-[220px]"
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-slate-900 text-sm font-black uppercase tracking-tight">{current.name}</div>
        <div className="flex flex-col">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Цена (USD):</span>
          <span className="text-[#1E3A5F] text-xl font-black leading-tight">
            ${current.priceUsd?.toLocaleString()}
          </span>
        </div>
        {current.priceR && (
          <div className="text-slate-500 text-xs font-bold">{current.priceR.toLocaleString()} ₽</div>
        )}
        {current.source ? (
          <a
            href={current.source}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#00529B] text-white rounded-xl text-xs font-black uppercase hover:bg-[#1E3A5F] transition-all shadow-sm cursor-pointer hover:shadow-md"
          >
            Перейти к источнику <ExternalLink size={13} />
          </a>
        ) : (
          <span className="mt-1 text-xs text-slate-400 font-medium">Ссылка отсутствует</span>
        )}
      </div>
    </div>
  );
};

export const PriceComparisonChart = ({ data, activeCategory }: PriceComparisonChartProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = data
    .filter(item => item.priceUsd !== null && item.priceUsd !== undefined)
    .map(item => ({
      name: item.brand,
      priceUsd: item.priceUsd as number,
      priceR: item.priceR,
      source: item.from,
    })).sort((a, b) => b.priceUsd - a.priceUsd);

  const onHoverStart = (item: any) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (item) setActiveItem(item);
  };

  const onHoverEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 450); // Grace period allows moving mouse into the tooltip without it running away
  };

  const onTooltipEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const onTooltipLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveItem(null);
  };

  // Custom bar label that ALWAYS remains visible and never hides on hover
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value, index, payload } = props;
    const item = (chartData && typeof index === 'number' && chartData[index]) || payload;
    const displayVal = value !== undefined && value !== null ? value : item?.priceUsd;
    if (displayVal === undefined && !item) return null;

    return (
      <g pointerEvents="none" style={{ pointerEvents: 'none' }}>
        <text
          x={x + width / 2}
          y={y - 24}
          fill="#1E3A5F"
          textAnchor="middle"
          className="select-none font-black"
          fontSize={isMobile ? 12 : 15}
        >
          {displayVal ? `$${displayVal.toLocaleString()}` : ''}
        </text>
        {item?.priceR && (
          <text
            x={x + width / 2}
            y={y - 7}
            fill="#64748B"
            textAnchor="middle"
            className="select-none font-bold"
            fontSize={isMobile ? 10 : 12}
          >
            {`${item.priceR.toLocaleString()} ₽`}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="price-panel bg-white p-4 md:p-10 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm mb-8 md:mb-12 overflow-hidden">
      <div className="flex flex-row items-center justify-between mb-6 md:mb-14">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-9 h-9 md:w-14 md:h-14 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <CircleDollarSign className="w-5 h-5 md:w-7 md:h-7 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-sm md:text-2xl font-black text-[#1E3A5F] tracking-tighter leading-none mb-1">
              Сравнение цен
            </h4>
            <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Нажмите на столбец или ссылку в карточке для перехода
            </p>
          </div>
        </div>

        <div className="relative shrink-0">
          <img
            className="w-20 md:w-60 h-auto object-contain drop-shadow-2xl"
            src={categoryImages[activeCategory] || '/uat3os.png'}
            alt="Trailer Type"
          />
        </div>
      </div>

      <div className="price-chart-scroll">
        <div className="h-[380px] md:h-[450px] w-full" style={{ minWidth: Math.max(680, chartData.length * 120) }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 40,
                  right: isMobile ? 10 : 20,
                  left: isMobile ? -25 : 10,
                  bottom: isMobile ? 65 : 30
                }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2898be" stopOpacity={1} />
                    <stop offset="100%" stopColor="#165580" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 90 : 30}
                  tick={{
                    fill: '#1E293B',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                />

                <YAxis
                  hide={isMobile}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => value.toLocaleString()}
                  width={80}
                />

                <Tooltip
                  content={
                    <CustomTooltip
                      activeItem={activeItem}
                      onTooltipEnter={onTooltipEnter}
                      onTooltipLeave={onTooltipLeave}
                    />
                  }
                  cursor={{ fill: 'rgba(59, 130, 246, 0.04)', radius: 12 }}
                  wrapperStyle={{ outline: 'none', pointerEvents: 'auto', zIndex: 100 }}
                  isAnimationActive={false}
                  offset={25}
                />

                <Bar
                  dataKey="priceUsd"
                  fill="url(#barGradient)"
                  radius={[8, 8, 4, 4]}
                  barSize={isMobile ? 16 : 48}
                  label={renderCustomBarLabel}
                  className="cursor-pointer"
                  isAnimationActive={false}
                  onMouseEnter={(entry: any) => onHoverStart(entry?.payload || entry)}
                  onMouseLeave={onHoverEnd}
                  onClick={(entry: any) => {
                    const url = entry?.source || entry?.payload?.source;
                    if (url) {
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold uppercase text-[10px]">
              Нет данных по ценам
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
