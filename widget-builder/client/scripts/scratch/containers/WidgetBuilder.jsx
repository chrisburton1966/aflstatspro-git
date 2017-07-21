import React from 'react';
import jp from 'jsonpath'
import { WIDGET_TYPES, WIDGET_TIMEFRAMES, MIS_API_URL, getMISToken, LEADERBOARD_MAX } from '../constants/WidgetBuilderConstants'
import SinglePlayerWidget from '../components/widgets/SinglePlayerWidget'
import PlayerComparisonWidget from '../components/widgets/PlayerComparisonWidget'
import WidgetSelectorContainer from './WidgetSelectContainer'
import WidgetContentToggle from '../components/toggles/WidgetContentToggle'
import LeaderboardWidget from '../components/widgets/LeaderboardWidget'
import DropdownSelector from '../components/DropdownSelector'
import '../../../styles/main.css';
import '../../../styles/components/PlayerFilter.css';
import '../../../styles/components/WidgetDetailsBuilder.css';
import $ from 'jquery';

const widgetElements = [];
export default class WidgetBuilder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            widgets: [SinglePlayerWidget, PlayerComparisonWidget, LeaderboardWidget],
            activeWidget: WIDGET_TYPES[0],
            noOfStatsSelected: WIDGET_TYPES[0].noOfStats[0],
            activeWidgetIdx: 0,
            activeNoOfStatsIdx: 0,
            activeTimeframe: WIDGET_TYPES[0].timeframes[0],
            callToActionEnabled:true,
            captionEnabled: true,
            leaderboardItems:1,
        };

        this.getRounds = this.getRounds.bind(this);
    }

    componentWillMount() {
        getMISToken((token) => {
            this.setState({
                token: token
            });
            this.getRounds();
        })

    }

    onSelectActiveWidgetIdx(idx) {
        this.setState({
            activeWidgetIdx: idx,
            activeWidget: WIDGET_TYPES[idx],
            // noOfStatsSelected: WIDGET_TYPES[idx].noOfStats[0]
            // activeNoOfStatsIdx: 0,
        })
    }

    onSelectLeaderboardItems(val) {
        this.setState({
            leaderboardItems: val
        })
    }

    onSelectActiveNoOfStatsIdx(val) {

        let idx = this.state.activeWidget.noOfStats.findIndex(
            activeWidgetNoOfStats => activeWidgetNoOfStats.value === val
        );

        this.setState({
            noOfStatsSelected: this.state.activeWidget.noOfStats[idx],
            activeNoOfStatsIdx: idx
        })
    }

    onSelectActiveRound(val) {
        let selectedRound = "";
        this.state.rounds.forEach(function(e) {
            if (val == e.roundId) selectedRound = e.roundNumber;
        });

        this.setState({
            activeRound: selectedRound,
            activeRoundId: val
        })
    }

    onSelectActiveTimeframe(val) {
        let idx = this.state.activeWidget.timeframes.findIndex(
            timeframe => timeframe.value === val
        );

        this.setState({
            activeTimeframe: this.state.activeWidget.timeframes[idx]
        })
    }

    getRounds() {

        let misHeaders = {
            "x-media-mis-token": this.state.token
        };

        return fetch(MIS_API_URL + 'seasons', {
            method: "GET",
            headers: misHeaders
        }).then((response) => response.json())
            .then((json) => {

                const currentSeasonId = json.currentSeasonId;
                let season = jp.query(json, '$..seasons[?(@.id=="' + currentSeasonId + '")]')[0];

                const currentRoundId = season.currentRoundId;
                const currentRound = jp.query(season, '$..rounds[?(@.roundId =="' + currentRoundId + '")]')[0];
                const currentRoundNumber = currentRound.roundNumber;

                let rounds = jp.query(season, '$..rounds[:' + currentRoundNumber + ']');

                this.setState({
                    currentSeason:json.currentSeasonId,
                    currentRound: currentRoundNumber,
                    rounds: rounds
                })
            });
    }

    toggleCallToAction() {
        this.setState({
            callToActionEnabled: !this.state.callToActionEnabled
        });
    }

    toggleCaption() {
        this.setState({
            captionEnabled: !this.state.captionEnabled
        });
    }

    render() {
        widgetElements[this.state.activeWidgetIdx] = React.createElement(this.state.widgets[this.state.activeWidgetIdx], {
            class: "active-widget widget-container",
            selectedNoOfStats: this.state.noOfStatsSelected,
            roundId: this.state.activeRoundId,
            round: this.state.activeRound,
            timeframe: this.state.activeTimeframe,
            callToActionEnabled: this.state.callToActionEnabled,
            captionEnabled: this.state.captionEnabled,
            caption: this.state.activeWidget.defaultCaption,
            leaderboardItems: this.state.leaderboardItems
        });

        let el = React.createElement('div', {className:this.state.activeWidget.id}, widgetElements[this.state.activeWidgetIdx]);
        let firstDropdown = null;

        if(this.state.activeWidget.id === 'leaderboard-widget') {
            const options = [];

            new Array(LEADERBOARD_MAX).fill().map((el,i) => {
                options.push(
                    {idx:(i+1), value:'leaderboard-items-' + (i + 1), label:(i + 1)}
                )
            });

            firstDropdown = React.createElement(DropdownSelector, {
                options:options,
                class:"noOfStatsSelect",
                disabled:false,
                label:"Leaderboard Items",
                clearable:false,
                searchable:false,
                valueKey:"idx",
                selectedValue:1,
                onSelect: function(val) {this.onSelectLeaderboardItems(val)}.bind(this)

            });
        } else {
            firstDropdown = React.createElement(DropdownSelector, {
                options:this.state.activeWidget.noOfStats,
                class:"noOfStatsSelect",
                disabled:false,
                label:"Number of Stats",
                clearable:false,
                searchable:false,
                selectedValue:this.state.activeWidget.noOfStats[this.state.activeNoOfStatsIdx],
                onSelect: function(val) {this.onSelectActiveNoOfStatsIdx(val)}.bind(this)
            });
        }
        return <div className="container">

            <WidgetSelectorContainer activeWidgetIdx={this.state.activeWidgetIdx}
                                     selectedNoOfStats={this.state.noOfStatsSelected}
                                     onSelect={(i) => this.onSelectActiveWidgetIdx(i)}/>

            <div className="widget-configure-wrapper clearfix">

                {firstDropdown}

                <DropdownSelector options={this.state.activeWidget.timeframes}
                                  class="timeframeSelect"
                                  clearable={false}
                                  searchable={false}
                                  label="Timeframe"
                                  selectedValue={this.state.activeTimeframe}
                                  onSelect={(i) => this.onSelectActiveTimeframe(i)}/>

                <DropdownSelector options={this.state.rounds}
                                  valueKey="roundId"
                                  labelKey="roundNumber"
                                  class="timeframeSelect"
                                  clearable={false}
                                  searchable={false}
                                  disabled={this.state.activeTimeframe.roundSelectDisabled}
                                  label="Round Number"
                                  selectedValue={this.state.activeRoundId ? this.state.activeRoundId : null}
                                  onSelect={(i) => this.onSelectActiveRound(i)}/>

                <div className="widget-content-toggle-container">
                    <WidgetContentToggle label="CTA" active={this.state.callToActionEnabled} onClick={() => this.toggleCallToAction()}/>
                    <WidgetContentToggle label="Caption" active={this.state.captionEnabled} onClick={() => this.toggleCaption()}/>
                    <WidgetContentToggle label="Benchmark"/>
                </div>
            </div>

            {el}
        </div>
    }

}