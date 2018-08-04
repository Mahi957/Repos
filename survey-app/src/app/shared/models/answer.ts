export class Answer {
  Id: string;
  Value: string;
  QuestionId: string;

  constructor(Id:string,Value:string,QuestionId:string){
   this.Id=Id;
   this.Value=Value;
   this.QuestionId=QuestionId;
  }
}
