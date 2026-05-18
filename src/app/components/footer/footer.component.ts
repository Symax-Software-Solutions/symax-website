import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONTENT } from '../../content';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent {
  content = SITE_CONTENT.company;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
