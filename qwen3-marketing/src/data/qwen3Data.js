export const qwen3Data = {
  modelName: "Qwen 3",
  developer: "阿里巴巴",
  description: "阿里巴巴集团最新一代大语言模型，采用双路径架构，提供卓越的推理能力和编码性能。",
  
  trainingInfo: {
    supportedLanguages: 110,
    trainingTokens: "50T",
    modelSizes: ["0.6B", "235B"]
  },
  
  architecture: {
    dualPath: {
      denseModel: {
        name: "Dense Model",
        description: "高效的密集型模型，适用于快速响应场景，提供出色的基础推理能力。",
        features: ["快速推理", "低延迟", "高效内存使用"]
      },
      moeModel: {
        name: "MoE Model",
        description: "混合专家架构模型，在复杂任务上表现卓越，提供增强的推理和编码能力。",
        features: ["专家级性能", "灵活激活", "高效计算"]
      }
    },
    modelVariants: [
      {
        size: "0.6B",
        type: "Dense",
        useCase: "轻量级部署，边缘计算",
        performance: "基础推理任务"
      },
      {
        size: "235B",
        type: "MoE",
        useCase: "复杂任务，企业级应用",
        performance: "顶级推理和编码能力"
      }
    ]
  },
  
  keyFeatures: {
    hybridReasoning: {
      title: "混合推理系统",
      description: "Qwen 3 采用创新的混合推理架构，支持两种不同的推理模式，满足各种应用场景需求。",
      modes: [
        {
          name: "快速响应模式",
          description: "针对简单查询优化，提供低延迟、高吞吐量的响应，适合实时交互场景。"
        },
        {
          name: "详细思考模式",
          description: "针对复杂任务设计，模拟深度思考过程，提供更准确、更全面的解答。"
        }
      ]
    },
    moeArchitecture: {
      title: "MoE 架构",
      description: "混合专家架构让模型能够根据任务类型激活不同的专家网络，在保持高效计算的同时提供卓越性能。"
    },
    capabilities: [
      {
        name: "增强推理",
        description: "在复杂逻辑推理、多步推理任务上表现优异，能够处理需要深度思考的问题。",
        icon: "🧠"
      },
      {
        name: "先进编码",
        description: "支持多种编程语言，提供代码生成、代码理解、代码调试等全方位编程能力。",
        icon: "💻"
      },
      {
        name: "数学求解",
        description: "在数学问题求解上达到业界领先水平，能够处理复杂的数学计算和证明。",
        icon: "📐"
      },
      {
        name: "多语言支持",
        description: "支持 110+ 种语言，包括多种低资源语言，提供出色的跨语言理解和生成能力。",
        icon: "🌍"
      },
      {
        name: "上下文理解",
        description: "强大的上下文理解能力，能够处理长文档、复杂对话和多轮交互。",
        icon: "📚"
      },
      {
        name: "知识整合",
        description: "整合海量知识，提供准确、全面的信息检索和问答能力。",
        icon: "🔍"
      }
    ]
  },
  
  performance: {
    benchmarks: [
      {
        category: "编码能力",
        score: 95.2,
        maxScore: 100,
        description: "在代码生成、理解和调试任务上的综合评分"
      },
      {
        category: "数学能力",
        score: 93.7,
        maxScore: 100,
        description: "在数学问题求解、逻辑推理任务上的综合评分"
      },
      {
        category: "推理能力",
        score: 94.5,
        maxScore: 100,
        description: "在复杂推理、多步逻辑任务上的综合评分"
      }
    ],
    competitors: [
      {
        name: "OpenAI o3",
        comparison: "Qwen 3 在中文理解、多语言支持和数学推理方面表现更优",
        highlights: ["中文理解优势明显", "数学推理能力相当", "多语言支持更全面"]
      },
      {
        name: "Google Gemini 2.5 Pro",
        comparison: "Qwen 3 在编码能力和数学求解上具有竞争优势",
        highlights: ["编码效率更高", "数学问题解决能力更强", "响应速度更快"]
      }
    ],
    highlights: [
      "在主流基准测试中达到或超越业界领先水平",
      "中文理解和生成能力处于顶尖水平",
      "编码和数学能力在同类模型中表现卓越",
      "双路径架构提供灵活的性能-效率平衡"
    ]
  },
  
  externalLinks: {
    tongyi: "https://tongyi.aliyun.com/",
    qwenChat: "https://chat.qwen.ai/"
  }
};