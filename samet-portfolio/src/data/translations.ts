import type { Translation } from '../types';

export const translations: Record<'en' | 'tr', Translation> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Samet Soysal',
      title: 'Full Stack Developer',
      description: 'Passionate about creating beautiful, functional, and user-friendly web applications. With expertise in modern technologies and a keen eye for design, I transform ideas into digital experiences.',
      viewResume: 'View Resume',
      downloadResume: 'Download Resume'
    },
    about: {
      title: 'About Me',
      content: 'I am a full-stack developer with over 5 years of experience in building web applications. I specialize in React, TypeScript, Node.js, and cloud technologies. I love solving complex problems and creating intuitive user interfaces. When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.'
    },
    experience: {
      title: 'Work Experience',
      items: [
        {
          company: 'Tech Innovations Inc.',
          position: 'Senior Full Stack Developer',
          period: '2022 - Present',
          description: 'Leading development of enterprise applications using React, Node.js, and AWS. Mentoring junior developers and architecting scalable solutions.'
        },
        {
          company: 'Digital Solutions Ltd.',
          position: 'Full Stack Developer',
          period: '2020 - 2022',
          description: 'Developed and maintained multiple client projects using modern web technologies. Implemented CI/CD pipelines and improved development workflows.'
        },
        {
          company: 'Startup Hub',
          position: 'Frontend Developer',
          period: '2018 - 2020',
          description: 'Built responsive web applications using React and Vue.js. Collaborated with designers to create pixel-perfect user interfaces.'
        }
      ]
    },
    projects: {
      title: 'Projects',
      viewLink: 'View Project'
    },
    skills: {
      title: 'Skills'
    },
    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
    visitors: {
      total: 'Total Visitors',
      today: 'Today\'s Visitors'
    },
    resume: {
      views: 'Views',
      downloads: 'Downloads'
    },
    notFound: {
      title: '404 - Page Not Found',
      message: 'The page you are looking for does not exist or has been moved.',
      backHome: 'Back to Home'
    }
  },
  tr: {
    nav: {
      about: 'Hakkımda',
      experience: 'Deneyim',
      projects: 'Projeler',
      skills: 'Yetenekler',
      contact: 'İletişim'
    },
    hero: {
      greeting: 'Merhaba, Ben',
      name: 'Samet Soysal',
      title: 'Full Stack Geliştirici',
      description: 'Güzel, işlevsel ve kullanıcı dostu web uygulamaları oluşturmak için tutkulu. Modern teknolojilerde uzmanlık ve tasarım için keskin bir gözle, fikirleri dijital deneyimlere dönüştürüyorum.',
      viewResume: 'Özgeçmişi Görüntüle',
      downloadResume: 'Özgeçmişi İndir'
    },
    about: {
      title: 'Hakkımda',
      content: '5 yıldan fazla deneyime sahip bir full-stack geliştiriciyim. React, TypeScript, Node.js ve bulut teknolojilerinde uzmanım. Karmaşık sorunları çözmeyi ve sezgisel kullanıcı arayüzleri oluşturmayı seviyorum. Kod yazmadığım zamanlarda, yeni teknolojileri keşfediyor, açık kaynak projelere katkıda bulunuyor veya geliştirici topluluğuyla bilgi paylaşıyorum.'
    },
    experience: {
      title: 'İş Deneyimi',
      items: [
        {
          company: 'Tech Innovations Inc.',
          position: 'Kıdemli Full Stack Geliştirici',
          period: '2022 - Günümüz',
          description: 'React, Node.js ve AWS kullanarak kurumsal uygulamaların geliştirilmesini yönetmek. Geliştiricilere mentorluk yapmak ve ölçeklenebilir çözümler tasarlamak.'
        },
        {
          company: 'Digital Solutions Ltd.',
          position: 'Full Stack Geliştirici',
          period: '2020 - 2022',
          description: 'Modern web teknolojileri kullanarak birden fazla müşteri projesini geliştirmek ve sürdürmek. CI/CD boru hatları uygulamak ve geliştirme iş akışlarını iyileştirmek.'
        },
        {
          company: 'Startup Hub',
          position: 'Frontend Geliştirici',
          period: '2018 - 2020',
          description: 'React ve Vue.js kullanarak duyarlı web uygulamaları oluşturmak. Tasarımcılarla işbirliği yaparak mükemmel kullanıcı arayüzleri oluşturmak.'
        }
      ]
    },
    projects: {
      title: 'Projeler',
      viewLink: 'Projeyi Görüntüle'
    },
    skills: {
      title: 'Yetenekler'
    },
    contact: {
      title: 'İletişime Geçin',
      name: 'Ad',
      email: 'E-posta',
      message: 'Mesaj',
      send: 'Mesaj Gönder'
    },
    visitors: {
      total: 'Toplam Ziyaretçi',
      today: 'Bugünkü Ziyaretçi'
    },
    resume: {
      views: 'Görüntülenme',
      downloads: 'İndirme'
    },
    notFound: {
      title: '404 - Sayfa Bulunamadı',
      message: 'Aradığınız sayfa mevcut değil veya taşınmış.',
      backHome: 'Ana Sayfaya Dön'
    }
  }
};
