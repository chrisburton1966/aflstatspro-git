import React from 'react';
import DropdownSelector from "../components/DropdownSelector";

export default class PlayerSelectContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            squads: this.props.squads
        };
    }

    render() {
        return ( <div className="player-filter clearfix">
            <DropdownSelector class="player-select" options={this.props.players}
                              valueKey="id" labelKey="displayName" searchable={true} clearable={true}
                              onSelect={this.props.onPlayerSelect}/>

            <DropdownSelector class="squad-select" options={this.props.squads}
                              valueKey="teamId" labelKey="abbr" searchable={false} clearable={true}
                                onSelect={(val) => this.props.getPlayers(val)}/>

        </div>)
    }

}
