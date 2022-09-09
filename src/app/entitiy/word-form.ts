import { Sentence } from "./sentence"

export interface WordForm {
  english: string | null;
  turkhishFirst: string | null;
  turkishSecond: string | null;
  description: string | null;
  sentenceFirstEnglish: string | null;
  sentenceFirstDescription: string | null;
  sentenceSecondEnglish: string | null;
  sentenceSecondDescription: string | null;
  sentenceThirdEnglish: string | null;
  sentenceThirdDescription: string | null;

}
