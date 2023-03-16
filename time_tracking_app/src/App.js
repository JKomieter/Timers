import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import client from './client';
// import data from './data.json'


class TimerDashBoard extends React.Component {

  state = {
    timers: []
  }

  componentDidMount() {
    this.loadTimersFromServer()
    setInterval(this.loadTimersFromServer, 5000)
  }

  loadTimersFromServer = () => {
    client.getTimers((serverTimers) => (
      this.setState({timers: serverTimers})
    ))
  }

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer)
  }

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  }

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  }

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    })
    client.deleteTimer(
      {id: timerId}
    )
  }

  createTimer = (timer) => {
    const t = this.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    })
    client.createTimer(t)
  }

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          })
        } else {
          return timer;
        }
      })
    })
    client.updateTimer(attrs)
  }

  newTimer = (attrs = {}) => {
    const timer = {
      title: attrs.title || 'Timer',
      project: attrs.project || 'Project',
      id: uuidv4(), // eslint-disable-line no-undef
      elapsed: 0,
    };

    return timer;
  }

  handleStartClick = (timerId) => {
    this.startTimer(timerId)
  }

  handleStopClick = (timerId) => {
    this.stopTimer(timerId)
  }


  startTimer = (timerId) => {
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now
          })
        } else {
          return timer
        }
      })
    })
    
    client.startTimer(
      {id: timerId, start: now}
    );
  }

  stopTimer = (timerId) => {
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer) => {
        const lastElapsed = now - timer.runningSince;
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          })
        } else {
          return timer
        }
      })
    })
    
    client.stopTimer(
      {id: timerId, start: now}
    );
  }


  render() {
    return (
      <div className='dashBoard'>
        <div className='column'>
          <EditableTimerList 
            timers={this.state.timers} 
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
        </div>
      </div>
    )
  }
}

export default TimerDashBoard
