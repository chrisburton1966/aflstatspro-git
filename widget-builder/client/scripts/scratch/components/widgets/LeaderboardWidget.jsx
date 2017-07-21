import React from 'react';
import jp from 'jsonpath'
import StatsContainer from '../../containers/StatsContainer'
import StatSelectContainer from '../../containers/StatSelectContainer'
import LeaderboardWidgetSmall from './LeaderboardWidgetSmall'
import LeaderboardWidgetLarge from './LeaderboardWidgetLarge'
import WidgetControlsContainer from '../../containers/WidgetControlsContainer'
import { WIDGET_STATS } from "../../constants/StatsConstants"
import { MIS_API_URL, getMISToken, CALL_TO_ACTIONS } from "../../constants/WidgetBuilderConstants"
import '../../../../styles/LeaderboardBuilder.css'
import Caption from '../../components/Caption'
import LeaderBoardSmall from '../../../templates/LeaderboardSmall'
import LeaderBoardLarge from '../../../templates/LeaderboardLarge'

export default class LeaderboardWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedNoOfStats: [{value: 'one-stat', label: "1"}],
            items: this.props.leaderboardItems,
            statContainers:[],
            leaderboard:[],
            selectedStat:WIDGET_STATS[0],
            generated: false,
            ready:false,
            callToAction: CALL_TO_ACTIONS[0],
            isDefaultCaption: true,
            caption: this.props.caption,
            player: null
        }

        this.onSelectStat = this.onSelectStat.bind(this);
        this.validate = this.validate.bind(this);
        this.getLeaderboard = this.getLeaderboard.bind(this);
    }

    onSelectStat(stat, idx) {

        let statIdx = WIDGET_STATS.findIndex(
            widgetStat => widgetStat.value === stat
        );

        this.setState({
            selectedStat: WIDGET_STATS[statIdx],
            leaderboard:[],
            generated: false
        }, ()=>{
            this.validate();
        })

    }

    updateCallToAction(val) {
        let selectedCtA = "";
        CALL_TO_ACTIONS.forEach(function(e) {
            if (val == e.value) selectedCtA = e.label;
        });

        this.setState({
            callToAction: selectedCtA,
            generated:false
        }, () => {this.validate()})
    }

    onCaptionChange(event) {
        this.setState({
            isDefaultCaption:false,
            generated: false,
            caption: event.target.value
        }, () => this.validate())
    }

    componentWillMount() {
        const statSelectContainers = [];
        const statSelectOptions = jp.query(WIDGET_STATS, '$[?(@.sortBy)]');

        Array(this.state.selectedNoOfStats.stats).fill().map((el,i) => {

            statSelectContainers.push(React.createElement(StatSelectContainer, {
                statOptions: statSelectOptions,
                index: i,
                key: "stat-select-container-" + i,
                onSelectStat:this.onSelectStat,
                selectedStat:WIDGET_STATS[i]
            }));
        })

        this.setState({
            statContainers: statSelectContainers,
            activeTimeframe: this.props.timeframe,
            leaderboard:[]
        })

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.leaderboardItems,
            activeRoundId: nextProps.roundId,
            activeRound: nextProps.round,
            activeTimeframe: nextProps.timeframe,
            generated: false,
            leaderboard:[]
        }, ()=>{
            this.validate();
        })
    }

    getLeaderboard() {
        let fetchUrl;

        let misHeaders = {
            // "x-media-mis-token": this.state.token
            "x-media-mis-token": this.state.token
        }

        switch(this.state.activeTimeframe.value) {
            case 'round':
                fetchUrl = MIS_API_URL + 'statsCentre/players?roundId=' + this.state.activeRoundId + '&sortBy=' + this.state.selectedStat.sortBy +
                    '&pageNum=1&pageSize=' + this.state.items;
                break;
            case 'season':
                fetchUrl = MIS_API_URL + 'statsCentre/players?sortBy=' + this.state.selectedStat.sortBy + '&pageSize=' + this.state.items + '&pageNum=1';
                break;
            case 'career':
                fetchUrl = MIS_API_URL + 'playerProfile/' + this.state.playerId;
                break;
            default:
                null;
        }

        return fetch(fetchUrl, {
            method: "GET",
            headers: misHeaders
        }).then((response) => response.json())
          .then((json) => {
            this.setState({
                leaderboard: json.lists,
                json: json,
                generated:true
            })
        })
    }

    render() {
        return <div>
            <div className={`widget ${(this.props.class)}`}>
                <StatsContainer noOfStats={this.state.selectedNoOfStats}
                                statSelectContainers={this.state.statContainers}/>

                {this.props.leaderboardItems <=5 ?
                    <LeaderboardWidgetSmall json={this.state.json} timeframe={this.state.activeTimeframe} selectedStat={this.state.selectedStat}
                                            items={this.state.leaderboard} totalItems={this.props.leaderboardItems}
                                            callToActionEnabled={this.props.callToActionEnabled}
                                            callToAction={this.state.callToAction}
                                            updateCallToAction={(val) => this.updateCallToAction(val)}/> :
                    <LeaderboardWidgetLarge json={this.state.json} timeframe={this.state.activeTimeframe} selectedStat={this.state.selectedStat}
                                            items={this.state.leaderboard} totalItems={this.props.leaderboardItems}
                                            callToActionEnabled={this.props.callToActionEnabled}
                                            callToAction={this.state.callToAction}
                                            updateCallToAction={(val) => this.updateCallToAction(val)}/>}

                <Caption val={this.state.caption}
                         onCaptionChange={(e) => this.onCaptionChange(e)}
                         playerName={this.state.playerName}
                         className={this.props.captionEnabled ? '' : 'hidden'}/>
            </div>

            {/*<WidgetControlsContainer active={this.state.ready} generateStats={() => this.getLeaderboard()} generated={this.state.generated}/>*/}
            <WidgetControlsContainer active={this.state.ready} generateStats={() => getMISToken((token) => {this.setState({token:token}); this.getLeaderboard();})} generated={this.state.generated}/>
            {this.generateWidget(this.props.leaderboardItems)}
        </div>
    }

    generateWidget(){
    {
        let widgetElement = undefined;
        console.log(this.props.leaderboardItems);
        if(this.props.leaderboardItems > 5) {
            widgetElement = React.createElement(LeaderBoardLarge, {
                leaderboard: this.state.leaderboard,
                caption: this.state.caption,
                callToAction: this.state.callToAction,
                round: this.state.activeRound,
                activeTimeframe: this.state.activeTimeframe,
                generated: this.state.generated,
                callToActionEnabled: this.props.callToActionEnabled,
                captionEnabled: this.props.captionEnabled,
                statContainers: this.state.statContainers,
                selectedStat: this.state.selectedStat,
            });
        }
        else{
            console.log("hi");
            widgetElement = React.createElement(LeaderBoardSmall, {
                leaderboard: this.state.leaderboard,
                caption: this.state.caption,
                callToAction: this.state.callToAction,
                round: this.state.activeRound,
                activeTimeframe: this.state.activeTimeframe,
                generated: this.state.generated,
                callToActionEnabled: this.props.callToActionEnabled,
                captionEnabled: this.props.captionEnabled,
                statContainers: this.state.statContainers,
                selectedStat: this.state.selectedStat,
            });
        }

        return React.createElement('div', {id:"widgetBlock"}, widgetElement);}
    }

    generateHTML() {
        let beautify_html = require('js-beautify').html;
        let htmlSource = document.getElementById("widgetBlock").innerHTML;
        let result = beautify_html(htmlSource);
        alert(result);
    }

    validate() {
        // Validate inputs
        let isValid = true;


        // If no active timeframe, then can't be valid
        if (!this.state.activeTimeframe)
            isValid = false;
        else {
            if (this.state.activeTimeframe.value === 'round') {
                //Ensure a round is selected
                isValid = this.state.activeRoundId ? true : false;
            }
        }


        // So we have checked to make sure we have a valid timeframe
        // Now check to make sure we have a CTA and a Caption if selected.

        if(isValid) {
            if(this.props.callToActionEnabled)
                isValid = this.state.callToAction && this.state.callToAction.value !== '';
        }

        if(isValid) {
            if(this.props.captionEnabled)
                isValid = this.state.caption && this.state.caption.value !== '';
        }

        this.setState({
            ready:isValid
        });
    }
}