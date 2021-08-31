import NavSearch from '../search/NavSearch';

const Header = ({ searchImagesFromServer, onSearchClear, APP_TITLE }) => {
	return (
		<section className='app-header'>
			<div className='app-header-body'>
				<h1 className='app-header-body-heading'>{APP_TITLE}</h1>
				<NavSearch
					onSubmit={searchImagesFromServer}
					onSearchClear={onSearchClear}
				></NavSearch>
			</div>
		</section>
	);
};

export default Header;
