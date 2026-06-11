import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockTravelService } from '../../services/mock-travel.service';
import { AppLogoComponent } from '../../shared/app-logo/app-logo.component';

@Component({
  selector: 'app-episode-detail-page',
  imports: [RouterLink, AppLogoComponent],
  templateUrl: './episode-detail-page.component.html',
})
export class EpisodeDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly travelService = inject(MockTravelService);

  protected readonly episode =
    this.travelService.getEpisode(this.route.snapshot.paramMap.get('id') ?? '1') ?? this.travelService.getEpisode('1')!;

  protected readonly travel = this.travelService.getTravel(this.episode.travelId) ?? this.travelService.getFeaturedTravel();
  protected readonly coverImage = `url(${this.episode.coverImage})`;
}
