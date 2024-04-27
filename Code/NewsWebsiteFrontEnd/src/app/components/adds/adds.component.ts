import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-adds',
  standalone: true,
  imports: [NgIf],
  templateUrl: './adds.component.html',
  styleUrl: './adds.component.css',
})
export class AddsComponent {
  @Input() ads: string[] = [];
  @Input() intervalSec = 100;

  currentAdIndex = 0;
  addSecPath: string | undefined;
  private adsSubscription: Subscription | undefined;

  ngOnInit() {
    this.addSecPath = this.ads[this.currentAdIndex];
    const adsLength = this.ads.length;

    this.adsSubscription = interval(this.intervalSec * 1000)
      .pipe(takeWhile(() => this.ads.length > 0))
      .subscribe(() => {
        this.currentAdIndex = (this.currentAdIndex + 1) % adsLength;
        this.addSecPath = this.ads[this.currentAdIndex];
      });
  }

  ngOnDestroy() {
    if (this.adsSubscription) {
      this.adsSubscription.unsubscribe();
    }
  }
}
