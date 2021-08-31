import './NavSearch.css';
import React, { useState, useEffect } from 'react';
import { ClearButton, AsyncTypeahead } from 'react-bootstrap-typeahead';
import {
	addToSearchHistory,
	getRelativeSearchHistory,
	getSearchHistory,
} from '../../services/local-storage';

const ENTER_KEY = 'Enter';

const NavSearch = ({ onSubmit, onSearchClear }) => {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState(() => getSearchHistory());
	const [isClearShown, setIsClearShown] = useState(false);

	const onSearchSubmit = (value) => {
		addToSearchHistory(value);
		onSubmit(value);
	};

	const filterBy = () => true;

	useEffect(() => {
		setIsClearShown(search?.length >= 1);
		if (search?.length >= 1) {
			setOptions(getRelativeSearchHistory(search));
		} else {
			setOptions(getSearchHistory());
		}
		if (!!!search) {
			onSearchClear();
		}
	}, [search]);

	const handleKeypress = (e) => {
		const value = e?.target?.defaultValue || '';
		setSearch(value);
		if (e.key === ENTER_KEY) {
			onSearchSubmit(value);
		}
	};

	return (
		<div className='p-0'>
			<div className='search-input-div input-group-overlay d-flex w-100 align-self-center'>
				<AsyncTypeahead
					filterBy={filterBy}
					id='async-example'
					labelKey='title'
					useCache={true}
					isLoading={false}
					minLength={0}
					onSearch={() => {}}
					onKeyDown={handleKeypress}
					onChange={() => {}}
					options={options}
					placeholder='Search for images...'
					renderMenuItemChildren={(option, props) => (
						<div
							onClick={() =>
								handleKeypress({
									target: {
										defaultValue: option,
									},
									key: 'Enter',
								})
							}
							className='row w-100 m-0 p-0'
						>
							<div className='col-lg-12'>
								<p className='search-dropdown-text'>{option}</p>
							</div>
						</div>
					)}
				>
					{({ onClear, selected }) => (
						<div className='rbt-aux'>
							{isClearShown && (
								<ClearButton
									label=''
									onClick={() => {
										onClear();
										handleKeypress({
											target: {
												defaultValue: '',
											},
											key: '',
										});
									}}
								/>
							)}
						</div>
					)}
				</AsyncTypeahead>
			</div>
		</div>
	);
};

export default NavSearch;
