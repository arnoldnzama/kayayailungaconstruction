// Blog Loader - Dynamic article loading
document.addEventListener('DOMContentLoaded', function() {
    loadBlogArticles();
    
    // Listen for language changes
    document.addEventListener('languageChanged', loadBlogArticles);
    window.addEventListener('storage', function(e) {
        if (e.key === 'selectedLanguage') {
            loadBlogArticles();
        }
    });
});

function loadBlogArticles() {
    const currentLang = getCurrentLanguage();
    
    // Load featured article
    loadFeaturedArticle(currentLang);
    
    // Load all articles
    loadAllArticles(currentLang);
}

function loadFeaturedArticle(lang) {
    const featuredContainer = document.querySelector('#featured-article-container');
    if (!featuredContainer) return;
    
    const featuredArticle = getFeaturedArticle();
    if (!featuredArticle) return;
    
    const title = lang === 'en' ? featuredArticle.titleEn : featuredArticle.title;
    const excerpt = lang === 'en' ? featuredArticle.excerptEn : featuredArticle.excerpt;
    const category = lang === 'en' ? featuredArticle.categoryEn : featuredArticle.category;
    const date = lang === 'en' ? featuredArticle.dateEn : featuredArticle.date;
    const readMoreText = lang === 'en' ? 'Read more' : 'Lire plus';
    const featuredText = lang === 'en' ? 'Featured' : 'À la Une';
    
    featuredContainer.innerHTML = `
        <article class="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#b78836]/20 transition-all duration-300 grid md:grid-cols-2 gap-0">
            <div class="relative h-full min-h-[400px]">
                <img src="${featuredArticle.image}" alt="${title}" 
                    class="w-full h-full object-cover" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                <span class="absolute top-4 left-4 bg-[#b78836] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ${category}
                </span>
                <div class="absolute top-4 right-4 bg-gradient-to-r from-[#FF9702] to-[#FF6B00] text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                    <i class="fas fa-star mr-1"></i>
                    <span>${featuredText}</span>
                </div>
            </div>
            <div class="p-8 flex flex-col justify-center">
                <h3 class="text-3xl font-bold text-white mb-4">
                    ${title}
                </h3>
                <p class="text-gray-300 text-lg mb-6 leading-relaxed">
                    ${excerpt}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-gray-400 flex items-center gap-2">
                        <i class="far fa-calendar"></i>
                        <span>${date}</span>
                    </span>
                    <a href="${featuredArticle.url}" 
                        class="inline-flex items-center gap-2 text-[#b78836] font-semibold hover:gap-3 transition-all">
                        ${readMoreText} →
                    </a>
                </div>
            </div>
        </article>
    `;
}

function loadAllArticles(lang) {
    const articlesContainer = document.querySelector('#articles-grid');
    if (!articlesContainer) return;
    
    const articles = getAllArticles();
    const readMoreText = lang === 'en' ? 'Read more' : 'Lire plus';
    
    articlesContainer.innerHTML = '';
    
    articles.forEach(article => {
        const title = lang === 'en' ? article.titleEn : article.title;
        const shortExcerpt = lang === 'en' ? article.shortExcerptEn : article.shortExcerpt;
        const category = lang === 'en' ? article.categoryEn : article.category;
        const date = lang === 'en' ? article.dateEn : article.date;
        
        const articleCard = document.createElement('article');
        articleCard.className = 'bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg hover:shadow-[#b78836]/20 transition-all duration-300 hover:-translate-y-2';
        
        articleCard.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${article.thumbnailImage}" alt="${title}" 
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                    loading="lazy" onerror="this.src='images/placeholder.jpg'">
                <span class="absolute top-4 left-4 bg-[#b78836] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ${category}
                </span>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-3">
                    ${title}
                </h3>
                <p class="text-gray-400 mb-4 line-clamp-3">
                    ${shortExcerpt}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-gray-500 text-sm flex items-center gap-2">
                        <i class="far fa-calendar"></i>
                        <span>${date}</span>
                    </span>
                    <a href="${article.url}" 
                        class="text-[#b78836] font-semibold hover:gap-2 inline-flex items-center gap-1 transition-all">
                        ${readMoreText} →
                    </a>
                </div>
            </div>
        `;
        
        articlesContainer.appendChild(articleCard);
    });
}

// Add stagger animation to articles
function addStaggerAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const articles = document.querySelectorAll('#articles-grid article');
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(article);
    });
}

// Call animation after articles are loaded
setTimeout(addStaggerAnimation, 100);
