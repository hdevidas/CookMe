import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
  
export class HomeComponent {

  isAuth = false;
  private isAuthSub!: Subscription;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isAuthSub = this.userService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  /* Méthode permettant de lier le bouton 'sign up, it's free' à la route 'signup'*/
  onSignUp() {
    this.router.navigateByUrl('signup');
  }
}
