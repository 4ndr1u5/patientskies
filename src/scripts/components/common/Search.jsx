import React from 'react';
import { debounce } from 'lodash';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FormControl
				type="text"
				onChange={e => {
					this.props.onInputChange(e.target.value);
				}}
				value={this.props.query}
				placeholder={this.props.placeholder}
				className="search"
			/>
		);
	}
}
