import React from 'react';

export default class WidgetBuilderToggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active
        }
    }

    onClick() {
        this.setState({
            active:!this.state.active
        })
    }

    render() {
        return (<div className="widget-content-toggle">
                <div className="label">{this.props.label}</div>
                <button
                    className={`toggle-select ${(this.state.active ? 'active' : '')}`}
                    onClick={() => {
                        this.onClick();
                        this.props.onClick()
                    }}/>
            </div>

        );
    }

}
