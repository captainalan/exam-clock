import React, { Component } from 'react';
import './App.css';

const exam_info = {
  course:"LIN 001",
  name: "Midterm 1",
  start_time:'19 Oct 2018 21:10:00 UTC',
  end_time:'19 Oct 2018 22:00:00 UTC',
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{exam_info.course}: {exam_info.name} </h1>
        {/* Tick tock! */}
        <ExamClock 
          start_time = {new Date(exam_info.start_time)}
          end_time = {new Date(exam_info.end_time)}
        />
      </div>
    );
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
    // For displaying times
    let unurgent = {color: 'grey'};
    let ongoing = {color: 'lime'}
    let urgent = {color: 'red'};

    return(
      <div>
        {(this.state.date < this.props.start_time) ? 
          <span style={unurgent}>Hold up! The exam hasn't started yet.</span>
          : (this.state.date < this.props.end_time) ? 
            <span style={ongoing}>Exam in progress...</span>
            : <span style={urgent}>Time's up! Please turn in your scantron.</span>}

        <h2 className="timer">{this.state.date.toLocaleTimeString()}</h2>
        <div className="announcement">

          <h3>Start time: {this.props.start_time.toLocaleTimeString()}</h3>
          <h3>End time: {this.props.end_time.toLocaleTimeString()}</h3>

          <p>Remember to write your name and student ID on your scantron. Bubble in your <b>version number</b> as well!
            Please take your paper exam sheet with you when you finish.</p>

          <p><b>Turning in stuff at the front table:</b><br /> Version A on the LEFT, Version B on the RIGHT</p>
          <img src="versions.png" alt="Versions A and B note"></img>

        </div>
      </div>
    );
  }
}


export default App;
