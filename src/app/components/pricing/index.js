import React from 'react';

import './pricing.scss';
import pubgImage from '../../../resources/images/pubg.png';

const Pricing = props => {
	return (
		<div className='pricing'>
			<div className='pricing-content'>
				<div className='pricing-header'>
					<div className='game-image'>
						<img src={pubgImage} alt='pubg' />
					</div>
					<div className='game-info'>
						<div className='game-name'>pubg mobile</div>
						<div className='country'>us</div>
					</div>
				</div>
				<div className='pricing-body'>
					<div className='pricing-text'>Pricing</div>
					<div className='packages'>
						<div className='package'>
							<div className='duration'>1 Week - 1 Month</div>
							<div className='price'>$ 100.00</div>
						</div>
						<div className='package'>
							<div className='duration'>6 Months</div>
							<div className='price'>$ 500.00</div>
						</div>
						<div className='package'>
							<div className='duration'>1 Year</div>
							<div className='price'>$ 900.00</div>
						</div>
					</div>
				</div>
				<div className='pricing-footer'>
					<div className='pricing-footer-btn close'>
						<span className='pricing-footer-text close'>Close</span>
					</div>
				</div>

				<div className='pricing-mob-btn close'>
					<span className='pricing-mob-icon close'>&times;</span>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Pricing);
