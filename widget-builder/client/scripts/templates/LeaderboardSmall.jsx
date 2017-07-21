import React from 'react';
import '../../styles/components/LeaderboardSmall.css'
import {SQUADS} from '../scratch/constants/SquadConstants'
import Clubs from '../../images/clubs.png'


var divStyle = [
    { backgroundColor: 'rgb(249,174,49)'},
    { backgroundColor: 'rgb(1,73,194)'},
    { backgroundColor: 'rgb(2,174,120)'}
];

export default class LeaderBoardSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderboard: this.props.leaderboard,
            caption: this.props.caption,
            callToAction: this.props.callToAction,
            round: this.props.round,
            activeTimeframe: this.props.activeTimeframe,
            generated: this.props.generated,
            callToActionEnabled: this.props.callToActionEnabled,
            captionEnabled: this.props.captionEnabled,
            statContainers: this.props.statContainers,
            selectedStat: this.props.selectedStat,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            leaderboard: newProps.leaderboard,
            caption: newProps.caption,
            callToAction: newProps.callToAction,
            round: newProps.round,
            activeTimeframe: newProps.activeTimeframe,
            generated: newProps.generated,
            callToActionEnabled: newProps.callToActionEnabled,
            captionEnabled: newProps.captionEnabled,
            statContainers: newProps.statContainers,
            selectedStat: newProps.selectedStat,
        })
    }

    getSquadLogo() {
        if(this.state.leaderboard[0]) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === this.state.leaderboard[0].team.teamId
            );

            return {
                "backgroundImage": 'url(' + Clubs + ')',
                "height":"70pt",
                "width":"70pt",
                "backgroundSize": "auto 70pt",
                "backgroundPosition": SQUADS[squadIdx].logoPosition,
                "position":"absolute",
                "left": this.state.isLargeLeaderboard ? "75%" : "0%",
                "top":"0"
            }
        } else {
            return { "display": "none" }
        }
    }

    getBackground() {
        if(this.state.leaderboard[0]) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === this.state.leaderboard[0].team.teamId
            );

            return {
                backgroundImage: 'url(' + SQUADS[squadIdx].image + ')',
                backgroundSize: 'cover'
            }
        } else {
            return {
                background:"#c6c6c5"
            }
        }

    }

    render(){
        if(this.state.generated){
            var get;

            switch(this.props.activeTimeframe.value) {
                case 'round':
                    get = this.props.selectedStat.getRound;
                    break;
                case 'season':
                    get = this.props.selectedStat.getSeason;
                    break;
                case 'career':
                    get = this.props.selectedStat.getCareer;
                    break;
                default:
                    null;
            }

            let callToAction = typeof this.state.callToAction === 'object' ?  this.state.callToAction.label : this.state.callToAction;

            let statRows = [];
            let json = {lists: this.state.leaderboard};
            let statValue = (i) => {
                try {
                    return get(json, i);
                } catch (err) {
                    return "N/A"
                }
            };
            for(let i = 1; i < this.state.leaderboard.length; i++){
                let fullName = this.state.leaderboard[i].player.givenName + " " + this.state.leaderboard[i].player.surname;
                if(fullName.length > 20){
                    fullName = fullName.substring(0, fullName.length - (fullName.length - 20 + 1) );
                    fullName += "…";
                }

                statRows.push(
                    <div className="cdw_lbs_statRow">
                        <div className="cdw_lbs_statRank">
                            {i + 1}
                        </div>
                        <img className="cdw_lbs_photo" src={this.state.leaderboard[i].player.photoURL} />
                        <div className="cdw_lbs_nameClub">
                            <span className="cdw_lbs_name">
                                {fullName}
                            </span>
                            <br/>
                            <span className="cdw_lbs_club">
                                {this.state.leaderboard[i].team.teamName}
                            </span>
                        </div>
                        <div className="cdw_lbs_stat">
                            {statValue(i)}
                        </div>
                        <div className="cdw_lbs_statCompare">
                            <span className="cdw_lbs_text">Above Avg</span>
                            <div className="cdw_lbs_colour">&nbsp;</div>
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    <span>
                        <link rel="stylesheet" type="text/css" href="LeaderboardSmall.css"/>
                    </span>
                    <div id="cdw_lbs_widget">
                        <div id="cdw_lbs_headerBar">
                            <span className="cdw_lbs_text">{this.state.selectedStat.label + (this.state.activeTimeframe.value == "round" ? " for ROUND " + this.state.round : "")} </span>
                        </div>
                        <div id="cdw_lbs_mainBody">
                            <div id="cdw_lbs_firstPlayer">
                                <span id="cdw_lbs_teamLogo" style={this.getSquadLogo()}/>
                                <div id="cdw_lbs_teamBackground" style={this.getBackground()}>&nbsp;</div>
                                <img id="cdw_lbs_playerPhoto" src={this.state.leaderboard[0].player.photoURL} />
                                <div className="cdw_lbs_statRank cdw_lbs_first">1</div>
                                <div className="cdw_lbs_playerName cdw_lbs_first">
                                    <span className="cdw_lbs_givenName">{this.state.leaderboard[0].player.givenName + " "}</span><br/>
                                    <span className="cdw_lbs_surname">{this.state.leaderboard[0].player.surname}</span>
                                </div>
                                <div className="cdw_lbs_stat cdw_lbs_first">{statValue(0)}</div>
                                <div className="cdw_lbs_statCompare cdw_lbs_first">
                                    <span className="cdw_lbs_text">Average</span>
                                    <div className="cdw_lbs_colour" style={ divStyle[0] }>&nbsp;</div>
                                </div>
                            </div>
                            <div className={"cdw_lbs_horizontalLine cdw_lbs_first"}>&nbsp;</div>
                            <div id="cdw_lbs_otherPlayers">
                                {statRows}
                                <div id="cdw_lbs_statRound" className={"cdw_lbs_" + this.state.activeTimeframe.value}>
                                    2017 STATISTICS<br id="cdw_lbs_statRoundBreak"/> AS AT ROUND {this.state.round}
                                </div>
                                <div className={"cdw_lbs_horizontalLine cdw_lbs_second"} style={this.state.callToActionEnabled ? {display: 'flex'} : {display: 'none'}}>&nbsp;</div>
                                <div id="cdw_lbs_statsProLink" style={this.state.callToActionEnabled ? {display: 'flex'} : {display: 'none'}}>
                                    <span className="cdw_lbs_text">{ callToAction + " >"}</span>
                                </div>
                            </div>
                        </div>
                        <div id="cdw_lbs_funFact" style={this.state.captionEnabled ? {display: 'block'} : {display: 'none'}}>
                            <span className="cdw_lbs_text">{this.state.caption}</span>
                        </div>
                    </div>
                </div>
            )

        }
        else{
            return <div></div>;
        }
    }
}