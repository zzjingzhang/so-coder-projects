import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  hitCount = 99999;
  
  guestbookEntries = [
    { name: 'Webmaster', message: 'Thanks for visiting! Sign my guestbook!', date: '2001-04-20' },
    { name: 'CoolDude99', message: 'Awesome site dude! Check out my page too!', date: '2001-03-15' },
    { name: 'xX_Angel_Xx', message: 'Love your retro style! ^_^', date: '2001-02-28' }
  ];
}
