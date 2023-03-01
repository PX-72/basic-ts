import { createPositionList } from './position-list.js';
import { build, append } from './utils/dom-helper.js';

const SUM_STYLE = {
    fontWeight: 'bold',
    color: 'red'
};

const sum = (quantities = []) => quantities.reduce((sum, qty) => sum + qty, 0);

const updateQtySum = (sumElement, positions, posId, newQty) => {
    const position = positions.find(({ positionId }) => positionId === posId);
    if (position) {
        position.quantity = newQty;
        sumElement.innerText = sum(positions.map(p => p.quantity))?.toString();
    }
};

export const createPortfolio = ({ code, currency, positions = [] }) => {

    const sumElement = build('span', { text: sum(positions.map(p => p.quantity)), style: SUM_STYLE });

    return append(
        build('div'),
        build('p', { text: `Portfolio code: ${code}` }),
        build('p', { text: `Portfolio CCY: ${currency}` }),
        append(
            build('p', { text: 'Position qty total: ' }),
            sumElement
        ),
        createPositionList(positions, 
            (posId, newQty) => updateQtySum(sumElement, positions, posId, newQty))
    );
};
