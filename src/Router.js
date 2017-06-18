import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import $ from 'jquery';
import Present from './Present.js';
import Past from './Past.js';
import Future from './Future.js';
import Places from './Places.js';
import Work from './Work.js';
import NotFound from './NotFound.js';
import Navigation from './Navigation.js';
import './Common.css';

export default class PortfolioRouter extends React.Component {
	componentDidMount() {
		$('body').keydown((e) => {
			if(e.keyCode === 13) {
				browserHistory.push('/present');
			} else if(e.keyCode === 37) {
				browserHistory.push('/past');
			} else if(e.keyCode === 38) {
				browserHistory.push('/places');
			} else if(e.keyCode === 39) {
				browserHistory.push('/future');
			} else if(e.keyCode === 40) {
				browserHistory.push('/work');
			}
		});
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route component={Navigation} onChange={() => {
			      $('.content').scrollTop(0);
			    }}>
					<Route path="/">
					  <IndexRoute component={Present} />
  	  				  <Route path="present" component={Present} />
					  <Route path="past" component={Past} />
					  <Route path="future" component={Future} />
  					  <Route path="places" component={Places} />
					  <Route path="work" component={Work} />
  					  <Route path="work/:name" component={Work} />
					  <Route path="*" component={NotFound} />
					</Route>
				</Route>
		    </Router>
	    );
	}
}

// ReactDOM.render((
// 	<Router history={browserHistory}>
// 		<Route
// 		  path="/"
// 		  getComponent={function (location, callback) {
// 		    require.ensure([], function (require) {
// 		      var Home = require('./Home.js');
// 		      callback(null, Home);
// 		    }, 'Home');
// 		  }}
// 		/>
// 		<Route
// 		  path="/work"
// 		  getComponent={function (location, callback) {
// 		    require.ensure([], function (require) {
// 		      var Work = require('./Work.js');
// 		      callback(null, Work);
// 		    }, 'Work');
// 		  }}
// 		/>
// 		<Route
// 		  path="/resume"
// 		  getComponent={function (location, callback) {
// 		    require.ensure([], function (require) {
// 		      var Resume = require('./Resume.js');
// 		      callback(null, Resume);
// 		    }, 'Resume');
// 		  }}
// 		/>
// 	</Router>
// ), document.getElementById('root'))
