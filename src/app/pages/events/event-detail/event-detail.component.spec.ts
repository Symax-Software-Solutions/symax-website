import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventDetailComponent } from './event-detail.component';
import { DirectusService } from '../../../services/directus.service';
import { of } from 'rxjs';
import { MOCK_EVENTS, MOCK_SCOREBOARD } from '../../../services/directus-mock';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let directusServiceSpy: jasmine.SpyObj<DirectusService>;

  function setup(slug: string) {
    directusServiceSpy = jasmine.createSpyObj('DirectusService', [
      'getEventBySlug',
      'getScoreboard',
      'getImageUrl',
    ]);
    directusServiceSpy.getImageUrl.and.returnValue(null);

    const found = MOCK_EVENTS.find((e) => e.slug === slug) ?? null;
    directusServiceSpy.getEventBySlug.and.returnValue(of(found));
    directusServiceSpy.getScoreboard.and.returnValue(of(MOCK_SCOREBOARD));

    TestBed.configureTestingModule({
      imports: [EventDetailComponent, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [
        { provide: DirectusService, useValue: directusServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => slug } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    setup('pumptrack-worlds-2024');
    expect(component).toBeTruthy();
  });

  it('should display event title in hero', () => {
    setup('pumptrack-worlds-2024');
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('[data-testid="event-detail-title"]');
    expect(title?.textContent).toContain('Pumptrack World Championships 2024');
  });

  it('should show scoreboard when show_scoreboard is true', () => {
    setup('pumptrack-worlds-2024'); // has show_scoreboard: true
    const el: HTMLElement = fixture.nativeElement;
    const scoreboard = el.querySelector('[data-testid="scoreboard-section"]');
    expect(scoreboard).toBeTruthy();
  });

  it('should NOT show scoreboard when show_scoreboard is false', () => {
    setup('austria-qualifier-2026'); // has show_scoreboard: false
    const el: HTMLElement = fixture.nativeElement;
    const scoreboard = el.querySelector('[data-testid="scoreboard-section"]');
    expect(scoreboard).toBeFalsy();
  });

  it('should show 404 state for unknown slug', () => {
    setup('nonexistent-event');
    const el: HTMLElement = fixture.nativeElement;
    const notFound = el.querySelector('[data-testid="event-not-found"]');
    expect(notFound).toBeTruthy();
  });

  it('should display powered by Phoenix label', () => {
    setup('pumptrack-worlds-2024');
    const el: HTMLElement = fixture.nativeElement;
    const powered = el.querySelector('[data-testid="powered-by-phoenix"]');
    expect(powered?.textContent).toContain('Phoenix');
  });
});
