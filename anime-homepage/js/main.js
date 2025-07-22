// ===== DOM 元素获取 =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillCards = document.querySelectorAll('.skill-card');
const form = document.querySelector('.form');

// ===== 页面加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollAnimations();
    initSkillProgress();
    initFormHandler();
    initFloatingElements();
    initTypingEffect();
    initParticleSystem();
    
    // 页面加载动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== 导航栏功能 =====
function initNavigation() {
    // 移动端菜单切换
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击菜单项关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== 平滑滚动功能 =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // 考虑导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 为导航链接添加平滑滚动
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===== 滚动动画 =====
function initScrollAnimations() {
    // 创建 Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是技能卡片，触发进度条动画
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(`
        .about-card,
        .skill-card,
        .project-card,
        .contact-item,
        .interest-item,
        .stat-item
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== 技能进度条动画 =====
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const fill = bar.querySelector('.progress-fill');
        
        // 当技能卡片进入视图时，动画已通过 CSS 类控制
        // 这里可以添加额外的逻辑
    });
}

// ===== 表单处理 =====
function initFormHandler() {
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // 显示成功消息
            showNotification('消息发送成功！感谢您的联系 ✨', 'success');
            
            // 重置表单
            form.reset();
        });
    }
}

// ===== 通知系统 =====
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #ff69b4, #8b5cf6)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        backdrop-filter: blur(20px);
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== 浮动元素动画增强 =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll(`
        .floating-heart,
        .floating-star,
        .floating-cloud,
        .floating-moon
    `);
    
    floatingElements.forEach((element, index) => {
        // 添加鼠标交互
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.5) rotate(20deg)';
            element.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.7))';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.filter = '';
        });
        
        // 随机动画延迟
        element.style.animationDelay = `${Math.random() * 3}s`;
    });
}

// ===== 打字机效果增强 =====
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        '一个热爱二次元文化的创作者 ✨',
        '追求美好与梦想的设计师 🌙',
        '用代码编织奇迹的程序员 💫',
        '在二次元世界中寻找灵感 🌸'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000; // 暂停时间
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        
        setTimeout(typeWriter, speed);
    }
    
    // 延迟启动打字机效果
    setTimeout(typeWriter, 2000);
}

// ===== 粒子系统 =====
function initParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机属性
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 3 + 2;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #ff69b4, #8b5cf6, #3b82f6);
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            opacity: 0.6;
            pointer-events: none;
            animation: floatUp ${duration}s linear forwards;
        `;
        
        particleContainer.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // 定期创建粒子
    setInterval(createParticle, 2000);
}

// ===== CSS 动画定义 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    body.loaded .fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== 鼠标跟随效果 =====
function initMouseFollower() {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // 创建跟随元素
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.6), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(follower);
    
    // 跟随鼠标
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 10 + 'px';
        follower.style.top = followerY - 10 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
}

// 启用鼠标跟随效果（可选）
// initMouseFollower();

// ===== 页面可见性 API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '(╥﹏╥) 我走了...';
    } else {
        document.title = '✨ 二次元个人主页 ✨';
    }
});

// ===== Easter Egg - konami code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // 创建特效
    const colors = ['#ff69b4', '#8b5cf6', '#3b82f6', '#ffc0cb'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                font-size: 2rem;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 10000;
                animation: sparkleEffect 2s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 50);
    }
    
    showNotification('🎉 发现隐藏彩蛋！你真是个二次元高手！', 'success');
}

// ===== 添加 sparkle 动画 =====
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== 图片加载优化 =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 添加加载动画
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // 错误处理
        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            img.alt = '图片加载失败 (´･ω･`)';
        });
    });
});

// ===== 性能优化 =====
// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 应用节流到滚动事件
window.addEventListener('scroll', throttle(() => {
    // 滚动相关逻辑已在其他地方处理
}, 16)); // 约60fps

// ===== 导出函数供全局使用 =====
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;

console.log('🌸 二次元世界已加载完成！欢迎来到 Miku 的世界～ ✨');
