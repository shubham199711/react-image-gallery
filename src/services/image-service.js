const axios = require('axios');

const IMAGE_PER_PAGE = 50;

exports.getRecentImages = async (currentPage) => {
	try {
		const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&nojsoncallback=1&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${currentPage}&per_page=${IMAGE_PER_PAGE}`;
		let { data: response } = await axios.get(URL, { mode: 'no-cors' });
		return response?.photos?.photo || [];
	} catch (error) {
		console.log(error);
	}
};

exports.getSearchedImages = async (currentPage, searchText) => {
	try {
		const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${currentPage}&text=${searchText}&per_page=${IMAGE_PER_PAGE}`;
		let { data: response } = await axios.get(URL, { mode: 'no-cors' });
		return response?.photos?.photo || [];
	} catch (error) {
		console.log(error);
	}
};
