import React from 'react';

import Context from '../../../store/context';

import './campaigns.scss';
import ErrorBoundary from '../../../shared/error-boundary';
import Pricing from '../pricing';
import Modal from '../../../shared/modal';
import DatePicker from '../date-picker';
import { formatDate, formatDays } from '../../utils/helpres';
import { languages } from '../../utils/languages';

import fileImage from '../../../resources/images/file.png';
import reportImage from '../../../resources/images/report.png';
import calendarImage from '../../../resources/images/calendar.png';

const Campaigns = props => {
	return (
		<ErrorBoundary>
			<Context.Consumer>
				{context => {
					const { modal, campaignsData = {}, languageType } = context;

					const data =
						campaignsData[props.location.pathname.replace('/', '')];

					const language = languages[languageType];

					return (
						<React.Fragment>
							{modal.show ? <Modal {...modal} /> : null}

							<div className='campaigns-container'>
								<div className='campaigns-list-header'>
									<div className='campaigns-list-item'>
										<div className='item flex1'>
											{language['DATE']}
										</div>
										<div className='item flex2'>
											{language['CAMPAIGN']}
										</div>
										<div className='item flex3'>
											{language['VIEW']}
										</div>
										<div className='item flex4'>
											{language['ACTIONS']}
										</div>
									</div>
								</div>
								<div className='campaigns-list'>
									{data.map(campaign => {
										const {
											id,
											name,
											region,
											image_url,
											startAt,
											endAt,
										} = campaign;

										return (
											<div
												className='campaigns-list-item'
												key={id}
											>
												<div className='item flex1'>
													<div className='campaign-date'>
														<div className='camp-date'>
															{formatDate(
																startAt,
																language
															)}
														</div>
														<div className='camp-days'>
															{formatDays(
																startAt,
																endAt,
																language
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
																		language={
																			language
																		}
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
																{
																	language[
																		'View Pricing'
																	]
																}
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
																{
																	language[
																		'CSV'
																	]
																}
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
																{
																	language[
																		'Report'
																	]
																}
															</span>
														</div>
														<div className='campaign-schedule'>
															<DatePicker
																campaign={
																	campaign
																}
															>
																<img
																	src={
																		calendarImage
																	}
																	alt='file'
																/>
																<span className='text'>
																	{
																		language[
																			'Schedule Again'
																		]
																	}
																</span>
															</DatePicker>
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
