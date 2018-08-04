import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../shared/services/survey.service';
import { SurveyViewModel } from '../shared/models/surveyViewModel';
import { Answer } from '../shared/models/answer';
import { Question } from '../shared/models/question';
import { Survey } from '../shared/models/survey';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { QuestionAnswerSet } from '../shared/models/questionAnswerSet';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-survey3',
  templateUrl: './survey3.component.html',
  styleUrls: ['./survey3.component.scss']
})
export class Survey3Component implements OnInit {

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {

  }

  ngOnInit() {
    this.getSurvey();
  }

  isLoaded: boolean = false;
  model: SurveyViewModel;
  surveyForm = this.fb.group({

    Survey: this.fb.group({
      Id: [''],
      Name: [''],
      IsPrivate: [''],
      IsActive: ['']
    }),

    QuestionAnswerSets: this.fb.array([
      this.fb.group({
        Question: this.fb.group({
          Id: [''],
          Value: ['']
        }),
        Answers: this.fb.array([
          this.fb.group({
            Id: [''],
            Value: ['']
          })
        ]),
      }),
    ])

  });

  UpdateForm(): void {

    this.model.QuestionAnswerSets.forEach(QuestionAnswerSet => {
      (<FormArray>this.surveyForm.controls.QuestionAnswerSets).push(this.fb.group(
        {
          Question: {
            Id: QuestionAnswerSet.Question.Id,
            Value: QuestionAnswerSet.Question.Value
          },
          Answers:
            this.fb.array(

              [
                this.fb.group({
                  Id: [''],
                  Value: ['']
                })
              ]

            ),
        }))
    });

    console.log('QuestionAnswerSets');
    console.log(this.model.QuestionAnswerSets);

    (<FormArray>this.surveyForm.controls.QuestionAnswerSets).removeAt(0);

    for (var i = 0; i < this.model.QuestionAnswerSets.length; i++) {

      console.log('i : ' + i);
      console.log(this.surveyForm.controls.QuestionAnswerSets.value[i]);
      //console.log(this.surveyForm.controls.QuestionAnswerSets.value[i].Question);
      //console.log(this.surveyForm.controls.QuestionAnswerSets.value[i].Answers);
      //console.log(this.model.QuestionAnswerSets[i]);

      this.model.QuestionAnswerSets[i].Answers.forEach(Answer => {
        (<FormArray>this.surveyForm.controls.QuestionAnswerSets.value[i].Answers).push(this.fb.group(
          {
            Answer: {
              Id: Answer.Id,
              Value: Answer.Value
            },
          }))
      });

      console.log(this.surveyForm.controls.QuestionAnswerSets.value[i]);
      //(<FormArray>this.surveyForm.controls.QuestionAnswerSets).removeAt(0);
      //(<FormArray>this.surveyForm.controls.QuestionAnswerSets.value[i].Answers).removeAt(0);
      console.log(this.surveyForm.controls.QuestionAnswerSets.value[i]);
    }

   

    console.log('before survey form');
    console.log(this.surveyForm);
    console.log('after survey form');

    //(<FormArray>this.surveyForm.controls.QuestionAnswerSets).removeAt(0);

  }

  getSurvey(): void {
    this.surveyService.getSurvey()
      .subscribe(
        survey => this.model = survey,
        err => console.error(err),
        () => {
          console.log('done getSurvey');
          console.log(this.model);
          this.UpdateForm();
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



// addSet() {
//   const questionAnswerSets = <FormArray>(
//     this.surveyForm.controls.QuestionAnswerSets
//   );
//   questionAnswerSets.push(this.initSet());
// }

// removeSet(setId: number) {
//   let questionAnswerSets = <FormArray>(
//     this.surveyForm.controls.QuestionAnswerSets
//   );
//   questionAnswerSets.removeAt(setId);
// }

// initAnswer() {
//   return this.formBuilder.group({
//     Answer: new FormControl("", Validators.required)
//   });
// }

// addAnswer(setId: number) {
//   const questionAnswerSets = <FormArray>(
//     this.surveyForm.controls.QuestionAnswerSets
//   );
//   const answer = <FormArray>(
//     questionAnswerSets.controls[setId]["controls"].Answers
//   );
//   answer.push(this.initAnswer());
// }

// removeAnswer(setId: number, answerId: number) {
//   const questionAnswerSets = <FormArray>(
//     this.surveyForm.controls.QuestionAnswerSets
//   );
//   const answer = <FormArray>(
//     questionAnswerSets.controls[setId]["controls"].Answers
//   );
//   answer.removeAt(answerId);
// }