import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { DirectusService } from '../../../services/directus.service';
import { DirectusEvent, ScoreboardEntry } from '../../../services/directus.interfaces';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, DatePipe],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.less',
})
export class EventDetailComponent implements OnInit {
  event = signal<DirectusEvent | null>(null);
  loading = signal(true);
  notFound = signal(false);

  scoreboard = signal<ScoreboardEntry[]>([]);
  scoreboardLoading = signal(false);
  scoreboardError = signal(false);

  constructor(
    private route: ActivatedRoute,
    private directus: DirectusService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.directus.getEventBySlug(slug).subscribe((data) => {
      if (data) {
        this.event.set(data);
        if (data.show_scoreboard && data.phoenix_event_id) {
          this.loadScoreboard(data.phoenix_event_id, data.phoenix_api_url);
        }
      } else {
        this.notFound.set(true);
      }
      this.loading.set(false);
    });
  }

  private loadScoreboard(eventId: string, apiUrl?: string | null): void {
    this.scoreboardLoading.set(true);
    this.directus.getScoreboard(eventId, apiUrl).subscribe({
      next: (data) => {
        this.scoreboard.set(data);
        this.scoreboardLoading.set(false);
      },
      error: () => {
        this.scoreboardError.set(true);
        this.scoreboardLoading.set(false);
      },
    });
  }
}
