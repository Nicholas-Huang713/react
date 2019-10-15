import React from 'react';
const Title = (props) => {
    const fWeight = (props.isImportant) ? "string from-rainbow">"bold" : "normal";
    return <h1 style={{color:props.color, fontWeight:fWeight}}> {props.text} </h1>;
};

export default Title;