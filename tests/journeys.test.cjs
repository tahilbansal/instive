const { test } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { create, act } = require('react-test-renderer');
const load = require('./load-ts.cjs');
const Assessment = load('app/assessment/Assessment.tsx').default;
const { industries, availableWorkflows, workflows } = load('lib/assessment/config.ts');
global.window = { scrollTo() {}, dispatchEvent() {}, print() {} };
const text = node => typeof node === 'string' ? node : Array.isArray(node) ? node.map(text).join('') : node?.children ? node.children.map(text).join('') : '';
function ui() {
  let view; act(() => { view = create(React.createElement(Assessment)); });
  return { view, click(label) { const target = view.root.findAllByType('button').find(n => text(n.children[0]) === label) || view.root.findAllByType('button').find(n => text(n).includes(label)); assert.ok(target, `Button ${label} exists`); act(() => target.props.onClick()); }, field(label, value) { const parent = view.root.findAllByType('label').find(n => text(n).startsWith(label)); assert.ok(parent, `Field ${label} exists`); const input = parent.findAll(n => n.type === 'input' || n.type === 'select')[0]; act(() => input.props.onChange({ target: { value } })); }, next() { const form = view.root.findAllByType('form')[0]; act(() => form.props.onSubmit({ preventDefault() {} })); }, content() { return text(view.toJSON()); } };
}
function context(u, industry, role = 'Operations leader') { u.click('Find my opportunity'); u.click(role); u.click(industry); u.field(role === 'Independent consultant' ? 'Client’s operations team size' : 'Your operations team size', '11–50'); u.next(); }
function workload(u, workflow, hours = 20) { u.click(workflows[workflow].title); u.click(workflows[workflow].options[0]); u.click('Email'); u.click('ERP'); u.next(); u.click('I know total weekly hours'); u.field('Combined staff hours per week', String(hours)); u.next(); u.click('Delays'); u.click('Ready this quarter'); u.click('A small pilot with an owner'); u.next(); }
test('all industry-specific branches complete with tailored results and no email gate', () => { for (const industry of industries) for (const workflow of availableWorkflows(industry)) { const u = ui(); context(u, industry); workload(u, workflow); assert.match(u.content(), /Your opportunity, in focus/); assert.ok(u.content().includes(workflows[workflow].risk)); assert.match(u.content(), /Add a labor rate to calculate/); assert.equal(u.view.root.findAll(n => n.type === 'input' && n.props.type === 'email').length, 0); act(() => u.view.unmount()); } });
test('consultant journey adapts language and offers partnership only on voluntary request', () => { const u = ui(); context(u, 'Carrier / fleet', 'Independent consultant'); workload(u, 'compliance'); assert.match(u.content(), /CLIENT ASSESSMENT/); u.click('Request a workflow review'); assert.match(u.content(), /technical implementation partnership/); assert.equal(u.view.root.findByProps({ name: 'consent' }).props.required, true); });
test('required answers and invalid numbers block progression', () => { const u = ui(); u.click('Find my opportunity'); u.next(); assert.match(u.content(), /Select your role/); u.click('COO'); u.click('Distribution'); u.field('Your operations team size', '1–10'); u.next(); u.click('Order entry & handoffs'); u.click('Email and attachments'); u.click('Email'); u.next(); u.field('orders per week', '-2'); u.field('Total staff minutes per task', '5'); u.next(); assert.match(u.content(), /Weekly tasks must be between/); });
test('zero workload exposes low value; editing assumptions recalculates and handles empty values', () => { const u = ui(); context(u, 'Distribution'); workload(u, 'orders', 0); assert.match(u.content(), /Limited capacity benefit/); u.field('Additional oversight', '0'); assert.match(u.content(), /0 hours of human work remain/); u.field('Tasks suitable', ''); assert.match(u.content(), /Suitable share must be between/); u.field('Tasks suitable', '60'); assert.match(u.content(), /0 hours of human work remain/); });
test('changing business type clears stale workflow and presents relevant branches', () => { const u = ui(); context(u, 'Carrier / fleet'); workload(u, 'compliance'); u.click('Edit answers'); u.click('Distribution'); u.next(); assert.ok(!u.content().includes('Fleet compliance')); u.next(); assert.match(u.content(), /Choose a bottleneck/); });
test('voluntary inquiry shows truthful failure and success feedback', async () => { const u = ui(); context(u, 'Freight forwarding'); workload(u, 'documents'); u.click('Request a workflow review'); const originalForm = global.FormData; const originalFetch = global.fetch; global.FormData = class { get(key) { return { name: 'Test', email: 'test@example.com', company: 'Test', consent: 'on', website: '' }[key]; } }; try { global.fetch = async () => ({ ok: false }); await act(async () => { await u.view.root.findAllByType('form')[0].props.onSubmit({ preventDefault() {}, currentTarget: {} }); }); assert.match(u.content(), /could not save your request/); global.fetch = async () => ({ ok: true }); await act(async () => { await u.view.root.findAllByType('form')[0].props.onSubmit({ preventDefault() {}, currentTarget: {} }); }); assert.match(u.content(), /Your request has been saved/); } finally { global.FormData = originalForm; global.fetch = originalFetch; } });
test('custom answers and name carry through results and follow-up', () => {
  const u = ui(); u.click('Find my opportunity'); u.field('Your name (optional)', 'Alex Rivera');
  const otherIn = legend => { const group = u.view.root.findAllByType('fieldset').find(n => text(n.findByType('legend')).includes(legend)); const button = group.findAllByType('button').find(n => text(n.children[0]) === 'Other'); act(() => button.props.onClick()); };
  otherIn('Which best describes'); u.field('Describe your role', 'Process specialist');
  otherIn('What kind of business'); u.field('Describe your business type', 'Cold chain operator'); u.field('Your operations team size', '11–50'); u.next();
  u.click('Freight documentation'); otherIn('Which documents'); u.field('Describe the manual step', 'Temperature records');
  otherIn('Which systems'); u.field('Name your other systems', 'ColdTrack'); u.next();
  u.click('I know total weekly hours'); u.field('Combined staff hours per week', '20'); u.next();
  otherIn('What does this manual work cause'); u.field('Describe the impact', 'Lost traceability'); u.click('Ready this quarter'); u.click('Discovery with the team'); u.next();
  for (const answer of ['Alex Rivera', 'Process specialist', 'Cold chain operator', 'Temperature records', 'ColdTrack', 'Lost traceability']) assert.ok(u.content().includes(answer), answer);
  u.click('Request a workflow review'); assert.equal(u.view.root.findByProps({ name: 'name' }).props.defaultValue, 'Alex Rivera');
});
test('sliders synchronize numerical inputs and selected scenario without changing other scenarios', () => {
  const u = ui(); context(u, 'Distribution'); workload(u, 'orders');
  const slider = u.view.root.findByProps({ 'aria-label': 'Tasks suitable for automation slider' });
  act(() => slider.props.onChange({ target: { value: '90' } }));
  const group = u.view.root.findAllByType('label').find(n => text(n).startsWith('Tasks suitable for automation'));
  assert.equal(group.findAllByType('input')[0].props.value, 90);
  assert.match(u.content(), /8.8 hours of human work remain/);
  u.click('Conservative'); assert.equal(u.view.root.findByProps({ 'aria-label': 'Tasks suitable for automation slider' }).props.value, 40);
  u.click('Moderate'); assert.equal(u.view.root.findByProps({ 'aria-label': 'Tasks suitable for automation slider' }).props.value, 90);
});
test('Other requires a nonempty description and ignores it once deselected', () => {
  const u = ui(); u.click('Find my opportunity'); u.click('Other'); u.field('Describe your role', '   '); u.click('Distribution'); u.field('Your operations team size', '1–10'); u.next(); assert.match(u.content(), /Select your role/);
  u.click('COO'); u.next(); assert.match(u.content(), /Where does work get stuck/);
});
