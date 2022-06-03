import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { question, quiz } from '../types/models';
import { answers } from '../types/models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private answersSubject: BehaviorSubject<answers> = new BehaviorSubject(
    undefined
  );
  public answers$: Observable<answers> = this.answersSubject.asObservable();
  constructor(private http: HttpClient) {}

  public getList() {
    return this.http.get('http://localhost:3200/list');
  }

  //se supone que le deberia de pasar el type
  public getQuiz(type) {
    return this.http.get('http://localhost:3200/quiz', {
      params: { type: type },
    });
  }

  public setAnswers(answer, type) {
    const answers: answers = { answers: Object.values(answer), type };
    this.answersSubject.next(answers);
  }

  public getRanking() {
    return this.http.post(
      'http://localhost:3200/ranking',
      this.answersSubject.value
    );
  }
}
