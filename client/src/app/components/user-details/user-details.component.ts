import { Component, Input, OnInit } from '@angular/core';
import { CookmeService } from 'src/app/services/cookme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
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
    private CookmeService: CookmeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      //console.log(this.route.snapshot.params["id"] + ' ici!')
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.CookmeService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log('***************\n' +data);
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

    this.CookmeService.update(this.currentUser._id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.varpublished = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';

    this.CookmeService.update(this.currentUser._id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This User was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.CookmeService.delete(this.currentUser._id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  getPublished(): boolean {
    return this.varpublished ;
  }

}

