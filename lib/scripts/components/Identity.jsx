var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Link = Router.Link,
  api = require('../services/api'),
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSelect = require('./FormSelect.jsx'),
  FormInput = require('./FormInput.jsx'),
  Identity;

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {};
  },

  handleSelect: function(event, id) {
    console.log(id);
  },

  render: function () {
    var wow = guide.identity.WOW,
      lol = guide.identity.LOL,
      bhfd = guide.identity.BFHD,
      bio = guide.identity.BIO,
      lang = guide.identity.LANG;

    var range = bio.fields.year.range,
      years = [], 
      y;

    for (y = range[0]; y >= range[1]; y -= 1) {
      years.push({
        label: y,
        value: y
      });
    }

    console.log(lang.fields.level);

    return (
      <Form id='identity'>
        <div className='form-block'>
          <h2>{lol.title}</h2>
          <FormInput {... lol.fields.sommonerName}/>
          <FormSelect {... lol.fields.region}/>
          <FormSelect {... lol.fields.preferredLane}/>
          <FormSelect {... lol.fields.preferredRole}/>
        </div>
        <div className='form-block'>
          <h2>{wow.title}</h2>
          <FormInput {... wow.fields.characterName}/>
          <FormSelect {... wow.fields.region}/>
          <FormSelect {... wow.fields.realm}/>
        </div>
        <div className='form-block'>
          <h2>{bhfd.title}</h2>
          <FormInput {... bhfd.fields.playerName}/>
        </div>
        <div className='form-block'>
          <h2>{bio.title}</h2>
          <FormSelect required={false} {... bio.fields.gender}/>
          <FormSelect required={false} {... bio.fields.month}/>
          <FormSelect required={false} {... bio.fields.year} options={years}/>
        </div>
        <div className='form-block'>
          <h2>{lang.title}</h2>
          <FormSelect required={false} {... lang.fields.country}/>
          <FormSelect required={false} {... lang.fields.level}/>
        </div>
      </Form>
    );

    // return (
    //   <div id='home'>
    //     <h1>Identity</h1>
    //     <p>
    //       What are your profiles?
    //     </p>
        
    //     <FormSelect {... wow.fields.realm} onChange={this.handleSelect}/>
    //     <FormField {... lol.fields.sommonerName}/>

    //     <Link to="brain">Continue</Link>
    //   </div>
    // );
  }
});