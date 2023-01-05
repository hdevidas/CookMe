import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class PentryService {

  constructor(private http: HttpClient) { }

  addIngredient(id: any, ingredient : string[]) {
    return new Promise((resolve,reject) => {
      this.http.post(baseUrl+'/ingredients/change', {id : id, pentry: ingredient})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => {reject(error);}
        );
    }) ;
  }

  removeAllIngredients(id: any){
    return new Promise((resolve,reject) => {
      this.http.post(baseUrl+'/ingredients/change', {id : id, pentry: []})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => { reject(error);}
        );
    }) ;
  }

  removeOneIngredient(id : any, ingredient :string){
    return new Promise((resolve,reject) => {
      this.http.post(baseUrl+'/ingredients/remove', {id : id, pentry: ingredient})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => { reject(error);}
        );
    }) ;
  }
}
