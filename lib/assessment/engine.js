/** All estimates are planning assumptions, not measured industry benchmarks. */
const scenarios = [
  { name: 'Conservative', suitable: 40, review: 30, exceptions: 20, oversight: 2 },
  { name: 'Moderate', suitable: 65, review: 20, exceptions: 15, oversight: 1 },
  { name: 'Optimistic', suitable: 80, review: 10, exceptions: 10, oversight: 0.5 },
];
function number(value, label, min, max) {
  if (value === '' || value === null || typeof value === 'boolean' || !Number.isFinite(Number(value)) || Number(value) < min || Number(value) > max) throw new Error(`${label} must be between ${min} and ${max}.`);
  return Number(value);
}
function calculate(input, assumption) {
  const weeks = number(input.weeks, 'Working weeks', 1, 52);
  if (!['tasks', 'hours'].includes(input.mode)) throw new Error('Choose a workload input method.');
  const weekly = input.mode === 'hours' ? number(input.hours, 'Weekly hours', 0, 1000000) : number(input.volume, 'Weekly tasks', 0, 10000000) * number(input.minutes, 'Minutes per task', 0.01, 10080) / 60;
  const suitable = number(assumption.suitable, 'Suitable share', 0, 100) / 100;
  const review = number(assumption.review, 'Review share', 0, 100) / 100;
  const exceptions = number(assumption.exceptions, 'Exception share', 0, 100) / 100;
  const oversight = number(assumption.oversight, 'Weekly oversight', 0, 1000000);
  // Exceptions retain full original effort; review applies only to successful eligible tasks.
  const remaining = weekly * (1 - suitable) + weekly * suitable * exceptions + weekly * suitable * (1 - exceptions) * review + oversight;
  const recovered = weekly - remaining;
  const rate = input.rate === '' || input.rate == null ? null : number(input.rate, 'Hourly labor cost', 0, 100000);
  const value = rate === null ? null : recovered * weeks * rate;
  const implementation = input.implementation === '' || input.implementation == null ? null : number(input.implementation, 'Implementation cost', 0, 1000000000);
  const ongoing = input.ongoing === '' || input.ongoing == null ? null : number(input.ongoing, 'Monthly ongoing cost', 0, 100000000);
  const net = value === null || ongoing === null ? null : value - ongoing * 12;
  return { weekly, annual: weekly * weeks, remaining, recovered, annualRecovered: recovered * weeks, value, net, payback: implementation !== null && net !== null && net > 0 ? implementation / (net / 12) : null };
}
module.exports = { scenarios, calculate, number };
