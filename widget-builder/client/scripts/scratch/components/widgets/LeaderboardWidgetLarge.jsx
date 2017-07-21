import React from 'react';
import HeroItem from './leaderboard/HeroItem'
import Leaderboard from './leaderboard/Leaderboard'
import { CALL_TO_ACTIONS } from "../../constants/WidgetBuilderConstants"
import DropdownSelector from '../../components/DropdownSelector'

export default class LeaderboardWidgetLarge extends React.Component {
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
            items: nextProps.items,
            totalItems: nextProps.totalItems,
            selectedStat: nextProps.selectedStat
        })
    }

    render() {
        const items = this.state.items;
        let leftColItems = [];
        let rightColItems = [];

        if(items.length > 0) {
            var heroItem = items[0];
            const ceiling = Math.ceil(this.state.items.length / 2);

            leftColItems = this.state.items.slice(1, (ceiling + 1));
            rightColItems = this.state.items.slice(ceiling, this.state.items.length);
        }

        return ( <div className="large-leaderboard clearfix">
            <div className="hero">
                <HeroItem class="large-hero-item" item={heroItem} isLargeLeaderboard={true} selectedStat={this.state.selectedStat} timeframe={this.props.timeframe} json={this.state.json}/>
            </div>
            <div className="leaderboard-wrapper two-col">
                <div className="leaderboard">
                    <Leaderboard class="small-leaderboard"
                                 items={leftColItems}
                                 leaderboardItems={Math.ceil((this.state.totalItems - 1)/ 2)}
                                 timeframe={this.props.timeframe}
                                 selectedStat={this.state.selectedStat}
                                 startRank={2}
                                 json={this.state.json}/>
                </div>
                <div className="leaderboard">
                    <Leaderboard class="small-leaderboard"
                                 items={rightColItems}
                                 leaderboardItems={((this.state.totalItems - 1) - (Math.ceil((this.state.totalItems - 1)/ 2)))}
                                 timeframe={this.props.timeframe}
                                 selectedStat={this.state.selectedStat}
                                 startRank={Math.ceil((this.state.totalItems - 1)/ 2) + 2}
                                 json={this.state.json}/>

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
        </div>
    )}
}
