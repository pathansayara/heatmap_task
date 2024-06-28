import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EventData } from '../event_data';
import { HeatmapDataService } from '../heatmap-data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() eventData: EventData[] = [];
  frequencyDistribution: number[] = [];
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  colorSteps: number[] = [0, 5, 10, 15, 20, 25]; // Adjust this based on your data
  private eventDataSubscription: Subscription | undefined;

  constructor(private heatmapDataService: HeatmapDataService) { }

  ngOnInit(): void {
    this.processData();

    // Subscribe to real-time data updates
    this.eventDataSubscription = this.heatmapDataService.eventData$.subscribe(data => {
      this.eventData = data;
      this.processData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']) {
      this.processData();
    }
  }

  processData(): void {
    this.frequencyDistribution = this.heatmapDataService.processEventData(this.eventData);
  }

  getHeatmapColor(frequency: number): string {
    const maxFrequency = Math.max(...this.frequencyDistribution);
    if (maxFrequency === 0) return `rgb(255, 255, 255)`; // No events
    const intensity = frequency / maxFrequency;
    const red = Math.floor(255 * intensity);
    const green = Math.floor(255 * (1 - intensity));
    return `rgb(${red}, ${green}, 0)`; // Gradient from green (low) to red (high)
  }


  
  ngOnDestroy(): void {
    // Unsubscribe from the data stream when the component is destroyed
    if (this.eventDataSubscription) {
      this.eventDataSubscription.unsubscribe();
    }
  }

}