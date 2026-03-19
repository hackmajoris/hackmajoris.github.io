import { Component, inject } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { MainContent } from './components/main-content/main-content';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { CvDataService } from './services/cv-data';

@Component({
  selector: 'app-root',
  imports: [Sidebar, MainContent, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  cv = inject(CvDataService).cv;
}
