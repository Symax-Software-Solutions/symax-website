import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DirectusService } from './directus.service';
import { MOCK_EVENTS, MOCK_TESTIMONIALS, MOCK_SCOREBOARD } from './directus-mock';

describe('DirectusService', () => {
  let service: DirectusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectusService],
    });
    service = TestBed.inject(DirectusService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEventPortfolio', () => {
    it('should return events from Directus API', () => {
      const mockResponse = { data: [MOCK_EVENTS[0]] };

      service.getEventPortfolio().subscribe((events) => {
        expect(events.length).toBe(1);
        expect(events[0].slug).toBe('pumptrack-worlds-2024');
      });

      const req = httpMock.expectOne((r) => r.url.includes('/items/event_portfolio'));
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fall back to mock data on error', () => {
      service.getEventPortfolio().subscribe((events) => {
        expect(events.length).toBeGreaterThan(0);
        expect(events[0].title).toBeTruthy();
      });

      const req = httpMock.expectOne((r) => r.url.includes('/items/event_portfolio'));
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getEventBySlug', () => {
    it('should return a single event by slug', () => {
      const mockResponse = { data: [MOCK_EVENTS[0]] };

      service.getEventBySlug('pumptrack-worlds-2024').subscribe((event) => {
        expect(event).toBeTruthy();
        expect(event!.slug).toBe('pumptrack-worlds-2024');
      });

      const req = httpMock.expectOne((r) => r.url.includes('slug'));
      req.flush(mockResponse);
    });

    it('should return null when no event found', () => {
      const mockResponse = { data: [] };

      service.getEventBySlug('nonexistent').subscribe((event) => {
        expect(event).toBeNull();
      });

      const req = httpMock.expectOne((r) => r.url.includes('slug'));
      req.flush(mockResponse);
    });

    it('should fall back to mock data on error', () => {
      service.getEventBySlug('pumptrack-worlds-2024').subscribe((event) => {
        expect(event).toBeTruthy();
        expect(event!.slug).toBe('pumptrack-worlds-2024');
      });

      const req = httpMock.expectOne((r) => r.url.includes('slug'));
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getTestimonials', () => {
    it('should return testimonials from API', () => {
      const mockResponse = { data: MOCK_TESTIMONIALS };

      service.getTestimonials().subscribe((testimonials) => {
        expect(testimonials.length).toBe(3);
      });

      const req = httpMock.expectOne((r) => r.url.includes('/items/testimonials'));
      req.flush(mockResponse);
    });

    it('should fall back to mock data on error', () => {
      service.getTestimonials().subscribe((testimonials) => {
        expect(testimonials.length).toBe(MOCK_TESTIMONIALS.length);
      });

      const req = httpMock.expectOne((r) => r.url.includes('/items/testimonials'));
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getScoreboard', () => {
    it('should fall back to mock scoreboard on error', () => {
      service.getScoreboard('test-event').subscribe((data) => {
        expect(data.length).toBe(MOCK_SCOREBOARD.length);
        expect(data[0].name).toBe('T. Hrastnik');
      });

      const req = httpMock.expectOne((r) => r.url.includes('/v1/events'));
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getImageUrl', () => {
    it('should return a full URL for a file ID', () => {
      const url = service.getImageUrl('abc-123');
      expect(url).toContain('/assets/abc-123');
    });

    it('should return null for null input', () => {
      const url = service.getImageUrl(null);
      expect(url).toBeNull();
    });
  });
});
