import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/services/survey.service';
import { SurveyViewModel } from '../shared/models/surveyViewModel';
import { Answer } from '../shared/models/answer';
import { Question } from '../shared/models/question';
import { Survey } from '../shared/models/survey';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-survey2',
  templateUrl: './survey2.component.html',
  styleUrls: ['./survey2.component.scss']
})

export class Survey2Component implements OnInit {

  constructor(private surveyService: SurveyService) { }
  model: SurveyViewModel;

  onSubmit() {
    alert('You are onSubmit!');
  }

  public onFormSubmit({ value, valid }: { value: SurveyViewModel, valid: boolean }) {
    this.model = value;
    console.log(value);
    console.log("valid: " + valid);

    // let input = new FormData();
    // // Add your values in here
    // input.append('id', '24');
    // input.append('name', 'name24');
    // // etc, etc

    //this.http.post('', input, HttpUploadOptions)

    this.surveyService.saveSurvey(value);
    //this.surveyService.saveSurvey(input);
  }

  ngOnInit() {
    this.getSurvey();
  }

  getSurvey(): void {
    console.log('before survey call in ts');
    this.surveyService.getSurvey()
      .subscribe(survey => this.model = survey);

    console.log('after getSurvey in ts: '+this.model);
  }

}

