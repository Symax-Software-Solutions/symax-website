import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private observer!: IntersectionObserver;

  init(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
  }

  observe(el: Element): void {
    if (!this.observer) this.init();
    this.observer.observe(el);
  }

  disconnect(): void {
    this.observer?.disconnect();
  }
}
