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

  isLoaded: boolean = false;
  model: SurveyViewModel;
  public surveyForm: FormGroup;

  ngOnInit() {
    this.getSurvey();

    this.surveyForm = this.formBuilder.group({
      Survey: new FormGroup({
        Id: new FormControl("", Validators.required),
        Name: new FormControl("", Validators.required),
        IsPrivate: new FormControl("", Validators.required),
        IsActive: new FormControl("", Validators.required)
      }),
      QuestionAnswerSets: new FormArray([])
    });
  }

  totalInit() {
    this.model.QuestionAnswerSets.forEach(QuestionAnswerSet => {
      (<FormArray>(
        this.surveyForm.controls.QuestionAnswerSets
      )).push(this.initSet(QuestionAnswerSet.Question.Id, QuestionAnswerSet.Question.Value));
    });

    for (var i = 0; i < this.model.QuestionAnswerSets.length; i++) {
      this.model.QuestionAnswerSets[i].Answers.forEach(Answer => {
        (<FormArray>(this.surveyForm.controls.QuestionAnswerSets)).controls[i]["controls"].Answers.push(
          this.initAnswer(Answer.Id, Answer.Value));
      });
    };

    console.log('QuestionAnswerSets');
    console.log(this.model.QuestionAnswerSets);

    console.log('this.surveyForm.controls.QuestionAnswerSets');
    console.log(this.surveyForm.controls.QuestionAnswerSets);
  }

  initSet(Id: string, Value: string) {
    return this.formBuilder.group({
      Question: new FormGroup({
        Id: new FormControl(Id, Validators.required),
        Value: new FormControl(Value, Validators.required),
      }),
      Answers: new FormArray([])
    });
  }

  addSet() {
    const questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
    questionAnswerSets.push(this.initSet("", ""));
  }

  removeSet(setId: number) {
    let questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
    questionAnswerSets.removeAt(setId);
  }

  initAnswer(Id: string, Value: string) {
    return this.formBuilder.group({
      Answer: new FormGroup({
        Id: new FormControl(Id, Validators.required),
        Value: new FormControl(Value, Validators.required),
      }),
    });
  }

  addAnswer(setId: number) {
    const questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
    const answer = <FormArray>(
      questionAnswerSets.controls[setId]["controls"].Answers
    );
    answer.push(this.initAnswer("", ""));
  }

  removeAnswer(setId: number, answerId: number) {
    const questionAnswerSets = <FormArray>(
      this.surveyForm.controls.QuestionAnswerSets
    );
    const answer = <FormArray>(
      questionAnswerSets.controls[setId]["controls"].Answers
    );
    answer.removeAt(answerId);
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


  public onFormSubmit({ value, valid }: { value: SurveyViewModel, valid: boolean }) {
    this.model = value;
    console.log(value);
    console.log("valid: " + valid);

    this.surveyService.saveSurvey(value);

  }


}
