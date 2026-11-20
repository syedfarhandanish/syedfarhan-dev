'use client';

import { useId, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ASSUMPTIONS, calculateVillageLoad, scheduleFrom, type Appliance } from '@/lib/loadmap-engine';

const initialAppliances: Appliance[] = [
  { id: 'led', name: 'LED bulbs', wattage: 9, quantity: 4, schedule: scheduleFrom([[5, 7], [18, 23]]) },
  { id: 'phone', name: 'Phone chargers', wattage: 5, quantity: 3, schedule: scheduleFrom([[20, 23]]) },
  { id: 'tv', name: 'Television', wattage: 60, quantity: 1, schedule: scheduleFrom([[19, 22]]) },
  { id: 'fan', name: 'Ceiling fan', wattage: 50, quantity: 1, schedule: scheduleFrom([[13, 17]]) },
  { id: 'pump', name: 'Water pump', wattage: 370, quantity: 1, schedule: scheduleFrom([[7, 8]]) },
];

const fmt = (n: number, d = 2) => n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
const hh = (h: number) => `${String(h).padStart(2, '0')}:00`;

export default function LoadLab() {
  const [apps, setApps] = useState<Appliance[]>(initialAppliances);
  const [households, setHouseholds] = useState(25);
  const [sun, setSun] = useState(5);
  const [eff, setEff] = useState(80);
  const uid = useId();

  const result = useMemo(
    () =>
      calculateVillageLoad(
        Array.from({ length: households }, (_, i) => ({ id: String(i), appliances: apps })),
        sun,
        eff,
      ),
    [apps, households, sun, eff],
  );

  const toggle = (id: string, hour: number) =>
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, schedule: a.schedule.map((v, h) => (h === hour ? (v ? 0 : 1) : v)) } : a)),
    );
  const setField = (id: string, field: 'wattage' | 'quantity', value: number) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: Math.max(0, Math.min(field === 'wattage' ? 5000 : 50, value || 0)) } : a)));

  const max = Math.max(result.peakDemandKw, 0.001);

  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      {/* Appliance schedule grid */}
      <div>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h4 className="font-display text-xl font-semibold">One household&apos;s day</h4>
            <p className="text-sm text-ink-3">Click hours to switch an appliance on or off. Sample values — change anything.</p>
          </div>
          <button type="button" onClick={() => setApps(initialAppliances)} className="btn btn-ghost btn-sm shrink-0">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
          </button>
        </div>
        <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-[640px] border-separate border-spacing-y-1.5 text-sm">
            <caption className="sr-only">Appliance wattage, quantity and hourly schedule</caption>
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-ink-3">
                <th scope="col" className="pr-3 font-normal">Appliance</th>
                <th scope="col" className="w-20 pr-2 font-normal">Watts</th>
                <th scope="col" className="w-14 pr-3 font-normal">Qty</th>
                <th scope="col" className="font-normal">
                  <div className="grid grid-cols-24 gap-[2px]" aria-hidden>
                    {Array.from({ length: 24 }, (_, h) => (
                      <span key={h} className="text-center">{h % 6 === 0 ? h : ''}</span>
                    ))}
                  </div>
                  <span className="sr-only">Hours 0 to 23</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <th scope="row" className="whitespace-nowrap pr-3 text-left font-medium">{a.name}</th>
                  <td className="pr-2">
                    <label className="sr-only" htmlFor={`${uid}-${a.id}-w`}>{a.name} wattage</label>
                    <input
                      id={`${uid}-${a.id}-w`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={5000}
                      value={a.wattage}
                      onChange={(e) => setField(a.id, 'wattage', Number(e.target.value))}
                      className="field !min-h-0 !rounded-md !px-2 !py-1 font-mono text-xs"
                    />
                  </td>
                  <td className="pr-3">
                    <label className="sr-only" htmlFor={`${uid}-${a.id}-q`}>{a.name} quantity</label>
                    <input
                      id={`${uid}-${a.id}-q`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={50}
                      value={a.quantity}
                      onChange={(e) => setField(a.id, 'quantity', Number(e.target.value))}
                      className="field !min-h-0 !rounded-md !px-2 !py-1 font-mono text-xs"
                    />
                  </td>
                  <td>
                    <div className="grid grid-cols-24 gap-[2px]">
                      {a.schedule.map((on, h) => (
                        <button
                          key={h}
                          type="button"
                          aria-pressed={!!on}
                          aria-label={`${a.name} at ${hh(h)}`}
                          onClick={() => toggle(a.id, h)}
                          className={`h-7 rounded-[3px] transition-colors ${
                            on ? 'bg-accent hover:bg-accent-strong' : 'bg-surface-2 hover:bg-line-strong'
                          } ${h === 6 || h === 18 ? 'ml-[1px]' : ''}`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_15rem]">
        {/* Chart */}
        <figure className="rounded-xl border border-line bg-bg-elev p-4">
          <figcaption className="mb-3 flex items-baseline justify-between text-sm">
            <span className="font-medium">Village load curve</span>
            <span className="font-mono text-xs text-ink-3">kW per hour · {households} households</span>
          </figcaption>
          <div
            role="img"
            aria-label={`Bar chart of hourly load. Peak ${fmt(result.peakDemandKw)} kilowatts at ${hh(result.peakHour)}.`}
            className="flex h-40 items-end gap-[3px]"
          >
            {result.hourlyKw.map((kw, h) => (
              <div key={h} className="group relative flex h-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-[3px] transition-[height] duration-500 ease-out-expo ${
                    h === result.peakHour && kw > 0 ? 'bg-accent' : 'bg-glacier/55'
                  }`}
                  style={{ height: `${(kw / max) * 100}%`, minHeight: kw > 0 ? 2 : 0 }}
                />
                <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-bg group-hover:block">
                  {hh(h)} · {fmt(kw)} kW
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-ink-3" aria-hidden>
            <span>00</span>
            <span>06</span>
            <span>12</span>
            <span>18</span>
            <span>23</span>
          </div>
        </figure>

        {/* Controls */}
        <div className="grid content-start gap-4 text-sm">
          <Range label="Households" value={households} min={1} max={120} step={1} onChange={setHouseholds} unit="" />
          <Range label="Peak sun hours" value={sun} min={2} max={8} step={0.5} onChange={setSun} unit=" h" />
          <Range label="System efficiency" value={eff} min={50} max={95} step={1} onChange={setEff} unit="%" />
        </div>
      </div>

      {/* Results */}
      <div aria-live="polite" className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        <Stat label="Peak demand" value={`${fmt(result.peakDemandKw)} kW`} sub={`at ${hh(result.peakHour)}`} />
        <Stat label="Daily energy" value={`${fmt(result.dailyEnergyKwh, 1)} kWh`} />
        <Stat label="Load factor" value={`${fmt(result.loadFactor, 0)}%`} sub="average ÷ peak" />
        <Stat label="Solar array" value={`${fmt(result.pvKw)} kWp`} accent />
        <Stat label="Battery bank" value={`${fmt(result.batteryKwh, 1)} kWh`} accent />
        <Stat label="Inverter" value={`${fmt(result.inverterKw)} kW`} accent />
      </div>
      <p className="font-mono text-[11px] leading-relaxed text-ink-3">
        Assumptions: {ASSUMPTIONS.safetyMargin * 100}% safety margin · {ASSUMPTIONS.daysOfAutonomy} days of battery autonomy ·{' '}
        {ASSUMPTIONS.maxDepthOfDischarge * 100}% max depth of discharge. Estimates for early planning, not an engineering design.
      </p>
    </div>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (n: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <label htmlFor={id} className="text-ink-2">{label}</label>
        <output htmlFor={id} className="font-mono text-ink">{value}{unit}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-surface p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-3">{label}</div>
      <div className={`font-display mt-1 text-xl font-semibold sm:text-2xl ${accent ? 'text-accent' : ''}`}>{value}</div>
      {sub && <div className="text-xs text-ink-3">{sub}</div>}
    </div>
  );
}
