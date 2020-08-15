import React from 'react';

import './campaigns.scss';
import ErrorBoundary from '../../../shared/error-boundary';
import Pricing from '../pricing';

import campaignImage from '../../../resources/images/campaign.png';
import fileImage from '../../../resources/images/file.png';
import reportImage from '../../../resources/images/report.png';
import calendarImage from '../../../resources/images/calendar.png';

const Campaigns = props => {
	return (
		<ErrorBoundary>
			<div className='campaigns-container'>
				<div className='campaigns-list-header'>
					<div className='campaigns-list-item'>
						<div className='item flex1'>DATE</div>
						<div className='item flex2'>CAMPAIGN</div>
						<div className='item flex3'>VIEW</div>
						<div className='item flex4'>ACTIONS</div>
					</div>
				</div>
				<div className='campaigns-list'>
					{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((campaign, idx) => {
						return (
							<div className='campaigns-list-item' key={idx}>
								<div className='item flex1'>
									<div className='campaign-date'>
										<div className='camp-date'>
											Oct 2019, 28
										</div>
										<div className='camp-days'>
											5 Days Ago
										</div>
									</div>
								</div>
								<div className='item flex2'>
									<div className='campaign-info'>
										<div className='campaign-img'>
											<img
												src={campaignImage}
												alt='campaign'
											/>
										</div>
										<div className='campaign-name-countary'>
											<div className='campaign-name'>
												Auto Chess
											</div>
											<div className='campaign-countary'>
												US
											</div>
										</div>
									</div>
								</div>
								<div className='item flex3'>
									<div className='campaign-view'>
										<Pricing>
											<div className='currency'>$</div>
											<div className='price'>
												<span>View Pricing</span>
											</div>
										</Pricing>
									</div>
								</div>
								<div className='item flex4'>
									<div className='campaign-actions'>
										<div className='campaign-csv'>
											<img src={fileImage} alt='file' />
											<span className='text'>CSV</span>
										</div>
										<div className='campaign-report'>
											<img src={reportImage} alt='file' />
											<span className='text'>Report</span>
										</div>
										<div className='campaign-schedule'>
											<img
												src={calendarImage}
												alt='file'
											/>
											<span className='text'>
												Schedule Again
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</ErrorBoundary>
	);
};

export default Campaigns;
