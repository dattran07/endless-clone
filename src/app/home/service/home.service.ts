import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature } from '../model/feature-model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  API_URL = 'https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge';

  getData() {
    return this.http.get<Feature[]>(this.API_URL);
  }

}
