import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  debug = false;

  isAuth: boolean = false;
  private isAuthSub!: Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuthSub = this.userService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  /* Méthode pour la déconnexion de l'utilisateur */
  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }


  swapDebugMode(): void {
    if (this.debug){
      this.debug = false;
    }else{
      this.debug = true;
    }
  }

}
