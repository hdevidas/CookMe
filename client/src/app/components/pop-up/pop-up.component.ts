import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html'
})

 
export class PopUpComponent implements OnInit {

  message!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private popUp: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onClose() {
    this.router.navigateByUrl('login');
    this.popUp.closeAll();
    this.userService.logout();
  }

}
