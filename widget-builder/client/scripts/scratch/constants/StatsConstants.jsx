export const WIDGET_STATS = [
    {
        value:'goals',
        label:'Goals',
        sortBy:'goals',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.goals; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.goals; },
        getCareer: function(json){ return json.playerProfile.careerAverages.goals; }
    },
    {
        value:'games-played',
        label:'Games Played',
        isPercent:false,
        getRound: function(json, i){ return 1; },
        getSeason: function(json, i){ return json.lists[i].stats.gamesPlayed; },
        getCareer: function(json){ return json.playerProfile.careerGamesPlayed; }
    },
    {
        value:'kicks',
        label:'Kicks',
        sortBy:'kicks',
        isPercent:false,
        getRound: function(json,i){return json.lists[i].stats.totals.kicks; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.kicks; },
        getCareer: function(json){ return json.playerProfile.careerAverages.kicks; }
    },
    {
        value:'handballs',
        label:'Handballs',
        sortBy:'handballs',
        isPercent:false,
        getRound: function(json,i){return json.lists[i].stats.totals.handballs; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.handballs; },
        getCareer: function(json){ return json.playerProfile.careerAverages.handballs; }
    },
    {
        value:'marks',
        label:'Marks',
        sortBy:'marks',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.marks; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.marks; },
        getCareer: function(json){ return json.playerProfile.careerAverages.marks; }
    },
    {
        value:'disposals',
        label:'Disposals',
        sortBy:'disposals',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.disposals; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.disposals; },
        getCareer: function(json){ return json.playerProfile.careerAverages.disposals; }
    },
    {
        value:'hitouts',
        label:'Hitouts',
        sortBy:'hitouts',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.hitouts; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.hitouts; },
        getCareer: function(json){ return json.playerProfile.careerAverages.hitouts; }
    },
    {
        value:'tackles',
        label:'Tackles',
        sortBy:'tackles',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.tackles; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.tackles; },
        getCareer: function(json){ return json.playerProfile.careerAverages.tackles; }
    },
    {
        value:'clearances',
        label:'Clearances',
        sortBy:'totalclearances',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.clearances.totalClearances; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.clearances.totalClearances; },
        getCareer: function(json){ return json.playerProfile.careerAverages.clearances.totalClearances; }
    },
    {
        value:'contested-possessions',
        label:'Contested Possessions',
        sortBy:'contestedpossessions',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.contestedPossessions; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.contestedPossessions; },
        getCareer: function(json){ return json.playerProfile.careerAverages.contestedPossessions; }
    },
    {
        value:'rating-points',
        label:'Rating',
        sortBy:'playerrating',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.ratingPoints; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.ratingPoints; },
        getCareer: function(json){

            const ratingsIdx = json.playerProfile.latestPlayerRating.detailedRatings.findIndex(
                rating => rating.ratingType === 'OVERALL'
            );

            return json.playerProfile.latestPlayerRating.detailedRatings[ratingsIdx].ratingPoints;
        }
    },
    {
        value:'inside-50',
        label:'Inside 50s',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.inside50s; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.inside50s; },
        getCareer: function(json){ return json.playerProfile.careerAverages.inside50s; }
    },
    {
        value:'fantasy-pts',
        label:'AFL Fantasy Points',
        sortBy:'dreamteampoints',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.dreamteamPoints; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.dreamteamPoints; },
        getCareer: function(json){ return json.playerProfile.careerAverages.dreamteamPoints; }
    },
    {
        value:'disposal-effiency',
        label:'Disposal Efficiency',
        sortBy:'disposalefficiency',
        isPercent:true,
        getRound: function(json,i){ return json.lists[i].stats.totals.disposalEfficiency; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.disposalEfficiency; },
        getCareer: function(json){ return json.playerProfile.careerAverages.disposalEfficiency; }
    },
    // {
    //     value:'effective-disposals',
    //     label:'Effective Disposals',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.disposalEfficiency; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.disposalEfficiency; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.disposalEfficiency; }
    // },
    {
        value:'contested-marks',
        label:'Contested Marks',
        sortBy:'contestedmarks',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.contestedMarks; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.contestedMarks; },
        getCareer: function(json){ return json.playerProfile.careerAverages.contestedMarks; }
    },
    {
        value:'uncontested-possessions',
        label:'Uncontested Possessions',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.uncontestedPossessions; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.uncontestedPossessions; },
        getCareer: function(json){ return json.playerProfile.careerAverages.uncontestedPossessions; }
    },
    {
        value:'behinds',
        label:'Behinds',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.behinds; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.behinds; },
        getCareer: function(json){ return json.playerProfile.careerAverages.behinds; }
    },
    // {
    //     value:'hitouts-advantage',
    //     label:'Hitouts to Advantage',
    //     getRound: function(json){ return json.lists[i].stats.totals.behinds; },
    //     getSeason: function(json){ return json.lists[i].stats.totals.behinds; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.behinds; }
    // },
    {
        value:'centre-clearances',
        label:'Centre Bounce Clearances',
        sortBy:'centreclearances',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.clearances.centreClearances; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.clearances.centreClearances; },
        getCareer: function(json){ return json.playerProfile.careerAverages.clearances.centreClearances; }
    },
    // {
    //     value:'kick-efficiency',
    //     label:'Kicking Efficiency',
    //     getRound: function(json){ return json.lists[i].stats.totals.behinds; },
    //     getSeason: function(json){ return json.lists[i].stats.totals.behinds; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.behinds; }
    // },
    {
        value:'metres-gained',
        label:'Metres Gained',
        sortBy:'metresgained',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.metresGained; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.metresGained; },
        getCareer: function(json){ return json.playerProfile.careerAverages.metresGained; }
    },
    // {
    //     value:'pressure-acts',
    //     label:'Pressure Acts',
    //     getRound: function(json){ return json.lists[i].stats.totals.metresGained; },
    //     getSeason: function(json){ return json.lists[i].stats.totals.metresGained; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.metresGained; }
    // },
    {
        value:'rebounds50s',
        label:'Rebound 50s',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.rebound50s; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.rebound50s; },
        getCareer: function(json){ return json.playerProfile.careerAverages.rebound50s; }
    },
    {
        value:'goal-assists',
        label:'Goal Assists',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.goalAssists; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.goalAssists; },
        getCareer: function(json){ return json.playerProfile.careerAverages.goalAssists; }
    },
    {
        value:'score-involvements',
        label:'Score Involvements',
        sortBy:'scoreinvolvements',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.scoreInvolvements; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.scoreInvolvements; },
        getCareer: function(json){ return json.playerProfile.careerAverages.scoreInvolvements; }
    },
    {
        value:'shots-at-goal',
        label:'Shots at Goal',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.shotsAtGoal; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.shotsAtGoal; },
        getCareer: function(json){ return json.playerProfile.careerAverages.shotsAtGoal; }
    },
    {
        value:'fwd50-marks',
        label:'Forward 50 Marks',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
        getCareer: function(json){ return json.playerProfile.careerAverages.marksInside50; }
    },
    // {
    //     value:'hitout-win-perc',
    //     label:'Hitout Win Percentage',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.marksInside50; }
    // },
    // {
    //     value:'spoils',
    //     label:'Spoils',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.marksInside50; }
    // },
    // {
    //     value:'shot-at-goal-perc',
    //     label:'Shot at Goal Percentage',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.marksInside50; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.marksInside50; }
    // },
    {
        value:'bounces',
        label:'Bounces',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.bounces; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.bounces; },
        getCareer: function(json){ return json.playerProfile.careerAverages.bounces; }
    },
    {
        value:'clangers',
        label:'Clangers',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.clangers; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.clangers; },
        getCareer: function(json){ return json.playerProfile.careerAverages.clangers; }
    },
    {
        value:'frees-against',
        label:'Frees Against',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.freesAgainst; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.freesAgainst; },
        getCareer: function(json){ return json.playerProfile.careerAverages.freesAgainst; }
    },
    {
        value:'frees-for',
        label:'Frees For',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.freesFor; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.freesFor; },
        getCareer: function(json){ return json.playerProfile.careerAverages.freesFor; }
    },
    {
        value:'goal-accuracy',
        label:'Goal Accuracy',
        isPercent:true,
        getRound: function(json,i){ return json.lists[i].stats.totals.goalAccuracy; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.goalAccuracy; },
        getCareer: function(json){ return json.playerProfile.careerAverages.goalAccuracy; }
    },
    {
        value:'one-percenters',
        label:'One Percenters',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.onePercenters; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.onePercenters; },
        getCareer: function(json){ return json.playerProfile.careerAverages.onePercenters; }
    },
    {
        value:'stoppage-clearances',
        label:'Stoppage Clearances',
        sortBy:'stoppageclearances',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.clearances.stoppageClearances; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.clearances.stoppageClearances; },
        getCareer: function(json){ return json.playerProfile.careerAverages.clearances.stoppageClearances; }
    },
    // {
    //     value:'time-on-ground-perc',
    //     label:'Time on Ground Percentage',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.timeonground; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.timeonground; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.timeonground; }
    // },
    {
        value:'turnovers',
        label:'Turnovers',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.turnovers; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.turnovers; },
        getCareer: function(json){ return json.playerProfile.careerAverages.turnovers; }
    },
    {
        value:'fwd-50-tackles',
        label:'Forward 50 Tackles',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.tacklesInside50; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.tacklesInside50; },
        getCareer: function(json){ return json.playerProfile.careerAverages.tacklesInside50; }
    },
    {
        value:'intercepts',
        label:'Intercepts',
        sortBy:'intercepts',
        isPercent:false,
        getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
        getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
        getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    }
    // {
    //     value:'hitout-to-adv-rate',
    //     label:'Hitout to Advantage Rate',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'def-1-on-1-contests-loss-perc',
    //     label:'Defensive 1 on 1 Contest Lose Percentage',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'def-1-on-1-contest-losses',
    //     label:'Defensive 1 on 1 Contest Losses',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'score-launches',
    //     label:'Score Launches',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'def-1-on-1-contests',
    //     label:'Defensive 1 on 1 Contests',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'effective-kicks',
    //     label:'Effective Kicks',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'kick-to-handball-ratio',
    //     label:'Kick:Handball Ratio',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'def-half-pressure-acts',
    //     label:'Defensive Half Pressure Acts',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'marks-from-opp',
    //     label:'Marks from Opposition',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'contested-poss-rate',
    //     label:'Contested Possession Rate',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'possession-gains',
    //     label:'Possession Gains',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'marks-on-lead',
    //     label:'Marks on Lead',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'ground-ball-gets',
    //     label:'Ground Ball Gets',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'fwd-50-ground-ball-gets',
    //     label:'Forward 50 Ground Ball Gets',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // },
    // {
    //     value:'ruck-contests',
    //     label:'Ruck Contests',
    //     getRound: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getSeason: function(json,i){ return json.lists[i].stats.totals.intercepts; },
    //     getCareer: function(json){ return json.playerProfile.careerAverages.intercepts; }
    // }

]