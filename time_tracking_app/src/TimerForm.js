import React from 'react';



class TimerForm extends React.Component {
    state = {
        title: this.props.title || "",
        project: this.props.project || ""
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleProjectChange = (e) => {
        this.setState({
            project: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        })
    }

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='timerCard'>
                <div className='contentForm'>
                    <div className='title'>
                        <label>Title</label>
                        <input type="text" defaultValue={this.state.title} onChange={this.handleTitleChange}/>
                    </div>
                    <div className='project'>
                        <label>Project</label>
                        <input type="text" defaultValue={this.state.project} onChange={this.handleProjectChange}/>
                    </div>
                    <div className='timeButton'>
                        <button className='blueButton' onClick={this.handleSubmit}>
                            {submitText}
                        </button>
                        <button className='redButton' onClick={this.props.onFormClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimerForm;