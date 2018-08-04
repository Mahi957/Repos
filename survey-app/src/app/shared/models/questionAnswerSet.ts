import {Answer} from '../models/answer';
import {Question} from '../models/question';


export class QuestionAnswerSet {
    Question: Question;
    Answers: Answer[];

    constructor(Question: Question, Answers: Answer[]) {
      this.Question = Question;
      this.Answers = Answers;

    }
  }

