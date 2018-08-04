import { Survey } from '../models/survey';
import { QuestionAnswerSet } from '../models/questionAnswerSet';

export class SurveyViewModel {
  Survey: Survey;
  QuestionAnswerSets: QuestionAnswerSet[];

  constructor(Survey: Survey, QuestionAnswerSets: QuestionAnswerSet[]) {
    this.Survey = Survey;
    this.QuestionAnswerSets = QuestionAnswerSets;
  }
}
