import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookmeService } from '../../services/cookme.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: CookmeService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.auth.createNewUser(email, password)
      .then(() => {
        console.log('Inscription avec succès !')
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      }
    );
  }

}
