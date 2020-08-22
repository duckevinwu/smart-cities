import React from 'react';
import { convertDateMs } from '../js/ConvertDate.js';
import IdeaModal from './IdeaModal';

export default class ViewSubmissionRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      status: '',
      savedStatus: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.setState({
      status: this.props.status,
      savedStatus: this.props.status
    })
  }

  handleClick() {
    if (this.state.status === 'pending') {
      this.setState({
        status: 'viewed'
      })

      if (this.state.savedStatus === 'pending') {
        // mark idea as viewed
        fetch("/api/updateidea", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //make sure to serialize your JSON body
          body: JSON.stringify({
            id: this.props.id,
            status: 'viewed'
          })
        })
        .then(res => {
    			return res.json();
    		}, err => {
    			console.log(err);
    		})
        .then(data => {
          console.log(data);
          this.setState({
            savedStatus: 'viewed'
          })
        });
      }
    }
    this.setState({
      showModal: true
    })

  }

  handleCheck(e) {
    if (e.target.checked) {
      this.setState({
        status: 'selected'
      })
      this.props.handleChange(this.props.id, true);
    } else {
      this.setState({
        status: this.state.savedStatus
      })
      this.props.handleChange(this.props.id, false);
    }

  }

  render() {

    const showModal = this.state.showModal;
    let modalContent;

    if (showModal) {
      modalContent = <IdeaModal ideaId={this.props.id} name={this.props.cName} color={this.props.color}/>;
    } else {
      modalContent = null;
    }

    var status = this.state.status;
    let rowClass;

    if (status === 'pending') {
      rowClass = 'pending'
    } else if (status === 'viewed') {
      rowClass= 'viewed'
    } else if (status === 'selected') {
      rowClass = 'selected';
    }

    return (
      <>
        <tr className={'vw-row ' + rowClass}>
          <td>
            <div className="checkbox-wrapper">
              <input type="checkbox" id={'checkbox' + this.props.id} className="checkbox" onChange={this.handleCheck}/>
              <label htmlFor={'checkbox' + this.props.id} className="checkbox-label">
                <span className="checkbox-span"></span>
              </label>
            </div>
          </td>
          <td onClick={this.handleClick} data-toggle="modal" data-target={"#ideaModal-" + this.props.id}>{this.props.email}</td>
          <td className="col-center" onClick={this.handleClick} data-toggle="modal" data-target={"#ideaModal-" + this.props.id}>{convertDateMs(this.props.submit_time)}</td>
        </tr>
        <tr>
          <td className="modal-td">
            <div className="modal fade" id={"ideaModal-" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                {modalContent}
              </div>
            </div>
          </td>
        </tr>
      </>
    )
  }
}
