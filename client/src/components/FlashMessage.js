import React from 'react';
import '../style/FlashMessage.css';

export default class FlashMessage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: 'alert-open'
    }

  }


  render() {

    return (
      <div className={'alert ' + this.state.open}>
        {this.props.message}
      </div>
    )
  }


}
