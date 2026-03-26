import { Directive, ElementRef, OnInit } from '@angular/core';
import { ScrollAnimationService } from '../services/scroll-animation.service';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit {
  constructor(private el: ElementRef, private scrollAnim: ScrollAnimationService) {}

  ngOnInit(): void {
    this.el.nativeElement.classList.add('fade-in');
    this.scrollAnim.observe(this.el.nativeElement);
  }
}
