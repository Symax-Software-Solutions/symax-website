import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { SITE_CONTENT } from '../../content';

@Component({
  selector: 'app-symax-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './symax-home.component.html',
  styleUrl: './symax-home.component.less',
})
export class SymaxHomeComponent implements AfterViewInit, OnDestroy {
  content = SITE_CONTENT.symaxHome;
  email = SITE_CONTENT.company.email;

  @ViewChildren('animEl') animEls!: QueryList<ElementRef>;

  private terminalInterval: ReturnType<typeof setInterval> | null = null;
  terminalLines: { rank: string; bib: string; name: string; nation: string; time: string; gap: string; status: string }[] = [];

  private allRiders = [
    { rank: '1', bib: '101', name: 'T. MÜLLER', nation: 'GER', time: '22.847', gap: '—', status: 'finished' },
    { rank: '2', bib: '45', name: 'L. DUBOIS', nation: 'FRA', time: '23.012', gap: '+0.165', status: 'finished' },
    { rank: '3', bib: '78', name: 'M. VAN DIJK', nation: 'NED', time: '23.198', gap: '+0.351', status: 'finished' },
    { rank: '4', bib: '23', name: 'S. TANAKA', nation: 'JPN', time: '23.456', gap: '+0.609', status: 'finished' },
    { rank: '5', bib: '92', name: 'R. SANTOS', nation: 'BRA', time: '23.611', gap: '+0.764', status: 'finished' },
    { rank: '—', bib: '17', name: 'A. ROSSI', nation: 'ITA', time: '—', gap: '—', status: 'live' },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.animEls.forEach((el) => {
      el.nativeElement.classList.add('fade-in');
      this.scrollAnim.observe(el.nativeElement);
    });
    this.initTerminal();
  }

  ngOnDestroy(): void {
    if (this.terminalInterval) {
      clearInterval(this.terminalInterval);
    }
    this.scrollAnim.disconnect();
  }

  private initTerminal(): void {
    this.terminalLines = [...this.allRiders];

    this.terminalInterval = setInterval(() => {
      const liveIdx = this.terminalLines.findIndex(l => l.status === 'live');
      if (liveIdx !== -1) {
        const randomTime = (23 + Math.random() * 0.8).toFixed(3);
        const gap = '+' + (parseFloat(randomTime) - 22.847).toFixed(3);
        this.terminalLines[liveIdx] = {
          ...this.terminalLines[liveIdx],
          rank: String(liveIdx + 1),
          time: randomTime,
          gap: gap,
          status: 'finished',
        };
      }

      const names = ['K. JENSEN', 'P. SCHMIDT', 'C. WRIGHT', 'D. SILVA', 'F. KOWALSKI', 'J. ERIKSSON'];
      const nations = ['DEN', 'AUT', 'GBR', 'POR', 'POL', 'SWE'];
      const rIdx = Math.floor(Math.random() * names.length);

      this.terminalLines = [
        ...this.terminalLines.filter(l => l.status === 'finished').slice(0, 5),
        {
          rank: '—',
          bib: String(Math.floor(Math.random() * 90) + 10),
          name: names[rIdx],
          nation: nations[rIdx],
          time: '—',
          gap: '—',
          status: 'live',
        },
      ];
    }, 3000);
  }
}
