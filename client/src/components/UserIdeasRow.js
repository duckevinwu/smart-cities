import React from 'react';
import '../style/UserIdeas.css';
import { convertDateMs } from '../js/ConvertDate.js';

export default class UserIdeasRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      idea: {}
    }

  }

  componentDidMount() {
    this.setState({
      idea: this.props.idea
    })
  }

  render() {
    return (
      <tr className="submission-object">
        <td>{this.state.idea.name}</td>
        <td className="list-date">{convertDateMs(this.state.idea.submit_time)}</td>
        <td className="list-status">
          <span data-tooltip="Pending Review"><i className="fa fa-hourglass"></i></span>
        </td>
      </tr>
    );
  }

}
