export default function formatBalance({ str = '', decimals = 0 }) {
  if (!str) {
    return '';
  }

  function applyCommasToNumber(s) {
    return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const [int, float] = Number(str).toString().split('.');
  const roundToFixed = float && float.length > decimals;

  switch (true) {
    case (!float):
    default:
      return `${applyCommasToNumber(int)}`;
    case (decimals && roundToFixed):
      return `${applyCommasToNumber(int)}.${float.slice(0, decimals)}`;
    case (decimals && !roundToFixed):
      return `${applyCommasToNumber(int)}.${float}`;
  }
}
