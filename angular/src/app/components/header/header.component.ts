import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookmeService } from 'src/app/services/cookme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  debug = false;

  isAuth: boolean = false;
  private isAuthSub!: Subscription;

  constructor(private authService: CookmeService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  /* Méthode pour la déconnexion de l'utilisateur */
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }


  // swapLoggedMode(): void {
  //   if (this.logged){
  //     this.logged = false;
  //   }else{
  //     this.logged = true;
  //   }
  // }

  swapDebugMode(): void {
    if (this.debug){
      this.debug = false;
    }else{
      this.debug = true;
    }
  }

}
