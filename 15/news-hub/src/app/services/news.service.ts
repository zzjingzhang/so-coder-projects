import { Injectable } from '@angular/core';
import { NewsArticle, Category } from '../models/news.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private categories: Category[] = [
    {
      id: 'politics',
      name: '政治',
      description: '国内外政治新闻与政策动态',
      icon: '🏛️',
      articleCount: 12
    },
    {
      id: 'technology',
      name: '科技',
      description: '最新科技趋势与产品资讯',
      icon: '💻',
      articleCount: 18
    },
    {
      id: 'business',
      name: '商业',
      description: '全球经济与商业动态',
      icon: '📈',
      articleCount: 15
    },
    {
      id: 'sports',
      name: '体育',
      description: '体育赛事与运动员动态',
      icon: '⚽',
      articleCount: 20
    },
    {
      id: 'health',
      name: '健康',
      description: '健康生活与医学资讯',
      icon: '🏥',
      articleCount: 10
    },
    {
      id: 'entertainment',
      name: '娱乐',
      description: '影视音乐与明星八卦',
      icon: '🎬',
      articleCount: 25
    }
  ];

  private articles: NewsArticle[] = [
    {
      id: 1,
      title: '人工智能技术革命：如何改变我们的日常生活',
      summary: '从智能助手到自动驾驶，人工智能正在以前所未有的速度改变着我们的生活方式。本文深入探讨AI技术的最新进展及其对社会的影响。',
      content: '人工智能（AI）技术正在以前所未有的速度发展，从智能家居设备到自动驾驶汽车，AI正在渗透到我们生活的方方面面。\n\n在医疗领域，AI辅助诊断系统已经能够识别早期肺癌迹象，准确率甚至超过了经验丰富的医生。在金融领域，AI算法能够在毫秒级完成复杂的交易决策。\n\n然而，这项技术的快速发展也带来了新的挑战。就业结构的变化、隐私保护的担忧、以及AI决策的透明度问题，都需要我们认真思考和解决。\n\n专家预测，未来十年将是AI技术成熟和广泛应用的关键时期。无论是企业还是个人，都需要为这个AI驱动的新时代做好准备。',
      category: 'technology',
      author: '张明',
      publishedDate: '2026-04-30',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20artificial%20intelligence%20concept%20with%20neural%20network%20visualization%20and%20futuristic%20technology%20elements&image_size=landscape_16_9',
      tags: ['人工智能', '技术', '未来'],
      readTime: 5,
      featured: true
    },
    {
      id: 2,
      title: '全球经济展望：新兴市场的机遇与挑战',
      summary: '随着全球经济格局的不断变化，新兴市场正在成为全球经济增长的新引擎。本文分析了当前全球经济形势以及新兴市场的投资机会。',
      content: '全球经济正在经历深刻的变革。传统的经济强国面临着增长放缓的挑战，而新兴市场则展现出强劲的增长动力。\n\n亚洲市场，尤其是东南亚地区，正在吸引越来越多的国际投资。该地区的年轻人口结构、快速的城市化进程以及不断改善的商业环境，都为经济增长提供了坚实基础。\n\n然而，新兴市场也面临着诸多挑战。全球贸易紧张局势、地缘政治风险以及气候变化的影响，都可能对经济增长产生负面影响。\n\n对于投资者来说，理解这些市场的独特性至关重要。成功的投资策略需要综合考虑政治稳定性、经济基本面以及市场流动性等多方面因素。',
      category: 'business',
      author: '李华',
      publishedDate: '2026-04-29',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=global%20economy%20visualization%20with%20world%20map%20and%20financial%20charts%20professional%20business%20style&image_size=landscape_16_9',
      tags: ['经济', '投资', '新兴市场'],
      readTime: 6,
      featured: true
    },
    {
      id: 3,
      title: '2026年世界杯预选赛：亚洲区战况激烈',
      summary: '世界杯预选赛亚洲区比赛进入关键阶段，多支强队争夺宝贵的出线名额。本文回顾了近期的精彩比赛并分析了各队的出线形势。',
      content: '2026年世界杯预选赛亚洲区的比赛正在如火如荼地进行。随着小组赛进入尾声，各支球队都在为出线名额做最后的冲刺。\n\n在A组，传统强队韩国队表现稳定，目前以不败战绩领跑小组。然而，第二名的竞争异常激烈，沙特阿拉伯和伊拉克队都有机会晋级。\n\nB组的形势同样紧张。日本队虽然实力超群，但在最近几场比赛中遭遇了顽强抵抗。澳大利亚和阿联酋队也展现出了不俗的竞争力。\n\n值得关注的是，一些传统弱队在本届预选赛中表现出色。越南队和泰国队都展现了显著的进步，给强队制造了不小的麻烦。\n\n随着比赛的深入，球迷们可以期待更多精彩的对决。世界杯的梦想，正在激励着每一支球队全力以赴。',
      category: 'sports',
      author: '王强',
      publishedDate: '2026-04-28',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exciting%20football%20match%20in%20world%20cup%20qualifiers%20stadium%20with%20cheering%20fans%20dynamic%20action&image_size=landscape_16_9',
      tags: ['足球', '世界杯', '体育'],
      readTime: 4,
      featured: false
    },
    {
      id: 4,
      title: '新型疫苗研发取得重大突破',
      summary: '科学家们在通用流感疫苗的研发上取得了突破性进展，这一创新可能彻底改变我们对抗流感的方式。',
      content: '全球健康领域传来重大喜讯：科学家们在通用流感疫苗的研发上取得了突破性进展。这种新型疫苗有望提供长期保护，减少每年接种的需求。\n\n传统流感疫苗需要每年更新，因为流感病毒会快速变异。而通用疫苗则针对病毒中相对稳定的部分，理论上可以提供更广泛、更持久的保护。\n\n临床试验显示，这种新型疫苗在预防多种流感病毒株方面表现出色。研究团队表示，如果获得批准，这将是流感预防领域的重大里程碑。\n\n这一突破不仅对季节性流感防控具有重要意义，也为应对未来可能的流感大流行提供了新的工具。公共卫生专家对此表示乐观，认为这将显著改善全球健康安全。\n\n然而，专家也提醒，疫苗研发是一个复杂的过程，还需要更多的研究和验证。预计最早在2028年，这种疫苗才可能投入实际使用。',
      category: 'health',
      author: '陈医生',
      publishedDate: '2026-04-27',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medical%20research%20laboratory%20with%20scientists%20working%20on%20vaccine%20development%20professional%20healthcare%20setting&image_size=landscape_16_9',
      tags: ['健康', '疫苗', '医疗'],
      readTime: 5,
      featured: false
    },
    {
      id: 5,
      title: '年度票房冠军：科幻大片《星际迷航》创下新纪录',
      summary: '最新科幻大片《星际迷航：新纪元》在全球范围内取得了惊人的票房成绩，成为本年度最成功的电影之一。',
      content: '电影界传来令人振奋的消息：最新科幻大片《星际迷航：新纪元》在全球范围内取得了惊人的票房成绩，上映首周便突破了10亿美元大关。\n\n这部由著名导演执导的科幻史诗，以其震撼的视觉效果、深刻的主题思考和出色的演员表演，赢得了观众和影评人的一致好评。\n\n电影讲述了未来人类探索宇宙深处的故事，探讨了科技、人性和文明冲突等深刻主题。尤其是其中关于人工智能与人类关系的描绘，引发了广泛的社会讨论。\n\n业界分析认为，这部电影的成功标志着科幻题材在主流电影市场的持续升温。观众对高质量科幻作品的需求日益增长，这为电影产业带来了新的发展机遇。\n\n除了票房上的成功，这部电影还在技术层面取得了突破。其创新的虚拟制作技术和沉浸式音效设计，为未来电影制作树立了新的标杆。',
      category: 'entertainment',
      author: '刘芳',
      publishedDate: '2026-04-26',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epic%20science%20fiction%20movie%20scene%20with%20futuristic%20spaceship%20and%20galaxy%20cinematic%20visuals&image_size=landscape_16_9',
      tags: ['电影', '娱乐', '科幻'],
      readTime: 3,
      featured: false
    },
    {
      id: 6,
      title: '新能源政策出台：推动绿色转型加速',
      summary: '政府最新发布的新能源政策旨在加速能源结构转型，为可再生能源产业提供强有力的支持。本文详细解读政策要点及其影响。',
      content: '政府最新发布了一系列新能源政策，旨在加速国家能源结构向绿色低碳转型。这一政策组合被认为是近年来最全面、最有力的环保政策举措。\n\n政策要点包括：大幅提高可再生能源发电比例目标、对新能源汽车购置提供更大力度补贴、以及建立碳交易市场的详细规则。\n\n能源专家表示，这些政策的出台将显著改变能源市场格局。预计未来五年内，风能和太阳能发电成本将进一步下降，竞争力将大幅提升。\n\n然而，政策实施也面临一些挑战。传统能源产业的转型成本、电网基础设施的升级需求，以及可再生能源的间歇性问题，都需要妥善解决。\n\n总体而言，这一政策方向表明了政府应对气候变化的坚定决心。对于企业和投资者来说，这也意味着新能源领域将迎来前所未有的发展机遇。',
      category: 'politics',
      author: '赵伟',
      publishedDate: '2026-04-25',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sustainable%20energy%20infrastructure%20with%20solar%20panels%20and%20wind%20turbines%20modern%20green%20technology&image_size=landscape_16_9',
      tags: ['政策', '能源', '环保'],
      readTime: 6,
      featured: true
    }
  ];

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    const category = this.categories.find(c => c.id === id);
    return of(category);
  }

  getFeaturedArticles(): Observable<NewsArticle[]> {
    const featured = this.articles.filter(a => a.featured);
    return of(featured);
  }

  getLatestArticles(limit: number = 10): Observable<NewsArticle[]> {
    const sorted = [...this.articles].sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    return of(sorted.slice(0, limit));
  }

  getArticlesByCategory(categoryId: string): Observable<NewsArticle[]> {
    const articles = this.articles.filter(a => a.category === categoryId);
    return of(articles);
  }

  getArticleById(id: number): Observable<NewsArticle | undefined> {
    const article = this.articles.find(a => a.id === id);
    return of(article);
  }

  searchArticles(query: string): Observable<NewsArticle[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.articles.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) ||
      a.summary.toLowerCase().includes(lowerQuery) ||
      a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return of(results);
  }
}
