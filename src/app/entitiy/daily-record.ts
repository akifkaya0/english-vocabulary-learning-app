import { Task } from "./task";

export interface DailyRecord {
  "id" : string,
  "date": string,
  "tasks": Task[],
  "solvedSets": []
}
