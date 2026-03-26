import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE_CONTENT } from '../../content';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  content = SITE_CONTENT.products;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }
}
