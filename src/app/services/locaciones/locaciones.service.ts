import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocacionesService {

  private API = "http://localhost:8080/"
  constructor(private httpClient: HttpClient,
    ) { 
    
  }

  public getAllLocaciones (): Observable<any>{
      return this.httpClient.get(this.API);
  }

  public saveLocacion (locacion : any): Observable<any>{
    return this.httpClient.post(this.API,locacion)
  }

}


