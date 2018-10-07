import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/services/survey.service';
import { SurveyViewModel } from '../shared/models/surveyViewModel';
import { Answer } from '../shared/models/answer';
import { Question } from '../shared/models/question';
import { Survey } from '../shared/models/survey';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import { QuestionAnswerSet } from '../shared/models/questionAnswerSet';
import { Observable, of, throwError } from 'rxjs';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})

export class SurveyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService) {
  }

  isLoaded: boolean = false;
  model: SurveyViewModel;
  public surveyForm: FormGroup;

  ngOnInit() {
   

    this.surveyForm = this.formBuilder.group({
      QuestionAnswerSets: new FormArray([])
    });

    this.getSurvey();
    
  }

  totalInit() {
    this.model.QuestionAnswerSets.forEach(QuestionAnswerSet => {
      (<FormArray>(
        this.surveyForm.controls.QuestionAnswerSets
      )).push(this.initSet(QuestionAnswerSet.Question.Id, QuestionAnswerSet.Question.Value));
    });
    console.log('---------')
    console.log(this.surveyForm.controls.QuestionAnswerSets)
  }

  initSet(Id: string, Value: string) {
    return this.formBuilder.group({
      Question: new FormGroup({
        Id: new FormControl(Id, Validators.required),
        AnswerId: new FormControl(Value, Validators.required),
      })
    });
  }

  getSurvey(): void {
    this.surveyService.getSurveyJson()
      .subscribe(
        survey => this.model = survey,
        err => console.error(err),
        () => {
          console.log('done getSurvey');
          console.log(this.model);
          this.totalInit();
          this.isLoaded = true;
        }
      );
  }


   onFormSubmit({ value, valid }: { value: SurveyViewModel, valid: boolean }) {
    debugger;
    this.model = value;
    console.log(value);
    console.log(this.surveyForm);
    console.log("valid: " + valid);

    this.surveyService.saveSurvey(value);

  }

}
