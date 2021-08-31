import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { getRecentImages, getSearchedImages } from './services/imageService';
import Header from './components/header/Header';
import ImageGallery from './components/imageGallery/ImageGallery';

const APP_TITLE = 'Search Photos';

function App() {
	const [currentImage, setCurrentImage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [allImages, setAllImages] = useState([]);
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [isHasMore, setIsHasMore] = useState(true);

	const getImagesFromServer = async (page = false) => {
		let images = await getRecentImages(page || currentPage);
		setCurrentPage(page ? page : currentPage + 1);
		images = getImageUrl(images);
		setIsHasMore(!!images?.length);
		setAllImages((prev) => [...prev, ...images]);
	};

	useEffect(() => {
		document.title = APP_TITLE;
		getImagesFromServer();
	}, []);

	useEffect(() => {
		if (!allImages.length) {
			window.scrollTo(0, 0);
			getImagesFromServer(1);
		}
	}, [allImages]);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const searchImagesFromServer = async (searchText, page = false) => {
		setSearchText(searchText);
		setIsSearchMode(true);
		setCurrentPage(page || 1);
		if (!!!page) window.scrollTo(0, 0);
		let images = await getSearchedImages(page || 1, searchText);
		images = getImageUrl(images);
		setIsHasMore(!!images?.length);
		if (!page) {
			setAllImages([...images]);
		} else {
			setAllImages((prev) => [...prev, ...images]);
		}
	};

	const onSearchClear = () => {
		setIsSearchMode(false);
		setSearchText('');
		setCurrentPage(1);
		setAllImages([]);
	};

	const fetchMoreData = () => {
		if (isSearchMode) {
			searchImagesFromServer(searchText, currentPage + 1);
		} else {
			getImagesFromServer();
		}
	};

	return (
		<div>
			<Header
				searchImagesFromServer={searchImagesFromServer}
				onSearchClear={onSearchClear}
				APP_TITLE={APP_TITLE}
			></Header>
			<ImageGallery
				currentImage={currentImage}
				isViewerOpen={isViewerOpen}
				allImages={allImages}
				isHasMore={isHasMore}
				openImageViewer={openImageViewer}
				closeImageViewer={closeImageViewer}
				fetchMoreData={fetchMoreData}
			></ImageGallery>
		</div>
	);

	function getImageUrl(images) {
		images = (images || []).map(
			(item) =>
				`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
		);
		return images;
	}
}

export default App;
