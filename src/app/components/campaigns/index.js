import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import Context from '../../../store/context';

import './campaigns.scss';
import ErrorBoundary from '../../../shared/error-boundary';
import Pricing from '../pricing';
import Modal from '../../../shared/modal';
import { formatDate, formatDays } from '../../utils/helpres';

import fileImage from '../../../resources/images/file.png';
import reportImage from '../../../resources/images/report.png';
import calendarImage from '../../../resources/images/calendar.png';

const DatePicker = React.lazy(() =>
	import(/* webpackChunkName: "react-datepicker" */ 'react-datepicker')
);

const Campaigns = props => {
	const [toggleDatePicker, setToggleDatePicker] = useState({});

	const onClickOutsideHandler = id => {
		setToggleDatePicker({
			[id]: false,
		});
	};

	return (
		<ErrorBoundary>
			<Context.Consumer>
				{context => {
					const {
						modal,
						campaignsData = {},
						updateCampaign,
					} = context;

					const data =
						campaignsData[props.location.pathname.replace('/', '')];

					return (
						<React.Fragment>
							{modal.show ? <Modal {...modal} /> : null}

							<div className='campaigns-container'>
								<div className='campaigns-list-header'>
									<div className='campaigns-list-item'>
										<div className='item flex1'>DATE</div>
										<div className='item flex2'>
											CAMPAIGN
										</div>
										<div className='item flex3'>VIEW</div>
										<div className='item flex4'>
											ACTIONS
										</div>
									</div>
								</div>
								<div className='campaigns-list'>
									{data.map((campaign, idx) => {
										const {
											name,
											region,
											image_url,
											startAt,
											endAt,
										} = campaign;

										return (
											<div
												className='campaigns-list-item'
												key={idx}
											>
												<div className='item flex1'>
													<div className='campaign-date'>
														<div className='camp-date'>
															{formatDate(
																startAt
															)}
														</div>
														<div className='camp-days'>
															{formatDays(
																startAt,
																endAt
															)}
														</div>
													</div>
												</div>
												<div className='item flex2'>
													<div className='campaign-info'>
														<div className='campaign-img'>
															<img
																src={image_url}
																alt='campaign'
															/>
														</div>
														<div className='campaign-name-countary'>
															<div className='campaign-name'>
																{name}
															</div>

															<div className='campaign-countary'>
																{region}
															</div>
														</div>
													</div>
												</div>
												<div className='item flex3'>
													<div
														className='campaign-view'
														onClick={() =>
															modal.toggle({
																show: true,
																children: (
																	<Pricing
																		{...campaign}
																	/>
																),
															})
														}
													>
														<div className='currency'>
															$
														</div>
														<div className='price'>
															<span>
																View Pricing
															</span>
														</div>
													</div>
												</div>
												<div className='item flex4'>
													<div className='campaign-actions'>
														<div className='campaign-csv'>
															<img
																src={fileImage}
																alt='file'
															/>
															<span className='text'>
																CSV
															</span>
														</div>
														<div className='campaign-report'>
															<img
																src={
																	reportImage
																}
																alt='file'
															/>
															<span className='text'>
																Report
															</span>
														</div>
														<div
															className='campaign-schedule'
															onClick={() => {
																setToggleDatePicker(
																	{
																		[idx]: true,
																	}
																);
															}}
														>
															<img
																src={
																	calendarImage
																}
																alt='file'
															/>
															<span className='text'>
																Schedule Again
															</span>
															<React.Suspense
																fallback={
																	<React.Fragment />
																}
															>
																<DatePicker
																	selected={
																		startAt
																	}
																	open={
																		toggleDatePicker[
																			idx
																		]
																	}
																	onChange={(
																		date,
																		e
																	) => {
																		updateCampaign(
																			{
																				...campaign,
																				startAt: new Date(
																					date
																				).valueOf(),
																			}
																		);
																	}}
																	onClickOutside={() =>
																		onClickOutsideHandler(
																			idx
																		)
																	}
																/>
															</React.Suspense>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</React.Fragment>
					);
				}}
			</Context.Consumer>
		</ErrorBoundary>
	);
};

export default React.memo(Campaigns);
