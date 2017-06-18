import React from 'react';
import $ from 'jquery';
import './Common.css'

var resources = "./resources/"

class FutureLeft extends React.Component {
 render() {
    return (
      <div id="future_section_left">
        <div className="future_left" id="opportunities">
          <p id="opportunities_header">Opportunities welcome!</p>
          <a id="opportunities_link" href="mailto:lian.fumerton.liu@gmail.com">lian.fumerton.liu@gmail.com</a>
        </div>
        <div className="future_left" id="say_hello">
          <p id="say_hello_header">Say hello sometime.</p>
          <div id="say_hello_links">
            <a className="say_hello_links" id="say_hello_links_linkedin" href="https://www.linkedin.com/in/lian-fumerton-liu-9456aa67" target="_blank">LinkedIn</a>
            <a className="say_hello_links" id="say_hello_links_instagram" href="https://www.instagram.com/lianreay/" target="_blank">Instagram</a>
            <a className="say_hello_links" id="say_hello_links_pinterest" href="https://uk.pinterest.com/lianreay/" target="_blank">Pinterest</a>
          </div>
        </div>
      </div>
    );
  }
}

class FutureRight extends React.Component {
   render() {
    return (
      <div id="future_section_right">
        <div id="eightball">
            <div id="eightball_question">Should I contact Lian?</div>
              <img
                id="eightball_image"
                src={require(resources + 'crystal_ball.png')}
                alt="eightball"
                onClick={this.props.onClick}
              />
            <div id="eightball_answer">"{this.props.value}"</div>
        </div>
      </div>
    );
  }
}

export default class Future extends React.Component {
  constructor() {
    super();
    var data = require(resources + 'future.json');
    this.state = {
      answers: data.answers,
      answer: this.randomValue(data.answers)
    };
  }

  componentDidMount() {
    this.stylize();
  }

  render() {
    this.stylize();
    return (
      <div className="future">
        <FutureLeft />
        <FutureRight
          value={this.state.answer}
          onClick={this.onClick.bind(this)}
        />
      </div>
    );
  }

  stylize() {
    $('body').css("background", "#FFF0E9");
    $('.gradient1').hide();
    $('.gradient2').hide();
  }

  onClick() {
    console.log("click")
    this.setState({
      answer: this.randomValue(this.state.answers, this.state.answer)
    });
  }

  randomValue(data, current) {
    var value = data[Math.floor(Math.random() * data.length)];

    while (value === current) {
      value = data[Math.floor(Math.random() * data.length)];
    }
    return value;
  }
}