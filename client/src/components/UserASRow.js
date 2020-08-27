import React from 'react';
import { withRouter } from 'react-router-dom';
import { convertDate } from '../js/ConvertDate.js';
import '../style/UserIdeas.css';

class UserASRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    }

    this.onRowClick = this.onRowClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      challenge: this.props.challenge
    })
  }

  onRowClick() {
    var challengeUrl = '/challenges/' + this.state.challenge.challenge_id;
    this.props.history.push(challengeUrl);
  }

  render() {
    return (
      <tr className={"submission-object " +  (this.state.challenge.color || 'green') + '-row'} onClick={this.onRowClick}>
        <td>{this.state.challenge.name}</td>
        <td className="list-date">{convertDate(this.state.challenge.start)} - {convertDate(this.state.challenge.end)}</td>
      </tr>
    )
  }
}

export default withRouter(UserASRow);
