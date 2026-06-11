import { Injectable } from '@angular/core';
import { Episode, PricingPlan, Travel, User } from '../models/travel.models';
import { mockEpisodes, mockPricingPlans, mockTravels, mockUser } from '../mock-data/travel.mock';

@Injectable({
  providedIn: 'root',
})
export class MockTravelService {
  getUser(): User {
    return mockUser;
  }

  getTravels(): Travel[] {
    return mockTravels;
  }

  getFeaturedTravel(): Travel {
    return mockTravels.find((travel) => travel.featured) ?? mockTravels[0];
  }

  getTravel(id: string): Travel | undefined {
    return mockTravels.find((travel) => travel.id === id);
  }

  getEpisodes(): Episode[] {
    return mockEpisodes;
  }

  getEpisode(id: string): Episode | undefined {
    return mockEpisodes.find((episode) => episode.id === id);
  }

  getEpisodesForTravel(travelId: string): Episode[] {
    return mockEpisodes.filter((episode) => episode.travelId === travelId);
  }

  getContinueWatchingEpisode(): Episode {
    return mockEpisodes.find((episode) => episode.progress > 0 && episode.progress < 100) ?? mockEpisodes[0];
  }

  getPricingPlans(): PricingPlan[] {
    return mockPricingPlans;
  }
}
