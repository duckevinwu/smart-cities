import React from 'react';
import DOMPurify from 'dompurify';
import '../style/IdeaModal.css';
import { convertDateMs } from '../js/ConvertDate.js';

export default class IdeaModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      idea: {},
      name: "",
      color: "",
      isLoaded: false
    }
  }

  componentDidMount() {

    this.setState({
      name: this.props.name,
      color: this.props.color
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
          <div className={"modal-body " + this.state.color + '-modal'}>
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
              <div className="modal-date">
                <i className="fa fa-user" aria-hidden="true"></i> {this.state.idea.email}
              </div>
              <div className="modal-idea-content">
                <p><font className="goldText">Submitting as group:</font> {this.state.idea.is_group}</p>
                <p><font className="goldText">Team members:</font> {this.state.idea.team || 'N/A'}</p>
                <p><font className="goldText">Solution Overview:</font></p>
                <div className="modal-summary ql-editor"
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.idea.content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                </div>
                <p><font className="goldText">About you:</font></p>
                <div className="modal-summary ql-editor"
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.idea.about_you, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                </div>
                <p><font className="goldText">Willing to interview:</font> {this.state.idea.interview}</p>
                <p><font className="goldText">Additional info:</font></p>
                <div className="modal-summary ql-editor"
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.idea.other_info, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] })}}>
                </div>
              </div>

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
          <div className={"modal-body " + this.state.color + '-modal'}>
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      );
    }

  }
}
