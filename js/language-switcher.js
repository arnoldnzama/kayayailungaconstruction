document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to French
    let currentLang = localStorage.getItem('language') || 'fr';
    
    // Update language display on page load
    const updateLangDisplay = () => {
        const currentLangEl = document.getElementById('current-lang');
        const currentLangMobileEl = document.getElementById('current-lang-mobile');
        
        if (currentLangEl) currentLangEl.textContent = currentLang.toUpperCase();
        if (currentLangMobileEl) currentLangMobileEl.textContent = currentLang.toUpperCase();
        
        // Update active state
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === currentLang);
        });
    };

    // Toggle language dropdown
    const toggleDropdown = (e) => {
        const dropdown = e.currentTarget.nextElementSibling;
        dropdown.classList.toggle('active');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                dropdown.classList.remove('active');
            }
        });
    };

    // Change language
    const changeLanguage = (lang) => {
        if (lang === currentLang) return;
        
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update UI
        const currentLangEl = document.getElementById('current-lang');
        const currentLangMobileEl = document.getElementById('current-lang-mobile');
        
        if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();
        if (currentLangMobileEl) currentLangMobileEl.textContent = lang.toUpperCase();
        
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        // Close dropdown
        document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        // Translate content
        translateContent();
    };

    // Translate content
    const translateContent = () => {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const keys = key.split('.');
            let translation = translations[currentLang];
            
            // Navigate through nested keys
            for (const k of keys) {
                translation = translation[k];
                if (!translation) break;
            }
            
            if (translation) {
                // Add animation class
                element.classList.add('translated-content');
                
                // Update content
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'SELECT') {
                    Array.from(element.options).forEach(option => {
                        const optionKey = option.dataset.translate;
                        if (optionKey) {
                            const optionKeys = optionKey.split('.');
                            let optionTranslation = translations[currentLang];
                            for (const k of optionKeys) {
                                optionTranslation = optionTranslation[k];
                                if (!optionTranslation) break;
                            }
                            if (optionTranslation) {
                                option.textContent = optionTranslation;
                            }
                        }
                    });
                } else {
                    element.textContent = translation;
                }
                
                // Remove animation class after animation ends
                element.addEventListener('animationend', () => {
                    element.classList.remove('translated-content');
                }, { once: true });
            }
        });
    };

    // Initialize
    updateLangDisplay();
    
    // Add event listeners for language buttons (desktop and mobile)
    document.querySelectorAll('.lang-btn, .lang-btn-white, .lang-btn-white-mobile').forEach(btn => {
        btn.addEventListener('click', toggleDropdown);
    });
    
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Initial translation
    translateContent();
}); 