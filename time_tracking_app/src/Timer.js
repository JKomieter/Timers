import React from 'react';
import TimerActionButton from './TimerActionButton';



class Timer extends React.Component {
    renderElapsedString = (elapsed, runningSince) => {
        let totalElapsed = elapsed;
        if (runningSince) {
        totalElapsed += Date.now() - runningSince;
        }
        return this.millisecondsToHuman(totalElapsed);
    }

    millisecondsToHuman = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);

        const humanized = [
        this.pad(hours.toString(), 2),
        this.pad(minutes.toString(), 2),
        this.pad(seconds.toString(), 2),
        ].join(':');

        return humanized; 
    }

    pad = (numberString, size) => {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id)
    }

    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval)
    }

    handleStartClick = () => {
        this.props.onStartClick(this.props.id)
    }

    handleStopClick = () => {
        this.props.onStopClick(this.props.id)
    }

    render() {
        const elapsedString = this.renderElapsedString(this.props.elapsed, this.props.runningSince);
        return (
            <div className='timerCard'>
                <div className='content'>
                    <div className='header'>
                        {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project}
                    </div>
                    <div className='elapsedString'>
                        {elapsedString}
                    </div>
                    <div className='extraContent'>
                        <span className="material-symbols-outlined edit" onClick={this.props.onEditClick}>
                            edit
                        </span>
                        <span className="material-symbols-outlined trash" onClick={this.handleTrashClick}>
                            delete
                        </span>
                    </div>
                </div>
                <div className='start'>
                    <TimerActionButton
                        timerIsRunning={!!this.props.runningSince}//returns false if null
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                    />
                </div>
            </div>
        )
    }
}

export default Timer;