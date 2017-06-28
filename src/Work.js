import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import './Common.css'

const resources = "./resources/"

const projectDirectory = resources + "Projects/"
const thumbnailDirectory = resources + "Thumbnails/"
const projectSpecObject = "/project_spec.json"
const workObject = resources + "work.json"

class ProjectImage extends React.Component {
  constructor(props) {
    super(props);
    this.width_ = 0;
    this.height_ = 0;
  }

  onLoad({target:img}) {
    this.width_ = img.width;
    this.height_ = img.height;
  }

  render() {
    return (
      <img
        className={"project_image_" + this.props.type}
        src={require(projectDirectory + this.props.src)}
        alt={this.props.src}
        onLoad={this.onLoad.bind(this)} />
    );
  }
}

class ProjectHeader extends React.Component {
  render() {
    var team = [];
    for (var i = 0; i < this.props.project.team.length; i++) {
      team.push(<div key={i}>{this.props.project.team[i]}</div>);
    }
    return (
      <div className="project_header">
        <div className="project_header_container">
          <div className="project_header_left">
            <div className="project_name">
              {this.props.project.name}
            </div>
            <div className="project_type">
              {this.props.project.type}
            </div>
          </div>
          <div className="project_header_right">
            <div className="project_goal_container">
              <p className="project_title">
                Goal:
              </p>
              <div className="project_header_content">
                {this.props.project.goal}
              </div>
            </div>
            <div className="project_year_container">
              <p className="project_title">
                Year:
              </p>
              <div className="project_header_content">
                {this.props.project.year}
              </div>
            </div>
            <div className="project_team_container">
              <p className="project_title">
                Team:
              </p>
              <div className="project_header_content">
                {team}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ProjectContent extends React.Component {
  render() {
    var images = [];
    for (var i = 0; i < this.props.images.length; i++) {
      var imageObject = this.props.images[i];
      images.push(
        <div key={i} className="project_image_container">
          <ProjectImage
            src={this.props.name + "/" + imageObject.src}
            type={imageObject.type} />
          <div className={"project_image_text_wrapper_" + imageObject.type}>
            <p className="project_image_text"
               dangerouslySetInnerHTML={{__html: imageObject.text}} />
          </div>
        </div>
      );
    }
    return (
      <div className="project_content">
        {images}
      </div>
    );
  }
}

class Project extends React.Component {
  constructor(props) {
    super();
    this.project_ = null;
    try {
      this.project_ = require(projectDirectory + props.name + projectSpecObject);
    } catch(e) {
      console.warn(props.name + " could not be found!");
      throw(e);
    }
  }

  componentWillReceiveProps(props) {
    try {
      this.project_ = require(projectDirectory + props.name + projectSpecObject);
    } catch(e) {
      console.warn(props.name + " could not be found!");
      throw(e);
    }
  }

  render() {
    if (!this.project_) {
      return null;
    }
    return (
      <div className="work_project">
        <ProjectHeader project={this.project_}/>
        <ProjectContent
          name={this.props.name}
          images={this.project_.images} />
      </div>
    );
  }
}

class Grid extends React.Component {
  constructor() {
    super();

    this.work_ = require(workObject).work;
	}

  componentDidMount() {
	  this.stylize();
    this.addRollover();
  }

  render() {
    var images = [];
    for (var i = 0; i < this.work_.length; i++) {
      const style = {
        width: this.work_[i].thumbnail_width
      };
      if (!this.work_[i].in_progress) {
        images.push(
          <div key={i} className="work_image_wrapper" style={style}>
            <Link className="work_image_link" to={"/work/" + this.work_[i].url}>
              <div className="work_image_and_rollover">
                <img
                    className="work_image"
                    src={require(thumbnailDirectory + this.work_[i].thumbnail_src)}
                    alt={this.work_[i].thumbnail_src} />
                <div className="thumbnail_rollover">
                    <div className="thumbnail_rollover_text">
                      {this.work_[i].hover}
                    </div>
                </div>
              </div>
              <p className="thumbnail_name">{this.work_[i].name}</p>
            </Link>
          </div>
        );
      } else {
        images.push(
          <div key={i} className="work_image_wrapper in_progress" style={style}>
            <div className="work_image_and_rollover">
              <img
                  className="work_image"
                  src={require(thumbnailDirectory + this.work_[i].thumbnail_src)}
                  alt={this.work_[i].thumbnail_src} />
              <div className="in_progress_rollover">
                  <div className="in_progress_rollover_text">
                    {this.work_[i].hover}
                  </div>
              </div>
            </div>
            <p className="thumbnail_name">{this.work_[i].name}</p>
          </div>
        );
      }
    }
  	this.stylize();
    var imagesStyle = {};
    var gridStyle = {};
    return (
      <div className="work_grid" style={gridStyle}>
        <img id="work_point" src={require(resources + "point.png")} />
        <br/>
        <p className="work_header">
          Exploring how design & community converge — through visual stories, across digital screens, among printed objects, behind proactive movements.
        </p>
        <div id="work_images" style={imagesStyle}>
          {images}
        </div>
      </div>
    );
  }

  stylize() {
    $('body').css("background", "white");
    $('.gradient1').hide();
    $('.gradient2').hide();
  }

  addRotation() {
    $('.work_image_wrapper').each(function(i, obj) {
      var angle = Math.floor(Math.random() * 5) + 5;
      var direction = Math.floor(Math.random() * 2)
      if (direction) {
        angle *= -1;
      }

      var rotateString = 'rotate(' + angle + 'deg)';
      var $image = $(obj).find('.work_image');

      if (!$image) {
        return;
      }

      $(obj).hover(function() {
        $image.css({
            '-webkit-transform': rotateString,
            '-moz-transform': rotateString,
            '-ms-transform': rotateString,
            '-o-transform': rotateString
        });
      }, function() {
        $image.removeAttr('style');
      });
    });
  }

  addRollover() {
    $('.work_image_and_rollover').each(function(i, obj) {
      var $rollover = $(obj).find('.thumbnail_rollover');
      if ($rollover) {
        $(obj).hover(function() {
          $rollover.addClass('rollover');
        }, function() {
          $rollover.removeClass('rollover');
        });
      }

      var $in_progress = $(obj).find('.in_progress_rollover');
      if ($in_progress) {
        $(obj).hover(function() {
          $in_progress.addClass('rollover');
        }, function() {
          $in_progress.removeClass('rollover');
        });
      }
    });
  }
}

export default class work extends React.Component {
  constructor(props) {
    super();
    this.thumbnails_ = require(workObject).work;
    this.urls_ = [];
    for (var i = 0; i < this.thumbnails_.length; i++) {
      this.urls_.push(this.thumbnails_[i].url);
    }
  }

  render() {
    var project = [];
    if (this.urls_.indexOf(this.props.params.name) > -1) {
      project.push(
        <Project
          key={this.props.params.name}
          name={this.props.params.name}/>
      );
    }

    return (
      <div className="work">
        {project}
        <Grid/>
      </div>
    );
  }
}