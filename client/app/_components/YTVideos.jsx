import { useState } from 'react';
import { fetchData, youtubeOptions } from "../_utils/FetchYoutubeData";

const healthTags = [
  'Fitness', 'Nutrition', 'Mental Health', 'Yoga', 
  'Cardio', 'Weight Loss', 'Meditation', 'Healthy Eating', 
  'Sleep', 'Stress Management'
];

const YoutubeSearchPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const fetchVideos = async (query) => {
    const url = `https://youtube-search-and-download.p.rapidapi.com/search?query=${query}&hl=en&gl=US`;

    try {
      const data = await fetchData(url, youtubeOptions);
      setVideos(data.contents || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    fetchVideos(tag);
  };

  const handleSearch = () => {
    fetchVideos(searchQuery);
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for videos..."
            className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-green-700 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center mb-6 space-x-2 space-y-2">
          {healthTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                selectedTag === tag
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-green-700 border border-green-700'
              } hover:bg-green-700 hover:text-white`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <img
                    src={item.video.thumbnails[0].url}
                    alt={item.video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {item.video.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.video.channelName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.video.viewCountText} • {item.video.publishedTimeText}
                    </p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No videos found</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default YoutubeSearchPage;
