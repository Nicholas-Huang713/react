import React from 'react';


class WorkLog extends React.Component {

   
    render (){
        function timeConvert(num) {
            let hours = Math.floor(num/60);
            let minutes = num % 60;
            return hours + ":" + minutes;
        }
        const myData = this.props.data;
        const personalList = myData.p;
        const workList = myData.w;
        
        let personalTime = Number("0");
        let workTime = Number("0");
    

        for(const [index, value] of personalList.entries()) {
            personalTime += parseInt(value.minutes);
            
        }
        console.log(personalTime);
        for(const [index, value] of workList.entries()) {
            workTime += parseInt(value.minutes);
            console.log(workTime);
        }

        const personalListFormat = personalList.map((value, index) => {
            // value.minutes = timeConvert(value.minutes)
            return <li key={index}>{value.minutes} minutes - <span className="text-danger">{value.description}</span></li>
        })
        const workListFormat = workList.map((value, index) => {
            // value.minutes = timeConvert(value.minutes)
            return <li key={index}>{value.minutes} minutes - <span className="text-danger">{value.description}</span></li>
        })
        let personalTimeFormat = timeConvert(personalTime);
        let workTimeFormat = timeConvert(workTime);

        
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col border border-dark rounded">
                        <div className="row">
                            <div className="col"><h3>Personal</h3></div>
                            <div className="col text-right"><h4>{personalTimeFormat}</h4></div>
                        </div>
                        <ul>
                            {personalListFormat}
                        </ul>
                    </div>
                    <div className="col border border-dark rounded">
                        <div className="row">
                            <div className="col"><h3>Work</h3></div>
                            <div className="col text-right"><h4>{workTimeFormat}</h4></div>
                        </div>
                        <ul>
                            {workListFormat}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkLog;