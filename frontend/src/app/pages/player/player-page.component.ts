import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockTravelService } from '../../services/mock-travel.service';
import { AppLogoComponent } from '../../shared/app-logo/app-logo.component';

@Component({
  selector: 'app-player-page',
  imports: [AppLogoComponent],
  templateUrl: './player-page.component.html',
})
export class PlayerPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly travelService = inject(MockTravelService);
  private readonly platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;

  protected readonly episode =
    this.travelService.getEpisode(this.route.snapshot.paramMap.get('id') ?? '1') ?? this.travelService.getEpisode('1')!;

  protected readonly travel = this.travelService.getTravel(this.episode.travelId) ?? this.travelService.getFeaturedTravel();
  protected readonly playing = signal(true);
  protected readonly progress = signal(this.episode.progress > 0 && this.episode.progress < 100 ? this.episode.progress : 8);
  protected readonly stillImage = `url(${this.episode.videoStill})`;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intervalId = setInterval(() => {
      if (!this.playing()) {
        return;
      }

      this.progress.update((current) => Math.min(current + 1.4, 100));
      if (this.progress() >= 100) {
        this.playing.set(false);
      }
    }, 900);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  protected togglePlayback(): void {
    if (this.progress() >= 100) {
      this.progress.set(0);
    }

    this.playing.update((current) => !current);
  }
}
