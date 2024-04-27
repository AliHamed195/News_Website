import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-adds',
  standalone: true,
  imports: [NgIf],
  templateUrl: './adds.component.html',
  styleUrl: './adds.component.css',
})
export class AddsComponent {
  @Input() addSecPath: string | undefined;
}
