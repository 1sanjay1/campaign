import React, { useState } from 'react';

import './language-selector.scss';
import multiLanguageImg from '../../../resources/images/mul-language.jpg';

const LanguageSelector = props => {
	const [showLangDropdown, setShowLangDropdown] = useState(false);

	const toggleDropdown = e => {
		const { setLanguage } = props.context;

		setShowLangDropdown(!showLangDropdown);

		if (e.target.id === 'german' || e.target.id === 'english') {
			setLanguage(e.target.id);
		}
	};

	return (
		<div className='language-selector' onClick={toggleDropdown}>
			<span className='selector'>
				<span className='text desktop'>Select Language</span>
				<img
					src={multiLanguageImg}
					alt='select language'
					className='image mobile'
				/>
			</span>

			{showLangDropdown ? (
				<div className='language-dropdown'>
					<ul className='language-list'>
						<li className='language-list-item' id='english'>
							English
						</li>
						<li className='language-list-item' id='german'>
							German
						</li>
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default LanguageSelector;
