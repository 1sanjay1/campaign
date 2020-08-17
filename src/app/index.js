import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';

import './index.scss';
import Provider from '../store/provider';
import Context from '../store/context';
import SideDrawer from '../shared/side-drawer';
import LanguageSelector from './components/language-selector';
import { campaigns } from './utils/constants';
import { languages } from './utils/languages';

const Campaigns = React.lazy(() =>
	import(/* webpackChunkName: "Campaigns" */ './components/campaigns')
);

const App = props => {
	const [showDrawer, setShowDrawer] = useState(false);

	function isActive(url) {
		return props.history.location.pathname === url;
	}

	return (
		<Provider>
			<Context.Consumer>
				{context => {
					const { languageType } = context;
					const language = languages[languageType];
					return (
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
													<Link
														to={key}
														className='nav-link'
													>
														{
															language[
																campaigns[key]
															]
														}
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
										<Link to='/campaign'>
											<img
												src='https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png'
												alt='bluestacks'
											/>
										</Link>
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
									<div className='campaigns-header'>
										{language['Manage Campaigns']}
									</div>
									<LanguageSelector context={context} />
									{/* <div
										className='language-selector'
										onClick={e =>
											toggleDropdown(context, e)
										}
									>
										<span className='text'>
											Select Language
										</span>
										{showLangDropdown ? (
											<div className='language-dropdown'>
												<ul className='language-list'>
													<li
														className='language-list-item'
														id='english'
													>
														English
													</li>
													<li
														className='language-list-item'
														id='german'
													>
														German
													</li>
												</ul>
											</div>
										) : null}
									</div> */}
								</div>
								<div className='campaigns-header mobile'>
									<div className='campaigns-header-text'>
										{
											campaigns[
												props.history.location.pathname
											]
										}
									</div>
									<LanguageSelector context={context} />
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
												<Link to={key}>
													{language[tabLinkText]}
												</Link>
											</div>
										);
									})}
								</div>

								<div className='navigations-component'>
									<Switch>
										<Route
											path='/*campaigns'
											exact
											component={() => (
												<React.Suspense
													fallback={
														<React.Fragment />
													}
												>
													<Campaigns {...props} />
												</React.Suspense>
											)}
										/>

										<Redirect
											from='/'
											to='/upcoming-campaigns'
										/>
									</Switch>
								</div>
							</section>
						</div>
					);
				}}
			</Context.Consumer>
		</Provider>
	);
};

export default withRouter(React.memo(App));
