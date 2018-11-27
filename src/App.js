import React, { Component } from 'react';
import './App.css';

/* Start and End times stored in UTC in state; 
   They can be converted when they need to be displayed. */
const exam_info = {
  course_name:"Underwater Basket Weaving",
  exam_name: "Midterm 1",
  start_time:'19 Oct 2018 21:10:00 UTC',
  end_time:'19 Oct 2018 22:00:00 UTC',
  instructions: "Remember to write your name. No cheating.",
}

/* Time zone stuff */
const offset = new Date().getTimezoneOffset();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      exam_info: exam_info,
      showSettings: true,
    }
    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);
    this.toggleSettingsVisibility = this.toggleSettingsVisibility.bind(this);
  }

  handleSettingsSubmit(updated_exam_info) {
    this.setState( {exam_info: updated_exam_info} );
  }

  toggleSettingsVisibility() {
    this.setState({ showSettings:(!this.state.showSettings) });
  }

  render() {
    return (
      <div className="App">
        <SetupBar 
          exam_info={this.state.exam_info}
          handleSubmit={this.handleSettingsSubmit}
          toggleSettings={this.toggleSettingsVisibility}
          showSettings={this.state.showSettings}
         />
        <h1>{this.state.exam_info.course_name}: {this.state.exam_info.exam_name} </h1>
        {/* Convert Date string in JSON object to Date object here*/}
        <ExamClock 
          start_time = {new Date(this.state.exam_info.start_time)}
          end_time = {new Date(this.state.exam_info.end_time)}
          instructions = {this.state.exam_info.instructions}
        />
      </div>
    );
  }
}

class SetupBar extends Component {
  /* An unobtrusive bar to access setup/settings */

  /* This component has state which is 'forwarded' to the main App when the 
     submit button is pressed... */ 
  constructor(props) {
    super(props);
    this.state = this.props.exam_info;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // Stuff that happens when the submit button is pressed
    // Validate input before changing settings
    // - Check to make sure valid dates are given
    // Change settings via a js object
    this.props.handleSubmit(this.state); // Pass state as parameter

    event.preventDefault();
  }
  render() {
    return(
      <div className="SetupBar">
        <button 
          onClick={this.props.toggleSettings}
        >
          {this.props.showSettings ? "Hide Setup" : "Setup" }
        </button>

        <div 
          className={this.props.showSettings ? "SetupForm" : "SetupFormHidden"}
        >
          <form onSubmit={this.handleSubmit}>

            <label htmlFor="course_name">Course name: </label>
            <input 
              id="course_name" 
              name="course_name" // Name attribute needed for controlled components
              type="text" 
              value={this.state.course_name} 
              onChange={this.handleChange}
            /><br />

            <label htmlFor="exam_name">Exam name: </label>
            <input 
              id="exam_name" 
              name="exam_name"
              type="text" 
              value={this.state.exam_name} 
              onChange={this.handleChange}
            /><br />

            <label htmlFor="start_time">Start time: </label>
            <input 
              id="start_time" 
              name="start_time"
              type="text" 
              value={this.state.start_time} 
              onChange={this.handleChange}
            /><br />

            <label htmlFor="end_time">End time: </label>
            <input 
              id="end_time" 
              name="end_time"
              type="text" 
              value={this.state.end_time} 
              onChange={this.handleChange}
            /><br />

            <label htmlFor="instructions">Instructions: </label>
            <textarea 
              id="instructions" 
              name="instructions"
              value={this.state.instructions}
              onChange={this.handleChange}
            /><br />

            <label htmlFor="submitButton"></label>
            <input id="submitButton" type="submit" value="Apply Changes" />

            {/* Add reset changes button */}

          </form>
        </div>
        <hr />
      </div>
    )
  }
}

class ExamClock extends Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnMount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    // For styling conditionally rendered announcements
    let unurgent = {color: 'grey'};
    let ongoing = {color: 'lime'}
    let urgent = {color: 'red'};

    return(
      <div> {/* Conditionally rendered announcement appear above large timer */}
        {(this.state.date < this.props.start_time) ? 
          <span style={unurgent}>Hold up! The exam has not started yet.</span>
          : (this.state.date < this.props.end_time) ? 
            <span style={ongoing}>Exam in progress...</span>
            : <span style={urgent}>Time is up! Please turn in your scantron.</span>}

        <h2 className="timer">{this.state.date.toLocaleTimeString()}</h2>
        <div className="announcement">
          <h3>Start time: {this.props.start_time.toLocaleTimeString()}</h3>
          <h3>End time: {this.props.end_time.toLocaleTimeString()}</h3>
          <p>{this.props.instructions}</p>
        </div>
      </div>
    );
  }
}

export default App;
