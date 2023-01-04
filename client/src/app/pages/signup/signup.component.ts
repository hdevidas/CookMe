import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';

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
              private userService: UserService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSignup() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.userService.signup(email, password)
      .then((response: any) => {
        this.openPopUp(response);
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
