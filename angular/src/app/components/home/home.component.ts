import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  /* Méthode permettant de lier le bouton 'sign up, it's free' à la route 'signup'*/
  onSignUp() {
    this.router.navigateByUrl('signup');
  }
}
