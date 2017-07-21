import React from 'react';
import '../../styles/components/LeaderboardLarge.css'
import {SQUADS} from '../scratch/constants/SquadConstants'
import Clubs from '../../images/clubs.png'


var divStyle = [
    { backgroundColor: 'rgb(249,174,49)'},
    { backgroundColor: 'rgb(1,73,194)'},
    { backgroundColor: 'rgb(2,174,120)'}
];

export default class LeaderBoardLarge extends React.Component {
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
                "left": "100%",
                "top":"0",
                "transform": "translateX(-100%)"

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
                    <div className="cdw_lbl_statRow_container">
                        <div className="cdw_lbl_statRow">
                            <div className="cdw_lbl_statRank">
                                {i + 1}
                            </div>
                            <img className="cdw_lbl_photo" src={this.state.leaderboard[i].player.photoURL} />
                            <div className="cdw_lbl_nameClub">
                                <span className="cdw_lbl_name">
                                    {fullName}
                                </span>
                                <br/>
                                <span className="cdw_lbl_club">
                                    {this.state.leaderboard[i].team.teamName}
                                </span>
                            </div>
                            <div className="cdw_lbl_stat">
                                {statValue(i)}
                            </div>
                            <div className="cdw_lbl_statCompare">
                                <span className="cdw_lbl_text">Above Avg</span>
                                <div className="cdw_lbl_colour">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    <span>
                        <link rel="stylesheet" type="text/css" href="LeaderboardLarge.css"/>
                    </span>
                    <div id="cdw_lbl_widget">
                        <div id="cdw_lbl_headerBar">
                            <span className="cdw_lbl_text">{this.state.selectedStat.label + (this.state.activeTimeframe.value == "round" ? " for ROUND " + this.state.round : "")} </span>
                        </div>
                        <div id="cdw_lbl_mainBody">
                            <div id="cdw_lbl_firstPlayer">
                                <span id="cdw_lbl_teamLogo" style={this.getSquadLogo()}/>
                                <div id="cdw_lbl_teamBackground" style={this.getBackground()}>&nbsp;</div>
                                <img id="cdw_lbl_playerPhoto" src={this.state.leaderboard[0].player.photoURL} />
                                <div className="cdw_lbl_statRank cdw_lbl_first">1</div>
                                <div className="cdw_lbl_playerName cdw_lbl_first">
                                    <span className="cdw_lbl_givenName">{this.state.leaderboard[0].player.givenName + " "}</span><br/>
                                    <span className="cdw_lbl_surname">{this.state.leaderboard[0].player.surname}</span>
                                </div>
                                <div className="cdw_lbl_stat cdw_lbl_first">{statValue(0)}</div>
                                <div className="cdw_lbl_statCompare cdw_lbl_first">
                                    <span className="cdw_lbl_text">Average</span>
                                    <div className="cdw_lbl_colour" style={ divStyle[0] }>&nbsp;</div>
                                </div>
                            </div>
                            <div className={"cdw_lbl_horizontalLine cdw_lbl_first"}>&nbsp;</div>
                            <div id="cdw_lbl_otherPlayers">
                                {statRows}
                                <div id="cdw_lbl_statRound" className={"cdw_lbl_" + this.state.activeTimeframe.value}>
                                    2017 STATISTICS AS AT ROUND {this.state.round}
                                </div>
                                <div className={"cdw_lbl_horizontalLine cdw_lbl_second"} style={this.state.callToActionEnabled ? {display: 'block'} : {display: 'none'}}>&nbsp;</div>
                                <div id="cdw_lbl_statsProLink" style={this.state.callToActionEnabled ? {display: 'flex'} : {display: 'none'}}>
                                    <span className="cdw_lbl_text">{ callToAction + " >"}</span>
                                </div>
                                <div style={{clear: "both"}}></div>
                            </div>
                        </div>
                        <div id="cdw_lbl_funFact" style={this.state.captionEnabled ? {display: 'block'} : {display: 'none'}}>
                            <span className="cdw_lbl_text">{this.state.caption}</span>
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