import React from 'react';


class TimerActionButton extends React.Component {
    render() {
        if (this.props.timerIsRunning) {
            return (
                <button className='stopButton' onClick={this.props.onStopClick}>
                    Stop
                </button>
            )
        } else {
            return (
                <button className='startButton' onClick={this.props.onStartClick}>
                    Start
                </button>   
        )
        }
    }
}

export default TimerActionButton;