import { Component } from '@angular/core';
import { EventData } from './event_data';
import { HeatmapDataService } from './heatmap-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Intensity Heatmap';
  eventData: EventData[] = [
    { timestamp: new Date('2024-06-1T02:00:10'), intensity: 12 },
    { timestamp: new Date('2024-06-2T03:00:00'), intensity: 8 },
    { timestamp: new Date('2024-06-3T04:00:00'), intensity: 15 },
    { timestamp: new Date('2024-06-4T05:00:00'), intensity: 4 },
    { timestamp: new Date('2024-06-5T06:00:00'), intensity: 11 },
    { timestamp: new Date('2024-06-6T07:00:00'), intensity: 20 },
    { timestamp: new Date('2024-06-7T08:00:00'), intensity: 17 },
    { timestamp: new Date('2024-06-8T09:00:00'), intensity: 9 },
    { timestamp: new Date('2024-06-9T10:00:00'), intensity: 22 },
    { timestamp: new Date('2024-06-10T11:00:00'), intensity: 5 },
    { timestamp: new Date('2024-06-11T12:00:00'), intensity: 10 },
    { timestamp: new Date('2024-06-12T13:00:00'), intensity: 7 },
    { timestamp: new Date('2024-06-13T14:00:00'), intensity: 3 },
    { timestamp: new Date('2024-06-14T14:00:00'), intensity: 3 },
    { timestamp: new Date('2024-06-15T00:00:00'), intensity: 5 },
    { timestamp: new Date('2024-06-16T01:00:00'), intensity: 7 },
    { timestamp: new Date('2024-06-17T02:00:00'), intensity: 12 },
    { timestamp: new Date('2024-06-18T03:00:00'), intensity: 8 },
    { timestamp: new Date('2024-06-19T04:00:00'), intensity: 15 },
    { timestamp: new Date('2024-06-20T05:00:00'), intensity: 4 },
    { timestamp: new Date('2024-06-21T06:00:00'), intensity: 11 },
    { timestamp: new Date('2024-06-22T07:00:00'), intensity: 20 },
    { timestamp: new Date('2024-06-23T08:00:00'), intensity: 17 },
    { timestamp: new Date('2024-06-24T09:00:00'), intensity: 9 },
    { timestamp: new Date('2024-06-25T10:00:00'), intensity: 22 },
    { timestamp: new Date('2024-06-26T11:00:00'), intensity: 5 },
    { timestamp: new Date('2024-06-27T12:00:00'), intensity: 10 },
    { timestamp: new Date('2024-06-28T13:00:00'), intensity: 7 },
    { timestamp: new Date('2024-06-29T14:00:00'), intensity: 3 },
    { timestamp: new Date('2024-06-30T15:00:00'), intensity: 8 },
    { timestamp: new Date('2024-06-28T16:00:00'), intensity: 14 },
    { timestamp: new Date('2024-06-28T17:00:00'), intensity: 17 },
    { timestamp: new Date('2024-06-28T18:00:00'), intensity: 1 },
    { timestamp: new Date('2024-06-28T19:00:00'), intensity: 30 },
    { timestamp: new Date('2024-06-28T20:00:00'), intensity: 25 },
    { timestamp: new Date('2024-06-28T21:00:00'), intensity: 18 },
    { timestamp: new Date('2024-06-28T22:00:00'), intensity: 10 },
    { timestamp: new Date('2024-06-28T23:00:00'), intensity: 6 },
    { timestamp: new Date('2024-06-29T00:00:00'), intensity: 5 },
    { timestamp: new Date('2024-06-30T01:00:00'), intensity: 7 },
  ];

  startDate: string = '';
  endDate: string = '';
  minIntensity: number = 0;
  maxIntensity: number = 30;

  constructor(private heatmapDataService: HeatmapDataService) {
    this.heatmapDataService.updateEventData(this.eventData);
  }

  addEvent(): void {
    const newEvent: EventData = { timestamp: new Date(), intensity: Math.floor(Math.random() * 25) + 1 };
    this.heatmapDataService.addEvent(newEvent);
  }

  clearEvents(): void {
    this.heatmapDataService.updateEventData([]);
  }

  applyDateFilter(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.heatmapDataService.filterByDateRange(start, end);
      this.resetFilters();
    }
  }

  applyIntensityFilter(): void {
    if (this.minIntensity !== null && this.maxIntensity !== null) {
      this.heatmapDataService.filterByIntensityRange(this.minIntensity, this.maxIntensity);
      this.resetFilters();
    }
  }

  resetFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.minIntensity = 0;
    this.maxIntensity = 30;
   
  }
}
