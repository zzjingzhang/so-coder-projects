import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Briefcase,
  ArrowRight,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useScrollAnimationMulti } from '@/hooks/useScrollAnimation';

// 团队成员数据
const teamMembers = [
  {
    name: '张创意',
    role: '创始人 & 创意总监',
    bio: '拥有15年品牌设计经验，曾服务于多家世界500强企业。',
    specialties: ['品牌策略', '视觉设计', '创意指导']
  },
  {
    name: '李设计',
    role: 'UI/UX 设计主管',
    bio: '专注于用户体验设计，擅长将复杂的问题转化为简洁优雅的解决方案。',
    specialties: ['用户研究', '交互设计', '原型设计']
  },
  {
    name: '王开发',
    role: '技术总监',
    bio: '全栈开发专家，热衷于探索前沿技术，致力于打造高性能的数字产品。',
    specialties: ['React', 'TypeScript', '系统架构']
  },
  {
    name: '刘运营',
    role: '项目管理',
    bio: '经验丰富的项目经理，擅长协调团队协作，确保项目高质量交付。',
    specialties: ['敏捷开发', '团队管理', '客户沟通']
  },
  {
    name: '陈视觉',
    role: '视觉设计师',
    bio: '毕业于顶尖设计院校，擅长品牌视觉和动效设计，作品曾获多项国际设计大奖。',
    specialties: ['品牌视觉', '动效设计', '插画']
  },
  {
    name: '赵前端',
    role: '高级前端工程师',
    bio: '专注于现代前端技术栈，热衷于创造流畅的用户界面和交互体验。',
    specialties: ['React', 'Vue', '现代CSS']
  }
];

// 价值观数据
const values = [
  {
    icon: Target,
    title: '追求卓越',
    description: '我们不满足于平庸，每一个项目我们都追求卓越的品质和创新的解决方案。'
  },
  {
    icon: Heart,
    title: '客户至上',
    description: '客户的成功就是我们的成功。我们倾听、理解客户需求，超越客户期望。'
  },
  {
    icon: Users,
    title: '团队协作',
    description: '我们相信团队的力量。设计师、开发者、项目经理紧密合作，创造最佳成果。'
  },
  {
    icon: Award,
    title: '持续创新',
    description: '设计和技术在不断发展，我们保持学习的热情，探索新的可能。'
  }
];

// 里程碑数据
const milestones = [
  {
    year: '2016',
    title: '公司成立',
    description: 'Avana LLC 在上海成立，专注于品牌设计和网页开发服务。'
  },
  {
    year: '2018',
    title: '业务扩展',
    description: '扩展服务范围，增加 UI/UX 设计和数字营销服务。'
  },
  {
    year: '2020',
    title: '团队壮大',
    description: '团队规模扩大到 20+ 人，服务超过 100 家企业客户。'
  },
  {
    year: '2022',
    title: '国际认可',
    description: '获得多项国际设计大奖，业务扩展到亚太地区。'
  },
  {
    year: '2024',
    title: '持续发展',
    description: '继续专注于创意设计和技术创新，为客户创造更大价值。'
  }
];

const About = () => {
  // 滚动动画
  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const valuesRef = useScrollAnimation({ threshold: 0.1 });
  const teamRef = useScrollAnimation({ threshold: 0.1 });
  const journeyRef = useScrollAnimation({ threshold: 0.1 });
  const ctaRef = useScrollAnimation({ threshold: 0.1 });

  // 团队成员的滚动动画
  const { getItemRef: getTeamItemRef, isItemVisible: isTeamItemVisible } = useScrollAnimationMulti(
    teamMembers.length,
    { threshold: 0.1 }
  );

  // 价值观的滚动动画
  const { getItemRef: getValueItemRef, isItemVisible: isValueItemVisible } = useScrollAnimationMulti(
    values.length,
    { threshold: 0.1 }
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div 
              ref={heroRef.ref}
              className={cn(
                "transition-all duration-700",
                heroRef.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                关于 Avana LLC
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                创意驱动
                <br />
                <span className="text-primary">设计未来</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Avana LLC 是一家专注于创意设计和数字体验的专业团队。自2016年成立以来，我们已经为超过150家企业提供了高质量的设计和开发服务。
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                我们相信，优秀的设计不仅仅是视觉上的美观，更是商业价值的创造。通过深入理解客户需求，结合我们将创意与技术完美融合，为客户打造独特、现代且具有影响力的品牌形象和数字产品。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  <span>联系我们</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/portfolio/web-design"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all"
                >
                  <span>查看作品</span>
                </Link>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20agency%20team%20collaboration%20in%20modern%20office%20space%20with%20designers%20working%20together%20professional%20environment%20red%20accent%20colors&image_size=landscape_16_9"
                  alt="Creative team collaboration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg z-20">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">150+</p>
                    <p className="text-sm text-gray-500">完成项目</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white p-6 rounded-xl shadow-lg z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">120+</p>
                    <p className="text-sm text-gray-500">满意客户</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-white transition-all duration-700",
          valuesRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              我们的价值观
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              驱动我们的核心信念
            </h2>
            <p className="text-gray-600 text-lg">
              这些价值观塑造了我们的企业文化，指导我们的每一个决策和行动。
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                ref={getValueItemRef(index)}
                className={cn(
                  "bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group text-center",
                  isValueItemVisible(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-gray-50 transition-all duration-700",
          teamRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              我们的团队
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              认识我们的团队
            </h2>
            <p className="text-gray-600 text-lg">
              我们是一群充满激情的设计师、开发者和创意者，致力于为客户创造卓越的数字体验。
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                ref={getTeamItemRef(index)}
                className={cn(
                  "bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group",
                  isTeamItemVisible(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                
                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mt-1">
                    {member.role}
                  </p>
                </div>
                
                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                  {member.bio}
                </p>
                
                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section 
        ref={journeyRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-white transition-all duration-700",
          journeyRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              我们的旅程
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              发展历程
            </h2>
            <p className="text-gray-600 text-lg">
              从初创公司到行业领先，我们的成长故事。
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20 transform md:-translate-x-1/2" />
            
            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative flex items-start",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  {/* Content */}
                  <div className={cn(
                    "ml-16 md:ml-0 md:w-5/12",
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  )}>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-primary font-bold text-lg">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden transition-all duration-700",
          ctaRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            准备好与我们合作了吗？
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            无论您是需要全新的品牌形象，还是现代化的网站设计，我们都期待与您一起创造卓越。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
            >
              <span>开始您的项目</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+86 21 8888 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>hello@avana-llc.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
