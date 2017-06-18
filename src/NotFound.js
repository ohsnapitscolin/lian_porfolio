import React from 'react';
import $ from 'jquery';
import './Common.css'

export default class NotFound extends React.Component {
  constructor() {
    super();
  }

  render() {
    $('body').css("background", "#FFF0E9");
    $('.gradient1').hide();
    $('.gradient2').hide();
    return (
      <div className="not_found_container">
        <p className="not_found_header">Whoops!</p>
        <p className="not_found_text">Try again...</p>
      </div>
    );
  }
}