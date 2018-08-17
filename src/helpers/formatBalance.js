export default function formatBalance({ str = '', decimals = 0 }) {
  if (!str) {
    return '';
  }

  function applyCommasToNumber(s) {
    return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const [int, float] = Number(str).toString().split('.');
  const roundToFixed = float && float.length > decimals;

  if (decimals) {
    return roundToFixed ?
      `${applyCommasToNumber(int)}.${float.slice(0, decimals)}` :
      `${applyCommasToNumber(int)}.${float}`;
  }

  return `${applyCommasToNumber(str)}.${float}`;
}
