import { Component } from '@angular/core';
import { SITE_CONTENT } from '../../content';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.less'],
})
export class HeroComponent {
  content = SITE_CONTENT.hero;
  company = SITE_CONTENT.company;

  scrollTo(anchor: string): void {
    const el = document.getElementById(anchor);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
