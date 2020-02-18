export const ballBlue = `hsl(195, 77%, 30%)`;
export const lighterBallBlue = `hsl(195, 77%, 90%)`;
export const lightestBallBlue = `hsl(195, 77%, 95%)`;
export const modalBackground = `hsla(195, 77%, 40%, 0.6)`;
export const primary = [
  ballBlue,
  lighterBallBlue,
  lightestBallBlue,
  modalBackground,
];
export const secondary = [ballBlue, lighterBallBlue, lightestBallBlue];

export default (colourIndex, importance = 0) =>
  colourIndex === 0 ? primary[importance] : secondary[importance];
