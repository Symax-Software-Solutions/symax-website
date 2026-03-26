import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scrolled signal starts as false', () => {
    expect(component.scrolled()).toBeFalse();
  });

  it('solutionsOpen signal starts as false', () => {
    expect(component.solutionsOpen()).toBeFalse();
  });

  it('toggleSolutions() toggles the signal', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    expect(component.solutionsOpen()).toBeFalse();

    component.toggleSolutions(event);
    expect(component.solutionsOpen()).toBeTrue();

    component.toggleSolutions(event);
    expect(component.solutionsOpen()).toBeFalse();
  });

  it('closeMobile() sets mobileOpen to false', () => {
    component.toggleMobile(); // open it first
    expect(component.mobileOpen()).toBeTrue();

    component.closeMobile();
    expect(component.mobileOpen()).toBeFalse();
  });

  it('dropdown has "open" class when solutionsOpen is true', () => {
    const event = new MouseEvent('click');
    component.toggleSolutions(event);
    fixture.detectChanges();

    const dropdown = fixture.nativeElement.querySelector('.navbar__dropdown');
    expect(dropdown.classList.contains('open')).toBeTrue();
  });
});
