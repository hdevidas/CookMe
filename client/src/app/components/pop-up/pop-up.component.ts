import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})

 
export class PopUpComponent implements OnInit {

  message!: string;

  constructor(private router: Router,
              private popUp: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onClose() {
    this.router.navigateByUrl('login');
    this.popUp.closeAll();
  }

}
