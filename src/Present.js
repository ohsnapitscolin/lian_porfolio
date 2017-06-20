import React from 'react';
import $ from 'jquery';
import "./Common.css";

const TYPE_INTERVAL = 75;
const TYPE_PAUSE = 500;
const ERASE_INTERVAL = 50;
const ERASE_PAUSE = 1500;

const resources = "./resources/"

class Footer extends React.Component {
  render() {
    return (
      <div className="present_footer_wrapper">
        <p className="present_footer">
          I presently work as a designer<br></br>at&nbsp;
          <a
            className="present_link"
            href="http://www.studiorodrigo.com"
            target="_blank">
              Studio Rodgrio
          </a>
          &nbsp;in New York, NY.
        </p>
      </div>
    );
  }
}

class Greeting extends React.Component {
  render() {
    return (
      <div className="greeting">
        <div className="face_wrapper">
          <img className="lian_face" src={require(resources + 'me.png')} alt="me"/>
        </div>

        <div className="hi">Hi, I'm Lian.</div>
        <div className="iLike">I'm a designer who likes to make</div>

        <div className="likes">
          <div className="like_box" id="like1">
            <div className="like_text">{this.props.like1}</div>
          </div>
          <div className="ampersand">&</div>
          <div className="like_box" id="like2">
            <div className="like_text">{this.props.like2}</div>
          </div>
        </div>

          <div id="contact_icons">
            <a className="contact_icons_link" href="https://www.linkedin.com/in/lian-fumerton-liu-9456aa67" target="_blank">
              <img className='contact_icons_image' src={require(resources + "linkedin.png")} alt="linkedin" />
            </a>
            <a className="contact_icons_link" href="https://www.instagram.com/lianreay/" target="_blank">
              <img className='contact_icons_image' src={require(resources + "instagram.png")} alt="instagram" />
            </a>
            <a className="contact_icons_link" href="https://uk.pinterest.com/lianreay/" target="_blank">
              <img className='contact_icons_image' src={require(resources + "pinterest.png")} alt="pinterest" />
            </a>
          </div>
      </div>
    );
  }
}

export default class Present extends React.Component {
  constructor() {
    super();
    var present = require(resources + 'present.json');
    this.likes_ = [present.works, present.hobbies]
    this.currLikes_ = [];
    this.fillLikes(0);
    this.fillLikes(1);

    var currLike1 = this.randomValue(0);
    var currLike2 = this.randomValue(1);
    this.state = {
      currLikes: [currLike1, currLike2],
      currIndices: [currLike1.length, currLike2.length]
    };
    this.gradients_ = require(resources + 'gradients.json').gradients;
    this.gradientIter_ = 0;
    this.gradientInterval_ = null;
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.gradientInterval_);
  }

  componentDidMount() {
    var wasMounted = this._isMounted;
    this._isMounted = true;
    this.stylize();
    if (!wasMounted) {
      setTimeout(this.typeOut.bind(this, 0, true), 1500);
      setTimeout(this.addGradient.bind(this), 5000);
    }
  }

  render() {
    return (
      <div className="present">
        <div className="present_wrapper">
          <Greeting
            like1={this.state.currLikes[0].substring(0, this.state.currIndices[0])}
            like2={this.state.currLikes[1].substring(0, this.state.currIndices[1])} />
          <Footer />
        </div>
        <img id="present_down_arrow" src={require(resources + "down_arrow.png")} alt="down_arrow" />
      </div>
    );
  }

  stylize() {
    this.addGradient();
  }

  addGradient() {
    if (!this._isMounted) {
      return;
    }
    $('.gradient1').show()
    $('.gradient2').show()

    this.oldColor_ = this.gradients_[this.gradientIter_];
    this.gradientIter_++;
    if (this.gradientIter_ >= this.gradients_.length) {
      this.gradientIter_ = 0;
    }
    this.newColor_ = this.gradients_[this.gradientIter_];
    if (this.gradientIter_ % 2) {
      $('.gradient2').css('opacity', '0');
      $('.gradient1').css({
        "background": "linear-gradient(" + this.newColor_ + "," + this.oldColor_ + ")",
      });
    } else {
      $('.gradient2').css({
        "background": "linear-gradient(" + this.oldColor_ + "," + this.newColor_ + ")",
        'opacity': 1
      });
    }

    if (!this.gradientInterval_) {
      this.gradientInterval_ = setInterval(this.addGradient.bind(this), 15000);
    }
  }

  typeOut(iter, reverse) {
    if (!this._isMounted) {
      return;
    }
    iter %= 2;
    var currIndices = this.state.currIndices;
    var currLikes = this.state.currLikes;
    if (!reverse) {
      // Typing
      if (currIndices[iter] < currLikes[iter].length) {
        // Increment the index to continue typing the word.
        currIndices[iter] += 1;
        this.setState({
          currIndices: currIndices
        });
        setTimeout(this.typeOut.bind(this, iter, false), TYPE_INTERVAL);
      } else {
        // The word is typed, pause and wait for erasing.
        setTimeout(this.typeOut.bind(this, iter + 1, true), ERASE_PAUSE);
      }
    } else {
      // Erasing
      if (currIndices[iter] > 0) {
        // Decrement the index to continue erasing the word.
        currIndices[iter] -= 1;
        this.setState({
          currIndices: currIndices
        });
        setTimeout(this.typeOut.bind(this, iter, true), ERASE_INTERVAL);
      } else {
        // The word is erased, pause and select a new word to diplsay.
        var newLike = this.randomValue(iter, this.state.currLikes[iter]);
        currLikes[iter] = newLike;
        this.setState({
          currLikes: currLikes,
        });
        setTimeout(this.typeOut.bind(this, iter, false), TYPE_PAUSE);
      }
    }
  }

  randomValue(iter, current) {
    if (!this.currLikes_[iter].length) {
      this.fillLikes(iter);
    }

    var index = Math.floor(Math.random() * this.currLikes_[iter].length);
    var value = this.currLikes_[iter].splice(index, 1);
    return value[0];
  }

  fillLikes(iter) {
    this.currLikes_[iter] = this.likes_[iter].concat();
  }
}