import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';

import './index.scss';
import Provider from '../store/provider';
import SideDrawer from '../shared/side-drawer';
import { campaigns } from './utils/constants';

const UpcomingCampaigns = React.lazy(() =>
	import(
		/* webpackChunkName: "upcoming-campaigns" */ './components/upcoming-campaigns'
	)
);

const LiveCampaigns = React.lazy(() =>
	import(
		/* webpackChunkName: "live-campaigns" */ './components/live-campaigns'
	)
);

const PastCampaigns = React.lazy(() =>
	import(
		/* webpackChunkName: "past-campaigns" */ './components/past-campaigns'
	)
);

const App = props => {
	const [showDrawer, setShowDrawer] = useState(false);

	function isActive(url) {
		return props.history.location.pathname === url;
	}

	return (
		<Provider>
			<div className='app'>
				{showDrawer ? (
					<SideDrawer
						toggleDrawer={flag => setShowDrawer(flag)}
						targetClass='nav-link'
					>
						<div className='mob-nav-items'>
							{Object.keys(campaigns).map(key => {
								return (
									<div
										key={key}
										className={
											isActive(key)
												? 'mob-nav-item active'
												: 'mob-nav-item'
										}
									>
										<Link to={key} className='nav-link'>
											{campaigns[key]}
										</Link>
									</div>
								);
							})}
						</div>
					</SideDrawer>
				) : null}
				<header className='header'>
					<div className='middle'>
						<div className='logo'>
							<img
								src='https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png'
								alt='bluestacks'
							/>
						</div>
						<div
							className='menu-btn'
							onClick={() => setShowDrawer(true)}
						>
							<div className='nav-icon first'></div>
							<div className='nav-icon second'></div>
							<div className='nav-icon third'></div>
						</div>
					</div>
				</header>
				<section className='main-container'>
					<div className='campaigns-header desktop'>
						Manage Campaigns
					</div>
					<div className='campaigns-header mobile'>
						{campaigns[props.history.location.pathname]}
					</div>

					<div className='navigation-tabs'>
						{Object.keys(campaigns).map(key => {
							const tabLinkText = campaigns[key];
							return (
								<div
									key={key}
									className={
										isActive(key)
											? 'nav-item active'
											: 'nav-item'
									}
								>
									<Link to={key}>{tabLinkText}</Link>
								</div>
							);
						})}
					</div>

					<div className='navigations-componenet'>
						<Switch>
							<Route
								path='/upcoming-campaigns'
								component={() => (
									<React.Suspense
										fallback={<React.Fragment />}
									>
										<UpcomingCampaigns />
									</React.Suspense>
								)}
							/>

							<Route
								exact
								path='/live-campaigns'
								component={() => (
									<React.Suspense
										fallback={<React.Fragment />}
									>
										<LiveCampaigns />
									</React.Suspense>
								)}
							/>

							<Route
								exact
								path='/past-campaigns'
								component={() => (
									<React.Suspense
										fallback={<React.Fragment />}
									>
										<PastCampaigns />
									</React.Suspense>
								)}
							/>

							<Redirect from='/' to='/upcoming-campaigns' />
						</Switch>
					</div>
				</section>
			</div>
		</Provider>
	);
};

export default withRouter(React.memo(App));
