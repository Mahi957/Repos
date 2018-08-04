import { Injectable } from '@angular/core';
import { SurveyViewModel } from '../models/surveyViewModel';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { Survey } from '../models/survey';
import { QuestionAnswerSet } from '../models/questionAnswerSet';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class SurveyService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:58105/api/Home/';

  getSurvey(): Observable<SurveyViewModel> {
    return this.http.get<SurveyViewModel>('http://localhost:58105/api/Home/GetSurvey?surveyId=1');
  }

  getSurveyId(id: number) {
    return this.http.get<SurveyViewModel>(this.baseUrl + 'GetSurvey?surveyId=' + id);
  }

  getSurveyJson(): Observable<SurveyViewModel> {
    return this.http.get<SurveyViewModel>('assets/data.json');
  }

  saveSurvey(survey: SurveyViewModel): void {
    console.log(survey);

    this.http.post(this.baseUrl + "SaveSurvey", survey, httpOptions).subscribe();
    alert('survey posted');
  }

}
