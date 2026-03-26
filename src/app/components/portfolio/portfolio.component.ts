import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE_CONTENT } from '../../content';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  content = SITE_CONTENT.portfolio;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }
}
