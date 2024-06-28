import { Injectable } from '@angular/core';
import { EventData } from './event_data';
import { BehaviorSubject, Observable } from 'rxjs';


interface ProcessedData {
  date: string;
  timeSlot: string;
  frequency: number;
}

@Injectable({
  providedIn: 'root'
})
export class HeatmapDataService {

  private eventDataSubject: BehaviorSubject<EventData[]> = new BehaviorSubject<EventData[]>([]);
  public eventData$: Observable<EventData[]> = this.eventDataSubject.asObservable();
  private originalEventData: EventData[] = [];

  constructor() { }

  // Method to update the event data
  updateEventData(newEventData: EventData[]): void {
    this.originalEventData = newEventData;
    this.eventDataSubject.next(newEventData);
  }

  // Method to add a single event
  addEvent(event: EventData): void {
    this.originalEventData = [...this.originalEventData, event];
    this.eventDataSubject.next(this.originalEventData);
  }

  // Method to process event data
  processEventData(eventData: EventData[]): number[] {
    // Initialize an array to hold the frequency distribution for each hour (0-23)
    const frequencyDistribution = new Array(24).fill(0);

    eventData.forEach(event => {
      const hour = new Date(event.timestamp).getHours();
      frequencyDistribution[hour] += event.intensity;
    });

    return frequencyDistribution;
  }

   // Method to filter event data by date range
  filterByDateRange(startDate: Date, endDate: Date): void {
    const filteredData = this.originalEventData.filter(event =>
      new Date(event.timestamp) >= startDate && new Date(event.timestamp) <= endDate
    );
    this.eventDataSubject.next(filteredData);
  }
  
  // Method to filter event data by intensity level
  filterByIntensityRange(minIntensity: number, maxIntensity: number): void {
    const filteredData = this.originalEventData.filter(event =>
      event.intensity >= minIntensity && event.intensity <= maxIntensity
    );
    this.eventDataSubject.next(filteredData);
  }
}
