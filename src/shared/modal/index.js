import React, { useEffect } from 'react';

import './modal.scss';

const Modal = props => {
	useEffect(() => {
		open();
		// eslint-disable-next-line
	}, []);

	const close = () => {
		if (typeof props.onClose === 'function') {
			props.onClose();
		}
		document.getElementById('root').classList.remove('fixed');
	};

	const open = () => {
		if (typeof props.onOpen === 'function') {
			props.onOpen();
		}
		document.getElementById('root').classList.add('fixed');
	};

	const clickHandler = e => {
		const classList = [...e.target.classList];

		if (
			classList.includes('modal-overlay') ||
			classList.includes('close')
		) {
			close();
		}
	};

	return (
		<div className='modal-container' onClick={clickHandler}>
			<div className='modal-overlay'></div>
			<div className='modal-content'>{props.children}</div>
		</div>
	);
};

export default React.memo(Modal);
