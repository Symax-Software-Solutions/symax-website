import {
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);
  solutionsOpen = signal(false);

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.navbar__dropdown-wrap')) {
      this.solutionsOpen.set(false);
    }
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleSolutions(e: MouseEvent): void {
    e.stopPropagation();
    this.solutionsOpen.update((v) => !v);
  }

  navigateTo(path: string): void {
    this.closeMobile();
    this.solutionsOpen.set(false);
    this.router.navigate([path]);
  }

  scrollToContact(): void {
    this.closeMobile();
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment: 'contact' });
    }
  }
}
