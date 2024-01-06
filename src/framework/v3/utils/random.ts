const randomInteger = ({ max = 10, min = 0 } = {}) =>
  min < max ? Math.floor(Math.random() * (max - min)) + min : -1;

export const randomId = () => randomInteger({ max: 1e6, min: 1 }).toString();
