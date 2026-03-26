import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DirectusService } from '../../services/directus.service';
import { DirectusEvent } from '../../services/directus.interfaces';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events = signal<DirectusEvent[]>([]);
  loading = signal(true);

  constructor(private directus: DirectusService) {}

  ngOnInit(): void {
    this.directus.getEventPortfolio().subscribe((data) => {
      this.events.set(data);
      this.loading.set(false);
    });
  }
}
