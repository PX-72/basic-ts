import { build, append, toggleVisibility } from './utils/dom-helper.js';

const CONTAINER_STYLE = {
    margin: '0.8rem',
    borderTop: '1px solid #336',
    paddingTop: '0.4rem'
};

const SUM_CONTAINER_STYLE = {
    display: 'flex'
};

const BUTTON_STYLE = {
    marginLeft: '0.5rem',
    cursor: 'pointer',
    dispay: 'inline-block'
};

const INPUT_STYLE = {
    marginLeft: '0.5rem',
    width: '3rem',
    dispay: 'inline-block'
};

const TEXT_BLOCK_STYLE = {
    marginLeft: '0.5rem'
};

export const createPosition = (positionData, posQtyChanged) => {
    const { positionId, insightId, quantity } = positionData;

    const qtyText = build('span', { 
        text: quantity, 
        style: TEXT_BLOCK_STYLE 
    });

    const qtyInput = build('input', {
        attributes: { value: quantity, type: 'text' }, 
        style: INPUT_STYLE, 
        visible: false, 
        eventType: 'input', 
        eventCallback: () => {
            if (!Number.isFinite(Number(qtyInput.value))) {
                qtyInput.value = qtyText.innerText;
                return;
            }

            qtyText.innerText = qtyInput.value || '0';
        } 
    });

    const editButton = build('button', {
        text: 'edit', 
        style: BUTTON_STYLE, 
        eventType: 'click', 
        eventCallback: () => {
            toggleVisibility([editButton, saveButton, qtyText, qtyInput], 'inline-block');
            qtyInput.value = qtyText.innerText;
        } 
    });

    const saveButton = build('button', {
        text: 'save', 
        visible: false, 
        style: BUTTON_STYLE, 
        eventType: 'click', 
        eventCallback: () => {
            toggleVisibility([editButton, saveButton, qtyText, qtyInput], 'inline-block');
            posQtyChanged(positionId, Number(qtyInput.value));
        }
    });

    return append(
        build('div', { style: CONTAINER_STYLE }),
        build('p', { text: `Position ID: ${positionId}` }),
        build('p', { text: `Insight ID: ${insightId}` }),
        build('div', { style: SUM_CONTAINER_STYLE }),
        build('span', { text: 'Quantity: ' }),
        qtyText,
        qtyInput,
        editButton,
        saveButton
    );
};
