let currentSlide = 0;
let slideInterval;
let currentCourse = null;

// Course Data.......
const courseData = {
    'html-css-js': {
        title: 'Complete Web Development',
        difficulty: 'Beginner',
        duration: '40 hours',
        description: 'Master HTML, CSS, and JavaScript to build modern, responsive websites from scratch. This comprehensive course covers everything you need to become a frontend developer.',
        instructor: {
            name: 'John Smith',
            title: 'Senior Frontend Developer',
            bio: 'John has 8+ years of experience building web applications for Fortune 500 companies. He\'s passionate about teaching and has helped thousands of students start their coding careers.'
        },
        objectives: [
            'Build responsive websites with HTML5 and CSS3',
            'Master JavaScript fundamentals and ES6+ features',
            'Create interactive web applications',
            'Use modern development tools and workflows',
            'Deploy websites to production'
        ]
    },
    'python-basics': {
        title: 'Python for Beginners',
        difficulty: 'Beginner',
        duration: '30 hours',
        description: 'Learn Python programming from basics to advanced concepts with real-world projects. Perfect for beginners who want to start their programming journey.',
        instructor: {
            name: 'Sarah Johnson',
            title: 'Data Science Lead',
            bio: 'Sarah has 10+ years in data science and machine learning. Expert in Python, TensorFlow, and statistical analysis.'
        },
        objectives: [
            'Understand Python syntax and fundamentals',
            'Work with data structures and algorithms',
            'Build real-world Python applications',
            'Learn object-oriented programming',
            'Explore Python libraries and frameworks'
        ]
    },
    'react-advanced': {
        title: 'Advanced React Development',
        difficulty: 'Intermediate',
        duration: '50 hours',
        description: 'Build complex React applications with hooks, context, and modern development practices. Take your React skills to the next level.',
        instructor: {
            name: 'John Smith',
            title: 'Senior Frontend Developer',
            bio: 'John has 8+ years of experience building web applications for Fortune 500 companies. He\'s passionate about teaching and has helped thousands of students start their coding careers.'
        },
        objectives: [
            'Master React hooks and context API',
            'Build scalable React applications',
            'Implement state management solutions',
            'Optimize React performance',
            'Deploy React apps to production'
        ]
    },
    'nodejs-express': {
        title: 'Node.js & Express Mastery',
        difficulty: 'Intermediate',
        duration: '45 hours',
        description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn server-side development from scratch.',
        instructor: {
            name: 'Mike Chen',
            title: 'Backend Architect',
            bio: 'Mike has 12+ years designing distributed systems. Specializes in Node.js, microservices, and cloud architecture.'
        },
        objectives: [
            'Build RESTful APIs with Express',
            'Work with databases and MongoDB',
            'Implement authentication and security',
            'Deploy Node.js applications',
            'Handle real-time communication'
        ]
    },
    'react-native': {
        title: 'React Native Mobile Apps',
        difficulty: 'Advanced',
        duration: '60 hours',
        description: 'Create cross-platform mobile applications using React Native and modern tools. Build apps for iOS and Android.',
        instructor: {
            name: 'Emily Rodriguez',
            title: 'Mobile Development Expert',
            bio: 'Emily has 7+ years building mobile apps. Expert in React Native, Flutter, and cross-platform development.'
        },
        objectives: [
            'Build native mobile applications',
            'Handle device features and APIs',
            'Implement navigation and state management',
            'Optimize mobile app performance',
            'Deploy apps to app stores'
        ]
    },
    'data-science': {
        title: 'Data Science with Python',
        difficulty: 'Advanced',
        duration: '70 hours',
        description: 'Master data analysis, visualization, and machine learning with Python libraries. Become a data science professional.',
        instructor: {
            name: 'Sarah Johnson',
            title: 'Data Science Lead',
            bio: 'Sarah has 10+ years in data science and machine learning. Expert in Python, TensorFlow, and statistical analysis.'
        },
        objectives: [
            'Analyze data with pandas and numpy',
            'Create visualizations with matplotlib',
            'Build machine learning models',
            'Work with big data technologies',
            'Deploy ML models to production'
        ]
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupHeroSlider();
    setupCourseFilters();
    setupInstructorFilters();
    setupContactForm();
    setupQuizzes();
    
    // Show home page by default
    showPage('home');
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle...........
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link clicks..........
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Page Navigation..............
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Add fade-in animation
        targetPage.classList.add('fade-in');
        setTimeout(() => {
            targetPage.classList.remove('fade-in');
        }, 500);
    }

    // Update navigation
    updateNavigation(pageId);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activePageId}`) {
            link.classList.add('active');
        }
    });
}

// Hero Slider Setup
function setupHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Auto-play slider
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });

    // Start the slider
    startSlider();

    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
}

// Course Filters
function setupCourseFilters() {
    const filterBtns = document.querySelectorAll('.course-filters .filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('slide-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Instructor Filters
function setupInstructorFilters() {
    const filterBtns = document.querySelectorAll('.instructor-filters .filter-btn');
    const instructorCards = document.querySelectorAll('.instructors-grid .instructor-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter instructors
            instructorCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('slide-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Course Detail
function showCourseDetail(courseId) {
    currentCourse = courseId;
    const course = courseData[courseId];
    
    if (!course) return;
    
    // Update course detail content
    document.getElementById('course-detail-title').textContent = course.title;
    document.getElementById('course-detail-difficulty').textContent = course.difficulty;
    document.getElementById('course-detail-difficulty').className = `difficulty ${course.difficulty.toLowerCase()}`;
    document.getElementById('course-detail-duration').textContent = course.duration;
    document.getElementById('course-detail-description').textContent = course.description;
    
    // Update learning objectives
    const objectivesList = document.getElementById('course-learning-objectives');
    objectivesList.innerHTML = course.objectives.map(obj => `<li>${obj}</li>`).join('');
    
    // Update instructor info
    document.getElementById('course-instructor-name').textContent = course.instructor.name;
    document.getElementById('course-instructor-title').textContent = course.instructor.title;
    document.getElementById('course-instructor-bio').textContent = course.instructor.bio;
    
    // Show course detail page
    showPage('course-detail');
}

// Enrollment
function enrollInCourse() {
    if (!currentCourse) return;
    
    // Simulate enrollment
    showNotification('Successfully enrolled in course! Welcome to your learning journey.', 'success');
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
        showPage('dashboard');
    }, 2000);
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Quiz Setup
function setupQuizzes() {
    const checkAnswerBtns = document.querySelectorAll('.check-answer-btn');
    
    checkAnswerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            const selectedAnswer = question.querySelector('input[type="radio"]:checked');
            
            if (!selectedAnswer) {
                showNotification('Please select an answer first.', 'warning');
                return;
            }
            
            // Check if answer is correct (email is the correct answer)
            const isCorrect = selectedAnswer.value === 'email';
            
            if (isCorrect) {
                showNotification('Correct! Great job!', 'success');
                this.textContent = 'Correct! ✓';
                this.style.background = 'var(--success-color)';
            } else {
                showNotification('Not quite right. The correct answer is "email".', 'error');
                this.textContent = 'Try Again';
            }
            
            this.disabled = true;
        });
    });
}

// Lesson Navigation
function nextLesson() {
    showNotification('Moving to next lesson...', 'success');
    // In a real app, this would load the next lesson content
}

function previousLesson() {
    showNotification('Going back to previous lesson...', 'success');
    // In a real app, this would load the previous lesson content
}

// Lesson Selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lesson')) {
        const lessonNumber = e.target.getAttribute('data-lesson');
        
        // Update current lesson
        document.querySelectorAll('.lesson').forEach(lesson => {
            lesson.classList.remove('current');
        });
        e.target.classList.add('current');
        
        // Update lesson content (simplified)
        const lessonTitles = {
            '1': 'Introduction to HTML',
            '2': 'HTML Elements and Structure',
            '3': 'HTML Forms and Input Elements',
            '4': 'Semantic HTML',
            '5': 'CSS Basics and Selectors',
            '6': 'Flexbox Layout',
            '7': 'CSS Grid',
            '8': 'Responsive Design'
        };
        
        const title = lessonTitles[lessonNumber] || 'Lesson Content';
        document.getElementById('current-lesson-title').textContent = title;
        
        showNotification(`Now viewing: ${title}`, 'success');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#1e40af'
    };
    return colors[type] || colors.info;
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0 0.5rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Search Functionality
function searchCourses(query) {
    const courseCards = document.querySelectorAll('.course-card');
    const searchQuery = query.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Local Storage for User Progress
function saveProgress(courseId, lessonId, progress) {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    if (!userProgress[courseId]) {
        userProgress[courseId] = {};
    }
    
    userProgress[courseId][lessonId] = {
        completed: progress.completed,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function loadProgress(courseId) {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    return userProgress[courseId] || {};
}

// Bookmark Functionality
function toggleBookmark(courseId, lessonId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const bookmarkId = `${courseId}-${lessonId}`;
    
    const index = bookmarks.indexOf(bookmarkId);
    if (index > -1) {
        bookmarks.splice(index, 1);
        showNotification('Bookmark removed', 'info');
    } else {
        bookmarks.push(bookmarkId);
        showNotification('Lesson bookmarked!', 'success');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Smooth Scrolling for Internal Links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or go back
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
    
    // Arrow keys for lesson navigation
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
        previousLesson();
    }
    
    if (e.key === 'ArrowRight' && e.ctrlKey) {
        nextLesson();
    }
});

// Lazy Loading for Images (if needed)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Monitoring
function trackPageView(pageName) {
    // In a real app, this would send analytics data
    console.log(`Page viewed: ${pageName}`);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}