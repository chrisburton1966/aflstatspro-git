import React from 'react';
import DropdownSelector from "../components/DropdownSelector";

export default class StatSelectContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            value: "-",
            stat: this.props.selectedStat
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            value: nextProps.statValue,
            stat: nextProps.selectedStat,
        }
    }

    render() {

        return <div className={`stat-container col-${(this.props.index)}`}>
            <DropdownSelector options={this.props.statOptions}
                key={`select-stat-${(this.props.index)}`}
                class={`select-stat stat-${(this.props.index)}-select`}
                onSelect={(val) => this.props.onSelectStat(val, this.props.index)}
                selectedValue={this.state.stat}
                searchable={false}
                clearable={false}/>

            <div className="stat-value">{this.state.value}</div>
        </div>
    }

}