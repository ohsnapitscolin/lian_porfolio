import React from 'react';
import $ from 'jquery';
import './Common.css';

const resources = "./resources/"
const imageDirectory = resources + "Shapes/"
const placesObject = resources + "places.json"


class PlaceImage extends React.Component {
  constructor(props) {
    super(props);
    this.width_ = 0;
    this.height_ = 0;
  }

  componentDidMount() {
    $(window).on('resize', this.sizeImage.bind(this));
  }

  onLoad({target:img}) {
    this.width_ = img.width;
    this.height_ = img.height;
    this.sizeImage();
  }

  sizeImage() {
    var width = $('body').width();
    var height = $('body').height();

    var $image = $('#' + this.props.id);

    if (width / height >= this.width_ / this.height_) {
      var ratio = height / this.height_;
      $image.css({
        'height': height,
        'width': (this.width_ * ratio),
        'margin-top': height / -2
      });
    } else {
      ratio = width / this.width_;
      $image.css({
        'height': (this.height_ * ratio),
        'width': width,
        'margin-top': (this.height_ * ratio) / -2
      });
    }
  }

  render() {
    return (
      <img
        className={"place_image places_" + this.props.imageType}
        id={this.props.id}
        src={require(imageDirectory + this.props.image)}
        alt={this.props.image}
        onLoad={this.onLoad.bind(this)} />
    );
  }
}


class PlaceName extends React.Component {
  componentDidMount() {
    this.addHover();
  }

  render() {
    return (
      <span
        className="places_name"
        id={this.props.place.id}>
          {this.props.place.name}
      </span>
    );
  }

  addHover() {
    var id = '#' + this.props.place.id;
    var hoverId = '#' + this.props.place.id + '_hover';

    $(id).hover(function() {
      $(hoverId).show();
      this.props.setInfo(this.props.place.info);
    }.bind(this), function() {
      $(hoverId).hide();
      this.props.setInfo("");
    }.bind(this));
  }
}

export default class Places extends React.Component {
  constructor() {
    super();
    this.places_ = require(placesObject).places;
    this.state = {
      info: "",
      vertical: false
    };
    this.mediaQuery_ = null;
    this.mediaListener_ = null;
  }

  componentWillMount() {
    this.mediaQuery_ = window.matchMedia("(max-width: 600px)");
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
    this.stylize();

    var placesText  = [];
    var placesImages = [];

    for (var i = 0; i < this.places_.length; i++) {
      var place = this.places_[i];
      placesImages.push(
        <PlaceImage
          key={i}
          id={place.id + "_hover"}
          image={place.image}
          imageType={place.imageType} />
      );
    }

    if (this.state.vertical) {
      for (i = 0; i < this.places_.length; i++) {
        placesText.push (
          <p className="places_line" key={i}>
            <PlaceName
              place={this.places_[i]}
              setInfo={this.setInfo.bind(this)} />
          </p>
        );
      }
    } else {
      placesText.push(
        <div key="places_text">
        <p className="places_line">
          <PlaceName place={this.places_[0]} setInfo={this.setInfo.bind(this)} />
          &nbsp;/&nbsp;
          <PlaceName place={this.places_[1]} setInfo={this.setInfo.bind(this)} />
        </p>
        <p className="places_line">
          /&nbsp;
          <PlaceName place={this.places_[2]} setInfo={this.setInfo.bind(this)} />
          &nbsp;/&nbsp;
          <PlaceName place={this.places_[3]} setInfo={this.setInfo.bind(this)} />
          &nbsp;/
        </p>
        <p className="places_line">
          <PlaceName place={this.places_[4]} setInfo={this.setInfo.bind(this)} />
          &nbsp;/&nbsp;
          <PlaceName place={this.places_[5]} setInfo={this.setInfo.bind(this)} />
        </p>
        <p className="places_line">
          /&nbsp;
          <PlaceName place={this.places_[6]} setInfo={this.setInfo.bind(this)} />
        </p>
        </div>
      );
    }
    return (
       <div className="places">
         <div className="places_box">
           <div id="places_lines">
             {placesText}
           </div>
           {placesImages}
           <p className="places_info">{this.state.info}</p>
         </div>
       </div>
    );
  }

  stylize() {
    $('body').css('background', 'white');
    $('.gradient1').hide();
    $('.gradient2').hide();
  }

  setInfo(info) {
    this.setState({
      info: info
    });
  }
}