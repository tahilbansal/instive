const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculate, scenarios } = require('../lib/assessment/engine');
const base = { mode: 'tasks', volume: 100, minutes: 12, weeks: 48, rate: 30, implementation: 1000, ongoing: 50 };
const approx = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
test('accounts for ineligible work, exceptions, review and oversight without overlap', () => { const r = calculate(base, scenarios[1]); approx(r.weekly, 20); approx(r.remaining, 12.16); approx(r.recovered, 7.84); approx(r.annual, 960); approx(r.value, 11289.6); approx(r.payback, 1000 / ((11289.6 - 600) / 12)); });
test('direct hours ignores unused task volume; same baseline gives same result', () => { assert.deepEqual(calculate({ ...base, mode: 'hours', hours: 20, volume: 'invalid' }, scenarios[1]), calculate(base, scenarios[1])); });
test('zero workload preserves added oversight, never invents benefit', () => { const r = calculate({ ...base, volume: 0 }, scenarios[1]); assert.equal(r.recovered, -1); assert.equal(r.payback, null); });
test('no suitability, complete review, and complete exceptions retain baseline', () => { for (const a of [{ suitable: 0 }, { review: 100 }, { exceptions: 100 }]) approx(calculate(base, { ...scenarios[1], ...a, oversight: 0 }).recovered, 0); });
test('complete automation without review/exception/oversight recovers baseline', () => { approx(calculate(base, { suitable: 100, review: 0, exceptions: 0, oversight: 0 }).recovered, 20); });
test('blank labor rate suppresses money and payback; known zero costs allowed', () => { const r = calculate({ ...base, rate: '' }, scenarios[1]); assert.equal(r.value, null); assert.equal(r.payback, null); assert.equal(calculate({ ...base, implementation: 0, ongoing: 0 }, scenarios[1]).payback, 0); });
test('payback suppressed when any cost missing or net benefit not positive', () => { for (const change of [{ implementation: '' }, { ongoing: '' }, { ongoing: 100000 }]) assert.equal(calculate({ ...base, ...change }, scenarios[1]).payback, null); });
test('invalid numerical inputs are rejected', () => { for (const [key, values] of Object.entries({ volume: [-1, '', Infinity, NaN, 10000001], minutes: [0, -1, 'abc'], weeks: [0, 53], rate: [-1, Infinity], ongoing: [-1], implementation: [-1] })) for (const v of values) assert.throws(() => calculate({ ...base, [key]: v }, scenarios[1])); for (const key of ['suitable', 'review', 'exceptions']) for (const value of [-1, 101, NaN, '']) assert.throws(() => calculate(base, { ...scenarios[1], [key]: value })); });
test('default scenarios are ordered and recoverable + remaining equals baseline', () => { const rs = scenarios.map(s => calculate(base, s)); assert.ok(rs[0].recovered < rs[1].recovered && rs[1].recovered < rs[2].recovered); for (const r of rs) approx(r.recovered + r.remaining, r.weekly); });
test('illustrative rate is explicit, currency-specific, and overridden by a supplied zero or other rate', () => {
  const input = { ...base, rate: '', useAssumedRate: true, currency: 'USD' };
  const r = calculate(input, scenarios[1]); assert.equal(r.rate, 30); assert.equal(r.rateAssumed, true); approx(r.value, 11289.6);
  assert.equal(calculate({ ...input, currency: 'INR' }, scenarios[1]).rate, 500);
  for (const rate of [0, 55]) { const supplied = calculate({ ...input, rate }, scenarios[1]); assert.equal(supplied.rate, rate); assert.equal(supplied.rateAssumed, false); }
  assert.equal(calculate({ ...input, useAssumedRate: false }, scenarios[1]).value, null);
  assert.throws(() => calculate({ ...input, currency: 'UNKNOWN' }, scenarios[1]));
});
