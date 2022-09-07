import { Vocabulary } from "./vocabulary";

export interface StudySet {
  id : string,
  title : string,
  words : Vocabulary[],
  testValue : number
}
