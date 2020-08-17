import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';
import Context from '../../../store/context';

const DatePicker = React.lazy(() =>
	import(/* webpackChunkName: "react-datepicker" */ 'react-datepicker')
);

const ReactDatePicker = props => {
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		const rootElem = document.getElementById('root');
		if (showDatePicker) {
			const overlay = document.createElement('div');
			overlay.id = 'date-picker-overlay';
			rootElem.appendChild(overlay);
		} else {
			const overlay = document.querySelector('#date-picker-overlay');
			overlay &&
				overlay.parentNode &&
				overlay.parentNode.removeChild(overlay);
		}
	}, [showDatePicker]);

	const toggleDatePicker = flag => {
		setShowDatePicker(flag);
	};

	return (
		<React.Fragment>
			<Context.Consumer>
				{context => {
					const { startAt } = props.campaign;
					const { updateCampaign } = context;
					return (
						<React.Fragment>
							<div
								className='date-picker-wrapper'
								onClick={() => {
									toggleDatePicker(true);
								}}
							>
								{props.children}
							</div>

							<React.Suspense fallback={<React.Fragment />}>
								<DatePicker
									selected={startAt}
									open={showDatePicker}
									onChange={(date, e) => {
										toggleDatePicker(false);
										updateCampaign({
											...props.campaign,
											startAt: new Date(date).valueOf(),
										});
									}}
									onClickOutside={() =>
										toggleDatePicker(false)
									}
								/>
							</React.Suspense>
						</React.Fragment>
					);
				}}
			</Context.Consumer>
		</React.Fragment>
	);
};

export default React.memo(ReactDatePicker);
