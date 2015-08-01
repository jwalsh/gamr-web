
var React = require('react');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Video = require('./Video.jsx');

module.exports = React.createClass({
  displayName: 'Explainer',

  render: function () {
    return (
      <div className='intro-body'>
        <div className='intro-body-inner'>
          <div className='loud-text'>
            <h4>How you play reflects who you are.</h4>
            <h5>Discover your personality, brain type and gamer type in just 15 minutes.</h5>
          </div>

          <Video/>

          <p>
            The Playful Systems group at <strong>MIT Media Lab</strong> has teamed up with <strong>Tilburg University</strong> to study how personality relates to gameplay.
          </p>
          <p>
            We are asking players to participate in a three-part survey about their personality, brain type, and gamer type.
          </p>

          <div className='valid-games'>
            <em>If you play one or more of the following, you may be elligible!</em>
            <p className='game-title'>League of Legends</p>
            <p className='game-title'>Battlefield: Hardline</p>
            <p className='game-title'>Battlefield 4</p>
            <p className='game-title'>World of Warcraft</p>
          </div>

          <Link className='start-button' to="consent">
            <Button>Start</Button>
          </Link>

          <h6 className='footnote'>The survey takes approximately 15 minutes.</h6>

          <div className='intro-foot'>
            <div className='intro-social'>
              <i className='fa fa-twitter'/>
              <i className='fa fa-facebook-official'/>
            </div>
            <div className='intro-about'>About us</div>
          </div>
        </div>
      </div>
    );
  }
});
