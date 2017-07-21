import React from 'react';
import { WIDGET_TYPES } from '../constants/WidgetBuilderConstants'
import WidgetBuilderToggle from "../components/toggles/WidgetBuilderToggle";

export default class WidgetSelectContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return ( <div className="widget-toggle-container">
            {
                WIDGET_TYPES.map((type,i) => {
                    return <WidgetBuilderToggle
                        key={`widget-select-toggle ${i}`}
                        active={i === this.props.activeWidgetIdx}
                        label={type.label}
                        onClick={() => this.props.onSelect(i)}
                    />
                })
            }
        </div>)
    }
}