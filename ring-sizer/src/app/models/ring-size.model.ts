export type MeasurementSystem = 'us' | 'uk' | 'europe' | 'japan' | 'china';

export interface RingSizeEntry {
  circumference: number;
  diameter: number;
  us: string | null;
  uk: string | null;
  europe: number | null;
  japan: number | null;
  china: number | null;
}

export interface ConvertedSizes {
  us: string | null;
  uk: string | null;
  europe: number | null;
  japan: number | null;
  china: number | null;
  circumference: number;
  diameter: number;
}

export const SYSTEM_LABELS: Record<MeasurementSystem, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  europe: 'Europe',
  japan: 'Japan',
  china: 'China'
};

export const SYSTEM_ICONS: Record<MeasurementSystem, string> = {
  us: 'pi pi-flag',
  uk: 'pi pi-flag-fill',
  europe: 'pi pi-globe',
  japan: 'pi pi-map',
  china: 'pi pi-building'
};
