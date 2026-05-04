import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  tags: string[];
  rating: number;
  reviews: number;
  isFavorite: boolean;
  url: string;
  featured: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Tool {
  name: string;
  description: string;
  category: string;
  pricing: string;
}

@Component({
  selector: 'app-resource-guide',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './resource-guide.component.html',
  styleUrl: './resource-guide.component.scss'
})
export class ResourceGuideComponent implements OnInit {
  searchControl = new FormControl('');
  categoryFilter = new FormControl('all');
  typeFilter = new FormControl('all');
  showFavoritesOnly = false;

  categories = [
    { value: 'all', label: '全部分类' },
    { value: '融资', label: '融资' },
    { value: '法律', label: '法律' },
    { value: '营销', label: '营销' },
    { value: '运营', label: '运营' },
    { value: '技术', label: '技术' }
  ];

  types = [
    { value: 'all', label: '全部类型' },
    { value: '工具', label: '工具' },
    { value: '模板', label: '模板' },
    { value: '指南', label: '指南' },
    { value: '课程', label: '课程' }
  ];

  resources: Resource[] = [
    {
      id: 1,
      title: '商业计划书模板',
      description: '专业的商业计划书模板，包含完整的财务预测和市场分析部分。适用于种子轮到A轮融资。',
      category: '融资',
      type: '模板',
      tags: ['BP', '融资', '模板'],
      rating: 4.8,
      reviews: 1256,
      isFavorite: false,
      url: '#',
      featured: true
    },
    {
      id: 2,
      title: '股权结构设计指南',
      description: '详细介绍初创企业如何设计合理的股权结构，包括创始人股权、期权池、投资人股权等。',
      category: '法律',
      type: '指南',
      tags: ['股权', '法律', '创始人'],
      rating: 4.9,
      reviews: 892,
      isFavorite: true,
      url: '#',
      featured: true
    },
    {
      id: 3,
      title: '数字营销工具包',
      description: '包含SEO优化、社交媒体营销、内容营销等全方位的数字营销工具和策略。',
      category: '营销',
      type: '工具',
      tags: ['营销', 'SEO', '社交媒体'],
      rating: 4.7,
      reviews: 1034,
      isFavorite: false,
      url: '#',
      featured: false
    },
    {
      id: 4,
      title: '用户运营实战课程',
      description: '从用户获取到留存，完整的用户运营方法论和实战案例分析。',
      category: '运营',
      type: '课程',
      tags: ['运营', '用户增长', '留存'],
      rating: 4.6,
      reviews: 756,
      isFavorite: false,
      url: '#',
      featured: false
    },
    {
      id: 5,
      title: 'MVP开发工具集',
      description: '快速开发最小可行产品的工具和框架推荐，包含前端、后端、数据库等全套方案。',
      category: '技术',
      type: '工具',
      tags: ['技术', 'MVP', '开发'],
      rating: 4.8,
      reviews: 1123,
      isFavorite: true,
      url: '#',
      featured: true
    },
    {
      id: 6,
      title: '投资条款清单详解',
      description: '详细解读Term Sheet中的关键条款，帮助创始人理解投资协议中的陷阱和保护机制。',
      category: '融资',
      type: '指南',
      tags: ['融资', '投资', '条款'],
      rating: 4.9,
      reviews: 1456,
      isFavorite: false,
      url: '#',
      featured: false
    },
    {
      id: 7,
      title: '劳动合同模板包',
      description: '包含试用期合同、正式劳动合同、保密协议、竞业限制协议等全套人力资源文档。',
      category: '法律',
      type: '模板',
      tags: ['HR', '合同', '法律'],
      rating: 4.7,
      reviews: 876,
      isFavorite: false,
      url: '#',
      featured: false
    },
    {
      id: 8,
      title: '品牌定位工作坊',
      description: '系统学习如何为初创企业建立独特的品牌定位和品牌故事。',
      category: '营销',
      type: '课程',
      tags: ['品牌', '营销', '定位'],
      rating: 4.5,
      reviews: 543,
      isFavorite: false,
      url: '#',
      featured: false
    }
  ];

  faqs: FAQ[] = [
    {
      question: '如何选择合适的投资人？',
      answer: '选择投资人时需要考虑多个因素：1) 投资人是否了解你的行业；2) 投资人能带来的资源和人脉；3) 投资条款是否合理；4) 投资人和你的价值观是否契合。建议在接触投资人前做好充分的背景调查。'
    },
    {
      question: '初创企业应该如何定价？',
      answer: '定价策略需要考虑：1) 成本基础定价；2) 价值导向定价；3) 竞争对手定价。对于SaaS产品，常见的策略是免费试用+订阅模式。关键是要理解客户愿意为你的产品支付多少价值。'
    },
    {
      question: '如何判断产品市场契合度？',
      answer: '产品市场契合度(PMF)的常见指标包括：1) 用户留存率高(次日留存>40%)；2) 用户自发推荐(NPS>50)；3) 付费意愿强；4) 增长曲线健康。Sean Ellis的经典问题："如果这个产品明天消失，你会有多失望？"如果超过40%的用户回答"非常失望"，说明可能达到了PMF。'
    },
    {
      question: '创始人应该如何分配股权？',
      answer: '股权分配需要考虑：1) 全职vs兼职(全职应获得更多)；2) 贡献时间(早期参与者应获得更多)；3) 角色和职责(CTO可能需要更多技术股权)；4) 预留期权池(通常15-20%)。建议避免平均分配，核心创始人应保持控制权。'
    },
    {
      question: '什么时候应该开始融资？',
      answer: '最佳融资时机是：1) 有清晰的产品愿景；2) 有初步的用户验证；3) 有可展示的MVP；4) 市场时机成熟。不要等到没钱了才开始融资，通常融资过程需要3-6个月。建议在资金还能支撑12-18个月时启动下一轮融资。'
    }
  ];

  tools: Tool[] = [
    { name: 'Notion', description: '全能工作空间，用于项目管理和文档协作', category: '生产力', pricing: '免费/付费' },
    { name: 'Figma', description: 'UI/UX设计工具，支持团队协作', category: '设计', pricing: '免费/付费' },
    { name: 'Airtable', description: '灵活的数据库工具，可用于CRM和项目管理', category: '数据', pricing: '免费/付费' },
    { name: 'Zapier', description: '自动化工具，连接不同应用和服务', category: '自动化', pricing: '免费/付费' },
    { name: 'Loom', description: '视频录制和分享工具，用于远程沟通', category: '沟通', pricing: '免费/付费' },
    { name: 'Canva', description: '平面设计工具，适合营销材料制作', category: '设计', pricing: '免费/付费' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get filteredResources(): Resource[] {
    return this.resources.filter(resource => {
      const matchesSearch = this.searchControl.value ? 
        resource.title.toLowerCase().includes(this.searchControl.value.toLowerCase()) ||
        resource.description.toLowerCase().includes(this.searchControl.value.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(this.searchControl.value!.toLowerCase()))
        : true;

      const matchesCategory = this.categoryFilter.value === 'all' || 
        resource.category === this.categoryFilter.value;

      const matchesType = this.typeFilter.value === 'all' || 
        resource.type === this.typeFilter.value;

      const matchesFavorites = !this.showFavoritesOnly || resource.isFavorite;

      return matchesSearch && matchesCategory && matchesType && matchesFavorites;
    });
  }

  toggleFavorite(resource: Resource) {
    resource.isFavorite = !resource.isFavorite;
  }

  getRatingStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (hasHalfStar) {
      stars.push('star_half');
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star_border');
    }

    return stars;
  }

  get featuredResources(): Resource[] {
    return this.resources.filter(r => r.featured);
  }

  get toolsByCategory(): { [key: string]: Tool[] } {
    return this.tools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {} as { [key: string]: Tool[] });
  }

  get toolCategories(): string[] {
    return Object.keys(this.toolsByCategory);
  }
}
