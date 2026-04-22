// DOM元素引用
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const downloadResume = document.getElementById('downloadResume');

// 主题管理
const ThemeManager = {
    // 从localStorage获取保存的主题，或使用系统偏好
    getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // 检查系统偏好
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    // 应用主题
    applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            htmlElement.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
        }
        // 保存到localStorage
        localStorage.setItem('theme', theme);
    },

    // 切换主题
    toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        // 添加过渡动画
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    },

    // 初始化主题
    init() {
        const preferredTheme = this.getPreferredTheme();
        this.applyTheme(preferredTheme);
        
        // 监听系统主题变化（当没有保存的主题时）
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
};

// 导航菜单管理
const NavigationManager = {
    // 切换汉堡菜单
    toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // 阻止页面滚动
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },

    // 关闭菜单
    closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    },

    // 初始化导航
    init() {
        // 汉堡菜单点击事件
        hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // 导航链接点击事件（关闭菜单）
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });

        // 窗口大小变化时关闭菜单
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
};

// 平滑滚动管理
const ScrollManager = {
    // 平滑滚动到指定元素
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // 减去导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },

    // 初始化平滑滚动
    init() {
        // 处理所有锚点链接
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                if (target !== '#') {
                    this.smoothScrollTo(target);
                }
            });
        });

        // 导航栏滚动效果
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 滚动时添加阴影效果
            if (scrollTop > 10) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
};

// 表单管理
const FormManager = {
    // 显示通知消息
    showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // 根据类型设置背景色
        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#ef4444';
            notification.style.color = 'white';
        }
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // 自动关闭
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    // 验证表单
    validateForm(formData) {
        const errors = [];
        
        // 验证姓名
        if (!formData.name || formData.name.trim() === '') {
            errors.push('请输入您的姓名');
        }
        
        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.push('请输入有效的邮箱地址');
        }
        
        // 验证主题
        if (!formData.subject || formData.subject.trim() === '') {
            errors.push('请输入主题');
        }
        
        // 验证消息
        if (!formData.message || formData.message.trim() === '') {
            errors.push('请输入您的消息');
        }
        
        return errors;
    },

    // 处理表单提交
    handleSubmit(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 验证表单
        const errors = this.validateForm(formData);
        
        if (errors.length > 0) {
            // 显示错误通知
            this.showNotification(errors[0], 'error');
            return;
        }
        
        // 模拟提交
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // 显示加载状态
        submitBtn.innerHTML = '<span class="loading"></span> 发送中...';
        submitBtn.disabled = true;
        
        // 模拟网络请求
        setTimeout(() => {
            // 恢复按钮状态
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // 显示成功通知
            this.showNotification('消息发送成功！我会尽快回复您。', 'success');
            
            // 重置表单
            contactForm.reset();
        }, 1500);
    },

    // 初始化表单
    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        }
    }
};

// 简历下载管理
const ResumeManager = {
    // 创建模拟简历内容
    createResumeContent() {
        return `
ALFITKA HAERUL KURNIAWAN
Frontend Developer

===============================================================================
CONTACT INFORMATION
===============================================================================
Email: alfitka.haerul@gmail.com
LinkedIn: linkedin.com/in/alfitkahaerul
GitHub: github.com/alfitkahaerul
Location: Indonesia

===============================================================================
PROFESSIONAL SUMMARY
===============================================================================
Experienced Frontend Developer with over 5 years of experience building 
responsive, user-friendly web applications. Specialized in modern JavaScript 
frameworks, CSS preprocessors, and design systems. Passionate about creating 
seamless user experiences and staying up-to-date with the latest web technologies.

===============================================================================
TECHNICAL SKILLS
===============================================================================
- Frontend: HTML5, CSS3, JavaScript (ES6+), React, Vue.js, TypeScript
- Styling: Tailwind CSS, SASS/SCSS, Styled Components, CSS Modules
- Tools: Git, Webpack, Vite, npm/yarn, Figma, Adobe XD
- Backend: Node.js, Express.js, RESTful APIs
- Databases: MongoDB, PostgreSQL, Firebase
- Testing: Jest, React Testing Library, Cypress
- Other: Responsive Design, Accessibility, Performance Optimization, SEO

===============================================================================
WORK EXPERIENCE
===============================================================================

Senior Frontend Developer
Tech Innovations Inc.
2023 - Present

- Lead a team of 5 frontend developers in building complex web applications
- Implemented responsive design systems that improved user experience by 40%
- Mentored junior developers and conducted code reviews to maintain code quality
- Introduced modern development practices and tools that increased team productivity by 30%

Frontend Developer
Digital Solutions Ltd.
2021 - 2023

- Developed and maintained multiple client-facing web applications
- Collaborated with UX designers to implement pixel-perfect designs
- Optimized application performance, reducing load times by 50%
- Integrated third-party APIs and payment gateways into existing applications

Junior Frontend Developer
WebCraft Agency
2020 - 2021

- Assisted in developing responsive websites for various clients
- Implemented UI components using modern CSS frameworks
- Participated in daily stand-ups and agile development processes
- Learned and applied best practices for code quality and version control

Frontend Intern
Startup Hub
2019 - 2020

- Assisted senior developers with frontend development tasks
- Learned fundamentals of HTML, CSS, and JavaScript
- Created static web pages and simple interactive components
- Participated in code reviews and team meetings

===============================================================================
PROJECTS
===============================================================================

1. E-commerce Platform
- A fully responsive e-commerce platform with product listing, cart functionality, and checkout process
- Built with React and Redux for state management
- Technologies: React, Redux, Node.js, MongoDB, CSS3

2. Task Management App
- A collaborative task management application with drag-and-drop functionality
- Features team collaboration and real-time updates
- Technologies: Vue.js, Firebase, CSS3, Socket.io

3. Analytics Dashboard
- A comprehensive analytics dashboard with interactive charts
- Features data visualization and customizable widgets
- Technologies: React, D3.js, CSS3, REST APIs

4. Mobile-First Social App
- A mobile-first social networking application
- Features real-time messaging, post sharing, and user profiles
- Technologies: React Native, Node.js, PostgreSQL, Socket.io

===============================================================================
EDUCATION
===============================================================================
Bachelor of Computer Science
University of Technology
2015 - 2019

- Major: Software Engineering
- GPA: 3.8/4.0
- Relevant Coursework: Web Development, Software Engineering, Database Systems, 
  Human-Computer Interaction, Algorithms and Data Structures

===============================================================================
CERTIFICATIONS
===============================================================================
- AWS Certified Cloud Practitioner
- Google Mobile Web Specialist
- React Developer Certification (Meta)
- Frontend Development Libraries (freeCodeCamp)

===============================================================================
LANGUAGES
===============================================================================
- Indonesian (Native)
- English (Fluent)
- Japanese (Basic)

===============================================================================
`;
    },

    // 下载简历
    downloadResume() {
        const resumeContent = this.createResumeContent();
        
        // 创建Blob对象
        const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Alfitka_Haerul_Kurniawan_Resume.txt';
        
        // 触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL对象
        URL.revokeObjectURL(url);
        
        // 显示通知
        FormManager.showNotification('简历下载已开始！', 'success');
    },

    // 初始化
    init() {
        if (downloadResume) {
            downloadResume.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadResume();
            });
        }
    }
};

// 滚动动画管理
const AnimationManager = {
    // 检查元素是否在视口中
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    },

    // 添加滚动动画
    addScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .experience-item, .skill-tag');
        
        const handleScroll = () => {
            animatedElements.forEach(element => {
                if (this.isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // 初始设置
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // 监听滚动
        window.addEventListener('scroll', handleScroll);
        
        // 初始检查
        handleScroll();
    },

    // 初始化
    init() {
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', () => {
            this.addScrollAnimations();
        });
    }
};

// 主初始化函数
function init() {
    // 初始化主题管理
    ThemeManager.init();
    
    // 初始化导航管理
    NavigationManager.init();
    
    // 初始化平滑滚动
    ScrollManager.init();
    
    // 初始化表单管理
    FormManager.init();
    
    // 初始化简历下载
    ResumeManager.init();
    
    // 初始化动画
    AnimationManager.init();
    
    // 主题切换按钮事件
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            ThemeManager.toggleTheme();
        });
    }
    
    console.log('Portfolio website initialized successfully!');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 为所有按钮添加点击波纹效果
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹元素
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            // 确保按钮有相对定位
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            this.appendChild(ripple);
            
            // 动画结束后移除波纹
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 添加波纹动画样式
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});