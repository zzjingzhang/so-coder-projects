import type { Movie, CarouselItem } from '../types'

export const movies: Movie[] = [
  {
    id: 1,
    title: '星际穿越',
    originalTitle: 'Interstellar',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20fiction%20movie%20poster%20interstellar%20space%20exploration%20epic%20cinematic%20dark%20blue%20black%20stars%20galaxy&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20space%20scene%20black%20hole%20stars%20galaxy%20epic%20sci%20fi%20movie%20backdrop%20dark%20blue%20purple&image_size=landscape_16_9',
    rating: 4.8,
    year: 2014,
    duration: '2h 49m',
    genres: ['科幻', '冒险', '剧情'],
    description: '在不久的将来，地球面临严重的环境危机，人类面临灭绝的威胁。一组宇航员被派往一个虫洞，寻找人类的新家园。这部史诗般的科幻冒险片探讨了爱、时间和人类的生存意志。克里斯托弗·诺兰执导的这部电影以其震撼的视觉效果和深刻的哲学思考而闻名。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '克里斯托弗·诺兰',
    releaseDate: '2014-11-07',
    country: '美国',
    actors: [
      { id: 1, name: '马修·麦康纳', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20actor%20portrait%20matthew%20mcconaughey%20handsome%20man%20brown%20hair%20blue%20eyes%20formal%20attire&image_size=square', role: '库珀' },
      { id: 2, name: '安妮·海瑟薇', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20actress%20portrait%20anne%20hathaway%20beautiful%20woman%20brown%20hair%20elegant%20formal%20attire&image_size=square', role: '布兰德博士' },
      { id: 3, name: '杰西卡·查斯坦', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20actress%20portrait%20jessica%20chastain%20red%20hair%20elegant%20woman%20formal%20attire&image_size=square', role: '墨菲' },
      { id: 4, name: '迈克尔·凯恩', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20actor%20portrait%20michael%20caine%20elderly%20gentleman%20elegant%20formal%20suit&image_size=square', role: '布兰德教授' },
      { id: 5, name: '马特·达蒙', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20actor%20portrait%20matt%20damon%20handsome%20man%20casual%20attire%20friendly%20smile&image_size=square', role: '曼恩博士' },
      { id: 6, name: '麦肯吉·弗依', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20actress%20portrait%20mackenzie%20foy%20cute%20girl%20innocent%20expression&image_size=square', role: '小墨菲' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.2 GB', url: '#' },
      { quality: '720p', size: '2.5 GB', url: '#' },
      { quality: '1080p', size: '4.8 GB', url: '#' }
    ]
  },
  {
    id: 2,
    title: '盗梦空间',
    originalTitle: 'Inception',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mind%20bending%20movie%20poster%20inception%20dream%20world%20city%20folding%20upside%20down%20dark%20mysterious%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inception%20movie%20backdrop%20folding%20city%20dream%20landscape%20surreal%20architecture%20dark%20blue%20cinematic&image_size=landscape_16_9',
    rating: 4.9,
    year: 2010,
    duration: '2h 28m',
    genres: ['科幻', '动作', '悬疑'],
    description: '道姆·柯布是一位经验丰富的窃贼，专门在人们做梦时潜入他们的潜意识，窃取最深处的秘密。在这项危险的技术中，柯布成为了企业间谍中最令人垂涎的对象，但也让他失去了所爱的一切。现在，柯布有机会获得救赎。最后一项任务可以让他重获曾经的生活，但前提是他必须完成一个不可能的任务——奠基。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '克里斯托弗·诺兰',
    releaseDate: '2010-07-16',
    country: '美国',
    actors: [
      { id: 7, name: '莱昂纳多·迪卡普里奥', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leonardo%20dicaprio%20professional%20portrait%20handsome%20actor%20serious%20expression%20formal%20attire&image_size=square', role: '柯布' },
      { id: 8, name: '约瑟夫·高登-莱维特', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=joseph%20gordon%20levitt%20young%20actor%20portrait%20smart%20casual%20friendly%20smile&image_size=square', role: '亚瑟' },
      { id: 9, name: '艾伦·佩吉', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ellen%20page%20young%20actress%20portrait%20short%20hair%20intelligent%20expression&image_size=square', role: '阿里阿德涅' },
      { id: 10, name: '汤姆·哈迪', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tom%20hardy%20actor%20portrait%20tough%20guy%20rugged%20look%20serious%20expression&image_size=square', role: '伊姆斯' },
      { id: 11, name: '渡边谦', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ken%20watanabe%20japanese%20actor%20portrait%20dignified%20elegant%20formal%20suit&image_size=square', role: '斋藤' },
      { id: 12, name: '玛丽昂·歌迪亚', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=marion%20cotillard%20french%20actress%20portrait%20elegant%20beautiful%20mysterious%20look&image_size=square', role: '梅尔' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.0 GB', url: '#' },
      { quality: '720p', size: '2.2 GB', url: '#' },
      { quality: '1080p', size: '4.5 GB', url: '#' }
    ]
  },
  {
    id: 3,
    title: '复仇者联盟：终局之战',
    originalTitle: 'Avengers: Endgame',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avengers%20endgame%20movie%20poster%20marvel%20superheroes%20assembled%20epic%20battle%20dark%20blue%20purple%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avengers%20endgame%20battle%20scene%20marvel%20cinematic%20universe%20epic%20war%20dark%20dramatic%20lighting&image_size=landscape_16_9',
    rating: 4.7,
    year: 2019,
    duration: '3h 1m',
    genres: ['动作', '冒险', '科幻'],
    description: '在灭霸打了响指之后，世界陷入了混乱。复仇者们必须承担起拯救世界的重任，这是他们的终局之战。无论付出什么代价。这部史诗级的超级英雄电影为漫威电影宇宙的十年历程画上了句号，展现了友谊、牺牲和希望的主题。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '安东尼·罗素、乔·罗素',
    releaseDate: '2019-04-26',
    country: '美国',
    actors: [
      { id: 13, name: '小罗伯特·唐尼', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=robert%20downey%20jr%20iron%20man%20actor%20portrait%20charismatic%20smile%20goatee&image_size=square', role: '托尼·斯塔克/钢铁侠' },
      { id: 14, name: '克里斯·埃文斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chris%20evans%20captain%20america%20actor%20portrait%20noble%20heroic%20blonde%20hair&image_size=square', role: '史蒂夫·罗杰斯/美国队长' },
      { id: 15, name: '克里斯·海姆斯沃斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chris%20hemsworth%20thor%20actor%20portrait%20muscular%20blonde%20god%20of%20thunder&image_size=square', role: '托尔' },
      { id: 16, name: '斯嘉丽·约翰逊', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=scarlett%20johansson%20black%20widow%20actress%20portrait%20beautiful%20red%20hair%20sexy&image_size=square', role: '娜塔莎·罗曼诺夫/黑寡妇' },
      { id: 17, name: '杰瑞米·雷纳', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jeremy%20renner%20hawkeye%20actor%20portrait%20archer%20tough%20guy&image_size=square', role: '克林特·巴顿/鹰眼' },
      { id: 18, name: '马克·鲁法洛', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mark%20ruffalo%20hulk%20actor%20portrait%20scientist%20friendly%20smile&image_size=square', role: '布鲁斯·班纳/绿巨人' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.5 GB', url: '#' },
      { quality: '720p', size: '3.0 GB', url: '#' },
      { quality: '1080p', size: '5.5 GB', url: '#' }
    ]
  },
  {
    id: 4,
    title: '阿凡达',
    originalTitle: 'Avatar',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avatar%20movie%20poster%20pandora%20planet%20na%27vi%20blue%20aliens%20luminous%20forest%20epic%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avatar%20pandora%20planet%20luminous%20forest%20bioluminescent%20plants%20floating%20mountains%20epic%20landscape&image_size=landscape_16_9',
    rating: 4.6,
    year: 2009,
    duration: '2h 42m',
    genres: ['科幻', '冒险', '奇幻'],
    description: '杰克·萨利是一位瘫痪的前海军陆战队员，他被选中参加一项特殊任务，将他的意识转移到一个纳美人的"化身"中，以便与潘多拉星球上的纳美人进行交流。但是，当他开始理解纳美人的生活方式并爱上了纳美公主奈蒂莉时，他发现自己陷入了人类与纳美人之间的战争中。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '詹姆斯·卡梅隆',
    releaseDate: '2009-12-18',
    country: '美国',
    actors: [
      { id: 19, name: '萨姆·沃辛顿', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sam%20worthington%20actor%20portrait%20australian%20tough%20guy%20serious%20expression&image_size=square', role: '杰克·萨利' },
      { id: 20, name: '佐伊·索尔达娜', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zoe%20saldana%20actress%20portrait%20beautiful%20exotic%20strong%20woman&image_size=square', role: '奈蒂莉' },
      { id: 21, name: '西格妮·韦弗', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sigourney%20weaver%20actress%20portrait%20elegant%20strong%20female%20scientist&image_size=square', role: '格蕾丝·奥古斯汀博士' },
      { id: 22, name: '史蒂芬·朗', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stephen%20lang%20actor%20portrait%20military%20officer%20tough%20sergeant&image_size=square', role: '迈尔斯·夸奇上校' },
      { id: 23, name: '米歇尔·罗德里格兹', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=michelle%20rodriguez%20actress%20portrait%20tough%20female%20pilot%20action%20hero&image_size=square', role: '楚蒂·查孔' },
      { id: 24, name: '乔瓦尼·瑞比西', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=giovanni%20ribisi%20actor%20portrait%20corporate%20executive%20greedy%20businessman&image_size=square', role: '帕克·塞尔弗里奇' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.1 GB', url: '#' },
      { quality: '720p', size: '2.4 GB', url: '#' },
      { quality: '1080p', size: '4.7 GB', url: '#' }
    ]
  },
  {
    id: 5,
    title: '黑暗骑士',
    originalTitle: 'The Dark Knight',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20knight%20batman%20movie%20poster%20joker%20gotham%20city%20dark%20gritty%20cinematic%20black%20blue&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20knight%20gotham%20city%20skyline%20night%20dark%20gritty%20urban%20landscape%20batman%20silhouette&image_size=landscape_16_9',
    rating: 4.9,
    year: 2008,
    duration: '2h 32m',
    genres: ['动作', '犯罪', '剧情'],
    description: '蝙蝠侠、戈登警长和检察官哈维·登特组成的三人联盟正在清除哥谭市的有组织犯罪。然而，他们很快发现自己陷入了一场由崛起的犯罪天才小丑掀起的混乱之中，小丑将哥谭市民置于疯狂的境地。这部电影重新定义了超级英雄电影的深度和黑暗现实主义。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '克里斯托弗·诺兰',
    releaseDate: '2008-07-18',
    country: '美国',
    actors: [
      { id: 25, name: '克里斯蒂安·贝尔', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=christian%20bale%20batman%20actor%20portrait%20intense%20dark%20brooding%20hero&image_size=square', role: '布鲁斯·韦恩/蝙蝠侠' },
      { id: 26, name: '希斯·莱杰', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=heath%20ledger%20joker%20actor%20portrait%20chaotic%20evil%20smile%20dark%20makeup&image_size=square', role: '小丑' },
      { id: 27, name: '亚伦·艾克哈特', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=aaron%20eckhart%20two%20face%20actor%20portrait%20district%20attorney%20noble%20then%20tragic&image_size=square', role: '哈维·登特/双面人' },
      { id: 28, name: '迈克尔·凯恩', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=michael%20caine%20alfred%20actor%20portrait%20elderly%20butler%20wise%20loyal&image_size=square', role: '阿尔弗雷德' },
      { id: 29, name: '玛吉·吉伦哈尔', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maggie%20gyllenhaal%20actress%20portrait%20rachel%20dawes%20strong%20female%20lawyer&image_size=square', role: '瑞秋·道斯' },
      { id: 30, name: '加里·奥德曼', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gary%20oldman%20commissioner%20gordon%20actor%20portrait%20honest%20cop%20tired%20but%20determined&image_size=square', role: '吉姆·戈登' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.0 GB', url: '#' },
      { quality: '720p', size: '2.1 GB', url: '#' },
      { quality: '1080p', size: '4.2 GB', url: '#' }
    ]
  },
  {
    id: 6,
    title: '泰坦尼克号',
    originalTitle: 'Titanic',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=titanic%20movie%20poster%20romantic%20epic%20jack%20and%20rose%20ship%20ocean%20sunset%20dramatic%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=titanic%20ship%20sinking%20ocean%20night%20dramatic%20scene%20iceberg%20dark%20blue%20cinematic&image_size=landscape_16_9',
    rating: 4.7,
    year: 1997,
    duration: '3h 14m',
    genres: ['剧情', '爱情', '灾难'],
    description: '1912年4月10日，号称"世界工业史上的奇迹"的豪华客轮泰坦尼克号开始了自己的处女航，从英国驶向美国纽约。富家少女罗丝与母亲及未婚夫卡尔坐上了头等舱；另一边，放荡不羁的少年画家杰克也在码头的一场赌博中赢得了下等舱的船票。罗丝厌倦了上流社会虚伪的生活，不愿嫁给卡尔，打算投海自尽，被杰克救起。很快，美丽活泼的罗丝与英俊开朗的杰克相爱，杰克带罗丝参加下等舱的舞会、为她画像，二人的感情逐渐升温。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '詹姆斯·卡梅隆',
    releaseDate: '1997-12-19',
    country: '美国',
    actors: [
      { id: 31, name: '莱昂纳多·迪卡普里奥', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20leonardo%20dicaprio%20jack%20dawson%20handsome%20romantic%20artist%20portrait&image_size=square', role: '杰克·道森' },
      { id: 32, name: '凯特·温斯莱特', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kate%20winslet%20rose%20dewit%20bukater%20beautiful%20elegant%20romantic%20actress%20portrait&image_size=square', role: '罗丝·德威特·布克特' },
      { id: 33, name: '比利·赞恩', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=billy%20zane%20caledon%20hockley%20rich%20arrogant%20businessman%20actor%20portrait&image_size=square', role: '卡尔·霍克利' },
      { id: 34, name: '凯西·贝茨', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kathy%20bates%20molly%20brown%20tough%20warm%20hearted%20actress%20portrait&image_size=square', role: '莫莉·布朗' },
      { id: 35, name: '弗兰西斯·费舍', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=frances%20fisher%20ruth%20dewit%20bukater%20strict%20mother%20actress%20portrait&image_size=square', role: '露丝·德威特·布克特' },
      { id: 36, name: '格洛丽亚·斯图尔特', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gloria%20stuart%20old%20rose%20elderly%20wise%20woman%20actress%20portrait&image_size=square', role: '老年罗丝' }
    ],
    downloadLinks: [
      { quality: '480p', size: '1.3 GB', url: '#' },
      { quality: '720p', size: '2.8 GB', url: '#' },
      { quality: '1080p', size: '5.2 GB', url: '#' }
    ]
  },
  {
    id: 7,
    title: '哈利·波特与死亡圣器(下)',
    originalTitle: 'Harry Potter and the Deathly Hallows: Part 2',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=harry%20potter%20deathly%20hallows%20part%202%20movie%20poster%20wizard%20battle%20hogwarts%20dark%20magical%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hogwarts%20castle%20battle%20scene%20harry%20potter%20wizards%20fighting%20dark%20magic%20epic%20cinematic&image_size=landscape_16_9',
    rating: 4.8,
    year: 2011,
    duration: '2h 10m',
    genres: ['奇幻', '冒险', '剧情'],
    description: '哈利、罗恩和赫敏继续他们的任务，寻找并摧毁伏地魔的魂器——这是他不朽的关键。随着黑魔王的力量日益增长，三人组必须面对他们最黑暗的恐惧。在霍格沃茨的最终战斗中，哈利·波特将与伏地魔进行最后的对决，决定魔法世界的命运。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '大卫·叶茨',
    releaseDate: '2011-07-15',
    country: '英国、美国',
    actors: [
      { id: 37, name: '丹尼尔·雷德克里夫', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=daniel%20radcliffe%20harry%20potter%20actor%20portrait%20wizard%20glasses%20scar%20brave%20hero&image_size=square', role: '哈利·波特' },
      { id: 38, name: '艾玛·沃特森', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=emma%20watson%20hermione%20granger%20actress%20portrait%20intelligent%20brave%20witch%20beautiful&image_size=square', role: '赫敏·格兰杰' },
      { id: 39, name: '鲁伯特·格林特', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rupert%20grint%20ron%20weasley%20actor%20portrait%20red%20hair%20loyal%20friend%20wizard&image_size=square', role: '罗恩·韦斯莱' },
      { id: 40, name: '拉尔夫·费因斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ralph%20fiennes%20lord%20voldemort%20actor%20portrait%20dark%20evil%20wizard%20menacing&image_size=square', role: '伏地魔' },
      { id: 41, name: '艾伦·瑞克曼', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alan%20rickman%20severus%20snape%20actor%20portrait%20mysterious%20dark%20potions%20master&image_size=square', role: '西弗勒斯·斯内普' },
      { id: 42, name: '玛吉·史密斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=maggie%20smith%20professor%20mcgonagall%20actress%20portrait%20wise%20strict%20witch&image_size=square', role: '米勒娃·麦格' }
    ],
    downloadLinks: [
      { quality: '480p', size: '0.9 GB', url: '#' },
      { quality: '720p', size: '2.0 GB', url: '#' },
      { quality: '1080p', size: '4.0 GB', url: '#' }
    ]
  },
  {
    id: 8,
    title: '心灵奇旅',
    originalTitle: 'Soul',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soul%20movie%20poster%20pixar%20animation%20jazz%20musician%20colorful%20souls%20new%20york%20city%20warm%20cinematic&image_size=portrait_4_3',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soul%20movie%20great%20before%20landscape%20colorful%20ethereal%20souls%20abstract%20beautiful%20cinematic&image_size=landscape_16_9',
    rating: 4.8,
    year: 2020,
    duration: '1h 40m',
    genres: ['动画', '奇幻', '音乐'],
    description: '乔伊·高纳是一位中学音乐老师，他一直梦想成为一名爵士乐手。当他终于获得梦寐以求的演出机会时，却发生了意外，他的灵魂与身体分离，被送到了"生之来处"——一个灵魂获得个性、兴趣和热情的奇幻世界。在那里，乔伊遇到了22号，一个对人类生活毫无兴趣的灵魂。为了回到地球，乔伊必须帮助22号找到她的"火花"——让生命值得活下去的理由。',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    director: '彼特·道格特',
    releaseDate: '2020-12-25',
    country: '美国',
    actors: [
      { id: 43, name: '杰米·福克斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jamie%20foxx%20actor%20portrait%20musician%20charismatic%20smile%20talented&image_size=square', role: '乔伊·高纳 (配音)' },
      { id: 44, name: '蒂娜·菲', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tina%20fey%20actress%20portrait%20comedian%20intelligent%20funny%20warm&image_size=square', role: '22号 (配音)' },
      { id: 45, name: '格拉汉姆·诺顿', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=graham%20norton%20talk%20show%20host%20portrait%20charming%20irish%20comedian&image_size=square', role: 'Moonwind (配音)' },
      { id: 46, name: '瑞切尔·豪斯', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rachel%20house%20actress%20portrait%20maori%20strong%20presence%20authoritative&image_size=square', role: 'Terry (配音)' },
      { id: 47, name: '菲丽西提·霍夫曼', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=felicity%20hoffman%20actress%20portrait%20warm%20motherly%20kind%20expression&image_size=square', role: 'Libba (配音)' },
      { id: 48, name: '戴夫·迪格', avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=daveed%20diggs%20actor%20portrait%20rapper%20cool%20stylish%20talented&image_size=square', role: 'Paul (配音)' }
    ],
    downloadLinks: [
      { quality: '480p', size: '0.7 GB', url: '#' },
      { quality: '720p', size: '1.5 GB', url: '#' },
      { quality: '1080p', size: '3.0 GB', url: '#' }
    ]
  }
]

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    movieId: 1,
    title: '星际穿越',
    subtitle: '穿越虫洞，寻找人类的新家园',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20space%20scene%20black%20hole%20stars%20galaxy%20epic%20sci%20fi%20movie%20backdrop%20dark%20blue%20purple%20hero%20wide&image_size=landscape_16_9',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20fiction%20movie%20poster%20interstellar%20space%20exploration%20epic%20cinematic%20dark%20blue%20black%20stars%20galaxy&image_size=portrait_4_3'
  },
  {
    id: 2,
    movieId: 2,
    title: '盗梦空间',
    subtitle: '你的思维是犯罪现场',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=inception%20movie%20backdrop%20folding%20city%20dream%20landscape%20surreal%20architecture%20dark%20blue%20cinematic%20hero%20wide&image_size=landscape_16_9',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mind%20bending%20movie%20poster%20inception%20dream%20world%20city%20folding%20upside%20down%20dark%20mysterious%20cinematic&image_size=portrait_4_3'
  },
  {
    id: 3,
    movieId: 3,
    title: '复仇者联盟：终局之战',
    subtitle: '无论付出什么代价',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avengers%20endgame%20battle%20scene%20marvel%20cinematic%20universe%20epic%20war%20dark%20dramatic%20lighting%20hero%20wide&image_size=landscape_16_9',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=avengers%20endgame%20movie%20poster%20marvel%20superheroes%20assembled%20epic%20battle%20dark%20blue%20purple%20cinematic&image_size=portrait_4_3'
  },
  {
    id: 4,
    movieId: 5,
    title: '黑暗骑士',
    subtitle: '为什么如此严肃？',
    backdrop: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20knight%20gotham%20city%20skyline%20night%20dark%20gritty%20urban%20landscape%20batman%20silhouette%20hero%20wide&image_size=landscape_16_9',
    poster: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20knight%20batman%20movie%20poster%20joker%20gotham%20city%20dark%20gritty%20cinematic%20black%20blue&image_size=portrait_4_3'
  }
]

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id)
}

export const searchMovies = (query: string): Movie[] => {
  if (!query.trim()) return movies
  const lowerQuery = query.toLowerCase()
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.originalTitle.toLowerCase().includes(lowerQuery) ||
    movie.genres.some(genre => genre.toLowerCase().includes(lowerQuery)) ||
    movie.director.toLowerCase().includes(lowerQuery)
  )
}
