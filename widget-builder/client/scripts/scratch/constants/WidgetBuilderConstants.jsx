export const WIDGET_TYPES = [
    {
        id: 'single-widget',
        label: 'Single',
        noOfStats: [
            {value: 'one-stat', label: "1", stats: 1},
            {value: 'two-stat', label: "2", stats: 2},
            {value: 'three-stat', label: "3", stats: 3},
            {value: 'six-stat', label: "6", stats: 6}
        ],
        defaultCaption: "Check out more of [select player]'s stats in StatsPro!",
        timeframes:[
            {value:'round', label: 'Round', roundSelectDisabled: false},
            {value:'season', label: 'Season', roundSelectDisabled: true},
            {value:'career', label: 'Career', roundSelectDisabled: true}
        ]

    },
    {
        id: 'comparison-widget',
        label: 'Comparison',
        noOfStats: [
            {value: 'one-stat', label: "1", stats: 1},
            {value: 'two-stat', label: "2", stats: 2},
            {value: 'three-stat', label: "3", stats: 3}
        ],
        defaultCaption: "Compare more players and stats in StatsPro!",
        timeframes:[
            {value:'round', label: 'Round', roundSelectDisabled: false},
            {value:'season', label: 'Season', roundSelectDisabled: true},
            {value:'career', label: 'Career', roundSelectDisabled: true}
        ]
    },
    {
        id: 'leaderboard-widget',
        label: 'Top X',
        noOfStats:[{value: 'one-stat', label: "1"}],
        defaultCaption: "See how the rest of the competition compares in StatsPro!",
        timeframes:[
            {value:'round', label: 'Round', roundSelectDisabled: false},
            {value:'season', label: 'Season', roundSelectDisabled: true}
        ]
    }
];

export const LEADERBOARD_MAX=25;

export const MIS_API_URL = "https://api.afl.build001.testafl.com/cfs/afl/";

// export const WIDGET_TIMEFRAMES = [
//     {value:'round', label: 'Round', roundSelectDisabled: false},
//     {value:'season', label: 'Season', roundSelectDisabled: true},
//     {value:'career', label: 'Career', roundSelectDisabled: true}
// ];

export const CALL_TO_ACTIONS = [
    {value:'discover', label: 'Discover StatsPro'},
    {value:'watch', label: 'Watch in StatsPro'}
];

export const GENERATE_WIDGET_TEXT = "Generate"
export const SHOW_HTML_CODE_TEXT = "Show HTML Code"
export const SHOW_PREVIEW_TEXT = "Show Graphic Preview"
export const COPY_HTML_TEXT = "Copy HTML Static"
export const COPY_DYNAMIC_TEXT = "Copy HTML Dynamic"

// export const MIS_TOK_STG = "46063f7e38be6fa8310d671d0cf0bae2"
export const getMISToken = function(callback) {

    fetch(MIS_API_URL + 'WMCTok', {
        method: "POST",
    }).then((response) =>
        response.json()
    ).then((json) => {
        callback(json.token);
    })



    // return "46063f7e38be6fa8310d671d0cf0bae2";
}


