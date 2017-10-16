import React from 'react';
import ReactDOM from 'react-dom';

// require('../styles/main.less');
import style from '../styles/main.less';

class Main extends React.Component {
    render(){
        console.log(style);
        return (<div><h1 className="title">Hello World</h1></div>);
    }
}

ReactDOM.render(<Main />, document.getElementById('main-container'));