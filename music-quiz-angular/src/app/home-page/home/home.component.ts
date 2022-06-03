import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public quizList;
  public selectedQuiz:string;
  constructor(private quizService: QuizService, private router:Router) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    const list = this.quizService.getList()
    .subscribe(
      (quizList)=> {
      this.quizList = quizList;
    });
  }
  public onSubmit() {
    this.router.navigate(['/home/quiz'], {queryParams : { type : this.selectedQuiz } } ); 
    //como le mando el this.selectedQuiz por parametro??
    //igualmente tiene q ir con el type a buscar el quiz 
    //y devolverlo, eso lo puedo hacer el en ngOnInit de quiz.component
    //console.log(this.selectedQuiz);
  }
}
