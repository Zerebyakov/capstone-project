import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchNews, saveNews } from '../store/newsSlice';

function SearchPages() {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newsList);
    const newsStatus = useSelector(state => state.news.status);
    const savedNews = useSelector(state => state.news.savedNews);

    const { query } = useParams(); 

    useEffect(() => {
        if (query) {
            dispatch(fetchNews(query)); 
        }
    }, [dispatch, query]);

    const handleSave = (article) => {
        if (!savedNews.some(saved => saved._id === article._id)) {
            dispatch(saveNews(article));
            alert("Berita Tersimpan !!");
        } else {
            alert("Berita gagal disimpan atau berita tidak bisa disimpan 2 kali");
        }
    };

    const isArticleSaved = (articleId) => {
        return savedNews.some(saved => saved._id === articleId);
    };

    return (
        <div>
            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="flex justify-center items-center">
                        <div className="max-w-screen-md mb-8 lg:mb-16 text-center">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
                                {query} News
                            </h2>
                            <p className="text-gray-700 sm:text-xl">
                                Artikel terbaru tentang {query} yang diambil dari New York Times.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        {newsStatus === 'loading' && <p>Loading articles...</p>}
                        {newsStatus === 'succeeded' && news.map((article, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <img
                                src={ article?.multimedia?.[0]?.url ? `https://www.nytimes.com/${article.multimedia[0].url}`: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'}
                                alt={article.headline.main}
                                className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="mb-2 text-xl font-bold text-black">{article.headline.main}</h3>
                                <p className="text-gray-700">{article.snippet}</p>
                                <div className="flex space-x-4">
                                    <a
                                        href={article.web_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white border border-black rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
                                    >
                                        Read More...
                                    </a>
                                    <button
                                        onClick={() => handleSave(article)}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium text-black border border-black rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-300 ${isArticleSaved(article._id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}
                                        disabled={isArticleSaved(article._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {newsStatus === 'failed' && <p>Error fetching news.</p>}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SearchPages;
