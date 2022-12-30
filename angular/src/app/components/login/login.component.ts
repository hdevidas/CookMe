import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookmeService } from '../../services/cookme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: CookmeService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /* Méthode permettant de se connecter qui sera appeler au clic sur le bouton 'Log in' */
  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password)
      .then( (response: any) => {
        this.loading = false;
        console.log('Ça change' + response.token);
        this.router.navigate(['/search']);
      })
      .catch( (error) => {
        this.loading = false;
        this.errorMessage = error.error.message;
      });
  }

}
