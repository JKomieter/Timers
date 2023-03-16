import React from 'react';
import TimerForm from './TimerForm';



class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false
    }

    handleFormOpen = () => {
        this.setState({
            isOpen: true,
        })
    }

    handleFormClose = () => {
        this.setState({
            isOpen: false
        })
    }

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({ isOpen: false })
    }

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}/>
            );
        } else {
            return (
                <div className='addIcon'>
                    <button className='icon' onClick={this.handleFormOpen}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </button>
                </div>
            )
        }
    }
}

export default ToggleableTimerForm;