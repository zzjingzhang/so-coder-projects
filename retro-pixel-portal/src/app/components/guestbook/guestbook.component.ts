import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GuestbookEntry } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guestbook',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule
  ],
  templateUrl: './guestbook.component.html',
  styleUrl: './guestbook.component.css'
})
export class GuestbookComponent implements OnInit {
  entries: GuestbookEntry[] = [];
  
  // 表单数据
  formData = {
    name: '',
    email: '',
    website: '',
    message: ''
  };
  
  submitting = false;
  submitSuccess = false;
  entryCount = 156;

  ngOnInit(): void {
    // 初始化一些示例留言
    this.entries = [
      {
        id: 156,
        name: 'CoolDude2001',
        email: 'cooldude@hotmail.com',
        message: 'Welcome to my guestbook! Feel free to leave a message. Don\'t forget to check out my links page too! ★',
        timestamp: new Date('2001-04-20T14:30:00'),
        website: 'http://www.geocities.com/cooldude2001'
      },
      {
        id: 155,
        name: 'xX_Angel_Xx',
        email: 'angel_girl@aol.com',
        message: 'Love your site! The retro style is so cool. Added you to my links page! ^_^',
        timestamp: new Date('2001-04-15T09:15:00'),
        website: 'http://www.angelfire.com/angel'
      },
      {
        id: 154,
        name: 'WebMaster_Mike',
        email: 'mike@geocities.com',
        message: 'Hey, nice site! Love all the retro links. Just wanted to say keep up the good work! Check out my site too if you get a chance.',
        timestamp: new Date('2001-04-10T19:45:00')
      },
      {
        id: 153,
        name: 'PixelPrincess',
        message: 'OMG I love your website!!! The pixel art is so cute!! Added you to my favorites! ♥♥♥',
        timestamp: new Date('2001-04-08T11:20:00'),
        website: 'http://www.tripod.com/pixelprincess'
      },
      {
        id: 152,
        name: 'GameMaster99',
        email: 'gamemaster@hotmail.com',
        message: 'Dude, your links page is awesome! Found so many cool sites from here. Neopets represent! 🎮',
        timestamp: new Date('2001-04-05T16:00:00')
      },
      {
        id: 151,
        name: 'DarkKnight',
        message: 'Nice site you got here. The music section is great. LimeWire forever! 🎵',
        timestamp: new Date('2001-04-01T22:30:00'),
        website: 'http://www.geocities.com/darkknight'
      }
    ];
  }

  submitEntry(): void {
    if (!this.formData.name.trim() || !this.formData.message.trim()) {
      alert('Please fill in your name and message!');
      return;
    }

    this.submitting = true;

    // 模拟提交延迟
    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: this.entryCount + 1,
        name: this.formData.name,
        email: this.formData.email || undefined,
        message: this.formData.message,
        timestamp: new Date(),
        website: this.formData.website || undefined
      };

      this.entries.unshift(newEntry);
      this.entryCount++;
      
      // 重置表单
      this.formData = {
        name: '',
        email: '',
        website: '',
        message: ''
      };

      this.submitting = false;
      this.submitSuccess = true;

      // 3秒后隐藏成功消息
      setTimeout(() => {
        this.submitSuccess = false;
      }, 3000);
    }, 1000);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getAvatarEmoji(name: string): string {
    const emojis = ['😎', '😊', '🤩', '😇', '🤓', '🥳', '😃', '😄', '🌟', '✨'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return emojis[Math.abs(hash) % emojis.length];
  }
}
