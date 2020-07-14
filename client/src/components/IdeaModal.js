import React from 'react';
import '../style/IdeaModal.css';
import { convertDateMs } from '../js/ConvertDate.js';

export default class IdeaModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      idea: {},
      name: "",
      isLoaded: false
    }
  }

  componentDidMount() {

    this.setState({
      name: this.props.name
    })

    fetch("/api/ideadetails/" + this.props.ideaId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      console.log(data);
      if (data.status === 'success') {
        // handle success
        this.setState({
          idea: data.ideaDetails,
          isLoaded: true
        })
      } else {
        // handle failure
      }
		});
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-idea">
              <div className="modal-title">
                <a href={'/challenges/' + this.state.idea.challenge} className="modal-link">{this.state.name}</a>
              </div>
              <div className="modal-date">
                <i className="fa fa-clock-o" aria-hidden="true"></i> {convertDateMs(this.state.idea.submit_time)}
              </div>
              <pre className="modal-summary">
                {this.state.idea.content}
              </pre>
              <div className="idea-br">
                Idea
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="modal-content">
          <div className="modal-body">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      );
    }

  }
}
