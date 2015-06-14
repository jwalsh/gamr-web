
/** @jsx React.DOM */

var React = require('react/addons'),
  Button = require('./Button.jsx'),
  classnames = require('classnames'),
  Question;

module.exports = Question = React.createClass({
  submitQuestion: function (answer) {
    this.props.onSubmit(this.props.idx, answer);
  },

  render: function () {
    return (
      <div className={classnames('question', this.props.className)}>
        <p className='question-text'>
          {this.props.children}
        </p>
        <ul className='choices'>
          {this.props.answers.map(function (answer, idx) {
            return (
              <li key={idx}>
                <Button action={this.props.action.bind(this,answer)}>{answer}</Button>
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
});