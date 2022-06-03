import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { user } from './core/types/models';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user: user;

  title = 'music-quiz-angular';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscribe = this.authService.user$.subscribe((user: user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
