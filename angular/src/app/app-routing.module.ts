import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/add/:ingredient', component: ProfileComponent },
  { path: 'profile/remove/:ingredient', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:ingredient', component: SearchComponent },
  { path: 'recipe', component: RecipesComponent },
  { path: 'recipes/:recipe', component: RecipeComponent},
  { path: 'users', component: UsersListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'adduser', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }