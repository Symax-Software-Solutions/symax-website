import { Component, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SITE_CONTENT } from '../../content';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  content = SITE_CONTENT.contact;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => this.scrollAnim.observe(el.nativeElement));
  }

  form = {
    name: '',
    email: '',
    message: '',
  };

  submitForm(): void {
    const subject = encodeURIComponent(`Inquiry from ${this.form.name}`);
    const body = encodeURIComponent(
      `Name: ${this.form.name}\nEmail: ${this.form.email}\n\n${this.form.message}`
    );
    window.location.href = `mailto:${this.content.email}?subject=${subject}&body=${body}`;
  }
}
