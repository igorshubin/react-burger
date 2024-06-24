import {UAParser} from 'ua-parser-js';

const parser = new UAParser();

export const isIos = () => parser.getOS().name === 'iOS';

export const isMobileDevice = () => parser.getDevice().type === 'mobile';

export const isTabletDevice = () => parser.getDevice().type === 'tablet';

