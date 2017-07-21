import React from 'react';
import jp from 'jsonpath'
import update from 'immutability-helper';
import Caption from '../../components/Caption'
import WidgetControlsContainer from '../../containers/WidgetControlsContainer'
import StatsContainer from '../../containers/StatsContainer'
import ComparisonStatSelectContainer from '../../containers/ComparisonStatSelectContainer'
import { WIDGET_STATS } from "../../constants/StatsConstants"
import { MIS_API_URL, getMISToken, CALL_TO_ACTIONS } from "../../constants/WidgetBuilderConstants"
import '../../../../styles/PlayerComparisonBuilder.css'
import Clubs from '../../../../images/clubs.png'
import {SQUADS} from '../../constants/SquadConstants'
import PlayerSilhouette from '../../../../images/player_silhouette.png'
import DropdownSelector from '../../components/DropdownSelector'
import PlayerSelectContainer from '../../containers/PlayerSelectContainer'

let playerComparisonPlayerSelectWrapperStyle = {
    padding:"25px 15px",
    width:"100%",
    borderTop:"5px solid #f2f2f2"
};

let imgStyle = {
    position:"absolute",
    bottom:"0px",
    height:"267px",
    width:"auto"
};

let captionStyle = {
    backgroundColor:"#f2f2f2",
    paddingTop: "10px",
    paddingBottom: "10px"
};

export default class PlayerComparisonWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            players: [],
            squads: [],
            selectedNoOfStats: this.props.selectedNoOfStats,
            items: this.props.leaderboardItems,
            statContainers:[],
            selectedStat:WIDGET_STATS[0],
            generated: false,
            ready:false,
            callToAction: CALL_TO_ACTIONS[0],
            isDefaultCaption: true,
            caption: this.props.caption,
            leftImgUrl: PlayerSilhouette,
            rightImgUrl: PlayerSilhouette,
            selectedPlayers: [{"id":"", "json":""}, {"id":"", "json":""}],
        };

        this.onSelectStat = this.onSelectStat.bind(this);
        this.validate = this.validate.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getSquads = this.getSquads.bind(this);
        this.statsReceived = this.statsReceived.bind(this);
    }

    getPlayers(team) {

        let url = MIS_API_URL + 'players';
        if(team)
            url = url + "?teamIds=" + team;

        let misHeaders = {
            "x-media-mis-token": this.state.token
        };

        return fetch(url, {
            method: "GET",
            headers: misHeaders
        }).then((response) => response.json())
            .then((json) => {
                let players = [];

                json.players.map(player => {

                    players.push(
                        {
                            'id': player.playerId,
                            'firstName': player.playerName.givenName,
                            'surname': player.playerName.surname,
                            'displayName': player.playerName.givenName + " " + player.playerName.surname,
                            'imgUrl': player.photoURL,
                            'squad': player.team.teamId
                        }
                    );
                });

                this.setState({
                    players: players
                });

            });
    }

    getSquads() {
        let misHeaders = {
            "x-media-mis-token": this.state.token
        };

        return fetch(MIS_API_URL + 'clubs', {
            method: "GET",
            headers: misHeaders
        }).then((response) => response.json())
            .then((json) => {
                this.setState({
                    squads: json.clubs
                })
            });
    }

    componentWillMount() {
        const statSelectContainers = [];

        getMISToken((token) => {

            this.setState({
                token: token
            });

            this.getSquads();
            this.getPlayers();
        });


        new Array(this.state.selectedNoOfStats.stats).fill().map((el,i) => {

            statSelectContainers.push(React.createElement(ComparisonStatSelectContainer, {
                statOptions: WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                onSelectStat:this.onSelectStat,
                selectedStat:WIDGET_STATS[i],
                leftVal: "-",
                rightVal: "-",
                numberOfStats: this.state.selectedNoOfStats.stats
            }));
        });

        this.setState({
            statContainers: statSelectContainers,
            activeTimeframe: this.props.timeframe
        })

    }

    componentWillReceiveProps(nextProps) {
        const statSelectContainers = [];

        new Array(nextProps.selectedNoOfStats.stats).fill().map((el,i) => {
            statSelectContainers.push(React.createElement(ComparisonStatSelectContainer, {
                statOptions:WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                statValue:"-",
                selectedStat: this.state.statContainers[i] ? this.state.statContainers[i].props.selectedStat : WIDGET_STATS[i],
                onSelectStat:this.onSelectStat,
                leftVal: "-",
                rightVal: "-",
                numberOfStats: nextProps.selectedNoOfStats.stats
            }));
        });

        this.setState({
            selectedNoOfStats: nextProps.selectedNoOfStats,
            statContainers: statSelectContainers,
            activeRoundId: nextProps.roundId,
            activeTimeframe: nextProps.timeframe,
            generated: false
        }, ()=>{
            this.validate();
        })
    }

    validate() {
        let isValid = true;

        // We need TWO players
        if(this.state.selectedPlayers.length != 2) {
            isValid = false;
        }
        else {
            // Make sure both players are populated
            this.state.selectedPlayers.map((el) => {
                if (isValid) {
                    if (el.id === '' || !el.id)
                        isValid = false;
                }
            });
        }

        // If no active timeframe, then can't be valid
        if(isValid) {
            if (!this.state.activeTimeframe)
                isValid = false;
            else {
                if (this.state.activeTimeframe.value === 'round') {
                    //Ensure a round is selected
                    isValid = this.state.activeRoundId ? true : false;
                }
            }
        }

        // So we have checked to make sure we have a player and an optional round.
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

    onPlayerSelect(val, comparePlayer) {

        const player = jp.query(this.state.players, '$[?(@.id=="' + val + '")]')[0];
        const selectedPlayers = this.state.selectedPlayers;

        switch(comparePlayer) {
            case 'left':
                var newPlayer = update(selectedPlayers[0], {$set:
                    {"id": val, "json":""}
                });

                var newPlayers = update(selectedPlayers, {
                    $splice: [[0, 1, newPlayer]]
                });
                this.setState({
                    leftImgUrl: player ? player.imgUrl : PlayerSilhouette,
                    selectedPlayers: newPlayers,
                    leftPlayerId: val
                }, () => {
                    this.validate()
                });

                break;
            case 'right':
                var newPlayer = update(selectedPlayers[1], {$set:
                    {"id": val, "json":""}
                });

                var newPlayers = update(selectedPlayers, {
                    $splice: [[1, 1, newPlayer]]
                });

                this.setState({
                    rightImgUrl: player ? player.imgUrl : PlayerSilhouette,
                    selectedPlayers: newPlayers,
                    rightPlayerId: val
                }, () => {
                    this.validate()
                });
                break;
            default:
        }

        this.clearStats();
        this.validate();
    }

    getSquadLogo(idx) {

        const selectedPlayers = this.state.selectedPlayers;

        let playerIdx = this.state.players.findIndex(
            player => player.id === selectedPlayers[idx].id
        );

        const player = this.state.players[playerIdx];

        if (player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.squad
            );

            return {
                "backgroundImage": 'url(' + Clubs + ')',
                "height": "70pt",
                "width": "70pt",
                "backgroundSize": "auto 70pt",
                "backgroundPosition": SQUADS[squadIdx].logoPosition,
                "position": "absolute",
                "left": idx == 0 ? '0' : '60%',
                "top": "0"
            }
        } else {
            return {"display": "none"}
        }
    }

    getBackground(idx) {

        const selectedPlayers = this.state.selectedPlayers;

        let playerIdx = this.state.players.findIndex(
            player => player.id === selectedPlayers[idx].id
        );

        const player = this.state.players[playerIdx];

        if(player) {
            let squadIdx = SQUADS.findIndex(
                squad => squad.id === player.squad
            );

            return {
                backgroundImage: 'url(' + SQUADS[squadIdx].image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                height:'200pt',
                width:'25%'
            }
        } else {
            return {
                background:"#c6c6c5"
            }
        }

    }

    render() {

        return <div>
            <div className={`widget ${(this.props.class)}`}>
                <div className="player-comparison-wrapper">
                    <div className="player left" style={this.getBackground(0)}>
                        <span style={this.getSquadLogo(0)}/>
                        <img style={imgStyle} src={this.state.leftImgUrl}/>
                    </div>
                    <div className={`player-comparison-stat-select stats-${(this.state.selectedNoOfStats.stats)} ${(this.state.selectedNoOfStats.stats == 1 ? '' : 'box-centre')}`}>
                        <StatsContainer noOfStats={this.state.selectedNoOfStats}
                            statSelectContainers={this.state.statContainers}/>
                    </div>
                    <div className="player right" style={this.getBackground(1)}>
                        <span style={this.getSquadLogo(1)}/>
                        <img style={imgStyle} src={this.state.rightImgUrl}/>
                    </div>
                </div>
                <div className="player-comparison-player-select-wrapper clearfix border-box" style={playerComparisonPlayerSelectWrapperStyle}>
                    <div className="player-select-container player-left">
                        <PlayerSelectContainer players={this.state.players} squads={this.state.squads} getPlayers={(val) => this.getPlayers(val)}
                                               onPlayerSelect={(val) => this.onPlayerSelect(val, "left")}/>
                    </div>


                    <div className="call-to-action">
                        <DropdownSelector options={CALL_TO_ACTIONS}
                                          class={`call-to-action-select ${(this.props.callToActionEnabled ? '' : 'hidden')}`}
                                          clearable={true}
                                          searchable={false}
                                          selectedValue={this.state.callToAction}
                                          onSelect={(i) => this.updateCallToAction(i)}/>
                    </div>

                    <div className="player-select-container player-right">
                        <PlayerSelectContainer players={this.state.players} squads={this.state.squads} getPlayers={(val) => this.getPlayers(val)}
                                               onPlayerSelect={(val) => this.onPlayerSelect(val, "right")}/>
                    </div>
                </div>
                <div style={captionStyle}>
                    <Caption val={this.state.caption}
                             onCaptionChange={(e) => this.onCaptionChange(e)}
                             playerName={this.state.playerName}
                             className={this.props.captionEnabled ? '' : 'hidden'}/>
                </div>
            </div>

            <WidgetControlsContainer active={this.state.ready} generateStats={() => getMISToken((token) => {this.setState({token:token}); this.generateStats();})} generateHTML={() => this.generateHTML()} generateWidget={() => this.generateWidget()}
                                     copyHtml={() => this.copyHtml()} generated={this.state.generated}/>
        </div>
    }

    onCaptionChange(event) {
        this.setState({
            isDefaultCaption:false,
            caption: event.target.value
        }, () => this.validate())
    }

    generateStats() {
        if(this.state.activeTimeframe.value === 'career')
            this.fetchCareer();
        else
            this.fetchStats();
    }

    onSelectStat(stat, idx) {
        let statIdx = WIDGET_STATS.findIndex(
            widgetStat => widgetStat.value === stat
        );
        const statContainers = this.state.statContainers;
        // selectedStat: this.state.statContainers[i] ? this.state.statContainers[i].props.selectedStat : WIDGET_STATS[i],

        const updatedStatContainer = update(statContainers[idx], {
            $set: React.createElement(ComparisonStatSelectContainer, {
                statOptions: WIDGET_STATS,
                index: idx,
                key: "stat-select-container-" + idx,
                selectedStat: WIDGET_STATS[statIdx],
                leftVal: "-",
                rightVal: "-",
                onSelectStat: this.onSelectStat,
                numberOfStats: this.state.selectedNoOfStats.stats
            })
        });

        const newContainers = update(statContainers, {
            $splice: [[idx, 1, updatedStatContainer]]
        });

        this.setState({
            statContainers: newContainers,
            generated: false
        }, () => {this.clearStats()})

    }

    clearStats() {
        const statContainers = this.state.statContainers;
        const newStatContainers = [];

        statContainers.map((container, i) => {
            newStatContainers.push(
                React.createElement(ComparisonStatSelectContainer, {
                    statOptions:WIDGET_STATS,
                    index: i,
                    key: "stat-select-container-" + i,
                    selectedStat: statContainers[i].props.selectedStat,
                    leftVal: "-",
                    rightVal: "-",
                    onSelectStat: statContainers[i].props.onSelectStat,
                    numberOfStats: this.state.selectedNoOfStats.stats
                })
            )
        });

        this.setState({
            statContainers: newStatContainers,
            generated: false
        })
    }

    statsReceived(response) {
        // Update both players
        const selectedPlayers = this.state.selectedPlayers;
        let leftPlayerIdx;
        let rightPlayerIdx;

        const statContainers = this.state.statContainers;
        const timeframe = this.state.activeTimeframe.value;
        const statSelectContainers = [];

        if(response.lists[0].player.playerId === selectedPlayers[0].id) {
            leftPlayerIdx = 0;
            rightPlayerIdx = 1;
        } else {
            leftPlayerIdx = 1;
            rightPlayerIdx = 0;
        }


        statContainers.map((container, i) => {

            let get;

            switch(timeframe) {
                case 'round':
                    get = statContainers[i].props.selectedStat.getRound;
                    break;
                case 'season':
                    get = statContainers[i].props.selectedStat.getSeason;
                    break;
                case 'career':
                    get = statContainers[i].props.selectedStat.getCareer;
                    break;
                default:
                    break;
            }

            const statValue = (isLeftPlayer) => {
                try {
                    if (isLeftPlayer) {
                        // return get(response, 0);
                        return get(response, leftPlayerIdx)
                    } else {
                        return get(response, rightPlayerIdx)
                    }
                } catch (err) {
                    return "N/A"
                }
            };

            statSelectContainers.push(React.createElement(ComparisonStatSelectContainer, {
                statOptions:WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                leftVal: statValue(true),
                rightVal: statValue(false),
                selectedStat: this.state.statContainers[i] ? this.state.statContainers[i].props.selectedStat : WIDGET_STATS[i],
                onSelectStat:this.onSelectStat,
                numberOfStats: this.state.selectedNoOfStats.stats
            }));
        });

        this.setState({
            statContainers: statSelectContainers,
            generated:true
        })
    }

    fetchStats() {
        let misHeaders = {
            "x-media-mis-token": this.state.token
        };

        let fetchUrl = "";
        let playerIds = this.state.selectedPlayers[0].id + "," + this.state.selectedPlayers[1].id;

        switch(this.state.activeTimeframe.value) {
            case 'round':
                fetchUrl = MIS_API_URL + 'statsCentre/players?playerIds=' + playerIds + '&roundId=' + this.state.activeRoundId;
                break;
            case 'season':
                fetchUrl = MIS_API_URL + 'statsCentre/players?playerIds=' + playerIds;
                break;
            default:
                null;
        }

        return fetch(fetchUrl, {
            method: "GET",
            headers: misHeaders
        }).then((response) => response.json())
            .then((json) => {
                this.statsReceived(json);
            })
    }

    /**
     * Got to do things a bit differently for career comparison as there is no method to retrieve
     * more than 1 player in a single call.
     */
    fetchCareer() {
        const selectedPlayers = this.state.selectedPlayers;
        let fetchUrl = "";
        let misHeaders = {
            "x-media-mis-token": this.state.token
        }

        let careerJsons = [];

        for(let i = 0; i < selectedPlayers.length; i++) {
            fetchUrl = MIS_API_URL + 'playerProfile/' + selectedPlayers[i].id;

            fetch(fetchUrl, {
                method: "GET",
                headers: misHeaders
            }).then((response) => response.json())
                .then((json) => {

                careerJsons.push({
                    "id": json.playerProfile.id,
                    "json": json
                });

                if(careerJsons.length == 2) {
                    this.careerComparison(careerJsons);
                }
            })
        }
    }

    careerComparison(careerJsons) {
        const statContainers = this.state.statContainers;
        const selectedPlayers = this.state.selectedPlayers;

        const statSelectContainers = [];

        statContainers.map((container, i) => {

            let leftPlayerIdx;
            let rightPlayerIdx;

            if(selectedPlayers[0].id == careerJsons[0].id) {
                leftPlayerIdx = 0;
                rightPlayerIdx = 1;
            } else {
                leftPlayerIdx = 1;
                rightPlayerIdx = 0;
            }

            let leftVal = statContainers[i].props.selectedStat.getCareer(careerJsons[leftPlayerIdx].json);
            let rightVal = statContainers[i].props.selectedStat.getCareer(careerJsons[rightPlayerIdx].json);

            statSelectContainers.push(React.createElement(ComparisonStatSelectContainer, {
                statOptions:WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                leftVal: leftVal,
                rightVal: rightVal,
                selectedStat: this.state.statContainers[i] ? this.state.statContainers[i].props.selectedStat : WIDGET_STATS[i],
                onSelectStat:this.onSelectStat,
                numberOfStats: this.state.selectedNoOfStats.stats
            }));
        })

        this.setState({
            statContainers: statSelectContainers,
            generated:true
        })
    }
}