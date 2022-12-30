import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged = false;

  ngOnInit(): void {
    
  }

  logOn(): void {
    this.logged = true;
  }

  logOff(): void {
    this.logged = false;
  }

}
