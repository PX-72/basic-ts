import { createPortfolio } from './portfolio.js';
import { build, append } from './utils/dom-helper.js';

export const createContext = contextData => append(
    build('div'),
    build('p', { text: `Context ID: ${contextData.id}` }),
    build('p', { text: `Definition: ${contextData.definition}` }),
    build('p', { text: `Risk Default: ${contextData.isRiskDefault}` }),
    createPortfolio(contextData.portfolio)
);
