import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MqServiceService } from './mq-service.service';
import { DistanceFormatPipe } from './distance-format.pipe';
import { Subject, catchError, debounceTime, distinctUntilChanged, mergeMap, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, FormsModule, DistanceFormatPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  from: string = 'Boston, MA'
  to: string = 'New York, NY'
  maneuvers: any[] = []
  totalDistance: any
  totalTime: any
  error: any
  selected: any
  constructor(private mapquest: MqServiceService) { }

  private locationSubject: Subject<{}> | undefined


  ngOnInit() {
    this.locationSubject = new Subject<{}>
    this.locationSubject.pipe(debounceTime(2500),     
    distinctUntilChanged(),    
      switchMap(() =>{
        
         return this.mapquest.getDirections(this.from, this.to)
      })
    ).subscribe(({ directions, maneuvers, error }) => {

      if(error){
        this.maneuvers=maneuvers
        this.error = error
        console.log(error)

      } else {
        
        this.maneuvers = maneuvers;        
        this.totalDistance = directions.distance;
        this.totalTime = directions.formattedTime;

      }
      })


      // emit from locationSubject during ngOnInit to initialize data
    this.locationSubject.next({from: this.from, to: this.to})

  }
  update(): void {       
    this.locationSubject?.next({from: this.from, to: this.to})
  }
 



}




