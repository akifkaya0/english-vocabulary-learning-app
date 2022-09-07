import { Sentence } from "./sentence";

export interface Vocabulary {
  id: string,
  english: string,
  turkish: string,
  description: string,
  sentences: Sentence[],
  rating: number,
  trueAnswer: number,
  falseAnswer: number

}
