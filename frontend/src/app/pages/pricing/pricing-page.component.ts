import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockTravelService } from '../../services/mock-travel.service';
import { AppLogoComponent } from '../../shared/app-logo/app-logo.component';

@Component({
  selector: 'app-pricing-page',
  imports: [RouterLink, AppLogoComponent],
  templateUrl: './pricing-page.component.html',
})
export class PricingPageComponent {
  private readonly travelService = inject(MockTravelService);

  protected readonly plans = this.travelService.getPricingPlans();
}
