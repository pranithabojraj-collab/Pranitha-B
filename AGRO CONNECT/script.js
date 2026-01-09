// ============================================
// AgroConnect - Interactive Functionality
// ============================================

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
    en: {
        nav_home: "Home",
        nav_farmer_dashboard: "Farmer Dashboard",
        nav_buyer_dashboard: "Buyer Dashboard",
        nav_tracking: "Track Orders",
        nav_signin: "Sign In",
        hero_title: "Empowering Farmers Through Direct Market Access",
        hero_subtitle: "Connect with buyers, discover fair prices, and grow your agricultural business with transparency and trust.",
        btn_start_farmer: "Start as Farmer",
        btn_browse_buyer: "Browse as Buyer",
        features_title: "Why Choose AgroConnect?",
        features_subtitle: "Building a transparent and fair agricultural marketplace for everyone",
        feat_pricing_title: "Real-Time Pricing",
        feat_pricing_desc: "Access live market prices and trends to make informed decisions about your crops and purchases.",
        feat_connect_title: "Direct Connection",
        feat_connect_desc: "Connect farmers directly with buyers, eliminating middlemen and ensuring fair pricing for all.",
        feat_tracking_title: "Supply Chain Tracking",
        feat_tracking_desc: "Track your produce from farm to market with real-time updates and transparent logistics.",
        feat_payment_title: "Secure Payments",
        feat_payment_desc: "Safe and secure payment processing with multiple payment options for your convenience.",
        feat_lang_title: "Multi-Language Support",
        feat_lang_desc: "Access the platform in your preferred language with simple, rural-friendly interface.",
        feat_verified_title: "Verified Farmers",
        feat_verified_desc: "All farmers are verified and rated, building trust and ensuring quality produce.",
        how_title: "How It Works",
        how_subtitle: "Simple steps to connect and trade",
        step1_title: "Register & Verify",
        step1_desc: "Create your account as a farmer or buyer and complete simple verification process.",
        step2_title: "List or Browse",
        step2_desc: "Farmers list their crops with prices, buyers browse available produce from verified farmers.",
        step3_title: "Connect & Trade",
        step3_desc: "Negotiate fair prices, place orders, and track delivery with complete transparency.",
        stat_farmers: "Verified Farmers",
        stat_transactions: "Total Transactions",
        stat_buyers: "Active Buyers",
        stat_rating: "Average Rating",
        footer_about_desc: "Empowering farmers through technology and connecting them directly with markets for fair and transparent trade.",
        footer_links: "Quick Links",
        link_about: "About Us",
        link_pricing: "Pricing",
        link_contact: "Contact Support",
        footer_farmers: "For Farmers",
        link_register_farmer: "Register as Farmer",
        link_sell: "Sell Your Produce",
        link_guidelines: "Farmer Guidelines",
        link_stories: "Success Stories",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    },
    hi: {
        nav_home: "होम",
        nav_farmer_dashboard: "किसान डैशबोर्ड",
        nav_buyer_dashboard: "खरीदार डैशबोर्ड",
        nav_tracking: "ऑर्डर ट्रैक करें",
        nav_signin: "साइन इन करें",
        hero_title: "प्रत्यक्ष बाजार पहुंच के माध्यम से किसानों को सशक्त बनाना",
        hero_subtitle: "खरीदारों से जुड़ें, उचित मूल्य खोजें, और पारदर्शिता और विश्वास के साथ अपने कृषि व्यवसाय को बढ़ाएं।",
        btn_start_farmer: "किसान के रूप में शुरू करें",
        btn_browse_buyer: "खरीदार के रूप में ब्राउज़ करें",
        features_title: "एग्रोकनेक्ट क्यों चुनें?",
        features_subtitle: "सभी के लिए एक पारदर्शी और निष्पक्ष कृषि बाज़ार का निर्माण",
        feat_pricing_title: "वास्तविक समय मूल्य निर्धारण",
        feat_pricing_desc: "अपनी फसलों और खरीदारी के बारे में सूचित निर्णय लेने के लिए लाइव बाजार मूल्यों और रुझानों तक पहुंचें।",
        feat_connect_title: "सीधा संपर्क",
        feat_connect_desc: "किसानों को सीधे खरीदारों से जोड़ना, बिचौलियों को खत्म करना और सभी के लिए उचित मूल्य सुनिश्चित करना।",
        feat_tracking_title: "आपूर्ति श्रृंखला ट्रैकिंग",
        feat_tracking_desc: "रीयल-टाइम अपडेट और पारदर्शी लॉजिस्टिक्स के साथ खेत से बाज़ार तक अपनी उपज को ट्रैक करें।",
        feat_payment_title: "सुरक्षित भुगतान",
        feat_payment_desc: "आपकी सुविधा के लिए कई भुगतान विकल्पों के साथ सुरक्षित भुगतान प्रसंस्करण।",
        feat_lang_title: "बहु-भाषा समर्थन",
        feat_lang_desc: "सरल, ग्रामीण-अनुकूल इंटरफ़ेस के साथ अपनी पसंदीदा भाषा में प्लेटफ़ॉर्म तक पहुंचें।",
        feat_verified_title: "सत्यापित किसान",
        feat_verified_desc: "सभी किसानों को सत्यापित और रेट किया गया है, जिससे विश्वास पैदा होता है और गुणवत्तापूर्ण उपज सुनिश्चित होती है।",
        how_title: "यह कैसे काम करता है",
        how_subtitle: "जुड़ने और व्यापार करने के सरल चरण",
        step1_title: "रजिस्टर और सत्यापित करें",
        step1_desc: "किसान या खरीदार के रूप में अपना खाता बनाएं और सरल सत्यापन प्रक्रिया पूरी करें।",
        step2_title: "लिस्ट करें या ब्राउज़ करें",
        step2_desc: "किसान कीमतों के साथ अपनी फसलों को सूचीबद्ध करते हैं, खरीदार सत्यापित किसानों से उपलब्ध उपज ब्राउज़ करते हैं।",
        step3_title: "जुड़ें और व्यापार करें",
        step3_desc: "उचित कीमतों पर बातचीत करें, ऑर्डर दें और पूरी पारदर्शिता के साथ डिलीवरी ट्रैक करें।",
        stat_farmers: "सत्यापित किसान",
        stat_transactions: "कुल लेनदेन",
        stat_buyers: "सक्रिय खरीदार",
        stat_rating: "औसत रेटिंग",
        footer_about_desc: "प्रौद्योगिकी के माध्यम से किसानों को सशक्त बनाना और निष्पक्ष और पारदर्शी व्यापार के लिए उन्हें सीधे बाजारों से जोड़ना।",
        footer_links: "त्वरित लिंक",
        link_about: "हमारे बारे में",
        link_pricing: "मूल्य निर्धारण",
        link_contact: "समर्थन से संपर्क करें",
        footer_farmers: "किसानों के लिए",
        link_register_farmer: "किसान के रूप में पंजीकरण करें",
        link_sell: "अपनी उपज बेचें",
        link_guidelines: "किसान दिशानिर्देश",
        link_stories: "सफलता की कहानियाँ",
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें"
    },
    ta: {
        nav_home: "முகப்பு",
        nav_farmer_dashboard: "விவசாயி குழு",
        nav_buyer_dashboard: "வாங்குபவர் குழு",
        nav_tracking: "ஆர்டர்களை கண்காணிக்கவும்",
        nav_signin: "உள்நுழைய",
        hero_title: "நேரடி சந்தை அணுகல் மூலம் விவசாயிகளுக்கு அதிகாரம் அளித்தல்",
        hero_subtitle: "வெளிப்படைத்தன்மை மற்றும் நம்பிக்கையுடன் வாங்குபவர்களுடன் இணையுங்கள், நியாயமான விலைகளை கண்டறியுங்கள் மற்றும் உங்கள் விவசாய வணிகத்தை வளர்க்குங்கள்.",
        btn_start_farmer: "விவசாயியாக தொடங்குங்கள்",
        btn_browse_buyer: "வாங்குபவராக உலாவுக",
        features_title: "ஏக்ரோகனெக்ட் (AgroConnect) ஏன் தேர்வு செய்ய வேண்டும்?",
        features_subtitle: "அனைவருக்கும் ஒரு வெளிப்படையான மற்றும் நியாயமான விவசாய சந்தையை உருவாக்குதல்",
        feat_pricing_title: "நிகழ்நேர விலை நிர்ணயம்",
        feat_pricing_desc: "உங்கள் பயிர்கள் மற்றும் கொள்முதல் பற்றிய தகவலறிந்த முடிவுகளை எடுக்க நேரடி சந்தை விலைகள் மற்றும் போக்குகளை அணுகவும்.",
        feat_connect_title: "நேரடி இணைப்பு",
        feat_connect_desc: "விவசாயிகளை நேரடியாக வாங்குபவர்களுடன் இணைத்தல், இடைத்தரகர்களை நீக்குதல் மற்றும் அனைவருக்கும் நியாயமான விலையை உறுதி செய்தல்.",
        feat_tracking_title: "விநியோகச் சங்கிலி கண்காணிப்பு",
        feat_tracking_desc: "நிகழ்நேர புதுப்பிப்புகள் மற்றும் வெளிப்படையான தளவாடங்களுடன் பண்ணையிலிருந்து சந்தைக்கு உங்கள் விளைபொருட்களைக் கண்காணிக்கவும்.",
        feat_payment_title: "பாதுகாப்பான கொடுப்பனவுகள்",
        feat_payment_desc: "உங்கள் வசதிக்காக பல கட்டண விருப்பங்களுடன் பாதுகாப்பான கட்டணச் செயலாக்கம்.",
        feat_lang_title: "பன்மொழி ஆதரவு",
        feat_lang_desc: "எளிமையான, கிராமப்புற நட்பு இடைமுகத்துடன் உங்களுக்கு விருப்பமான மொழியில் தளத்தை அணுகவும்.",
        feat_verified_title: "சரிபார்க்கப்பட்ட விவசாயிகள்",
        feat_verified_desc: "அனைத்து விவசாயிகளும் சரிபார்க்கப்பட்டு மதிப்பிடப்படுகிறார்கள், நம்பிக்கையை உருவாக்குகிறார்கள் மற்றும் தரமான விளைபொருட்களை உறுதி செய்கிறார்கள்.",
        how_title: "இது எப்படி வேலை செய்கிறது",
        how_subtitle: "இணைப்பதற்கும் வர்த்தகம் செய்வதற்கும் எளிய வழிமுறைகள்",
        step1_title: "பதிவு & சரிபார்க்கவும்",
        step1_desc: "விவசாயியாக அல்லது வாங்குபவராக உங்கள் கணக்கை உருவாக்கி எளிய சரிபார்ப்பு செயல்முறையை முடிக்கவும்.",
        step2_title: "பட்டியலிடுங்கள் அல்லது உலாவுக",
        step2_desc: "விவசாயிகள் தங்கள் பயிர்களை விலைகளுடன் பட்டியலிடுகிறார்கள், வாங்குபவர்கள் சரிபார்க்கப்பட்ட விவசாயிகளிடமிருந்து கிடைக்கும் விளைபொருட்களை உலாவுகிறார்கள்.",
        step3_title: "இணைக்கவும் & வர்த்தகம் செய்யவும்",
        step3_desc: "நியாயமான விலைகளை பேச்சுவார்த்தை நடத்துங்கள், ஆர்டர்களை இடுங்கள் மற்றும் முழுமையான வெளிப்படைத்தன்மையுடன் விநியோகத்தைக் கண்காணிக்கவும்.",
        stat_farmers: "சரிபார்க்கப்பட்ட விவசாயிகள்",
        stat_transactions: "மொத்த பரிவர்தனைகள்",
        stat_buyers: "செயலில் வாங்குபவர்கள்",
        stat_rating: "சராசரி மதிப்பீடு",
        footer_about_desc: "தொழில்நுட்பத்தின் மூலம் விவசாயிகளுக்கு அதிகாரம் அளித்தல் மற்றும் நியாயமான மற்றும் வெளிப்படையான வர்த்தகத்திற்காக அவர்களை நேரடியாக சந்தைகளுடன் இணைத்தல்.",
        footer_links: "விரைவான இணைப்புகள்",
        link_about: "எங்களை பற்றி",
        link_pricing: "விலை நிர்ணயம்",
        link_contact: "ஆதரவைத் தொடர்பு கொள்க",
        footer_farmers: "விவசாயிகளுக்கு",
        link_register_farmer: "விவசாயியாக பதிவு செய்யுங்கள்",
        link_sell: "உங்கள் விளைபொருட்களை விற்றுவிடுங்கள்",
        link_guidelines: "விவசாயி வழிகாட்டுதல்கள்",
        link_stories: "வெற்றிக் கதைகள்",
        privacy: "தனியுரிமைக் கொள்கை",
        terms: "சேவை விதிமுறைகள்"
    }
};

// ============================================
// NAVIGATION - Uses separate HTML pages
// ============================================
// Navigation now handled by browser with separate HTML files
// No need for showPage() or updateActiveNavLink() functions

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Real-time Price Updates Simulation
function updateMarketPrices() {
    const priceElements = document.querySelectorAll('table td:nth-child(2)');
    priceElements.forEach(element => {
        // Simulate small price fluctuations
        const currentPrice = element.textContent;
        if (currentPrice.startsWith('₹')) {
            // Add a subtle animation effect
            element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }
    });
}

// Auto-update prices every 10 seconds
setInterval(updateMarketPrices, 10000);

// ============================================
// LANGUAGE HANDLING
// ============================================

function changeLanguage(lang) {
    // 1. Update active button state
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Translate content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else if (translations['en'][key]) {
             // Fallback to English if translation missing
             element.textContent = translations['en'][key];
        }
    });

    // 3. Save preference
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang; // Update HTML tag lang attribute

    // Show notification
    const langNames = { 'en': 'English', 'hi': 'Hindi', 'ta': 'Tamil', 'mr': 'Marathi', 'te': 'Telugu', 'gu': 'Gujarati' };
    showNotification(`Language changed to ${langNames[lang] || lang}`);
}

// Initialize Language
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLang);
});

// Language Button Event Listeners
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        if (lang) {
            // Check if translation exists for this language
            if (translations[lang]) {
                changeLanguage(lang);
            } else {
                showNotification('Translation coming soon for this language', 'info');
                // Temporarily select it visually but keep English content? 
                // Alternatively, just do nothing or fallback
                // For now, let's just select it if we have it.
            }
        }
    });
});

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Sidebar Navigation
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Don't prevent default if it's the "Back to Home" link
        if (!this.getAttribute('onclick')) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Validation (for future forms)
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');

    let isValid = true;
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--color-bg-light)';
        }
    });

    return isValid;
}

// Add to Cart/Order Functionality
const orderButtons = document.querySelectorAll('button');
orderButtons.forEach(btn => {
    // Exclude lang-btn from this listener logic if needed, but the loop below handles it.
    // However, to be safe, let's exclude buttons that are lang-btns
    if ((btn.textContent.includes('Place Order') || btn.textContent.includes('List Now')) && !btn.classList.contains('lang-btn')) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.card') || this.closest('tr');
            let itemName = 'item';

            if (card) {
                const nameElement = card.querySelector('h4, strong');
                if (nameElement) {
                    itemName = nameElement.textContent;
                }
            }

            showNotification(`${itemName} added to your order!`);
        });
    }
});

// Tracking updates now handled per page
// Each page loads independently - no observer needed


// Stats Counter Animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = formatStatValue(current, element.dataset.format);
    }, 16);
}

function formatStatValue(value, format) {
    if (format === 'currency') {
        return '₹' + Math.round(value).toLocaleString('en-IN');
    } else if (format === 'rating') {
        return value.toFixed(1) + ' ⭐';
    } else {
        return Math.round(value).toLocaleString('en-IN');
    }
}

// Animate stats when page loads
window.addEventListener('load', () => {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const text = stat.textContent;
        const numMatch = text.match(/[\d,]+/);
        if (numMatch) {
            const finalValue = parseInt(numMatch[0].replace(/,/g, ''));
            if (!isNaN(finalValue)) {
                stat.dataset.format = text.includes('₹') ? 'currency' :
                    text.includes('⭐') ? 'rating' : 'number';
                stat.textContent = '0';
                setTimeout(() => {
                    animateValue(stat, 0, finalValue, 1000);
                }, 300);
            }
        }
    });
});

// Image Lazy Loading Enhancement
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll-triggered Animations
const fadeElements = document.querySelectorAll('.fade-in');
const slideElements = document.querySelectorAll('.slide-in');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    animationObserver.observe(el);
});

slideElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    animationObserver.observe(el);
});

// Search Functionality (for future implementation)
function searchProduce(query) {
    const cards = document.querySelectorAll('.card');
    const lowercaseQuery = query.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('h4');
        if (title) {
            const titleText = title.textContent.toLowerCase();
            if (titleText.includes(lowercaseQuery) || query === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Dark Mode Toggle (for future enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Print Order/Receipt Functionality
function printOrder(orderId) {
    window.print();
}

// Export Data (for future implementation)
function exportData(format) {
    showNotification(`Exporting data in ${format} format...`);
    // In a real app, this would trigger a download
}

// Initialize tooltips and popovers (if using tooltip library)
document.addEventListener('DOMContentLoaded', function () {
    console.log('AgroConnect Platform Initialized');
    console.log('Version: 1.0.0');
    console.log('All interactive features loaded successfully');

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Add focus visible for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

console.log('🌱 AgroConnect: Ready to connect farmers with markets!');
