import React from 'react';
import jp from 'jsonpath'
import update from 'immutability-helper';
import PlayerSelectContainer from '../../containers/PlayerSelectContainer'
import StatsContainer from '../../containers/StatsContainer'
import StatSelectContainer from '../../containers/StatSelectContainer'
import WidgetControlsContainer from '../../containers/WidgetControlsContainer'
import { MIS_API_URL, getMISToken, CALL_TO_ACTIONS, DEFAULT_CAPTION } from "../../constants/WidgetBuilderConstants"
import { WIDGET_STATS } from "../../constants/StatsConstants"
import PlayerSilhouette from '../../../../images/player_silhouette.png'
import Clubs from '../../../../images/clubs.png'
import {SQUADS} from '../../constants/SquadConstants'
import DropdownSelector from '../../components/DropdownSelector'
import Caption from '../../components/Caption'
import SinglePlayer from '../../../templates/SinglePlayer'
import $ from 'jquery';

export default class SinglePlayerWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNoOfStats: this.props.selectedNoOfStats,
            statContainers: [],
            players: [],
            squads: [],
            callToAction: CALL_TO_ACTIONS[0],
            isDefaultCaption: true,
            caption: this.props.caption,
            ready: false,
            generated: false,
            player: undefined
        }

        this.onSelectStat = this.onSelectStat.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.getSquads = this.getSquads.bind(this);
        this.statsReceived = this.statsReceived.bind(this);
        this.validate = this.validate.bind(this);
        // this.generateHTML = this.generateHTML.bind(this);
    }


    getPlayers(team) {

        let url = MIS_API_URL + 'players';
        if(team)
            url = url + "?teamIds=" + team;

        let misHeaders = {
            "x-media-mis-token": this.state.token
        }

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
        }

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
        })

        Array(this.state.selectedNoOfStats.stats).fill().map((el,i) => {

            statSelectContainers.push(React.createElement(StatSelectContainer, {
                statOptions:WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                onSelectStat:this.onSelectStat,
                selectedStat:WIDGET_STATS[i]
            }));
        })

        this.setState({
            statContainers: statSelectContainers,
            activeRoundId: this.props.roundId,
            activeTimeframe: this.props.timeframe
        }, ()=>{
            this.validate();
        })

    }

    componentWillReceiveProps(nextProps) {
        const statSelectContainers = [];

        Array(nextProps.selectedNoOfStats.stats).fill().map((el,i) => {
            statSelectContainers.push(React.createElement(StatSelectContainer, {
                statOptions:WIDGET_STATS,
                index: i,
                key: "stat-select-container-" + i,
                statValue:"-",
                selectedStat: this.state.statContainers[i] ? this.state.statContainers[i].props.selectedStat : WIDGET_STATS[i],
                onSelectStat:this.onSelectStat
            }));
        })

        this.setState({
            selectedNoOfStats: nextProps.selectedNoOfStats,
            statContainers: statSelectContainers,
            activeRoundId: nextProps.roundId,
            round: nextProps.round,
            activeTimeframe: nextProps.timeframe,
            generated: false
        }, ()=>{
            this.validate();
        })
    }

    onSelectStat(stat, idx) {
        let statIdx = WIDGET_STATS.findIndex(
            widgetStat => widgetStat.value === stat
        );

        const statContainers = this.state.statContainers;

        const updatedStatContainer = update(statContainers[idx], {
            $set: React.createElement(StatSelectContainer, {
                statOptions: WIDGET_STATS,
                index: idx,
                key: "stat-select-container-" + idx,
                selectedStat: WIDGET_STATS[statIdx],
                statValue: "-",
                onSelectStat: this.onSelectStat
            })
        });

        const newContainers = update(statContainers, {
            $splice: [[idx, 1, updatedStatContainer]]
        });

        this.setState({
            statContainers: newContainers,
            generated: false
        })
    }

    fetchStats() {
        let misHeaders = {
            "x-media-mis-token": this.state.token
        }

        let fetchUrl = "";

        // Build URL based on selected Timeframe
        switch(this.state.activeTimeframe.value) {
            case 'round':
                fetchUrl = MIS_API_URL + 'statsCentre/players?playerIds=' + this.state.playerId + '&roundId=' + this.state.activeRoundId;
                break;
            case 'season':
                fetchUrl = MIS_API_URL + 'statsCentre/players?playerIds=' + this.state.playerId;
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
                this.statsReceived(json);
                this.setState({
                    generated:true
                })
            })
    }

    statsReceived(response) {
        const statContainers = this.state.statContainers;
        const newStatContainers = [];
        const timeframe = this.state.activeTimeframe.value;

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
                    null;
            }

            const statValue = () => {
                try {
                    return get(response, 0);
                } catch (err) {
                    return "N/A"
                }
            };

            newStatContainers.push(
                React.createElement(StatSelectContainer, {
                    statOptions:WIDGET_STATS,
                    index: i,
                    key: "stat-select-container-" + i,
                    selectedStat: statContainers[i].props.selectedStat,
                    statValue: statValue(),
                    onSelectStat: statContainers[i].props.onSelectStat
                })
            )
        });

        this.setState({
            statContainers: newStatContainers
        })

    }

    onPlayerSelect(val) {
        let caption = '';
        const player = jp.query(this.state.players, '$[?(@.id=="' + val + '")]')[0];
        this.state.player = player;

        if(this.state.isDefaultCaption) {
            if(player)
                caption = "Check out more of " + player.displayName + "'s stats in StatsPro!"
            else
                caption = DEFAULT_CAPTION
        }


        this.setState({
            playerId: val,
            caption: caption
        }, () => {
            this.validate();
            this.clearStats();
        })
    }

    clearStats() {
        const statContainers = this.state.statContainers;
        const newStatContainers = [];

        statContainers.map((container, i) => {
            newStatContainers.push(
                React.createElement(StatSelectContainer, {
                    statOptions:WIDGET_STATS,
                    index: i,
                    key: "stat-select-container-" + i,
                    selectedStat: statContainers[i].props.selectedStat,
                    statValue: "-",
                    onSelectStat: statContainers[i].props.onSelectStat
                })
            )
        });

        this.setState({
            statContainers: newStatContainers,
            generated: false
        })
    }

    getImage() {

        let playerIdx = this.state.players.findIndex(
            player => player.id === this.state.playerId
        );

        const player = this.state.players[playerIdx];
        return player ? `${(player.imgUrl)}` : PlayerSilhouette;
    }

    getSquadLogo() {

        let playerIdx = this.state.players.findIndex(
            player => player.id === this.state.playerId
        );

        const player = this.state.players[playerIdx];

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

    getBackground() {
        let playerIdx = this.state.players.findIndex(
            player => player.id === this.state.playerId
        );

        const player = this.state.players[playerIdx];

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

    render() {

        return <div>
            <div className={`widget ${(this.props.class)}`}>
                <div className="col-wrapper">
                    <div className="left-col" style={this.getBackground()}>
                        <span style={this.getSquadLogo()}/>
                        <img src={this.getImage()}/>
                    </div>
                    <div className={`right-col contains-${(this.state.selectedNoOfStats.stats)}`}>
                        <PlayerSelectContainer players={this.state.players} squads={this.state.squads} getPlayers={(val) => this.getPlayers(val)}
                                               onPlayerSelect={(val) => this.onPlayerSelect(val)}/>
                        <StatsContainer noOfStats={this.state.selectedNoOfStats}
                                        statSelectContainers={this.state.statContainers}/>

                        <div className="call-to-action">
                            <DropdownSelector options={CALL_TO_ACTIONS}
                                              class={`call-to-action-select ${(this.props.callToActionEnabled ? '' : 'hidden')}`}
                                              clearable={true}
                                              searchable={false}
                                              selectedValue={this.state.callToAction}
                                              onSelect={(i) => this.updateCallToAction(i)}/>
                        </div>
                    </div>
                </div>

                <Caption val={this.state.caption}
                         onCaptionChange={(e) => this.onCaptionChange(e)}
                         playerName={this.state.playerName}
                         className={this.props.captionEnabled ? '' : 'hidden'}/>
            </div>
            <WidgetControlsContainer active={this.state.ready}
                                     generateStats={() => getMISToken((token) => {this.setState({token:token}); this.generateStats();})}
                                     generateHTML={() => this.generateHTML()}
                                     generateWidget={() => this.generateWidget()}
                                     copyHtml={() => this.copyHtml()}
                                     generated={this.state.generated}/>
            {this.generateWidget()}
        </div>
    }

    generateWidget(){
    {
        let firstName = this.state.player != undefined ? this.state.player.firstName + " " : undefined;
        let surname = this.state.player != null ? (this.state.player.surname).toUpperCase() + " " : undefined;
        let widgetElement = React.createElement(SinglePlayer, {
            player: this.state.player,
            noOfStats: this.state.selectedNoOfStats.value,
            photoUrl: this.getImage(),
            stats: this.state.statContainers,
            firstName: firstName,
            surname: surname,
            caption: this.state.caption,
            callToAction: this.state.callToAction,
            round: this.state.round,
            activeTimeframe: this.state.activeTimeframe,
            generated: this.state.generated,
            callToActionEnabled: this.props.callToActionEnabled,
            captionEnabled: this.props.captionEnabled
        });

        return React.createElement('div', {id:"widgetBlock"}, widgetElement);}
    }

    onCaptionChange(event) {
        this.setState({
            isDefaultCaption:false,
            caption: event.target.value
        }, () => this.validate())
    }

    validate() {
        // Validate inputs
        let isValid = true;

        // If there is no player then there is no way this can be active
        if(!this.state.playerId)
            isValid = false;
        else {
            // If no active timeframe, then can't be valid
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

    generateHTML() {
        let beautify_html = require('js-beautify').html;
        let htmlSource = $("#widgetBlock").children(":first").html();
        let result = beautify_html(htmlSource);
        alert(result);
    }

    generateStats() {
        this.fetchStats();
    }

    copyHtml() {
        let beautify_html = require('js-beautify').html;
        let htmlSource = $("#widgetArea").children(":first").html();
        let result = beautify_html(htmlSource);

        $('body').append('<div id="htmlCopy" style="display: none">hi</div>');

        $('#htmlCopy').select();
        document.execCommand('copy');
        $('#htmlCopy').remove();
    }
}