import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged = false;
  debug = false;

  ngOnInit(): void {
    
  }

  swapLoggedMode(): void {
    if (this.logged){
      this.logged = false;
    }else{
      this.logged = true;
    }
  }

  swapDebugMode(): void {
    if (this.debug){
      this.debug = false;
    }else{
      this.debug = true;
    }
  }

}
