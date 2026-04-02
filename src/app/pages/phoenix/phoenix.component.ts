import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONTENT } from '../../content';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DirectusService } from '../../services/directus.service';
import { DirectusDownload, DirectusFile } from '../../services/directus.interfaces';

interface PlatformDownload {
  os: string;
  icon: string;
  available: boolean;
  filename: string | null;
  url: string | null;
  size: string | null;
}

@Component({
  selector: 'app-phoenix',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './phoenix.component.html',
  styleUrl: './phoenix.component.less',
})
export class PhoenixComponent implements OnInit {
  content = SITE_CONTENT.phoenix;
  company = SITE_CONTENT.company;

  leaderboard = [
    { pos: 1, name: 'T. Hrastnik', time: '00:41.832', gap: '—' },
    { pos: 2, name: 'M. Vossen', time: '00:42.107', gap: '+0.275' },
    { pos: 3, name: 'R. Daudet', time: '00:42.388', gap: '+0.556' },
    { pos: 4, name: 'A. Walker', time: '00:42.901', gap: '+1.069' },
    { pos: 5, name: 'P. Ropero', time: '00:43.214', gap: '+1.382' },
  ];

  downloadVersion = this.content.download.version;
  downloadReleaseDate = this.content.download.releaseDate;
  downloadReleaseNotes = this.content.download.releaseNotes;
  downloadPlatforms: PlatformDownload[] = this.content.download.platforms.map((p) => ({
    os: p.os,
    icon: p.icon,
    available: p.available,
    filename: p.filename,
    url: p.url,
    size: p.size,
  }));

  constructor(private directus: DirectusService) {}

  ngOnInit(): void {
    this.directus.getLatestDownload().subscribe((dl) => {
      if (!dl) return;
      this.applyDownload(dl);
    });
  }

  private applyDownload(dl: DirectusDownload): void {
    this.downloadVersion = dl.version;
    this.downloadReleaseDate = this.formatDate(dl.release_date);
    this.downloadReleaseNotes = dl.release_notes;

    this.downloadPlatforms = [
      this.buildPlatform('Windows', '🪟', dl.windows_file),
      this.buildPlatform('macOS', '🍎', dl.macos_file),
      this.buildPlatform('Linux', '🐧', dl.linux_file),
    ];
  }

  private buildPlatform(
    os: string,
    icon: string,
    file: string | DirectusFile | null,
  ): PlatformDownload {
    if (!file) {
      return { os, icon, available: false, filename: null, url: null, size: null };
    }
    const fileObj = typeof file === 'string' ? null : file;
    const fileId = typeof file === 'string' ? file : file.id;
    return {
      os,
      icon,
      available: true,
      filename: fileObj?.filename_download ?? `Phoenix-${os}.exe`,
      url: this.directus.getAssetUrl(fileId) + '?download',
      size: fileObj?.filesize ? this.formatSize(Number(fileObj.filesize)) : null,
    };
  }

  private formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `~${Math.round(bytes / 1024)} KB`;
    return `~${Math.round(bytes / (1024 * 1024))} MB`;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
