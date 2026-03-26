import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONTENT } from '../../content';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-phoenix',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './phoenix.component.html',
  styleUrl: './phoenix.component.scss',
})
export class PhoenixComponent {
  content = SITE_CONTENT.phoenix;
  company = SITE_CONTENT.company;

  leaderboard = [
    { pos: 1, name: 'T. Hrastnik', time: '00:41.832', gap: '—' },
    { pos: 2, name: 'M. Vossen', time: '00:42.107', gap: '+0.275' },
    { pos: 3, name: 'R. Daudet', time: '00:42.388', gap: '+0.556' },
    { pos: 4, name: 'A. Walker', time: '00:42.901', gap: '+1.069' },
    { pos: 5, name: 'P. Ropero', time: '00:43.214', gap: '+1.382' },
  ];
}
