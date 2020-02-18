const scale = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40, 48];
const base = 16;
export default (size = 3) => `${scale[size] * base}px`;
