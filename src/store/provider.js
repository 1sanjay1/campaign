import React from 'react';

import Context from './context';

class Provider extends React.Component {
	state = {
		modal: {
			show: false,
			children: null,
		},
	};

	toggleModal = ({ show, children }) => {
		this.setState({ modal: { show, children } });
	};

	render() {
		return (
			<Context.Provider
				value={{
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
