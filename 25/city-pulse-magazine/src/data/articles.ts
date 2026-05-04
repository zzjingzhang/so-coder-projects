export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  neonColor: 'pink' | 'blue' | 'green' | 'yellow' | 'orange';
}

export const articles: Article[] = [
  {
    id: '1',
    title: '夜空中的霓虹诗篇：城市灯光艺术的崛起',
    excerpt: '探索当代城市中霓虹灯艺术如何重新定义我们的夜间体验，从东京的涩谷十字路口到纽约时代广场的光影交织。',
    content: `在现代城市的夜幕下，霓虹灯不再仅仅是商业标识，它们已经演变成为一种独特的艺术形式。艺术家们利用这些发光的媒介，在城市的建筑立面上创造出令人惊叹的视觉奇观。

从东京涩谷的巨型电子屏幕到上海外滩的灯光秀，再到柏林墙遗址上的投影艺术，城市灯光正在以全新的方式讲述城市的故事。这些作品不仅美化了城市夜景，更成为了当代文化的重要载体。

霓虹灯艺术的复兴始于20世纪90年代，当时艺术家开始重新探索这种在20世纪50-60年代风靡一时的媒介。如今，结合LED技术和投影映射，霓虹灯艺术已经进入了一个全新的时代。

这些发光的艺术作品常常探讨消费主义、身份认同和城市记忆等主题。在纽约的Chelsea区，画廊定期举办霓虹灯艺术展；在香港的中环，摩天大楼的外墙上投射着大型数字艺术作品。

城市灯光艺术正在改变我们与城市空间的关系，让夜晚的城市成为一个充满可能性的艺术舞台。`,
    category: '艺术',
    author: '李明辉',
    date: '2026-04-15',
    readTime: '8 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=neon%20lights%20city%20night%20skyline%20Tokyo%20Shibuya%20crossing%20vibrant%20colors%20photography&image_size=landscape_16_9',
    featured: true,
    neonColor: 'pink'
  },
  {
    id: '2',
    title: '地下音乐场景：城市脉搏的跳动',
    excerpt: '深入了解城市地下音乐文化如何塑造当代青年身份认同，从仓库派对到独立音乐节。',
    content: `地下音乐场景一直是城市文化的重要组成部分。从底特律的 techno 到伦敦的 drum and bass，从柏林的 techno 俱乐部到东京的实验音乐现场，地下音乐一直在塑造着城市的文化身份。

这些音乐场景不仅仅是关于音乐本身，它们更是一种社会运动，一种表达自我的方式，一种建立社区的途径。在仓库、废弃工厂和地下室里，年轻人创造着属于自己的文化空间。

在柏林，周日早晨的俱乐部派对已经成为一种文化现象；在东京，涩谷的小型 live house 孕育着新一代的独立音乐人；在上海，电子音乐场景正在快速发展，融合了东方和西方的元素。

地下音乐文化的魅力在于它的真实性和包容性。在这里，没有人评判你，你可以自由地表达自己。这种自由的氛围吸引着来自不同背景的人们，创造出独特的文化融合。

随着社交媒体的发展，这些地下场景正在获得更多的关注。但它们的核心精神——真实性、社区精神和对主流文化的批判——始终保持不变。`,
    category: '音乐',
    author: '王小音',
    date: '2026-04-12',
    readTime: '6 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=underground%20music%20club%20neon%20lights%20crowd%20dancing%20warehouse%20party%20electronic%20music%20atmospheric&image_size=landscape_16_9',
    featured: false,
    neonColor: 'blue'
  },
  {
    id: '3',
    title: '街头艺术革命：从涂鸦到城市画廊',
    excerpt: '追踪街头艺术如何从非法活动转变为备受追捧的艺术形式，以及它如何改变城市景观。',
    content: `街头艺术走过了漫长的道路。从20世纪70年代纽约地铁上的涂鸦标签，到今天世界各地城市墙壁上的大型壁画，街头艺术已经从一种亚文化现象演变为主流艺术形式。

班克斯（Banksy）的作品在拍卖会上拍出数百万美元的价格，各大博物馆纷纷举办街头艺术展览，城市政府开始委托艺术家创作大型壁画。这种转变反映了社会对公共空间和艺术表达的态度变化。

街头艺术的魅力在于它的可及性。不同于画廊里的艺术，街头艺术是免费的，面向所有人的。它打破了艺术世界的精英主义壁垒，让艺术走进日常生活。

在圣保罗，大型壁画覆盖了整个街区；在墨尔本，霍西尔巷已成为全球街头艺术的圣地；在柏林，东区画廊（East Side Gallery）保存着柏林墙上最后的涂鸦作品。这些艺术作品不仅美化了城市，更成为了城市身份的重要标志。

街头艺术家们正在重新定义我们与城市空间的关系，让每一面墙都成为一个潜在的画布，每一个街角都可能遇到令人惊喜的艺术作品。`,
    category: '艺术',
    author: '张艺术',
    date: '2026-04-10',
    readTime: '7 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=street%20art%20graffiti%20colorful%20mural%20urban%20wall%20creative%20expression%20city%20culture%20vibrant&image_size=landscape_16_9',
    featured: false,
    neonColor: 'green'
  },
  {
    id: '4',
    title: '数字时代的城市文学：网络写作与都市叙事',
    excerpt: '探讨数字平台如何改变城市文学的创作和传播方式，以及新一代作家如何描绘现代都市生活。',
    content: `互联网正在彻底改变文学的创作和传播方式。在各大文学平台和社交媒体上，新一代作家正在以全新的方式讲述城市故事。

与传统文学不同，网络文学具有即时性、互动性和连续性的特点。读者可以在评论区与作者互动，作者可以根据读者反馈调整故事情节。这种互动正在创造一种全新的文学体验。

都市题材在网络文学中占据重要地位。从职场小说到都市言情，从悬疑推理到科幻幻想，城市背景为故事提供了无限的可能性。这些作品不仅娱乐读者，也反映了当代城市生活的复杂性和多样性。

在上海，网络作家们描绘着这座国际大都市的繁华与孤独；在北京，他们讲述着北漂青年的梦想与挣扎；在广州，他们捕捉着岭南文化与现代生活的交融。这些故事构成了一幅当代中国城市生活的全景图。

数字平台不仅改变了文学的传播方式，也改变了文学的语言和形式。简短的章节、快节奏的叙事、口语化的表达——这些都是网络文学适应数字时代阅读习惯的结果。`,
    category: '文学',
    author: '陈文章',
    date: '2026-04-08',
    readTime: '9 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20literature%20city%20night%20typing%20laptop%20creative%20writing%20neon%20reflection%20urban%20modern&image_size=landscape_16_9',
    featured: false,
    neonColor: 'yellow'
  },
  {
    id: '5',
    title: '城市咖啡馆文化：第三空间的演变',
    excerpt: '从巴黎的启蒙时代沙龙到现代联合办公空间，咖啡馆如何一直是城市文化的中心。',
    content: `咖啡馆一直是城市文化的重要场所。从18世纪巴黎的启蒙思想家们在咖啡馆中讨论哲学和政治，到今天的联合办公空间，咖啡馆的角色一直在演变，但其作为"第三空间"的核心功能始终不变。

社会学家雷·奥尔登堡（Ray Oldenburg）提出的"第三空间"概念，指的是介于家庭（第一空间）和工作场所（第二空间）之间的社交场所。咖啡馆完美地扮演了这个角色，为人们提供了一个既私密又开放的空间。

在当代城市中，咖啡馆的类型越来越多样化。传统的独立咖啡馆注重氛围和社区感；连锁品牌追求效率和一致性； specialty coffee 商店则专注于咖啡品质和咖啡文化；而联合办公空间则将工作和社交融为一体。

上海的咖啡馆文化尤为发达。从法租界的老洋房咖啡馆到陆家嘴摩天大楼里的精品咖啡店，从弄堂里的社区咖啡馆到创意园区里的设计师咖啡馆，每一家都有自己独特的气质和客群。

咖啡馆不仅是消费咖啡的地方，更是城市生活的缩影。在这里，商务人士会面洽谈，自由职业者工作，朋友聚会聊天，情侣约会，作家写作，学生学习。咖啡馆见证着城市的脉搏，记录着人们的故事。`,
    category: '生活方式',
    author: '刘咖啡',
    date: '2026-04-05',
    readTime: '5 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20cafe%20interior%20neon%20lights%20urban%20atmosphere%20people%20working%20laptops%20warm%20lighting&image_size=landscape_16_9',
    featured: false,
    neonColor: 'orange'
  },
  {
    id: '6',
    title: '时尚与身份：城市青年的自我表达',
    excerpt: '探索城市时尚如何成为一种语言，年轻人如何通过穿着表达身份、归属感和个性。',
    content: `时尚一直是城市文化的重要组成部分。在拥挤的城市街道上，人们通过穿着来表达自己的身份、价值观和个性。时尚不仅是审美选择，更是一种社会语言。

每个城市都有自己独特的时尚气质。东京的原宿风格以其大胆和创意著称；伦敦的街头时尚融合了朋克、滑板和高级时装；纽约的时尚则更加多元化和商业化；而上海的时尚正在形成自己独特的风格，融合了东西方的元素。

社交媒体的兴起正在改变时尚的传播方式。Instagram、TikTok 和小红书等平台让普通人也能成为时尚影响者。街头风格不再仅仅来自时装秀，更多地来自城市的街头、地铁和咖啡馆。

年轻一代通过时尚表达着对性别、身份和政治的态度。无性别时尚正在挑战传统的性别二元对立；可持续时尚反映了对环境问题的关注；复古风格则表达了对过去时代的怀念和重新诠释。

在城市中，时尚也是一种归属感的表达。滑板青年的穿搭、二次元爱好者的着装、职场新人的正装——每一种风格都标志着一个特定的社会群体。通过穿着相似的服装，人们找到了志同道合的伙伴，建立了社区感。`,
    category: '时尚',
    author: '周时尚',
    date: '2026-04-03',
    readTime: '6 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20street%20style%20Tokyo%20Harajuku%20colorful%20outfits%20young%20people%20urban%20vibrant%20creative&image_size=landscape_16_9',
    featured: false,
    neonColor: 'pink'
  },
  {
    id: '7',
    title: '城市电影：银幕上的都市想象',
    excerpt: '电影如何塑造我们对城市的认知，从经典黑色电影中的阴暗都市到当代电影中的未来城市。',
    content: `电影与城市之间有着深厚的联系。从电影诞生之初，城市就成为最重要的电影场景之一。反过来，电影也深刻地塑造了我们对城市的认知和想象。

经典黑色电影中的城市是一个充满危险和诱惑的迷宫。《第三人》中的维也纳、《唐人街》中的洛杉矶、《出租车司机》中的纽约——这些电影中的城市不仅是故事发生的背景，更是角色本身，充满了道德的模糊性和存在的焦虑。

新好莱坞时期的电影则展现了城市的另一面。《安妮·霍尔》中的纽约是知识分子的乐园；《周末夜狂热》中的布鲁克林是工薪阶层的舞台；《银翼杀手》中的洛杉矶则是一个反乌托邦的未来都市，充满了霓虹灯光和雨水。

当代城市电影更加多元化。《迷失东京》中的东京是一个充满疏离感的现代都市；《佛罗里达乐园》中的奥兰多是贫富差距的缩影；《寄生虫》中的首尔则揭示了阶级差异的残酷。

中国的城市电影也正在崛起。《疯狂的石头》中的重庆充满了黑色幽默；《春娇与志明》中的北京和香港讲述着现代爱情故事；《南方车站的聚会》中的武汉则展现了城市的阴暗面。这些电影不仅记录着中国城市化的进程，也参与着城市文化的建构。`,
    category: '电影',
    author: '王影评',
    date: '2026-04-01',
    readTime: '8 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20city%20night%20rain%20neon%20reflections%20bladerunner%20atmosphere%20moody%20urban%20cinematography&image_size=landscape_16_9',
    featured: false,
    neonColor: 'blue'
  },
  {
    id: '8',
    title: '城市美食地图：从街边小吃到米其林三星',
    excerpt: '探索城市美食文化的多样性，以及食物如何成为城市身份的重要组成部分。',
    content: `美食是城市文化最直观的表达之一。每个城市都有自己独特的美食传统，这些传统反映了城市的历史、移民和文化融合。从街边小吃摊到米其林三星餐厅，城市的美食景观呈现出惊人的多样性。

街边小吃是城市美食文化的基础。在台北，夜市的蚵仔煎和珍珠奶茶是市民生活的一部分；在成都，火锅和串串香是社交的中心；在广州，早茶是一种生活方式。这些街边美食不仅满足了人们的口腹之欲，也构成了城市的集体记忆。

同时，高端餐饮也在城市中蓬勃发展。上海的米其林三星餐厅数量位居亚洲前列；北京的高端餐厅融合了传统和创新；深圳则以其创意料理和实验性餐厅著称。这些高端餐厅不仅是美食的殿堂，也是社交、商务和文化交流的场所。

移民文化深刻地影响着城市的美食景观。在纽约，你可以找到来自世界各地的美食；在伦敦，印度餐厅的数量可能超过了传统的英国餐厅；在悉尼，亚洲美食已经成为主流。这些移民带来的美食不仅丰富了城市的味蕾，也促进了文化的交流和理解。

美食也是城市身份的重要标志。提到成都，人们会想到火锅；提到西安，人们会想到肉夹馍；提到广州，人们会想到早茶。这些美食已经成为城市的名片，吸引着来自世界各地的游客。在城市化和全球化的今天，美食成为了保持城市独特性的重要方式。`,
    category: '美食',
    author: '李美食',
    date: '2026-03-28',
    readTime: '7 分钟',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vibrant%20food%20market%20night%20city%20colorful%20street%20food%20neon%20lights%20atmospheric%20delicious&image_size=landscape_16_9',
    featured: false,
    neonColor: 'green'
  }
];

export const categories = ['全部', '艺术', '音乐', '文学', '生活方式', '时尚', '电影', '美食'];

export const getNeonColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    pink: 'neon-pink',
    blue: 'neon-blue',
    green: 'neon-green',
    yellow: 'neon-yellow',
    orange: 'neon-orange'
  };
  return colorMap[color] || 'neon-pink';
};

export const getNeonBorderClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    pink: 'border-glow-pink',
    blue: 'border-glow-blue',
    green: 'border-glow-green'
  };
  return colorMap[color] || 'border-glow-pink';
};
