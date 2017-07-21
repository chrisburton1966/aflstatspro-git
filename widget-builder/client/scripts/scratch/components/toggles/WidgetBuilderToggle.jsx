import React from 'react';

export default class WidgetBuilderToggle extends React.Component {

    render() {
        return (
            <button
                className={`toggle-button ${(this.props.active ? 'active' : '')}`}
                onClick={() => this.props.onClick()}>{this.props.label}</button>
        );
    }

}