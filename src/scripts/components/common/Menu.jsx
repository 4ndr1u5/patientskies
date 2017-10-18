import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

const Menu = () => (
	<Grid className="menu">
		<Row>
			<Col xs={2} className="menu-item">
				<Link to="/patients">Patients</Link>
			</Col>
			<Col xs={2} className="menu-item">
				<Link to="/medicine">Medicine</Link>
			</Col>
		</Row>
	</Grid>
);

export default Menu;
