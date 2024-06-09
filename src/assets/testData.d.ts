declare module 'testData' {
  export interface Answer {
    text: string;
    point: number;
  }

  export interface Question {
    question: string;
    answers: Answer[];
  }

  const testData: Question[];
  export default testData;
}
