import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SurveyComponent } from './survey/survey.component';
import { Survey2Component } from './survey2/survey2.component';
import { Survey3Component } from './survey3/survey3.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';

const appRoutes: Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'about',component:AboutComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'survey',component:SurveyComponent},
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DashboardComponent,
    ContactusComponent,
    SurveyComponent,
    Survey2Component,
    Survey3Component,
    AddSurveyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpModule,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
