import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  errorCode = 404;
  errorTitle = 'PAGE NOT FOUND';
  currentTime = new Date();
  
  helpfulLinks = [
    { label: '🏠 Back to Home', path: '/home' },
    { label: '🔗 Browse Links', path: '/links' },
    { label: '📝 Sign Guestbook', path: '/guestbook' },
    { label: '👋 About Me', path: '/about' }
  ];

  constructor() {
    // 随机显示一个有趣的错误消息
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  getRandomErrorEmoji(): string {
    const emojis = ['😵', '🤯', '😱', '🙈', '🫣', '😵‍💫', '💥', '🔥'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  getFunnyMessage(): string {
    const messages = [
      'Oops! The gremlins stole this page!',
      'Uh-oh! This page is in the void now!',
      'Whoopsie! The page went on vacation!',
      'Yikes! This page got lost in cyberspace!',
      'Oh no! The page got deleted by accident!',
      'Whoa! This page is M.I.A.!',
      'Dang! The page got caught in the web!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}
