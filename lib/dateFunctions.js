export const formatDate = timestamp => {
  const date = new Date(timestamp);
  const m = date.getMinutes();
  const h = date.getHours();
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();
  return `${h}:${m} ${dd < 10 ? 0 : ''}${dd}/${mm < 10 ? 0 : ''}${mm +
    1}/${yyyy}`;
};
