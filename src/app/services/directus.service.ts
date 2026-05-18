import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DirectusEvent,
  DirectusFile,
  DirectusTestimonial,
  DirectusDownload,
  DirectusResponse,
  ScoreboardEntry,
} from './directus.interfaces';
import { MOCK_TESTIMONIALS, MOCK_DOWNLOAD } from './directus-mock';

interface RuntimeConfig {
  directusUrl?: string;
  phoenixApiUrl?: string;
}

declare global {
  interface Window {
    __SYMAX_CONFIG__?: RuntimeConfig;
  }
}

const runtimeConfig: RuntimeConfig =
  typeof window !== 'undefined' ? window.__SYMAX_CONFIG__ ?? {} : {};

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private baseUrl = runtimeConfig.directusUrl || environment.directusUrl;
  private phoenixApiUrl = runtimeConfig.phoenixApiUrl || environment.phoenixApiUrl;

  constructor(private http: HttpClient) {}

  /** Fetch all events with a given status, sorted by sort then date descending */
  getEventPortfolio(status = 'published'): Observable<DirectusEvent[]> {
    const url = `${this.baseUrl}/items/event_portfolio?filter[status][_eq]=${status}&sort=sort,-date`;
    return this.http.get<DirectusResponse<DirectusEvent[]>>(url).pipe(
      map((res) => res.data),
      catchError(() => of([])),
    );
  }

  /** Fetch a single event by slug */
  getEventBySlug(slug: string): Observable<DirectusEvent | null> {
    const url = `${this.baseUrl}/items/event_portfolio?filter[slug][_eq]=${slug}&limit=1`;
    return this.http.get<DirectusResponse<DirectusEvent[]>>(url).pipe(
      map((res) => (res.data.length > 0 ? res.data[0] : null)),
      catchError(() => of(null)),
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
    return this.http.get<ScoreboardEntry[]>(url);
  }

  /** Fetch the latest published Phoenix download */
  getLatestDownload(): Observable<DirectusDownload | null> {
    const url = `${this.baseUrl}/items/phoenix_downloads?filter[status][_eq]=published&sort=-sort&limit=1&fields=*,windows_file.id,windows_file.filename_download,windows_file.filesize,macos_file.id,macos_file.filename_download,macos_file.filesize,linux_file.id,linux_file.filename_download,linux_file.filesize`;
    return this.http.get<DirectusResponse<DirectusDownload[]>>(url).pipe(
      map((res) => (res.data.length > 0 ? res.data[0] : null)),
      catchError(() => of(MOCK_DOWNLOAD)),
    );
  }

  private resolveFileId(file: string | DirectusFile | null): string | null {
    if (!file) return null;
    return typeof file === 'string' ? file : file.id;
  }

  /** Get the full asset URL for a Directus file */
  getAssetUrl(file: string | DirectusFile): string {
    const fileId = this.resolveFileId(file);
    if (!fileId) return this.baseUrl;
    return `${this.baseUrl}/assets/${fileId}`;
  }

  /** Get the full image URL for a Directus file */
  getImageUrl(file: string | DirectusFile | null): string | null {
    const fileId = this.resolveFileId(file);
    if (!fileId) return null;
    return `${this.baseUrl}/assets/${fileId}`;
  }
}
