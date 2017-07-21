import React from 'react';
import Select from 'react-select';
import '../../../styles/components/DropdownSelector.css'

export default class DropdownSelector extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            searchable: false,
            selectValue: this.props.selectedValue,
            clearable: false
        };
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(newValue) {
        this.setState({
            selectValue: newValue
        });
    }

    render() {

        return (
            <div className="dropdown-section">
                {this.props.label &&
                    <div className="dropdown-label">{this.props.label}</div>
                }
                <Select
                    disabled={this.props.disabled}
                    className={this.props.class}
                        options={ this.props.options }
                        simpleValue
                        value={this.state.selectValue}
                        clearable={this.props.clearable}
                        searchable={this.props.searchable}
                        valueKey={this.props.valueKey}
                        labelKey={this.props.labelKey}
                        onChange = {(val) => {
                            this.props.onSelect(val);
                            this.updateValue(val);
                        } }
                />
            </div>
        )
    }
}