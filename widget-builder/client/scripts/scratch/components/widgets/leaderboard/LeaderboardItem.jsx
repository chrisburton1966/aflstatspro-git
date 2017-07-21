import React from 'react';
import PlayerSilhouette from '../../../../../images/player_silhouette.png'

let itemImgStyle = {
    height:"53pt",
    width:"auto"
};

let rankStyle = {
    width:"10%",
    fontSize:"20px",
    color:"black",
    float:"left",
    textAlign:"center",
    alignSelf:"center"
};

let playerDetailsStyle = {
    float:"left",
    color:"#01285e",
    fontSize:"20px",
    alignSelf:"center",
    paddingLeft:"5px"
};

let statStyle = {
    color:"#01285e",
    fontSize:"20px",
    alignSelf:"center",
    position:"absolute",
    right:"10px"
}

let playerSquadStyle = {
    color:"#6d6d6d",
    fontSize:"12pt",
    lineHeight:"12pt",
    paddingTop:"5px"
}

export default class LeaderboardItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            item: null,
            rank:"",
            firstName: "-",
            surname: "-",
            statValue: "-",
            squad: "",
            imgUrl: PlayerSilhouette
        })
    }

    componentWillReceiveProps(nextProps) {
        // debugger;
        this.setState({
            item: nextProps.item,
            rank: nextProps.rank,
            firstName: nextProps.item ? nextProps.item.player.givenName : "-",
            surname: nextProps.item ? nextProps.item.player.surname : "-",
            squad: nextProps.item ? nextProps.item.team.teamName : "",
            imgUrl: nextProps.item ? nextProps.item.player.photoURL: PlayerSilhouette
        })
    }

    render() {
        let get;

        switch(this.props.timeframe.value) {
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

        return (<div className={`clearfix ${(this.props.className)}`}>
                <div style={rankStyle}>{this.state.rank}</div>
                <div style={{float:"left"}}><img style={itemImgStyle} src={this.state.imgUrl}/></div>
                <div style={playerDetailsStyle}>
                    <div>{this.state.firstName} {this.state.surname}</div>
                    <div style={playerSquadStyle}>{this.state.squad}</div>
                </div>
                <div style={statStyle}>{this.state.item ? get(this.props.json,(this.state.rank-1)) : "-"}</div>
            </div>
        )
    }
}