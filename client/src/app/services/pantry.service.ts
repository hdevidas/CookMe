import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  constructor(private http: HttpClient) { }

  addIngredient(id: any, ingredient : string) {
    return new Promise((resolve,reject) => {
      this.http.put(baseUrl+'/pantry/add', {id : id, pantry: ingredient})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => {reject(error);}
        );
    }) ;
  }

  setupRandomPantry(id: any) {
    return new Promise((resolve,reject) => {
      this.http.put(baseUrl+'/pantry/random', {id : id})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => {reject(error);}
        );
    }) ;
  }

  removeAllIngredients(id: any){
    return new Promise((resolve,reject) => {
      this.http.put(baseUrl+'/pantry/removeall', {id : id})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => { reject(error);}
        );
    }) ;
  }

  removeIngredient(id : any, ingredient :string){
    return new Promise((resolve,reject) => {
      this.http.put(baseUrl+'/pantry/remove', {id : id, pantry: ingredient})
        .subscribe( 
          (data) => {resolve(data);},
          (error) => { reject(error);}
        );
    }) ;
  }
}

