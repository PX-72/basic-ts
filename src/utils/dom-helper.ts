export const build = (type, options = {}) => {
    const {
        text,
        style = {}, 
        visible = true,
        attributes = {},
        eventType,
        eventCallback
    } = options;

    const element = document.createElement(type);
    if (text) element.innerText = text;

    for (const [key, value] of Object.entries(style)) {
        element.style[key] = value;
    }

    if (!visible) element.style.display = 'none';

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    if (eventType && eventCallback) {
        element.addEventListener(eventType, () => eventCallback(element));
    }

    return element;
};

export const append = (parent, ...children) => {
    for (const childElement of children) parent.appendChild(childElement);
    return parent;
};

export const toggleVisibility = (elements = [], visibleStyle = 'block') => {
    elements.forEach(element => {
        element.style.display = element.style.display === 'none' ? visibleStyle : 'none';
    });
};
