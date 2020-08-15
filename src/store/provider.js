import React from 'react';

import Context from './context';
import { campaignsData } from '../app/utils/constants';
import { formatData } from '../app/utils/helpres';

class Provider extends React.Component {
	state = {
		modal: {
			show: false,
			children: null,
		},
		campaignsData: formatData(campaignsData),
	};

	toggleModal = ({ show, children }) => {
		this.setState({ modal: { show, children } });
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
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export default Provider;
