import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

import './Common.css';

var PathEnum = {
    PRESENT : 0,
    PAST : 1,
    PLACES : 2,
    FUTURE : 3,
    WORK : 4,
    NOT_FOUND : 5
}

class Home extends React.Component {
  render() {
    return (
    	<Link to="/present" onClick={this.props.onClick}>
        <div className="home home_button home_right">
          <img className="home_image_right" src={require("./home_right.png")} alt="home" />
        </div>
        <div className="home home_button home_left">
          <img className="home_image_left" src={require("./home_left.png")} alt="home" />
        </div>
    	</Link>
    );
  }
}

class Border extends React.Component {
  render() {
	return (
		<div className="border_wrapper">
			<div className="border">
		    	<div className="borderBar" id="left">
			      	<Link id="past_link" className="borderLink" to="/past" onClick={this.props.onClick}>
			      		<p className="borderText">Past</p>
			      	</Link>
		    	</div>
				<div className="borderBar" id="right">
			      	<Link id="future_link" className="borderLink" to="/future" onClick={this.props.onClick}>
			      		<p className="borderText">Future</p>
			      	</Link>
		      	</div>
				<div className="borderBar" id="top">
			      	<Link id="places_link" className="borderLink" to="/places" onClick={this.props.onClick}>
			      		<p className="borderText">Places</p>
			      	</Link>
		      	</div>
				<div className="borderBar" id="bottom">
			      	<Link id="work_link" className="borderLink" to="/work" onClick={this.props.onClick}>
			      		<p className="borderText">Work</p>
			      	</Link>
		      	</div>
			</div>
		</div>
     );
  }
}

class ShowButton extends React.Component {
  render() {
	return (
		<div className="show_border_button" onClick={this.props.onClick}>
			<div className="burger_line" />
			<div className="burger_line" />
			<div className="burger_line" />
		</div>
     );
  }
}

class HideButton extends React.Component {
  render() {
	return (
		<div className="hide_border_button" onClick={this.props.onClick} >
			<div className="x_line_forward" />
			<div className="x_line_backward" />
		</div>
     );
  }
}

export default class Nativigation extends React.Component {
  render() {
  	this.stylize();
  	return (
  		<div className="portfolio">
  			<Border onClick={this.hideMobileNav.bind(this)} />
  			<Home onClick={this.hideMobileNav.bind(this)}/>
  			<ShowButton onClick={this.showMobileNav.bind(this)}/>
  			<HideButton onClick={this.hideMobileNav.bind(this)} />
        <Link to="/present" onClick={this.hideMobileNav.bind(this)}>
  		    <div className="overlay"/>
        </Link>
        <div className="gradient1"/>
        <div className="gradient2"/>
  	    <div className="content">
  	      {this.props.children}
  	    </div>
      </div>
    );
  }

  stylize() {
  	var path = this.getPath(this.props.location.pathname);

  	// Hide the home button on the PRESENT page.
    path === PathEnum.PRESENT ? $('.home').hide() : $('.home').show();

  	// Underline the border text corresponding to the current page.
    $('#top .borderText').css('border-bottom-style', 'none');
    $('#right .borderText').css('border-bottom-style', 'none');
    $('#bottom .borderText').css('border-bottom-style', 'none');
    $('#left .borderText').css('border-bottom-style', 'none');

    if (path === PathEnum.PLACES) {
	    $('#top .borderText').css('border-bottom-style', 'solid');
    } else if (path === PathEnum.FUTURE) {
	    $('#right .borderText').css('border-bottom-style', 'solid');
    } else if (path === PathEnum.WORK) {
	    $('#bottom .borderText').css('border-bottom-style', 'solid');
    } else if (path === PathEnum.PAST) {
	    $('#left .borderText').css('border-bottom-style', 'solid');
    }
  }

  componentDidMount() {
  	this.stylize();

    var query = this.getBorderMediaQuery();
    query.addListener(this.handleMediaChange.bind(this));
    this.handleMediaChange(query);
  }

  getBorderMediaQuery() {
    return window.matchMedia("(max-width: 600px), (max-height: 400px)");
  }

  handleMediaChange(query) {
    if (query.matches) {
      this.transitionBorder(true);
    } else {
      this.hideMobileNav();
    }
  }

  transitionBorder(thin) {
    if (thin) {
      $('.borderBar').addClass('thin');
      $('.homeButton').addClass('transition');
      $('.homeShadow').addClass('transition');
    } else {
      $('.borderBar').removeClass('thin');
      $('.homeButton').removeClass('transition');
      $('.homeShadow').removeClass('transition');
    }
  }


  showMobileNav() {
      this.transitionBorder(false);
      $('.show_border_button').addClass('hidden');
      $('.hide_border_button').addClass('active');
      $('.home_left').addClass('active');
      $('.overlay').show();
  }

  hideMobileNav() {
    var query = this.getBorderMediaQuery();
    this.transitionBorder(query.matches);
    $('.show_border_button').removeClass('hidden');
    $('.hide_border_button').removeClass('active');
    $('.home_left').removeClass('active');
  	$('.overlay').hide();
  }

  getPath(pathname) {
  	switch(pathname) {
  		case '/':
  		case '/present':
  		case '/present/':
	  		return PathEnum.PRESENT;
  		case '/past':
  		case '/past/':
  			return PathEnum.PAST;
  		case '/places':
  		case '/places/':
  			return PathEnum.PLACES;
  		case '/future':
  		case '/future/':
  			return PathEnum.FUTURE;
  		case '/work':
  		case '/work/':
  			return PathEnum.WORK;
		default:
			return PathEnum.NOT_FOUND;
  	}
  }
}