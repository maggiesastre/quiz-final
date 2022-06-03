import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { QuizService } from 'src/app/core/services/quiz.service';
import { quiz } from 'src/app/core/types/models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public selectedQuiz: quiz;
  private type;
  public form: FormGroup;
  private result;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //implementar q selected quiz vaya a quiz services y getquiz
    // this.activatedRoute.queryParams.subscribe((params)=> {
    //   this.type=params.type;
    //   HORRIBLE SEGUN MATI
    //   this.quizService.getQuiz(this.type).subscribe((quiz)=> {
    //     this.selectedQuiz=quiz;
    //   });
    // });

    this.activatedRoute.queryParams
      .pipe(
        concatMap((params) => {
          this.type = params.type;
          return this.quizService.getQuiz(params.type);
        })
      )
      .subscribe((quiz: quiz) => {
        this.selectedQuiz = quiz[0];
        this.initForm(quiz);
      });
  }

  public initForm = (quiz: quiz) => {
    this.form = new FormGroup({});
    //console.log(quiz);
    quiz[0].questions?.forEach((question, index) => {
      this.form.addControl(
        `${index}`,
        new FormControl('', [Validators.required])
      );
    });
  };

  onSubmit() {
    //llamar a getRanking(answers)
    this.result = this.form.getRawValue();
    this.quizService.setAnswers(this.result, this.type);
    this.router.navigate(['/home/result']);
  }
}
