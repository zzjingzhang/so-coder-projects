import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  currentYear = new Date().getFullYear();
  
  skills = [
    { name: 'HTML 4.0', level: 95, icon: '📄' },
    { name: 'CSS 2', level: 90, icon: '🎨' },
    { name: 'JavaScript', level: 85, icon: '⚡' },
    { name: 'Flash MX', level: 75, icon: '🎬' },
    { name: 'Photoshop 6', level: 80, icon: '🖼️' },
    { name: 'Dreamweaver', level: 88, icon: '🌐' }
  ];

  interests = [
    '🎮 Playing RuneScape',
    '🎵 Collecting MP3s',
    '🖼️ Making pixel art',
    '🌐 Browsing GeoCities',
    '💬 Chatting on AIM',
    '📧 Using Hotmail',
    '🎬 Watching Flash animations',
    '🎸 Listening to nu-metal'
  ];

  favorites = {
    music: ['Linkin Park', 'Limp Bizkit', 'Korn', 'Eminem', 'NSYNC'],
    movies: ['The Matrix', 'Fight Club', 'American Beauty', 'Scream', 'Blair Witch'],
    games: ['Diablo II', 'StarCraft', 'Counter-Strike', 'The Sims', 'Age of Empires II'],
    websites: ['eBaums World', 'Newgrounds', 'Homestar Runner', 'Fark', 'Something Awful']
  };

  guestbookCount = 156;
  hitCount = 42069;
  onlineSince = 2001;
}
