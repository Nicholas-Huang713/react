import React from 'react';
import WorkLog from './WorkLog';


class WorkForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            project: "",
            description: "",
            minutes: 0,
            hasSubmitted: false
            // project: "Personal",
            // description: "",
            // minutes: 0,
            // hasSubmitted: false
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
    }
 
    handleChange = (event) => {
        const name = event.target.project;
        const value = event.target.value;
        // let data = this.state.allData;
        // data.push({[name] : value});
        this.setState({ 
            [name] : value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(`${this.state.allData.project} log submitted`);
        const newData = {
            project: event.target.project,
            description: event.target.description,
            minutes: event.target.minutes,
            // hasSubmitted: true
        };
        const myData = this.state.allData;
        myData.push(newData);
        this.setState({
            allData: [
                {
                    project: "Personal",
                    description: "",
                    minutes: 0
                }
            ],
            hasSubmitted: true
        })
    }

    componentDidMount() {
        this.setState({
            project: "Personal",
            description: "Your description here...",
            minutes: 0
        })
    }

    render (){
        // const project = this.state.project; 
        // const description = this.state.description;
        // const minutes = this.state.minutes;

        const logData = this.state.allData;

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
                                value={this.state.allData.project}
                                onChange={this.handleChange}>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea className="form-control" 
                                   name="description"
                                   value={this.state.allData.description}
                                   onChange={this.handleChange} />
                        
                    </div>
                    <div className="form-group">
                        <label> Minutes:</label>
                        <br></br>
                        <input type="number" 
                               name="minutes"
                               value={this.state.allData.minutes}
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