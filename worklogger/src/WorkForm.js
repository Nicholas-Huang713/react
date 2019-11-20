import React from 'react';
import WorkLog from './WorkLog';


class WorkForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            personalList: [],
            workList: [],
            project: "",
            description: "",
            minutes: 0,
            minutesVal: "",
            descriptionVal: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
    }
 
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ 
            [name] : value
        })
    }

    handleSubmit(event) {
        if(!this.canBeSubmitted()) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        this.setState({
            minutesVal: "",
            descriptionVal: ""
        })
        
        alert(`${this.state.project} log submitted`);
        const newData = {
            project: this.state.project,
            description: this.state.description,
            minutes: parseInt(this.state.minutes)
        };
        const personal = this.state.personalList;
        const work = this.state.workList;
        if(this.state.project === "Personal") {
            personal.push(newData);
            this.setState({
                personalList : personal
            })
        } else {
            work.push(newData);
            this.setState({
                workList: work
            })
        }
        this.setState({
            project: "Personal",
            description: "",
            minutes: 0
        })
       
    }
    canBeSubmitted() {
        const {description, minutes} = this.state;
        if(description.length < 5) {
            this.setState({
                descriptionVal: "Description must be longer than 5 characters" 
            })
        }
        if(description === "") {
            this.setState({
                descriptionVal: "Description must not be left blank"
            })
        }
        if(minutes === "") {
            this.setState({
                minutesVal: "Time must not be left blank"
            })
        }
        if(minutes === 0) {
            this.setState({
                minutesVal : "Time must be more than 0"
            })
        }
        if(minutes > 240) {
            this.setState({
                minutesVal: "Time must not be more than 240 minutes"
            })
        }
        return description.length > 5 && description !== null && minutes > 0 && minutes < 240 && minutes !== null; 
    }

    componentDidMount() {
        this.setState({
            project: "Personal",
            description: "",
            minutes: 0
        })
    }

    render (){
        // const project = this.state.project; 
        // const description = this.state.description;
        // const minutes = this.state.minutes;
        const personalList = this.state.personalList;
        const workList = this.state.workList;
        const logData = { p: personalList , w : workList}
            // project: project,
            // description: description,
            // minutes: minutes
        
        
        
        
        return (
            <div className="jumbotron">
                <form onSubmit={this.handleSubmit}> 
                    <div className="form-group">
                        <label>Project:</label>
                        <select className="form-control" 
                                name="project"
                                value={this.state.project}
                                onChange={this.handleChange}>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                       <p className="text-danger">{this.state.descriptionVal}</p> 
                        <textarea className="form-control" 
                                   name="description"
                                   value={this.state.description}
                                   onChange={this.handleChange} />
                        
                        
                    </div>
                    <div className="form-group">
                        <label> Minutes:</label>
                        <p className="text-danger">{this.state.minutesVal}</p>
                        <input type="number" 
                               name="minutes"
                               value={this.state.minutes}
                                onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-outline-dark">Add</button>
                </form>
                <br/>
                <WorkLog data={logData} />
            </div>
        )
    }
}

export default WorkForm;