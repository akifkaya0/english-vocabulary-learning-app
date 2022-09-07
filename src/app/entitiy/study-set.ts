import { Word } from "./word";

export interface StudySet {
  id : string,
  title : string,
  words : Word[],
  testValue : number
}
