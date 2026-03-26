import { Component, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { SITE_CONTENT } from '../../content';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.less'],
})
export class TestimonialsComponent {
  content = SITE_CONTENT.testimonials;
  activeIndex = signal(0);

  private touchStartX = 0;
  private touchEndX = 0;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent): void {
    this.touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  next(): void {
    this.activeIndex.update((i) => (i + 1) % this.content.length);
  }

  prev(): void {
    this.activeIndex.update((i) => (i - 1 + this.content.length) % this.content.length);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }
}
