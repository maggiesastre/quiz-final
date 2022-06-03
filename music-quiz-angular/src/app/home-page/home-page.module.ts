import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './quiz/result/result.component';

@NgModule({
  declarations: [HomeComponent, QuizComponent, ResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    FormsModule,
  ],
})
export class HomePageModule {}
