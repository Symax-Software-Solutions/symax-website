import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollAnimationService } from './services/scroll-animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private scrollAnim: ScrollAnimationService) {}

  ngOnInit(): void {
    this.scrollAnim.init();
  }
}
