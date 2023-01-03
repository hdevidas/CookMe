import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookmeService } from '../../services/cookme.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(private popUp: MatDialog,
              private formBuilder: FormBuilder,
              private router: Router,
              private auth: CookmeService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSignup() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.auth.createNewUser(email, password)
      .then((response: any) => {
        this.openPopUp(response);
        // this.router.navigate(['/profile']);
      })
      .catch((error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  openPopUp(data: any) {
    this.popUp.open(PopUpComponent, { data });
  }

}
