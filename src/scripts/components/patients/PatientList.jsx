import React from 'react';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.onClick = this.handleSubmit.bind(this);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleSubmit"] }] */
  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: JSON.stringify({})
    }).then((response) => {
        return response.blob();
    }).then((body) => {
        console.log(body);
    });
  }

  render() {
    return <div>
      <h2>PatientList</h2>
      <button onClick={this.onClick}>POST</button>
    </div>;
  }
}

// const PatientList = () => (
//   <div>
//     <h2>PatientList</h2>
//   </div>
// );

// export default PatientList;
