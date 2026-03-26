import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SymaxHomeComponent } from './symax-home.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({ selector: 'app-navbar', standalone: true, template: '' })
class NavbarStub {}

@Component({ selector: 'app-footer', standalone: true, template: '' })
class FooterStub {}

describe('SymaxHomeComponent', () => {
  let component: SymaxHomeComponent;
  let fixture: ComponentFixture<SymaxHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymaxHomeComponent, RouterModule.forRoot([])],
    })
      .overrideComponent(SymaxHomeComponent, {
        remove: { imports: [NavbarComponent, FooterComponent] },
        add: { imports: [NavbarStub, FooterStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SymaxHomeComponent);
    component = fixture.componentInstance;

    // Pre-populate terminalLines so @for has stable data before first CD
    (component as any).terminalLines = (component as any).allRiders
      ? [...(component as any).allRiders]
      : [];

    // Neuter ngAfterViewInit to prevent mid-CD mutation (NG0100)
    component.ngAfterViewInit = () => {};
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('content property is defined', () => {
    expect(component.content).toBeDefined();
    expect(component.content.hero).toBeDefined();
    expect(component.content.trustBar).toBeDefined();
  });

  it('template renders hero section', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('section.hero')).toBeTruthy();
    expect(el.querySelector('.hero__headline')?.textContent).toContain('Timing infrastructure');
  });

  it('template renders trust bar section', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('section.trust')).toBeTruthy();
    expect(el.querySelector('.trust__label')?.textContent).toContain('Trusted by the best');
  });
});
