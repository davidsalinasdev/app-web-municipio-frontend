import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';
import Hls from 'hls.js';

@Component({
  selector: 'app-television-gadc',
  templateUrl: './television-gadc.component.html',
  styleUrl: './television-gadc.component.css'
})
export class TelevisionGadcComponent implements OnInit {

  ngOnInit(): void {
    this.initializeVideoPlayer();
  }

  initializeVideoPlayer(): void {
    const videoElement = document.getElementById('video-player') as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('https://1music.hu/1music.m3u8');
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = 'https://1music.hu/1music.m3u8';
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
      });
    }
  }
}
