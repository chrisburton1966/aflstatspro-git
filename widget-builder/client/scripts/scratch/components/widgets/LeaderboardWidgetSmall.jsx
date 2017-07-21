import React from 'react';
import HeroItem from './leaderboard/HeroItem'
import Leaderboard from './leaderboard/Leaderboard'
import { MIS_TOK_STG, DEFAULT_CAPTION, CALL_TO_ACTIONS } from "../../constants/WidgetBuilderConstants"
import DropdownSelector from '../../components/DropdownSelector'

export default class LeaderboardWidgetSmall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            totalItems: this.props.totalItems,
            selectedStat: this.props.selectedStat
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            json: nextProps.json,
            items: nextProps.items ? nextProps.items : this.state.items,
            totalItems: nextProps.totalItems,
            selectedStat: nextProps.selectedStat
        })
    }


    render() {
        // debugger;
        let allItems = this.state.items;
        if(allItems.length > 0) {
            var heroItem = allItems[0];
        }

        let items = this.state.items.slice(1, this.state.items.length);

        return ( <div className="small-leaderboard leaderboard-widget-wrapper two-col clearfix">
                <div className="hero">
                    <HeroItem class="small-hero-item" item={heroItem} isLargeLeaderboard={false} selectedStat={this.state.selectedStat} timeframe={this.props.timeframe} json={this.state.json}/>
                </div>
                <div className="leaderboard">
                    <Leaderboard class="small-leaderboard" startRank={2} items={items} leaderboardItems={(this.state.totalItems - 1)} timeframe={this.props.timeframe} selectedStat={this.state.selectedStat} json={this.state.json}/>
                    <div className="call-to-action clearfix">
                        <DropdownSelector options={CALL_TO_ACTIONS}
                                          class={`call-to-action-select ${(this.props.callToActionEnabled ? '' : 'hidden')}`}
                                          clearable={true}
                                          searchable={false}
                                          selectedValue={this.props.callToAction}
                                          onSelect={(i) => this.props.updateCallToAction(i)}/>
                    </div>
                </div>
            </div>
    )}
}
