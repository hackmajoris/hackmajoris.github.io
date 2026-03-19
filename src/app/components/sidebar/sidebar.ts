import { Component, inject, effect, ElementRef, viewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDataService } from '../../services/cv-data';
import { ThemeService } from '../../services/theme';
import { GifReader, GifBinary } from 'omggif';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy {
  private cvDataService = inject(CvDataService);
  private themeService = inject(ThemeService);

  cv = this.cvDataService.cv;
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('photoCanvas');

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Watch for theme changes and toggle count together
    effect(() => {
      const theme = this.themeService.theme();
      const toggleCount = this.themeService.toggled();
      const src = theme === 'dark' ? 'assets/dark.gif' : 'assets/light.gif';

      if (theme === 'dark' && toggleCount === 0) {
        // Dark theme on initial load - show static frame from light.gif
        this.showStaticFrame('assets/light.gif');
      } else {
        // Light theme or theme has been toggled - play animation
        this.playGifOnce(src);
      }
    });
  }

  private cancelPending(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private async showStaticFrame(src: string): Promise<void> {
    this.cancelPending();

    const res = await fetch(src);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const reader = new GifReader(bytes as unknown as GifBinary);

    const { width: gifW, height: gifH } = reader;

    // Fixed square canvas — GIF is scaled to cover, centered
    const SIZE = 220;
    const el = this.canvas().nativeElement;
    el.width = SIZE;
    el.height = SIZE;
    const ctx = el.getContext('2d')!;

    // Offscreen canvas to decode raw GIF frames at native size
    const offscreen = document.createElement('canvas');
    offscreen.width = gifW;
    offscreen.height = gifH;
    const offCtx = offscreen.getContext('2d')!;
    const imageData = offCtx.createImageData(gifW, gifH);

    // Scale to exactly cover the circle — no gaps
    const scale = Math.max(SIZE / gifW, SIZE / gifH);
    const drawW = gifW * scale;
    const drawH = gifH * scale;
    const offsetX = (SIZE - drawW) / 2;
    const offsetY = (SIZE - drawH) * 0.25; // shift up to show face

    const bgColor =
      getComputedStyle(document.documentElement).getPropertyValue('--bg-sidebar').trim() ||
      '#16171a';

    // Render frame 0 first, then frame 1 on top (GIF frames can be incremental)
    reader.decodeAndBlitFrameRGBA(0, imageData.data as unknown as number[]);
    offCtx.putImageData(imageData, 0, 0);

    // Now render frame 1 on top
    reader.decodeAndBlitFrameRGBA(1, imageData.data as unknown as number[]);
    offCtx.putImageData(imageData, 0, 0);

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Clip to circle so corners are transparent
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = bgColor || 'transparent';
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.drawImage(offscreen, offsetX, offsetY, drawW, drawH);

    ctx.restore();
  }

  private async playGifOnce(src: string): Promise<void> {
    this.cancelPending();

    const res = await fetch(src);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const reader = new GifReader(bytes as unknown as GifBinary);

    const frameCount = reader.numFrames();
    const { width: gifW, height: gifH } = reader;

    // Fixed square canvas — GIF is scaled to cover, centered
    const SIZE = 220;
    const el = this.canvas().nativeElement;
    el.width = SIZE;
    el.height = SIZE;
    const ctx = el.getContext('2d')!;

    // Offscreen canvas to decode raw GIF frames at native size
    const offscreen = document.createElement('canvas');
    offscreen.width = gifW;
    offscreen.height = gifH;
    const offCtx = offscreen.getContext('2d')!;
    const imageData = offCtx.createImageData(gifW, gifH);

    // Scale to exactly cover the circle — no gaps
    const scale = Math.max(SIZE / gifW, SIZE / gifH);
    const drawW = gifW * scale;
    const drawH = gifH * scale;
    const offsetX = (SIZE - drawW) / 2;
    const offsetY = (SIZE - drawH) * 0.25; // shift up to show face

    let frame = 0;

    const bgColor =
      getComputedStyle(document.documentElement).getPropertyValue('--bg-sidebar').trim() ||
      '#16171a';

    const renderFrame = () => {
      reader.decodeAndBlitFrameRGBA(frame, imageData.data as unknown as number[]);
      offCtx.putImageData(imageData, 0, 0);

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Clip to circle so corners are transparent
      ctx.save();
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = bgColor || 'transparent';
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.drawImage(offscreen, offsetX, offsetY, drawW, drawH);

      ctx.restore();

      const info = reader.frameInfo(frame);
      frame++;

      if (frame < frameCount) {
        const delay = (info.delay || 10) * 10;
        this.timeoutId = setTimeout(renderFrame, delay);
      }
      // last frame: stop — do not loop
    };

    renderFrame();
  }

  ngOnDestroy(): void {
    this.cancelPending();
  }
}
