import { Component, OnInit, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

interface SuccessStory {
  id: number;
  name: string;
  company: string;
  title: string;
  image: string;
  category: string;
  excerpt: string;
  fullStory: string[];
  keyInsights: string[];
  quote: string;
  date: string;
  readTime: string;
}

interface Category {
  value: string;
  label: string;
}

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './success-stories.component.html',
  styleUrl: './success-stories.component.scss'
})
export class SuccessStoriesComponent implements OnInit {
  @ViewChildren('storyCard') storyCards!: QueryList<ElementRef>;

  stories: SuccessStory[] = [
    {
      id: 1,
      name: '张明',
      company: '创新科技',
      title: '从实验室到独角兽：一个科学家的创业之旅',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20scientist%20entrepreneur%20in%20modern%20lab%20clean%20white%20background%20orange%20blue%20accents%20professional%20portrait&image_size=square_hd',
      category: '科技',
      excerpt: '张明放弃了大学教授的职位，创办了创新科技，用5年时间将其打造成估值10亿美元的独角兽。',
      fullStory: [
        '2018年，张明在清华大学的实验室里取得了一项突破性的AI技术研究成果。这项技术可以大幅提升图像识别的准确率，但当时并没有引起太多关注。',
        '经过一年的市场调研，张明发现这项技术在医疗影像领域有巨大的应用潜力。他决定放弃稳定的教授职位，创办了创新科技。',
        '创业初期，团队只有3人，资金紧张。他们在一个10平米的办公室里工作了一年，每天工作16小时。',
        '2020年，他们推出了第一款医疗影像诊断产品，准确率达到了98%，远超行业平均水平。这款产品迅速获得了医院的认可。',
        '2023年，创新科技完成了C轮融资，估值达到10亿美元，成为行业内的独角兽企业。'
      ],
      keyInsights: [
        '技术商业化需要深入的市场调研',
        '团队执行力比完美的产品更重要',
        '创业初期要专注于一个细分市场',
        '持续学习和迭代是成功的关键'
      ],
      quote: '创业不是百米冲刺，而是一场马拉松。保持耐心，持续学习，成功自然会到来。',
      date: '2026年4月',
      readTime: '8分钟'
    },
    {
      id: 2,
      name: '李娜',
      company: '健康生活',
      title: '用产品思维重塑传统健身行业',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20female%20fitness%20entrepreneur%20in%20modern%20gym%20clean%20white%20background%20pink%20orange%20accents%20professional%20portrait&image_size=square_hd',
      category: '健康',
      excerpt: '前互联网产品经理李娜，用产品思维重新定义健身行业，创建了用户超过500万的健康生活平台。',
      fullStory: [
        '李娜曾是某知名互联网公司的产品经理，负责过多个成功的产品。但她一直有一个创业梦。',
        '2019年，李娜发现健身行业存在很多痛点：健身房门槛高、教练水平参差不齐、用户难以坚持。她决定用互联网思维来解决这些问题。',
        '她创办了健康生活，一个集线上课程、社交互动、数据追踪于一体的健身平台。',
        '通过精细化的产品设计和用户运营，健康生活在上线第一年就获得了100万用户。',
        '如今，健康生活已经成为国内最大的在线健身平台之一，用户超过500万，并完成了多轮融资。'
      ],
      keyInsights: [
        '用互联网思维改造传统行业',
        '用户体验是产品成功的核心',
        '数据驱动决策',
        '建立用户社区增强粘性'
      ],
      quote: '传统行业里充满了机会，但关键是要用新的思维方式去思考问题。',
      date: '2026年3月',
      readTime: '7分钟'
    },
    {
      id: 3,
      name: '王强',
      company: '智能物流',
      title: '连续创业者的第三次成功：用AI改变物流行业',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20male%20logistics%20entrepreneur%20in%20modern%20warehouse%20clean%20white%20background%20blue%20orange%20accents%20professional%20portrait&image_size=square_hd',
      category: '物流',
      excerpt: '王强是一位连续创业者，前两次创业都以失败告终，但他没有放弃，第三次创业终于取得了巨大成功。',
      fullStory: [
        '王强的第一次创业是在2010年，创办了一家社交网络公司，但由于市场时机不成熟，公司在2012年关闭。',
        '第二次创业是在2013年，创办了一家O2O公司，但由于资金链断裂，公司在2015年倒闭。',
        '两次失败让王强深刻反思，他意识到自己需要更加深入地了解一个行业，而不是盲目跟风。',
        '2016年，王强花了半年时间深入研究物流行业，发现了很多效率低下的问题。他决定用AI技术来解决这些问题。',
        '他创办了智能物流，通过AI算法优化物流路径，提高配送效率。经过5年的发展，智能物流已经成为行业内的领先企业，估值超过5亿美元。'
      ],
      keyInsights: [
        '失败是最好的老师',
        '深入了解行业比什么都重要',
        '不要盲目跟风，要有自己的判断',
        '坚持和耐心是创业者最重要的品质'
      ],
      quote: '每一次失败都让我更加接近成功。不要害怕失败，要从失败中学习。',
      date: '2026年2月',
      readTime: '10分钟'
    },
    {
      id: 4,
      name: '陈雨',
      company: '时尚科技',
      title: '从设计师到CEO：用科技重新定义时尚产业',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20female%20fashion%20tech%20entrepreneur%20in%20modern%20studio%20clean%20white%20background%20purple%20orange%20accents%20professional%20portrait&image_size=square_hd',
      category: '时尚',
      excerpt: '陈雨曾是一名时尚设计师，她将设计思维与科技相结合，创办了时尚科技，重新定义了人们购买服装的方式。',
      fullStory: [
        '陈雨毕业于中央美术学院，曾在多家知名时尚品牌担任设计师。她发现传统时尚行业存在很多问题：库存积压、尺码不合适、款式同质化等。',
        '2018年，陈雨决定创业，创办了时尚科技。她的理念是用科技让每个人都能获得个性化的时尚体验。',
        '时尚科技推出了虚拟试衣、AI推荐、个性化定制等创新功能，让用户可以在家中轻松找到适合自己的服装。',
        '通过与多家品牌合作，时尚科技建立了一个庞大的服装数据库，AI算法可以根据用户的体型、风格、预算等因素推荐最适合的服装。',
        '如今，时尚科技已经获得了超过200万用户，并完成了B轮融资，估值超过2亿美元。'
      ],
      keyInsights: [
        '设计思维与技术思维的结合',
        '用户体验是时尚科技的核心',
        '数据驱动的个性化推荐',
        '与品牌建立深度合作关系'
      ],
      quote: '时尚不应该是少数人的专利。我们要用科技让每个人都能找到属于自己的风格。',
      date: '2026年1月',
      readTime: '9分钟'
    }
  ];

  categories: Category[] = [
    { value: 'all', label: '全部' },
    { value: '科技', label: '科技' },
    { value: '健康', label: '健康' },
    { value: '物流', label: '物流' },
    { value: '时尚', label: '时尚' }
  ];

  selectedCategory = 'all';
  selectedStory: SuccessStory | null = null;
  isModalOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    if (!this.storyCards) return;

    this.storyCards.forEach((card, index) => {
      const rect = card.nativeElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;

      if (isVisible) {
        setTimeout(() => {
          card.nativeElement.classList.add('visible');
        }, index * 150);
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredStories(): SuccessStory[] {
    if (this.selectedCategory === 'all') {
      return this.stories;
    }
    return this.stories.filter(story => story.category === this.selectedCategory);
  }

  openStory(story: SuccessStory) {
    this.selectedStory = story;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeStory() {
    this.isModalOpen = false;
    this.selectedStory = null;
    document.body.style.overflow = 'auto';
  }

  nextStory() {
    if (!this.selectedStory) return;
    const currentIndex = this.filteredStories.findIndex(s => s.id === this.selectedStory?.id);
    const nextIndex = (currentIndex + 1) % this.filteredStories.length;
    this.selectedStory = this.filteredStories[nextIndex];
  }

  prevStory() {
    if (!this.selectedStory) return;
    const currentIndex = this.filteredStories.findIndex(s => s.id === this.selectedStory?.id);
    const prevIndex = (currentIndex - 1 + this.filteredStories.length) % this.filteredStories.length;
    this.selectedStory = this.filteredStories[prevIndex];
  }
}
