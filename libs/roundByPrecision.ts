export default function roundByPrecision(number: number, _precision = 0) {
  const precision = _precision > 3 ? 3 : _precision;
  if (number === 0) {
    return 0;
  }
  return parseFloat(String(number)).toFixed(precision);
}
