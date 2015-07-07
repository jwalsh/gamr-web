
var React = require('react/addons');
var Link = require('react-router').Link;
var Title = require('./Title.jsx');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: 'Intro',

  render: function () {
    return (
      <div className='title-wrap'>
        <div className='main-title-wrap'>
          <Title className='main-sub'>PROJECT</Title>
          <Title className='main' split>GAMR</Title>
        </div>
        <h4 className='marquee'>What does your play style say about you?</h4>
        <h4 className='marquee b'>Join us, and find out in just 15 minutes.</h4>
        <Link to="consent" className=''><Button>Start</Button></Link>
        <div className='intro-social'>
          <i className='fa fa-twitter'/>
          <i className='fa fa-facebook-official'/>
          <span className='intro-pipe'>|</span>
          <span className='intro-about'>About</span>
        </div>
        <p className='schools'>MIT Media Lab <span className='plus'>+</span> Tilburg University</p>
        <p className='footnote'>
          To participate, you must have an account with one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, or World of Warcraft.
        </p>
      </div>
    );
  }
});