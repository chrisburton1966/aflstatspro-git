import React from 'react';

const inputStyle = {
    fontSize: "14pt",
    color: "#003871",
    height: "35px",
    lineHeight: "35px",
    padding: "0 5px",
    backgroundColor: "#f2f2f2",
    border: "1px solid #c6c6c5"
};

export default class Caption extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={`caption-container clearfix ${(this.props.className)}`}>
            <input style={inputStyle} type="text" name="name"
                   onChange = {(event)=>this.props.onCaptionChange(event)}
                   placeholder={this.props.val}/>
        </div>

    }

}
