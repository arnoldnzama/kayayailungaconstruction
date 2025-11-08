// Blog articles data
const blogArticles = [
    {
        id: 'decorex',
        title: 'Expo DECOREX Sandton Convention - The Future of Living',
        titleEn: 'Expo DECOREX Sandton Convention - The Future of Living',
        category: 'Expo DECOREX',
        categoryEn: 'Expo DECOREX',
        excerpt: '« The future of living » explore comment les technologies de pointe et le design avant-gardiste révolutionnent la vie à la maison, améliorant notre qualité de vie.',
        excerptEn: '"The future of living" explores how cutting-edge technologies and avant-garde design are revolutionizing home life, improving our quality of life.',
        shortExcerpt: 'Découvrez les innovations présentées à l\'exposition DECOREX 2025 à Sandton, où le design rencontre la technologie.',
        shortExcerptEn: 'Discover the innovations presented at the DECOREX 2025 exhibition in Sandton, where design meets technology.',
        date: '24-27 Juillet 2025',
        dateEn: 'July 24-27, 2025',
        image: 'blog/Expo_DECOREX_July_2025/exp4.jpg',
        thumbnailImage: 'blog/Expo_DECOREX_July_2025/exp1.jpg',
        url: 'articles/decorex.html',
        featured: true
    },
    {
        id: 'philharmonie',
        title: 'La Philharmonie de Paris',
        titleEn: 'The Philharmonie de Paris',
        category: 'Inauguration',
        categoryEn: 'Inauguration',
        excerpt: 'La Philharmonie de Paris, inaugurée le 14 janvier 2015, est un chef-d\'œuvre architectural signé Jean Nouvel.',
        excerptEn: 'The Philharmonie de Paris, inaugurated on January 14, 2015, is an architectural masterpiece designed by Jean Nouvel.',
        shortExcerpt: 'La Philharmonie de Paris, inaugurée le 14 janvier 2015, est un chef-d\'œuvre architectural signé Jean Nouvel.',
        shortExcerptEn: 'The Philharmonie de Paris, inaugurated on January 14, 2015, is an architectural masterpiece designed by Jean Nouvel.',
        date: '4 Juillet 2025',
        dateEn: 'July 4, 2025',
        image: 'blog/La_Philharmonie_de_Paris/p6.jpg',
        thumbnailImage: 'blog/La_Philharmonie_de_Paris/p6.jpg',
        url: 'articles/philharmonie.html',
        featured: false
    },
    {
        id: 'arabie-saoudite',
        title: 'Pavillon du Royaume d\'Arabie Saoudite',
        titleEn: 'Kingdom of Saudi Arabia Pavilion',
        category: 'Design',
        categoryEn: 'Design',
        excerpt: 'Le pavillon de l\'Arabie Saoudite à l\'EXPO Dubaï 2020 se distingue par son architecture audacieuse et fonctionnelle.',
        excerptEn: 'The Saudi Arabia pavilion at EXPO Dubai 2020 stands out for its bold and functional architecture.',
        shortExcerpt: 'Le pavillon de l\'Arabie Saoudite à l\'EXPO Dubaï 2020 se distingue par son architecture audacieuse et fonctionnelle.',
        shortExcerptEn: 'The Saudi Arabia pavilion at EXPO Dubai 2020 stands out for its bold and functional architecture.',
        date: '5 Mars 2025',
        dateEn: 'March 5, 2025',
        image: 'blog/Royaume _Arabie_Saoudite/r2.jpg',
        thumbnailImage: 'blog/Royaume _Arabie_Saoudite/r2.jpg',
        url: 'articles/arabie-saoudite.html',
        featured: false
    }
];

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'fr';
}

// Get article by ID
function getArticleById(id) {
    return blogArticles.find(article => article.id === id);
}

// Get featured article
function getFeaturedArticle() {
    return blogArticles.find(article => article.featured) || blogArticles[0];
}

// Get all non-featured articles
function getAllArticles() {
    return blogArticles.filter(article => !article.featured);
}

// Get all articles including featured
function getAllArticlesIncludingFeatured() {
    return blogArticles;
}
