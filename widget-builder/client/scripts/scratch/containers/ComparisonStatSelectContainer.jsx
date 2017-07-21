import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import DropdownSelector from "../components/DropdownSelector";

let data = [{value: 0}, {value: 0}];
let COLORS = []; //, '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    return (
        <text x={cx} y={cy} fill="blue" textAnchor={'middle'} width="150"	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class ComparisonStatSelectContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            stat: this.props.selectedStat,
            leftVal: "-",
            rightVal: "-"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            stat: nextProps.selectedStat,
            leftVal: nextProps.leftVal,
            rightVal: nextProps.rightVal
        }
    }

    generateData() {

        const leftColor = this.state.leftVal > this.state.rightVal ? '#318fe2' : '#e6eaef';
        const rightColor = this.state.leftVal < this.state.rightVal ? '#318fe2' : '#e6eaef';

        data = [{value:this.state.leftVal},{value:this.state.rightVal}];
        COLORS = [leftColor, rightColor];
    }

    pieChart(data, chartColors) {
        return <PieChart width={150} height={175}>
            <Pie
                dataKey="value"
                data={data}
                label={renderCustomizedLabel}
                labelLine={false}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={0}
            >
                {
                    data.map((entry, index) => <Cell fill={chartColors[index % chartColors.length]}/>)
                }
            </Pie>
        </PieChart>
    }

    renderPieCharts() {
        const leftData = [{value:this.state.leftVal}, {value:(100-this.state.leftVal)}];
        const rightData = [{value:this.state.rightVal}, {value:(100-this.state.rightVal)} ];

        let leftColor = [];
        let rightColor = [];

        if(this.state.leftVal > this.state.rightVal) {
            leftColor = ['#318fe2', '#e6eaef'];
            rightColor = ['#788f9c', '#e6eaef'];
        } else {
            rightColor = ['#318fe2', '#e6eaef'];
            leftColor = ['#788f9c', '#e6eaef'];
        }

        return <div>
            <div className="values-wrapper compare-percents">
                <div className="compare left stat-value box-centre">
                    {this.pieChart(leftData, leftColor)}
                </div>
                <div className="compare right stat-value">
                    {this.pieChart(rightData, rightColor)}
                </div>
            </div>
        </div>
    }
    renderRainbowChart() {
        return <div>
            <div className="values-wrapper">
                <div className="compare left stat-value">{this.state.leftVal}</div>
                <div className="compare right stat-value">{this.state.rightVal}</div>
            </div>
            <PieChart width={330} height={220} >
                <Pie
                    dataKey="value"
                    data={data}
                    cx="50%"
                    cy="90%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={0}
                >
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        </div>
    }
    render() {

        if(this.props.numberOfStats == 1) {
            this.generateData();

            return <div className={`stat-container col-${(this.props.index)} `}>
                <DropdownSelector options={this.props.statOptions}
                                  key={`select-stat-${(this.props.index)}`}
                                  class={`select-stat stat-${(this.props.index)}-select`}
                                  onSelect={(val) => this.props.onSelectStat(val, this.props.index)}
                                  selectedValue={this.state.stat}
                                  searchable={false}
                                  clearable={false}/>


                { this.state.stat.isPercent ? this.renderPieCharts() : this.renderRainbowChart() }

            </div>
        } else {
            return <div className={`stat-container col-${(this.props.index)} `}>
                <DropdownSelector options={this.props.statOptions}
                                  key={`select-stat-${(this.props.index)}`}
                                  class={`select-stat stat-${(this.props.index)}-select`}
                                  onSelect={(val) => this.props.onSelectStat(val, this.props.index)}
                                  selectedValue={this.state.stat}
                                  searchable={false}
                                  clearable={false}/>

                <div className="stat-compare">
                    <div className="left">
                        <div
                            className={`compare ${(this.isGreaterThan(this.state.leftVal, this.state.rightVal) ? 'greater' : '')}`}
                            style={{width: this.getBarWidth(this.state.leftVal, this.state.rightVal) + "%"}}>{this.state.leftVal}</div>
                    </div>
                    <div className="right">
                        <div
                            className={`compare ${(this.isGreaterThan(this.state.rightVal, this.state.leftVal) ? 'greater' : '')}`}
                            style={{width: this.getBarWidth(this.state.rightVal, this.state.leftVal) + "%"}}>{this.state.rightVal}</div>
                    </div>
                </div>
            </div>
        }
    }

    isGreaterThan(val, compare) {
        // debugger;
        if(isNaN(val) || isNaN(compare)) {
            return false;
        } else {
            return (val > compare);
        }
    }

    getBarWidth(left,right) {
        if(isNaN(left) || isNaN(right)) {
            left = 1;
            right = 1;
        }
        return (left / (left + right) * 100);
    }

}