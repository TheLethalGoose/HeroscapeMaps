type IconColorMap = {
    [key: string]: {
        id: number,
        icon: string,
        color: string,
        tooltip: string
    }
};
export const iconsAndColors: IconColorMap = {
    'RV': {id: 1, icon: 'hand-fist', color: '#ff8e50', tooltip: 'Rise of the Valkyrie'},
    'SM': {id: 2, icon: 'biohazard', color: '#286b28', tooltip: 'Swarm of the Marro'},
    'BU': {id: 3, icon: 'dungeon', color: '#0071be', tooltip: 'Battle for the Underdark'},
    'MV': {id: 4, icon: 'mask', color: '#ff009a', tooltip: 'The Conflict Begins'},

    'RF': {id: 5, icon: 'tree', color: '#418f41', tooltip: 'Road to the Forgotten Forest'},
    'VW': {id: 6, icon: 'volcano', color: '#ff3737', tooltip: 'Volcarren Wasteland'},
    'TT': {id: 7, icon: 'icicles', color: '#96c8ff', tooltip: 'Thaelenk Tundra'},
    'TJ': {id: 8, icon: 'fa-brands fa-pagelines', color: '#74ff5e', tooltip: 'Ticalla Jungle'},
    'FA': {id: 9, icon: 'fa-brands fa-fort-awesome', color: '#9b9b9b', tooltip: 'Fortress of the Archkyrie'},

    '1P': {id: 10, icon: 'dice-one', color: '#e1e1e1', tooltip: '1 Player Scenarios'},
    '2P': {id: 11, icon: 'dice-two', color: '#e1e1e1', tooltip: '2 Player Scenarios'},
    '3P': {id: 12, icon: 'dice-three', color: '#e1e1e1', tooltip: '3 Player Scenarios'},
    '4P': {id: 13, icon: 'dice-four', color: '#e1e1e1', tooltip: '4 Player Scenarios'},
    '5P': {id: 14, icon: 'dice-five', color: '#e1e1e1', tooltip: '5 Player Scenarios'},
};