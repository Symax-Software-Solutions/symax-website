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
    expect(component.content.download).toBeDefined();
  });

  it('leaderboard has 5 entries', () => {
    expect(component.leaderboard).toBeDefined();
    expect(component.leaderboard.length).toBe(5);
  });

  it('template renders download section', () => {
    const el: HTMLElement = fixture.nativeElement;
    const download = el.querySelector('#download');
    expect(download).toBeTruthy();

    const cards = el.querySelectorAll('.download-card');
    expect(cards.length).toBe(3); // Windows, macOS, Linux
  });
});
