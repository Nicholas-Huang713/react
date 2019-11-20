import React from 'react';


class WorkLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            personalList : [],
            workList : [],
            personalTime: 0,
            workTime: 0
        }
        // this.handlePersonal = this.handlePersonal.bind(this);
        // this.handleWork = this.handleWork.bind(this); 
    }

    // handlePersonal() {
    //     const personal = this.state.personalList;
    //     personal.push(this.props.data);
    //     this.setState({
    //         personalList: personal,
    //         personalTime: personal + this.props.data.minutes
    //     }) 
    // }


    // handleWork() {
    //     const work = this.state.workList;
    //     work.push(this.props.data);
    //     this.setState({
    //         workList: work,
    //         workTime: work + this.props.data.minutes
    //     }) 
    // }
    render (){
        let personalList = [];
        let workList = [];
        let personalTime = 0;
        let workTime = 0;
        const myData = this.props.data;
        for(const [index, value] of myData.entries()) {
            if(value.hasSubmitted) {
                if(value.project === "Personal"){
                    personalList.push(value);
                    personalTime += value.minutes
                } else {
                    workList.push(value);
                    workTime += value.minutes
                }
            }
            
        }
           
        
        // if()
        // if ( data.project === 'Personal') {
        //     // this.handlePersonal();
        //     personalList.push(data);
        //     personalTime += data.minutes;
        // } else {
        //     // this.handleWork();
        //     workList.push(data);
        //     workTime += data.minutes;
        // }
        
            
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col border border-dark rounded">
                        <div className="row">
                            <div className="col"><h3>Personal</h3></div>
                            <div className="col text-right"><h4>{personalTime}</h4></div>
                        </div>
                        <ul>
                            {personalList.map((value, index) => {
                                return <li key={index}>{value.minutes} <span className="text-danger">{value.description}</span></li>
                            })}
                        </ul>
                    </div>
                    <div className="col border border-dark rounded">
                        <div className="row">
                            <div className="col"><h3>Work</h3></div>
                            <div className="col text-right"><h4>{workTime}</h4></div>
                        </div>
                        <ul>
                            {workList.map((value, index) => {
                                return <li key={index}>{value.minutes} <span className="text-danger">{value.description}</span></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkLog;