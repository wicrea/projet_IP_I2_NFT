import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppLogoComponent } from '../../shared/app-logo/app-logo.component';

@Component({
  selector: 'app-upload-page',
  imports: [RouterLink, AppLogoComponent],
  templateUrl: './upload-page.component.html',
})
export class UploadPageComponent {
  protected readonly selectedCount = signal(0);

  protected selectPhotos(): void {
    this.selectedCount.set(127);
  }
}
