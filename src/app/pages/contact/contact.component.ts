import {
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { SITE_CONTENT } from '../../content';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less',
})
export class ContactPageComponent implements AfterViewInit, OnDestroy {
  content = SITE_CONTENT.contact;
  company = SITE_CONTENT.company;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  form = {
    name: '',
    email: '',
    company: '',
    topic: this.content.topics[0],
    message: '',
  };

  submitted = signal(false);
  copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => {
      el.nativeElement.classList.add('fade-in');
      this.scrollAnim.observe(el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.scrollAnim.disconnect();
  }

  submitForm(): void {
    const subject = encodeURIComponent(
      `[${this.form.topic}] ${this.form.name || 'New inquiry'}`
    );
    const lines = [
      `Name: ${this.form.name}`,
      `Email: ${this.form.email}`,
    ];
    if (this.form.company.trim()) {
      lines.push(`Company: ${this.form.company}`);
    }
    lines.push(`Topic: ${this.form.topic}`, '', this.form.message);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${this.content.email}?subject=${subject}&body=${body}`;
    this.submitted.set(true);
  }

  copyEmail(): void {
    const value = this.content.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    this.copied.set(true);
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(false), 1800);
  }
}
