import { Component } from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Edward King',
      age: 28,
      address: 'Tokyo No. 1 Lake Park',
      tags: ['new', 'student'],
    },
    {
      key: '5',
      name: 'Helen White',
      age: 35,
      address: 'Paris No. 1 Lake Park',
      tags: ['creative', 'designer'],
    },
  ];

  getTagColor(tag: string): string {
    const colorMap: Record<string, string> = {
      nice: 'green',
      developer: 'blue',
      loser: 'red',
      cool: 'cyan',
      teacher: 'orange',
      new: 'purple',
      student: 'magenta',
      creative: 'gold',
      designer: 'geekblue',
    };
    return colorMap[tag] || 'default';
  }

  invite(): void {
    console.log('Invite clicked');
  }

  delete(key: string): void {
    this.listOfData = this.listOfData.filter((d) => d.key !== key);
  }

  more(): void {
    console.log('More clicked');
  }
}
