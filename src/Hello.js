import React from 'react';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <p>It is {this.props.date}</p>
      </div>
    );
  }
}
export default Hello;
