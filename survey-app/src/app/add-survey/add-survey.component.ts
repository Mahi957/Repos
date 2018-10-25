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
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private surveyService: SurveyService) {
  }

  public surveyForm: FormGroup;

  ngOnInit() {

    this.surveyForm = this.formBuilder.group({
      Survey: new FormGroup({
        Name: new FormControl("", Validators.required),
        IsPrivate: new FormControl("", Validators.required),
        IsActive: new FormControl("", Validators.required)
      }),
      QuestionAnswerSets: new FormArray([])
    });

    this.addQuestionAnswerSet();
  }

  addQuestionAnswerSet(){

    const questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
 
    questionAnswerSets.push(this.initSet(""));

    var qaSetsLength=questionAnswerSets.controls.length;

    const answer = <FormArray>(
      questionAnswerSets.controls[qaSetsLength-1]["controls"].Answers
    );
    answer.push(this.initAnswer(""));
    answer.push(this.initAnswer(""));
    answer.push(this.initAnswer(""));
    answer.push(this.initAnswer(""));
  }

  initSet(Value: string) {
    return this.formBuilder.group({
      Question: new FormGroup({
        Value: new FormControl(Value, Validators.required),
      }),
      Answers: new FormArray([])
    });
  }

  removeSet(setId: number) {
    let questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
    questionAnswerSets.removeAt(setId);
  }

  initAnswer(Value: string) {
    return this.formBuilder.group({
      Answer: new FormGroup({

        Value: new FormControl(Value, Validators.required),
      }),
    });
  }

  public onFormSubmit({ value, valid }: { value: SurveyViewModel, valid: boolean }) {
    
    console.log(value);
    console.log("valid: " + valid);

    this.surveyService.saveSurvey(value);

  }


}
