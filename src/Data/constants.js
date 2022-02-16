export const API_KEY = 'a5cf886a8dd84801a01c8b5bd0da1b0d';

export const news_categories = [
    {
        id: 'techcrunch',
        name: 'TechCrunch',
        api: 'https://newsapi.org/v2/top-headlines?sources=techcrunch'
    },
    {
        id: 'business',
        name: 'Business',
        api: 'https://newsapi.org/v2/top-headlines?country=us&category=business'
    },
    {
        id: 'wallstreetjournal',
        name: 'Wall Street Journal',
        api: 'https://newsapi.org/v2/everything?domains=wsj.com'
    }
]