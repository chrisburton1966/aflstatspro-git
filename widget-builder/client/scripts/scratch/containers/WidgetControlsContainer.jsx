import React from 'react';
import { GENERATE_WIDGET_TEXT, SHOW_HTML_CODE_TEXT, SHOW_PREVIEW_TEXT, COPY_HTML_TEXT, COPY_DYNAMIC_TEXT } from "../constants/WidgetBuilderConstants"

const containerStyle = {
    width: "100%",
    overflow: "hidden",
    marginTop: "10px"
};

const generateButtonStyles = {
    display: "block",
    float: "right",
};

const leftCol = {
    float: "left",
    width: "50%"
};

const rightCol = {
    float: "left",
    width: "50%"
};

const leftButtonStyles = {
    float: "left",
    marginRight: "5px"
};

const rightButtonStyles = {
    float: "left",
};

export default class WidgetControlsContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div style={containerStyle}>
            {/*The generate HTML button*/}
            <button style={generateButtonStyles}
                disabled={!this.props.active}
                onClick={() => this.props.generateStats()}
                className={`toggle-button ${(this.props.active ? 'active' : 'disabled')}`}>{GENERATE_WIDGET_TEXT}</button>

            <div className="clearfix" style={{marginTop:"5px"}}>
                <div style={leftCol}>
                    <button style={leftButtonStyles}
                            disabled={!this.props.generated}
                            onClick={() => this.props.generateHTML()}
                            className={`toggle-button ${(this.props.generated ? 'active' : 'disabled')}`}>{SHOW_HTML_CODE_TEXT}</button>

                    <button style={rightButtonStyles}
                            disabled={!this.props.generated}
                            onClick={() => this.props.generateWidget()}
                            className={`toggle-button ${(this.props.generated ? 'active' : 'disabled')}`}>{SHOW_PREVIEW_TEXT}</button>
                </div>
                <div style={rightCol}>
                    <button style={{float:"right", marginLeft:"5px"}}
                            disabled={!this.props.generated}
                        // onClick={() => this.props.generateHTML()}
                            className={`toggle-button ${(this.props.generated ? 'active' : 'disabled')}`}>{COPY_DYNAMIC_TEXT}</button>

                    <button style={{float:"right"}}
                            disabled={!this.props.generated}
                        // onClick={() => this.props.generateHTML()}
                            className={`toggle-button ${(this.props.generated ? 'active' : 'disabled')}`}>{COPY_HTML_TEXT}</button>


                </div>

            </div>
        </div>
    }
}