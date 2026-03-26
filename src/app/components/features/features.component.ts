import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SITE_CONTENT } from '../../content';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  content = SITE_CONTENT.features;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }
}
