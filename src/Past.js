import React from 'react';
import $ from 'jquery';
import './Common.css';

var resources = "./resources/"

class JobData extends React.Component {
  render() {
    return (
      <div className="jobData">
        <p className="jobYear">{this.props.job.years}</p>
        <div className="jobLine"></div>
        <a
          className="jobName"
          href={this.props.job.link}
          target="_blank">
            {this.props.job.name}
        </a>
        <div className="jobTitle">{this.props.job.title}</div>
        <div className="jobLocation">{this.props.job.location}</div>
      </div>
    );
  }
}

class JobTable extends React.Component {
  render() {
  	var jobTable = [];
  	for (var i = 0; i < this.props.jobs.length; i++) {
  		jobTable.push(
  			<JobData
  				key={i}
  				job={this.props.jobs[i]}
  			/>
  		);
  	}
  	return (
  		<div className="jobTable">
  		   {jobTable}
  	   </div>
  	);
	}
}

class Education extends React.Component {
  render() {
    var resume = [];
    if (this.props.vertical) {
      resume.push(<Resume key="resume"/>);
    }
    return (
  		<div className="education">
        <p className="eduHeader">Education</p>
		    <p className="eduSchool">{this.props.edu.school}</p>
		    <p className="eduMajor">{this.props.edu.major}</p>
		    <p className="eduSkills">{this.props.edu.skills}</p>
		    <p className="eduLocation">{this.props.edu.location}</p>
        {resume}
      </div>
    );
  }
}

class Notables extends React.Component {
  render() {
    var notables = [];
    for (var i = 0; i < this.props.notables.length; i++) {
      notables.push(
        <li className="notables_element"
            dangerouslySetInnerHTML={{__html: this.props.notables[i].text}} />
      );
    }
    return (
      <div className="notables">
        <div className="notables_title">Notables</div>
        <div className="notables_line_container">
          <div className="notables_line"></div>
        </div>
        <ul className="notables_list">{notables}</ul>
      </div>
    );
  }
}

class Resume extends React.Component {
  render() {
    return (
      <div id="download">
        <a id="download_link" href={require(resources + "Lian_Resume_2017.pdf")} download>
          <p id="download_text">Download Full Resume</p>
          <br></br>
          <img id="download_image" src={require(resources + "download.png")} alt="download" />
        </a>
      </div>
    );
  }
}

export default class Past extends React.Component {
  constructor() {
    super();
    var past = require(resources + 'past.json');
    this.jobs_ = past.jobs;
    this.education_ = past.education;
    this.notables_ = past.notables;
    this.state = {
      vertical: false
    };
    this.mediaQuery_ = null;
    this.mediaListener_ = null;
  }

  componentWillMount() {
    this.mediaQuery_ = window.matchMedia("(max-width: 1000px)");
    this.mediaListener_ = this.handleMediaChange.bind(this);
    this.mediaQuery_.addListener(this.mediaListener_);
    this.handleMediaChange(this.mediaQuery_);
  }

  handleMediaChange(query) {
    this.setState({
      vertical: query.matches
    });
  }

  componentDidMount() {
    this.stylize();
  }

  componentWillUnmount() {
    if (this.mediaQuery_) {
      this.mediaQuery_.removeListener(this.mediaListener_);
    }
  }

  render() {
    var resume = [];
    if (!this.state.vertical) {
      resume.push(<Resume key="resume"/>);
    }
    this.stylize();
  	return (
  		<div className="past">
        {resume}
   			<Education edu={this.education_} vertical={this.state.vertical} />
  			<JobTable jobs={this.jobs_} />
        <Notables notables={this.notables_} />
   		</div>
   	);
  }

  stylize() {
    $('body').css("background", "#F2F2F2");
    $('.gradient1').hide();
    $('.gradient2').hide();
  }
}