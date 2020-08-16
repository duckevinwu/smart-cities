import React from 'react';
import DOMPurify from 'dompurify';
import { appendScript } from '../js/AppendScript.js';
import { convertDateMs } from '../js/ConvertDate.js';

export default class GeneratePdf extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ideas: []
    }

    this.generatePDF = this.generatePDF.bind(this);
  }

  componentDidMount() {
    appendScript('https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');
  }

  generatePDF() {
    var keys = Object.keys(this.props.ideas);

    // get idea info that matches these keys
    fetch("/api/selectedideas", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        ids: keys
      })
    })
    .then(res => {
			return res.json();
		}, err => {
			console.log(err);
		})
    .then(data => {
      console.log(data);

      var ideaList = data.ideas;

      if (ideaList) {
        let ideaDivs = ideaList.map((idea, i) =>
          <div key={i} className="pdf-block">
            <div><b>Email: </b>{idea.email}</div>
            <br/>
            <div><b>Date: </b>{convertDateMs(idea.submit_time)}</div>
            <br/>
            <div className="section-content ql-editor"
                 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(idea.content)}}>
            </div>
            <br/>
            <hr/>
          </div>

        );

        this.setState({
          ideas: ideaDivs
        }, () => {
          var opt = {
            pagebreak: {mode: 'avoid-all'}
          }
          var element = document.getElementById('pdf-content').innerHTML;
          window.html2pdf().set(opt).from(element).save();
        })
      }

    });
  }




  render() {

    return (
      <>
        <div className="pdf-wrapper">
          <a className="pdf-button" onClick={this.generatePDF}>Download PDF</a>
        </div>
        <div className="pdf-body" id="pdf-content">
          <div className="pdf-title">
            <h2>{this.props.name}</h2>
          </div>
          <hr/>
          {this.state.ideas}
        </div>
      </>
    )

  }
}
