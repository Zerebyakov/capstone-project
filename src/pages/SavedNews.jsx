import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedNews } from '../store/newsSlice'; 

function SavedNews() {
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.news.savedNews);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const handleUnsave = (articleId) => {
    dispatch(removeSavedNews(articleId));
  };

  return (
    <div className="p-4">
      <div className="justify-items-center">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black-900 dark:text-black">
          SAVED NEWS
        </h1>
      </div>

      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-left table-auto min-w-max border border-blue-gray-200">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-blue-gray-200">
              <th className="p-4 bg-blue-gray-50 w-16 border-r border-blue-gray-200">
                <p className="block font-sans text-sm font-bold antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  No
                </p>
              </th>
              <th className="p-4 bg-blue-gray-50 border-r border-blue-gray-200">
                <p className="block font-sans text-sm font-bold antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Title
                </p>
              </th>
              <th className="p-4 bg-blue-gray-50 border-r border-blue-gray-200">
                <p className="block font-sans text-sm font-bold antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Description
                </p>
              </th>
              <th className="p-4 bg-blue-gray-50">
                <p className="block font-sans text-sm font-bold antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Action
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {savedNews.map((article, index) => (
              <tr key={article._id} className="block md:table-row border-b border-blue-gray-200">
                <td className="block md:table-cell p-4 border-r border-blue-gray-200">
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900 md:hidden">
                    No:
                  </p>
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900">
                    {index + 1}
                  </p>
                </td>
                <td className="block md:table-cell p-4 border-r border-blue-gray-200">
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900 md:hidden">
                    Title:
                  </p>
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900">
                    <b>{truncateText(article.headline.main, 50)}</b>
                  </p>
                </td>
                <td className="block md:table-cell p-4 border-r border-blue-gray-200">
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900 md:hidden">
                    Description:
                  </p>
                  <p className="font-sans text-sm font-normal leading-normal text-blue-gray-900">
                    {truncateText(article.snippet, 100)}
                  </p>
                </td>
                <td className="block md:table-cell p-4">
                  <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium leading-normal text-blue-gray-900 hover:text-blue-500"
                  >
                    Read More...
                  </a>
                  <button
                    onClick={() => handleUnsave(article._id)} 
                    className="ml-4 font-sans text-sm font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedNews.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">Anda belum menyimpan berita apa pun.</p>
        </div>
      )}
    </div>
  );
}

export default SavedNews;
