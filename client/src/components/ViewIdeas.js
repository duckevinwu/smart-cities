import React from 'react';
import ViewSubmissionRow from './ViewSubmissionRow';
import GeneratePdf from './GeneratePdf';
//import '../style/Dashboard.css';
//import PageNavbar from './PageNavbar';

export default class ViewIdeas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
      isLoaded: false,
      selectedObj: {}
    }
  }

  // React function that is called when the page load.
  componentDidMount() {

    var challengeId = this.props.challengeId;

    fetch("/api/ideas/" + challengeId,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(data => {
      if (data.status === 'success') {

        var handleOptionChange = (ideaId, add) => {
            var selectedObj = this.state.selectedObj;

            if (add) {
              selectedObj[ideaId] = 1;
            } else {
              delete selectedObj[ideaId];
            }

            this.setState({
              selectedObj: selectedObj
            })
          }

        var ideaList = data.ideas;
        let ideaDivs = ideaList.map((idea, i) =>
          <ViewSubmissionRow
            key={i}
            id={idea.idea_id}
            email={idea.email}
            submit_time={idea.submit_time}
            status={idea.status}
            cName={this.props.cName}
            handleChange={handleOptionChange}
          />
			  );

  			this.setState({
  				ideas: ideaDivs
  			});
      }

      this.setState({
        isLoaded: true
      })

		});
  }

  render() {

    if (this.state.isLoaded) {
      return (
        <div className="table-wrapper">
        <GeneratePdf ideas={this.state.selectedObj} name={this.props.cName}/>
          <table className="submission-list">
            <tbody>
              <tr>
                <th className="check-col vs-th"></th>
                <th className="vs-th">Email</th>
                <th className="col-center vs-th">Date Submitted</th>
              </tr>
              {this.state.ideas}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="vs-spinner-wrapper">
          <div className="vs-spinner"></div>
        </div>
      )
    }
  }
}
