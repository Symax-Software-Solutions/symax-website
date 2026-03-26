import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DirectusEvent,
  DirectusTestimonial,
  DirectusResponse,
  ScoreboardEntry,
} from './directus.interfaces';
import { MOCK_EVENTS, MOCK_TESTIMONIALS, MOCK_SCOREBOARD } from './directus-mock';

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private baseUrl = environment.directusUrl;
  private phoenixApiUrl = environment.phoenixApiUrl;

  constructor(private http: HttpClient) {}

  /** Fetch all events with a given status, sorted by sort then date descending */
  getEventPortfolio(status = 'published'): Observable<DirectusEvent[]> {
    const url = `${this.baseUrl}/items/event_portfolio?filter[status][_eq]=${status}&sort=sort,-date`;
    return this.http.get<DirectusResponse<DirectusEvent[]>>(url).pipe(
      map((res) => res.data),
      catchError(() => of(MOCK_EVENTS.filter((e) => e.status === status))),
    );
  }

  /** Fetch a single event by slug */
  getEventBySlug(slug: string): Observable<DirectusEvent | null> {
    const url = `${this.baseUrl}/items/event_portfolio?filter[slug][_eq]=${slug}&limit=1`;
    return this.http.get<DirectusResponse<DirectusEvent[]>>(url).pipe(
      map((res) => (res.data.length > 0 ? res.data[0] : null)),
      catchError(() => {
        const found = MOCK_EVENTS.find((e) => e.slug === slug) ?? null;
        return of(found);
      }),
    );
  }

  /** Fetch published testimonials sorted by sort */
  getTestimonials(): Observable<DirectusTestimonial[]> {
    const url = `${this.baseUrl}/items/testimonials?filter[status][_eq]=published&sort=sort`;
    return this.http.get<DirectusResponse<DirectusTestimonial[]>>(url).pipe(
      map((res) => res.data),
      catchError(() => of(MOCK_TESTIMONIALS)),
    );
  }

  /** Fetch scoreboard data from Phoenix API */
  getScoreboard(eventId: string, apiUrl?: string | null): Observable<ScoreboardEntry[]> {
    const base = apiUrl || this.phoenixApiUrl;
    const url = `${base}/v1/events?event_id=${eventId}`;
    return this.http.get<ScoreboardEntry[]>(url).pipe(
      catchError(() => of(MOCK_SCOREBOARD)),
    );
  }

  /** Get the full image URL for a Directus file */
  getImageUrl(fileId: string | null): string | null {
    if (!fileId) return null;
    return `${this.baseUrl}/assets/${fileId}`;
  }
}
