import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqServiceService {

  constructor(private http: HttpClient) { }
  url = 'https://www.mapquestapi.com/directions/v2/route'
  key = 'aogeRh2lHZvKjjK2ZvXNlbxp7hywOrKK'
  getDirections(from: string, to: string): Observable<any> {
    let directions: any
    let maneuvers: any
    let error: any
    const params = new HttpParams().set('from', from).set('to', to).set('key', this.key);
    return this.http.get<any>(this.url, { params }).pipe(
      map((response: any) => {
        if (response.route.routeError) {
          
          directions= response.route
          maneuvers = []
          error = response.info.messages
          
        } else {
          // get directions and maneuvers to be returned as separate objects
          directions = response.route;
          maneuvers = directions.legs[0].maneuvers

        }
        



        return { directions, maneuvers, error };
      })
    );
  }

}
