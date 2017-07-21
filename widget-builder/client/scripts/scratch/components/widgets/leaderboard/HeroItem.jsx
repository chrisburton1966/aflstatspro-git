import React from 'react';
import PlayerSilhouette from '../../../../../images/player_silhouette.png'
import {SQUADS} from '../../../constants/SquadConstants'
import Clubs from '../../../../../images/clubs.png'

export default class LeaderboardWidgetSmall extends React.Component {

    constructor(props) {
        super(props);

        this.state =({
            player: null,
            firstName: "-",
            surname: "-",
            imgUrl: PlayerSilhouette,
            selectedStat: this.props.selectedStat,
            isLargeLeaderboard: this.props.isLargeLeaderboard
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            json: nextProps.json,
            player: nextProps.item,
            firstName: nextProps.item ? nextProps.item.player.givenName : "-",
            surname: nextProps.item ? nextProps.item.player.surname : "-",
            imgUrl: nextProps.item ? nextProps.item.player.photoURL : PlayerSilhouette,
            selectedStat: this.props.selectedStat,
            isLargeLeaderboard: nextProps.isLargeLeaderboard
        })
    }

    getSquadLogo() {

        const player = this.state.player;
// debugger;
        if(player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.team.teamId
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

        const player = this.state.player;

        if(player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.team.teamId
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

    render() {
        const get = this.state.selectedStat.getRound;

        return ( <div className={this.props.class}>
            {/*<div>*/}
                <div className="hero-image-wrapper" style={this.getBackground()}>
                    <span style={this.getSquadLogo()}/>
                    <img src={this.state.imgUrl}/>
                </div>
                <div className="heroItemWrapper">
                    <div className="rank">1</div>
                    <div className="player-details">
                        <div>{this.state.firstName}</div>
                        <div style={{fontWeight:"bold"}}>{this.state.surname}</div>
                    </div>
                    <div className="stat">
                        {/*{this.state.player ? this.state.player.stats.totals.disposals : "-"}*/}
                        {this.state.player ? get(this.state.json,0) : "-"}
                    </div>
                </div>
            {/*</div>*/}
        </div>)
    }
}