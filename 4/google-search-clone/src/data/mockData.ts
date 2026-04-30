import type { SearchResult } from '../types/search';

export const generateMockResults = (query: string): SearchResult[] => {
  const baseResults: SearchResult[] = [
    {
      title: `${query} - 维基百科，自由的百科全书`,
      url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      displayLink: 'zh.wikipedia.org',
      snippet: `${query}是一个广泛讨论的话题。本文详细介绍了${query}的历史背景、发展现状以及未来趋势。通过阅读本文，您将全面了解${query}的各个方面...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wikipedia%20logo%20icon%20simple%20minimal&image_size=square_hd'
    },
    {
      title: `${query}入门教程 - 从零开始学习${query}`,
      url: `https://www.example.com/tutorials/${encodeURIComponent(query)}`,
      displayLink: 'www.example.com',
      snippet: `想要学习${query}？这篇入门教程将帮助您从零开始。我们涵盖了${query}的基础知识、核心概念和实践技巧。无论您是初学者还是有一定经验，都能从中获益...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=learning%20tutorial%20education%20icon%20simple&image_size=square_hd'
    },
    {
      title: `${query}最新资讯 - ${query}新闻动态`,
      url: `https://news.example.com/${encodeURIComponent(query)}`,
      displayLink: 'news.example.com',
      snippet: `获取${query}的最新资讯和动态。我们提供关于${query}的实时新闻、深度分析和专家观点。关注${query}的最新发展，了解行业趋势...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=news%20media%20journalism%20icon%20simple&image_size=square_hd'
    },
    {
      title: `如何有效使用${query} - 完整指南`,
      url: `https://guide.example.com/${encodeURIComponent(query)}`,
      displayLink: 'guide.example.com',
      snippet: `本指南将教您如何有效地使用${query}。从基础设置到高级技巧，我们提供了详细的步骤说明和实用建议。掌握${query}的核心功能，提升工作效率...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guide%20manual%20book%20icon%20simple&image_size=square_hd'
    },
    {
      title: `${query}常见问题解答 - FAQ`,
      url: `https://faq.example.com/${encodeURIComponent(query)}`,
      displayLink: 'faq.example.com',
      snippet: `关于${query}的常见问题解答。我们汇总了用户最常问的问题，并提供了详细的解答。如果您在使用${query}时遇到问题，这里可能有您需要的答案...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=faq%20question%20answer%20icon%20simple&image_size=square_hd'
    },
    {
      title: `${query}社区论坛 - 与爱好者交流`,
      url: `https://forum.example.com/${encodeURIComponent(query)}`,
      displayLink: 'forum.example.com',
      snippet: `加入${query}社区论坛，与全球爱好者交流经验。分享您的想法，提出问题，获取帮助。我们的社区活跃友好，是学习${query}的绝佳平台...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forum%20community%20discussion%20icon%20simple&image_size=square_hd'
    },
    {
      title: `${query}视频教程 - B站学习资源`,
      url: `https://space.bilibili.com/${encodeURIComponent(query)}`,
      displayLink: 'space.bilibili.com',
      snippet: `观看${query}相关的视频教程。从入门到精通，我们精选了优质的视频内容。可视化学习让${query}变得更加简单有趣，快速掌握核心技能...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20play%20media%20icon%20simple&image_size=square_hd'
    },
    {
      title: `${query}官方文档 - 权威参考`,
      url: `https://docs.example.com/${encodeURIComponent(query)}`,
      displayLink: 'docs.example.com',
      snippet: `阅读${query}的官方文档，获取最权威的信息。文档包含完整的API参考、使用指南和最佳实践。是深入理解${query}的必备资源...`,
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=document%20file%20paper%20icon%20simple&image_size=square_hd'
    }
  ];

  return baseResults;
};
