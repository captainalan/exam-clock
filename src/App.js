import TimePicker from 'rc-time-picker'; 
import 'rc-time-picker/assets/index.css'; // Remember to add CSS for this!
import React, { Component } from 'react';
import './App.css';

import moment from 'moment';

/* Start and End times stored in UTC in state; 
   They can be converted when they need to be displayed. */

/* Time zone stuff */
let initialStartTime = new Date();
let initialEndTime = new Date();
initialEndTime.setMinutes(initialEndTime.getMinutes() + 50) // 50 minute long exam
// const offset = new Date().getTimezoneOffset();
const now = moment().second(0);

const exam_info = {
  course_name:"Underwater Basket Weaving",
  exam_name: "Midterm 1",
  start_time: initialStartTime,
  end_time: initialEndTime,
  instructions: "Remember to write your name. No cheating.",
}


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
          start_time = {this.state.exam_info.start_time}
          end_time = {this.state.exam_info.end_time}
          instructions = {this.state.exam_info.instructions}
        />
      </div>
    );
  }
}

class SetupBar extends Component {
  /* An unobtrusive bar to access setup/settings */

  /* Use time picker component to ensure user enters valid start/stop times */

  /* This component has state which is 'forwarded' to the main App when the 
     submit button is pressed... */ 
  constructor(props) {
    super(props);
    this.state = this.props.exam_info;

    this.handleChange = this.handleChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // Probably need some error handling here
    this.setState({
      [name]: value
    });
  }

  // These two should perhaps be combined into one function...
  // Convert moment() to normal JS date
  handleStartTimeChange = (value) => this.setState({ start_time: value.toDate() });
  handleEndTimeChange   = (value) => this.setState({ end_time:   value.toDate() }); 

  handleSubmit(event) {
    /* Submit Changes on Form to the Main App
    - All dates should be valid because we use a time picker to choose them
    */
    this.props.handleSubmit(this.state); // Pass state as parameter

    event.preventDefault();
  }
  render() {
    /* Formatting for rc-time-picker */
    const format = 'h:mm a'

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
            /><br /><br />


            <label htmlFor="start_time">Start time: </label>
            <TimePicker 
              showSecond={true}
              defaultValue={now}
              className="SetupFormTime"
              onChange={this.handleStartTimeChange}
              format={format}
              use12Hours
              inputReadOnly
            /><br />

            <label htmlFor="end_time">End time: </label>
            <TimePicker 
              showSecond={true}
              defaultValue={now}
              className="SetupFormTime"
              onChange={this.handleEndTimeChange}
              format={format}
              use12Hours
              inputReadOnly
            /><br /><br />

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
            : <span style={urgent}>Time is up! Please turn in your exam.</span>}

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
