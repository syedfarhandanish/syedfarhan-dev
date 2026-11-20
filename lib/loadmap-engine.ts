/**
 * Village load + solar sizing engine.
 * Ported from LoadMap (lib/engine.ts) — the same algorithm the real app uses,
 * so the Lab demo runs genuine project code, not an imitation.
 */

export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  /** 24 entries, 1 = on during that hour */
  schedule: number[];
}

export interface Household {
  id: string;
  appliances: Appliance[];
}

/** Assumptions are named and visible on purpose. */
export const ASSUMPTIONS = {
  safetyMargin: 0.15,
  daysOfAutonomy: 2,
  maxDepthOfDischarge: 0.8,
} as const;

export function calculateVillageLoad(households: Household[], peakSunHours: number, systemEfficiencyPercent: number) {
  const hourlyLoad = new Array<number>(24).fill(0);

  for (const hh of households) {
    for (const app of hh.appliances) {
      app.schedule.forEach((isActive, hour) => {
        hourlyLoad[hour] += isActive * app.wattage * app.quantity;
      });
    }
  }

  const peakDemandW = Math.max(...hourlyLoad, 0);
  const peakDemandKw = peakDemandW / 1000;
  const peakHour = hourlyLoad.indexOf(peakDemandW);
  const dailyEnergyWh = hourlyLoad.reduce((s, v) => s + v, 0);
  const dailyEnergyKwh = dailyEnergyWh / 1000;
  const averageDemandW = dailyEnergyWh / 24;
  const loadFactor = peakDemandW > 0 ? (averageDemandW / peakDemandW) * 100 : 0;

  const eff = systemEfficiencyPercent / 100;
  const { safetyMargin, daysOfAutonomy, maxDepthOfDischarge } = ASSUMPTIONS;
  const pvKw = peakSunHours > 0 && eff > 0 ? (dailyEnergyKwh / (peakSunHours * eff)) * (1 + safetyMargin) : 0;
  const batteryKwh = (dailyEnergyKwh * daysOfAutonomy) / maxDepthOfDischarge;
  const inverterKw = peakDemandKw * (1 + safetyMargin);

  return {
    hourlyKw: hourlyLoad.map((w) => w / 1000),
    peakDemandKw,
    peakHour,
    dailyEnergyKwh,
    loadFactor,
    pvKw,
    batteryKwh,
    inverterKw,
  };
}

/** Helper: build a 24-slot schedule from hour ranges like [[18, 23], [5, 7]] (end exclusive). */
export function scheduleFrom(ranges: [number, number][]) {
  const s = new Array<number>(24).fill(0);
  for (const [a, b] of ranges) for (let h = a; h < b; h++) s[h % 24] = 1;
  return s;
}
