import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { PhoenixComponent } from './phoenix.component';

describe('PhoenixComponent', () => {
  let component: PhoenixComponent;
  let fixture: ComponentFixture<PhoenixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoenixComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoenixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('content property is defined', () => {
    expect(component.content).toBeDefined();
    expect(component.content.hero).toBeDefined();
  });

  it('leaderboard has 5 entries', () => {
    expect(component.leaderboard).toBeDefined();
    expect(component.leaderboard.length).toBe(5);
  });

  it('hero links to phoenixtiming.com', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('.phoenix-hero__actions a[href*="phoenixtiming.com"]');
    expect(link).toBeTruthy();
  });
});
