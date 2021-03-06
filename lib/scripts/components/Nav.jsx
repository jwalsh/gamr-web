
var React = require('react');
var State = require('react-router').State;
var classnames = require('classnames');
var Progress = require('./Progress.jsx');
var Title = require('./Title.jsx');
var Link = require('react-router').Link;
var surveyStore = require('../survey/store');

var config = {
  '/consent': {
    main: 'Consent',
    progress: 0
  },
  '/identity':  {
    main: 'Identity',
    progress: 1
  },
  '/survey/brain-type': {
    main: 'Brain Type',
    progress: 3
  },
  '/survey/personality': {
    main: 'Personality',
    progress: 2
  },
  '/survey/gamer-type': {
    main: 'Gamer Type',
    progress: 4
  },
  '/results/': {
    main: null,
    progress: 4
  }
}

module.exports = React.createClass({
  displayName: 'Nav',

  mixins: [State],

  render: function () {
    var pathname = this.getPathname()
    var isResults = false;

    // HACK ATTACK
    if (pathname.indexOf('results') !== -1) {
      pathname = /results/;
      isResults = true;
    }

    var text = config[pathname];
    
    if (!text) return null;

    var nav = (
      <div key='a'>
        <div className='nav-left'>
          <Link to='home'>
            <Title className='nav-title-sub a'><span className='desktop-only'>PROJECT</span> GAMR</Title>
          </Link>
          <Title className='nav-title'>{text.main}</Title>
        </div>
        <div className='nav-right'>
          <Progress current={text.progress} length={5}/>
        </div>
      </div>
    )

    if (isResults) {
      // HACK ATTACK:
      // infer they are owner because they filled out last survey
      var isOwner = surveyStore.isComplete('gamerType');

      nav = isOwner ? (
        <div key='b'>
          <h2 className='result-nav-title'>
            YOUR <Link to='home'>GAMR</Link> PROFILE
          </h2>
        </div>
      ) : (
        <div key='b' className='inbound'>
          <h2 className='result-nav-title'>
            <Link to='home'>PROJECT GAMR</Link> PROFILE
          </h2>
          {/* <Link className='participate' to='home'>Participate</Link> */}
        </div>
      );
    }

    return (
      <div>
        <div className='nav-shadow'/>
        <div className='nav-wrap'>
          <div className='nav'>
            {nav}
          </div>
        </div>
      </div>
    );
  }
});
