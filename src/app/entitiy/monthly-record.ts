import { DailyRecord } from "./daily-record";

export interface MonthlyRecord {
  "id" : string,
  "name" : string,
  "days" : DailyRecord[]
}
