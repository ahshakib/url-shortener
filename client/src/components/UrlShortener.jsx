import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrl } from '../features/urlSlice';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const { urls, status } = useSelector((state) => state.url);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shortenUrl(url));
    setUrl('');
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`http://localhost:5000/${shortUrl}`).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-violet-600">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="appearance-none bg-white-100 border-none w-full text-gray-700 mr-3 py-3 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter your URL"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-2 rounded"
            type="submit"
          >
            Shorten
          </button>
        </div>
      </form>
      <div className="mt-8 w-full max-w-sm">
        {status === 'loading' && <p>Loading...</p>}
        {urls.map((url) => (
          <div key={url.shortUrl} className="bg-white shadow-md rounded p-4 mb-4">
            <p className="text-gray-800">Original: {url.originalUrl}</p>
            <div className="flex items-center">
              <p className="text-teal-500">
                Shortened: <a href={`http://localhost:5000/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:5000/${url.shortUrl}`}</a>
              </p>
              <button
                className="ml-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleCopy(url.shortUrl)}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlShortener;
