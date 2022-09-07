import { Sentence } from "./sentence";

export interface Word {
  id: string,
  english: string | null,
  turkish: {
    first: string | null
    second: string | null
  },
  description: string | null,
  sentences: Sentence[],
  rating: number,
  trueAnswer: number,
  falseAnswer: number

}
