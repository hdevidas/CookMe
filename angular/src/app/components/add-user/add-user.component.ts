import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CookmeService } from 'src/app/services/cookme.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: User = {
    name: '',
    password: ''
  };
  submitted = false;

  constructor(private cookmeService: CookmeService) { }

  saveUser(): void {
    const data = {
      title: this.user.name,
      description: this.user.password
    };

    this.cookmeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      password: ''
    };
  }

}