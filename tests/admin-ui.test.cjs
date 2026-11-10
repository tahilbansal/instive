const {test}=require('node:test');const assert=require('node:assert/strict');const React=require('react');const {create,act}=require('react-test-renderer');const load=require('./load-ts.cjs');
const Admin=load('app/admin/assessments/ReportsAdmin.tsx').default;
const text=n=>typeof n==='string'?n:Array.isArray(n)?n.map(text).join(''):n?.children?n.children.map(text).join(''):'';
test('admin login, report list, full question detail, and logout journey',async()=>{
 const originalFetch=global.fetch,originalForm=global.FormData;global.window={scrollTo(){}};let loggedIn=false;
 const row={_id:require('./report-fixture.cjs')().id,generatedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),report:load('lib/assessment/report.ts').buildReport(require('./report-fixture.cjs')())};
 global.FormData=class{get(){return 'mock-password';}};
 global.fetch=async(url,options)=>{
  if(url==='/admin/assessments/session'){loggedIn=options.method==='POST';return{ok:true,json:async()=>({ok:true})};}
  if(!loggedIn)return{status:401,ok:false};
  return{ok:true,status:200,json:async()=>url.includes('?id=')?{report:row}:{reports:[row],total:1,page:1}};
 };
 let view;
 try {
  await act(async()=>{view=create(React.createElement(Admin));});assert.match(text(view.toJSON()),/Sign in to view reports/);assert.ok(!text(view.toJSON()).includes('Alex Rivera'));
  await act(async()=>{await view.root.findByType('form').props.onSubmit({preventDefault(){},currentTarget:{reset(){}}});});assert.match(text(view.toJSON()),/1 saved assessments/);assert.match(text(view.toJSON()),/Alex Rivera/);
  await act(async()=>{await view.root.findAllByType('button').find(n=>text(n)==='View answers').props.onClick();});assert.match(text(view.toJSON()),/Every question and answer/);assert.match(text(view.toJSON()),/Hourly labor cost/);assert.match(text(view.toJSON()),/illustrative assumption/);
  await act(async()=>{await view.root.findAllByType('button').find(n=>text(n)==='Sign out').props.onClick();});assert.match(text(view.toJSON()),/Sign in to view reports/);assert.ok(!text(view.toJSON()).includes('Alex Rivera'));
 }finally{if(view)act(()=>view.unmount());global.fetch=originalFetch;global.FormData=originalForm;}
});
