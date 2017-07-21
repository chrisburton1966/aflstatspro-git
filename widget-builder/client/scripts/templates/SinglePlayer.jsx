import React from 'react';
import '../../styles/components/SinglePlayer.css'
import {SQUADS} from '../scratch/constants/SquadConstants'
import Clubs from '../../images/clubs.png'

const divStyle = [
    {backgroundColor: 'rgb(249,174,49)'},
    {backgroundColor: 'rgb(1,73,194)'},
    {backgroundColor: 'rgb(2,174,120)'}
];

export default class SinglePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.player,
            noOfStats: this.props.noOfStats,
            photoUrl: this.props.photoUrl,
            stats: this.props.statContainers,
            firstName: this.props.firstName,
            surname: this.props.surname,
            caption: this.props.caption,
            callToAction: this.props.callToAction,
            round: this.props.round,
            activeTimeframe: this.props.activeTimeframe,
            generated: this.props.generated,
            callToActionEnabled: this.props.callToActionEnabled,
            captionEnabled: this.props.captionEnabled
        }
    }

    componentWillReceiveProps(newProps) {
        let noOfStats = newProps.noOfStats != undefined ? newProps.noOfStats : undefined;
        this.setState({
            player: newProps.player,
            noOfStats: noOfStats,
            photoUrl: newProps.photoUrl,
            stats: newProps.stats,
            firstName: newProps.firstName,
            surname: newProps.surname,
            caption: newProps.caption,
            callToAction: newProps.callToAction,
            round: newProps.round,
            activeTimeframe: newProps.activeTimeframe,
            generated: newProps.generated,
            callToActionEnabled: newProps.callToActionEnabled,
            captionEnabled: newProps.captionEnabled
        })
    }

    getBackground() {
        const player = this.state.player;

        if(player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.squad
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

    getSquadLogo() {

        const player = this.state.player;

        if(player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.squad
            );

            return {
                "backgroundImage": 'url(' + Clubs + ')',
                "height":"70pt",
                "width":"70pt",
                "backgroundSize": "auto 70pt",
                "backgroundPosition": SQUADS[squadIdx].logoPosition,
                "position":"absolute",
                "left":"0",
                "top":"0"
            }
        } else {
            return { "display": "none" }
        }
    }

    render(){
        if(this.state.generated){
            let callToAction = typeof this.state.callToAction === 'object' ?  this.state.callToAction.label : this.state.callToAction;

            return (
                <div>
                    <span>
                        <link rel="stylesheet" type="text/css" href="http://localhost:8090/guy/SinglePlayer.css"/>
                    </span>
                    <div id="cdw_widget" className={this.state.noOfStats + (this.state.captionEnabled ? "" : " captionDisabled") + (this.state.callToActionEnabled ? "" : " ctaDisabled")} >
                        <span id="cdw_lbs_teamLogo" style={this.getSquadLogo()}/>
                        <div id="teamBackground" style={this.getBackground()}>&nbsp;</div>
                        <img id="playerPhoto" src={this.state.photoUrl} />
                        <div id="playerName">
                            <span className="firstName">{this.state.firstName}</span>
                            <span className="lastName">{this.state.surname}</span>
                        </div>
                        <div className="horizontalLine first">&nbsp;</div>
                        <div className={"statName first " + this.state.noOfStats}>{this.state.stats.length > 0 ? this.state.stats[0].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat first " + this.state.noOfStats}>{this.state.stats.length > 0  ? this.state.stats[0].props.statValue : ''}</div>
                        <div className={"statRank first " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[0] }>&nbsp;</div>
                            <span className="text">Average</span>
                        </div>
                        <div className={"verticalLine first " + this.state.noOfStats}>&nbsp;</div>
                        <div className={"statName second " + this.state.noOfStats}>{this.state.stats.length > 1 ? this.state.stats[1].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat second " + this.state.noOfStats}>{this.state.stats.length > 1 ? this.state.stats[1].props.statValue : ''}</div>
                        <div className={"statRank second " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[1] }>&nbsp;</div>
                            <span className="text">Elite</span>
                        </div>
                        <div className={"verticalLine second " + this.state.noOfStats}>&nbsp;</div>
                        <div className={"statName third " + this.state.noOfStats}>{this.state.stats.length > 2  ? this.state.stats[2].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat third " + this.state.noOfStats}>{this.state.stats.length > 2  ? this.state.stats[2].props.statValue : ''}</div>
                        <div className={"statRank third " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[2] }>&nbsp;</div>
                            <span className="text">Above Avg</span>
                        </div>
                        <div className={"statName fourth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[3].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat fourth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[3].props.statValue : ''}</div>
                        <div className={"statRank fourth " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[0] }>&nbsp;</div>
                            <span className="text">Above Avg</span>
                        </div>
                        <div className={"verticalLine third " + this.state.noOfStats}>&nbsp;</div>

                        <div className={"statName fifth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[4].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat fifth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[4].props.statValue : ''}</div>
                        <div className={"statRank fifth " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[0] }>&nbsp;</div>
                            <span className="text">Above Avg</span>
                        </div>
                        <div className={"verticalLine fourth " + this.state.noOfStats}>&nbsp;</div>
                        <div className={"statName sixth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[5].props.selectedStat.label.toUpperCase() : ''}</div>
                        <div className={"stat sixth " + this.state.noOfStats}>{this.state.stats.length > 3  ? this.state.stats[5].props.statValue : ''}</div>
                        <div className={"statRank sixth " + this.state.noOfStats}>
                            <div className={"colour " + this.state.noOfStats} style={ divStyle[0] }>&nbsp;</div>
                            <span className="text">Above Avg</span>
                        </div>
                        <div id="statRound" className={this.state.noOfStats + " " + this.state.activeTimeframe.value}>2017 STATISTICS AS AT ROUND {this.state.round}</div>
                        <div className={"horizontalLine second " + this.state.noOfStats} style={this.state.callToActionEnabled ? {display: 'block'} : {display: 'none'}}>&nbsp;</div>
                        <div id="statsProLink" className={this.state.noOfStats} style={this.state.callToActionEnabled ? {display: 'flex'} : {display: 'none'}}>
                            <span className="text">{ callToAction + " >"}</span>
                        </div>
                        <div id="funFact" className={this.state.noOfStats} style={this.state.captionEnabled ? {display: 'block'} : {display: 'none'}}>
                            <span className="text">{this.state.caption}</span>
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