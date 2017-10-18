import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
	<ul>
		<li>
			<Link to="/patients">Patients</Link>
		</li>
		<li>
			<Link to="/medicine">Medicine</Link>
		</li>
	</ul>
);

export default Menu;
