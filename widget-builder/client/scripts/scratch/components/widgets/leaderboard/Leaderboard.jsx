import React from 'react';
import LeaderboardItem from './LeaderboardItem'

export default class LeaderboardWidgetSmall extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            leaderboardItems: this.props.leaderboardItems,
            selectedStat: this.props.selectedStat
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items,
            leaderboardItems: nextProps.leaderboardItems,
            selectedStat: this.props.selectedStat
        })
    }

    render() {

        const leaderboardItemsCount = this.state.leaderboardItems;
        const playerItems = this.state.items;

        let leaderboardItems = [];

        Array(leaderboardItemsCount).fill().map((el,i) => {
            if(playerItems)
                var player = playerItems[i]    // First item goes into hero

            leaderboardItems.push(
                React.createElement(LeaderboardItem, {
                    key:"leaderboard-item-" + i,
                    className:"leaderboard-item",
                    item: player,
                    rank:(i+this.props.startRank),
                    selectedStat: this.state.selectedStat,
                    json:this.props.json,
                    timeframe: this.props.timeframe
                })
            )
        });

        return (<div className="leaderboard-list-wrapper">
            {leaderboardItems}
        </div>)
    }
}