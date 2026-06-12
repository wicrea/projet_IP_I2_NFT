import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './app-logo.component.html',
  styleUrl: './app-logo.component.scss',
})
export class AppLogoComponent {
  @Input() link = '/home';
  @Input() compact = false;
}
