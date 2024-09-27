export const exerciseOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '73e69ae85cmshb57052eba414b7fp133f24jsn2d5a359cf80f',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    },
  };
  
  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
    },
  };
  
  export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
  
    return data;
  };
  