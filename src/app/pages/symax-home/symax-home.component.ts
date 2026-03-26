import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { SITE_CONTENT } from '../../content';

@Component({
  selector: 'app-symax-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './symax-home.component.html',
  styleUrl: './symax-home.component.scss',
})
export class SymaxHomeComponent implements AfterViewInit {
  content = SITE_CONTENT.symaxHome;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }
}
