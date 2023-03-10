import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtAuthInterceptor } from './interceptors/jwt-auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PopUpComponent } from '../app/components/pop-up/pop-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipeShortComponent } from './components/recipe-short/recipe-short.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
    SearchComponent,
    RecipeComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    PopUpComponent,
    RecipeShortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    MatMenuModule
  ],
  providers: [
    /* Utilisation des interceptors pour la gestion des tokens */
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
