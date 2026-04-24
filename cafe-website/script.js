document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素选择
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const searchBtn = document.querySelector('.search-btn');
    const searchPanel = document.querySelector('.search-panel');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchTags = document.querySelectorAll('.search-tag');
    const cartBtn = document.querySelector('.cart-btn');
    const cartPanel = document.querySelector('.cart-panel');
    const cartClose = document.querySelector('.cart-close');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
    const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');

    // 购物车状态
    let cartCount = 3;

    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 点击移动端菜单链接后关闭菜单
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 搜索面板功能
    searchBtn.addEventListener('click', function() {
        searchPanel.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    searchClose.addEventListener('click', function() {
        searchPanel.classList.remove('active');
    });

    // 点击搜索面板外部关闭
    searchPanel.addEventListener('click', function(e) {
        if (e.target === searchPanel) {
            searchPanel.classList.remove('active');
        }
    });

    // 搜索标签点击功能
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = tag.textContent;
            searchInput.focus();
        });
    });

    // ESC 键关闭搜索面板
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (searchPanel.classList.contains('active')) {
                searchPanel.classList.remove('active');
            }
            if (cartPanel.classList.contains('active')) {
                closeCartPanel();
            }
        }
    });

    // 购物车面板功能
    cartBtn.addEventListener('click', function() {
        openCartPanel();
    });

    cartClose.addEventListener('click', function() {
        closeCartPanel();
    });

    function openCartPanel() {
        cartPanel.classList.add('active');
        createCartOverlay();
        document.body.style.overflow = 'hidden';
    }

    function closeCartPanel() {
        cartPanel.classList.remove('active');
        removeCartOverlay();
        document.body.style.overflow = '';
    }

    function createCartOverlay() {
        // 检查是否已存在遮罩层
        if (document.querySelector('.cart-overlay')) {
            document.querySelector('.cart-overlay').classList.add('active');
            return;
        }

        const overlay = document.createElement('div');
        overlay.classList.add('cart-overlay', 'active');
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function() {
            closeCartPanel();
        });
    }

    function removeCartOverlay() {
        const overlay = document.querySelector('.cart-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // 购物车数量增减功能
    document.addEventListener('click', function(e) {
        // 增加数量
        if (e.target.closest('.cart-item-quantity button:last-child') || 
            (e.target.classList.contains('fa-plus'))) {
            const btn = e.target.closest('button') || e.target.parentElement;
            const quantitySpan = btn.parentElement.querySelector('span');
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateCartTotal();
        }

        // 减少数量
        if (e.target.closest('.cart-item-quantity button:first-child') || 
            (e.target.classList.contains('fa-minus'))) {
            const btn = e.target.closest('button') || e.target.parentElement;
            const quantitySpan = btn.parentElement.querySelector('span');
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateCartTotal();
            }
        }

        // 移除购物车项
        if (e.target.closest('.cart-item-remove') || 
            (e.target.classList.contains('fa-trash-alt'))) {
            const btn = e.target.closest('button') || e.target.parentElement;
            const cartItem = btn.closest('.cart-item');
            if (cartItem) {
                // 添加移除动画
                cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    cartItem.remove();
                    updateCartCount(-1);
                    updateCartTotal();
                }, 300);
            }
        }
    });

    // 更新购物车总数
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;

        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const price = parseInt(priceText.replace('¥', ''));
            const quantity = parseInt(item.querySelector('.cart-item-quantity span').textContent);
            total += price * quantity;
        });

        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = '¥' + total;
        }
    }

    // 更新购物车数量
    function updateCartCount(change) {
        cartCount += change;
        if (cartCount < 0) cartCount = 0;
        
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            
            // 如果数量为0，隐藏计数
            if (cartCount === 0) {
                cartCountElement.style.display = 'none';
            } else {
                cartCountElement.style.display = 'flex';
            }
        }
    }

    // 添加到购物车功能
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加动画效果
            const originalText = this.textContent || '加入购物车';
            this.textContent = '已添加!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                if (this.innerHTML.includes('<i')) {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
                } else {
                    this.textContent = originalText;
                }
                this.style.backgroundColor = '';
            }, 1000);
            
            // 更新购物车数量
            updateCartCount(1);
            
            // 显示添加成功的提示
            showNotification('商品已添加到购物车!');
        });
    });

    // 显示通知
    function showNotification(message) {
        // 检查是否已存在通知
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.classList.add('notification');
            document.body.appendChild(notification);
            
            // 添加样式
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '15px 25px';
            notification.style.borderRadius = '8px';
            notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            notification.style.zIndex = '9999';
            notification.style.transform = 'translateX(120%)';
            notification.style.transition = 'transform 0.3s ease';
            notification.style.fontWeight = '500';
        }
        
        notification.textContent = message;
        notification.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
        }, 3000);
    }

    // 菜单标签切换
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的 active 类
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // 给当前标签添加 active 类
            this.classList.add('active');
            
            // 这里可以添加不同菜单类别的内容切换逻辑
            const category = this.getAttribute('data-category');
            console.log('切换到菜单类别:', category);
            
            // 模拟切换效果
            showNotification('已切换到 ' + this.textContent + ' 菜单');
        });
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动时导航栏样式变化
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(22, 33, 62, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.boxShadow = '';
        }
        
        // 更新导航链接的 active 状态
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });

    // 更新导航链接的 active 状态
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有导航链接的 active 类
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 给对应链接添加 active 类
                const activeLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只处理内部链接
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 联系表单提交
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段!');
                return;
            }
            
            // 模拟表单提交
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('消息已成功发送! 我们会尽快回复您。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // 订阅表单提交
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('请输入您的邮箱地址!');
                return;
            }
            
            // 简单的邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('请输入有效的邮箱地址!');
                return;
            }
            
            // 模拟订阅
            showNotification('订阅成功! 感谢您的关注。');
            emailInput.value = '';
        });
    }

    // 结算按钮
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cartItems = document.querySelectorAll('.cart-item');
            
            if (cartItems.length === 0) {
                showNotification('购物车是空的，请先添加商品!');
                return;
            }
            
            this.textContent = '处理中...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('订单提交成功! 感谢您的购买。');
                
                // 清空购物车
                cartItems.forEach(item => item.remove());
                updateCartCount(-cartCount);
                updateCartTotal();
                
                this.textContent = '结算';
                this.disabled = false;
                closeCartPanel();
            }, 2000);
        });
    }

    // 客户评价轮播（简单实现）
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // 移动端显示轮播效果
    function checkMobileTestimonial() {
        if (window.innerWidth <= 768) {
            // 移动端只显示一个评价
            showTestimonial(currentTestimonial);
        } else {
            // 桌面端显示所有评价
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'block';
            });
        }
    }
    
    // 初始化检查
    checkMobileTestimonial();
    
    // 窗口大小变化时检查
    window.addEventListener('resize', checkMobileTestimonial);
    
    // 轮播按钮功能
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            }
        });
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }
        });
    }

    // 自动轮播（移动端）
    let testimonialInterval;
    
    function startAutoSlide() {
        if (window.innerWidth <= 768) {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
    }
    
    function stopAutoSlide() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
    }
    
    // 初始化自动轮播
    startAutoSlide();
    
    // 窗口大小变化时重置自动轮播
    window.addEventListener('resize', function() {
        stopAutoSlide();
        startAutoSlide();
    });

    // 页面加载动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .menu-item, .product-card, .testimonial-card, .location-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 设置初始状态
    document.querySelectorAll('.feature-card, .menu-item, .product-card, .testimonial-card, .location-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 初始检查
    setTimeout(animateOnScroll, 100);
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);

    console.log('Brew & Bean 咖啡馆网站已加载完成!');
});
