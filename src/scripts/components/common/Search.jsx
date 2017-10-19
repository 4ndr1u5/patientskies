import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class Search extends React.Component {
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
