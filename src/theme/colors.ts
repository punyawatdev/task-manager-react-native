export default {
    PRIMARY: '#5356FF',
    PRIMARY_LIGHT: '#EEF5FF',
    SECONDARY: '#378CE7',
    SECONDARY_LIGHT: '#67C6E3',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    BLACK_33: '#333333',
    YELLOW: '#FCBE19',
    RED: '#EE3124',
    GREEN: 'green',
    GRAY: '#D0D3D4',
    TEXT_PRIMARY: '#5356FF',
    TEXT_SECONDARY: '#378CE7',
    TEXT_WHITE: '#FFFFFF',
    TEXT_BLACK: '#000000',
    TEXT_BLACK_33: '#333333',
    TEXT_YELLOW: '#FCBE19',
    TEXT_RED: '#EE3124',
    TEXT_INPUT_BOX: '#8B959F',
    TRANSPARENT: 'transparent',
}

export const blackOpacity = (percent: number): string => {
    return `rgba(0, 0, 0, ${percent / 100})`
}

export const whiteOpacity = (percent: number): string => {
    return `rgba(255, 255, 255, ${percent / 100})`
}
