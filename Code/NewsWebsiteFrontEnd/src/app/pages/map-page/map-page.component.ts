import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { AddsComponent } from '../../components/adds/adds.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [MapComponent, AddsComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent {}
