const LOCAL_STORAGE_SEARCH_KEY = 'search-history';

const fuzzySearch = (list, searchValue) => {
	let buf = '.*' + searchValue.replace(/(.)/g, '$1.*').toLowerCase();
	var reg = new RegExp(buf);
	let newList = (list || []).filter((e) => reg.test(e.toLowerCase()));
	return newList;
};

exports.addToSearchHistory = (searchText) => {
	searchText = searchText.toString().trim();
	if (!!!searchText) {
		return;
	}
	let searchKeys = localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY);
	searchKeys = !!searchKeys ? JSON.parse(searchKeys) : [];
	if (searchKeys.includes(searchText)) {
		return;
	}
	searchKeys.unshift(searchText);
	localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(searchKeys));
};

exports.getSearchHistory = () => {
	let searchKeys = localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY);
	searchKeys = !!searchKeys ? JSON.parse(searchKeys) : [];
	return searchKeys;
};

exports.getRelativeSearchHistory = (searchText) => {
	let searchKeys = localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY);
	searchKeys = !!searchKeys ? JSON.parse(searchKeys) : [];
	return fuzzySearch(searchKeys, searchText);
};
