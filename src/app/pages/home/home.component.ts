import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProductsComponent } from '../../components/products/products.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';
import { PartnersComponent } from '../../components/partners/partners.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ProductsComponent,
    FeaturesComponent,
    PortfolioComponent,
    PartnersComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-products></app-products>
      <app-features></app-features>
      <app-portfolio></app-portfolio>
      <app-partners></app-partners>
      <app-testimonials></app-testimonials>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main { display: block; }
  `],
})
export class HomeComponent {}
