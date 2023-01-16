import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: User = {
    email: '',
    password: ''
  };
  
  message = '';
  varpublished = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      email: this.currentUser.email,
      password: this.currentUser.password,
      published: status
    };

    this.message = '';

    this.userService.updateUser(this.currentUser._id, data)
      .subscribe({
        next: (res) => {
          this.varpublished = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';

    this.userService.updateUser(this.currentUser._id, this.currentUser)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'This User was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.currentUser._id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  getPublished(): boolean {
    return this.varpublished ;
  }

}

