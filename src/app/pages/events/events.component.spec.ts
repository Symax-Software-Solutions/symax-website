import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventsComponent } from './events.component';
import { DirectusService } from '../../services/directus.service';
import { of } from 'rxjs';
import { MOCK_EVENTS } from '../../services/directus-mock';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let directusServiceSpy: jasmine.SpyObj<DirectusService>;

  beforeEach(async () => {
    directusServiceSpy = jasmine.createSpyObj('DirectusService', ['getEventPortfolio']);
    directusServiceSpy.getEventPortfolio.and.returnValue(of(MOCK_EVENTS));

    await TestBed.configureTestingModule({
      imports: [EventsComponent, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{ provide: DirectusService, useValue: directusServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', () => {
    expect(component.loading()).toBeTrue();
    const el: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    // After detectChanges, loading should be false because we returned data synchronously
    expect(component.loading()).toBeFalse();
  });

  it('should render event cards after loading', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('[data-testid="event-card"]');
    expect(cards.length).toBe(MOCK_EVENTS.length);
  });

  it('should display event titles', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const titles = el.querySelectorAll('[data-testid="event-title"]');
    expect(titles.length).toBeGreaterThan(0);
    expect(titles[0].textContent).toContain('Pumptrack World Championships 2024');
  });

  it('should show empty state when no events', () => {
    directusServiceSpy.getEventPortfolio.and.returnValue(of([]));
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const empty = el.querySelector('[data-testid="events-empty"]');
    expect(empty).toBeTruthy();
  });
});
