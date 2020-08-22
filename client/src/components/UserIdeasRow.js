import React from 'react';
import '../style/UserIdeas.css';
import { convertDateMs } from '../js/ConvertDate.js';
import IdeaModal from './IdeaModal';

export default class UserIdeasRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      idea: {},
      showModal: false
    }

    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    this.setState({
      idea: this.props.idea
    })
  }

  handleClick() {
    this.setState({
      showModal: true
    })
  }

  render() {

    const showModal = this.state.showModal;
    let modalContent;

    if (showModal) {
      modalContent = <IdeaModal ideaId={this.props.idea.idea_id} name={this.props.idea.name} color={this.state.idea.color}/>;
    } else {
      modalContent = null;
    }

    return (
      <>
        <tr className={"submission-object " +  this.state.idea.color + '-row'} onClick={this.handleClick} data-toggle="modal" data-target={"#ideaModal-" + this.state.idea.idea_id}>
          <td>{this.state.idea.name}</td>
          <td className="list-date">{convertDateMs(this.state.idea.submit_time)}</td>
          <td className="list-status">
            <span data-tooltip="Pending Review"><i className="fa fa-hourglass"></i></span>
          </td>
        </tr>
        <tr>
          <td className="modal-td">
            <div className="modal fade" id={"ideaModal-" + this.props.idea.idea_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                {modalContent}
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }

}
