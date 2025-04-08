import type { DaysOfWeek } from 'domain/enums';

export interface OpeningHour {
  id: number;
  openingTime: string;
  closingTime: string;
  dayOfWeek: DaysOfWeek;
  createdAt: Date;
  updatedAt: Date;
}
