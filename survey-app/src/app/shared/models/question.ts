export class Question {
  Id: string;
  Value: string;
  SurveyId: string;
  AnswerId: string;

  constructor(Id: string, Value: string, SurveyId: string, AnswerId: string) {
    this.Id = Id;
    this.Value = Value;
    this.SurveyId = SurveyId;
    this.AnswerId = AnswerId;
  }
}
