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
        const button = e.currentTarget;
        const dropdown = button.nextElementSibling;
        const isActive = dropdown.classList.contains('active');
        
        dropdown.classList.toggle('active');
        
        // Update ARIA attribute
        button.setAttribute('aria-expanded', !isActive);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                dropdown.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
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
        
        // Update ARIA attributes
        document.querySelectorAll('.lang-btn, .lang-btn-white, .lang-btn-white-mobile').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
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
                    // Check if element has child nodes (like icons, emojis, or nested spans)
                    const hasChildElements = element.children.length > 0;
                    
                    if (hasChildElements) {
                        // Find text nodes and update only the text content
                        const walker = document.createTreeWalker(
                            element,
                            NodeFilter.SHOW_TEXT,
                            null,
                            false
                        );
                        
                        let textNode;
                        let textNodes = [];
                        while (textNode = walker.nextNode()) {
                            // Skip empty text nodes
                            if (textNode.nodeValue.trim()) {
                                textNodes.push(textNode);
                            }
                        }
                        
                        // Update the first significant text node
                        if (textNodes.length > 0) {
                            textNodes[0].nodeValue = translation;
                        }
                    } else {
                        // Simple text content, just replace it
                        element.textContent = translation;
                    }
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