import React from 'react';
import { GENERATE_WIDGET_TEXT } from '../constants/WidgetBuilderConstants'
export default class Caption extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <button disabled={this.props.canGenerate}
                       onClick={() => this.props.fetchStats()}
                       className={`toggle-button ${(this.props.canGenerate() ? 'active' : 'disabled')}`}>{GENERATE_WIDGET_TEXT}</button>
    }
}