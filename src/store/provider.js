import React from 'react';

import Context from './context';
import { getData, updateData } from '../app/utils/helpres';

class Provider extends React.Component {
	state = {
		modal: {
			show: false,
			children: null,
		},
		campaignsData: getData(),
	};

	toggleModal = ({ show, children }) => {
		this.setState({ modal: { show, children } });
	};

	updateCampaign = campaign => {
		const data = updateData(campaign);

		this.setState({
			...this.state,
			campaignsData: data,
		});
	};

	render() {
		return (
			<Context.Provider
				value={{
					...this.state,
					modal: {
						...this.state.modal,
						toggle: this.toggleModal,
					},
					updateCampaign: this.updateCampaign,
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export default Provider;
