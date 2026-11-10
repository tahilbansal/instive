const ts = require('typescript');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function load(file, overrides = {}) {
  const filename = path.resolve(root, file);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = new Module(filename, module); mod.filename = filename; mod.paths = module.paths;
  const original = mod.require.bind(mod);
  mod.require = id => { if (id in overrides) return overrides[id]; if (id.endsWith('.css')) return {}; if (id.startsWith('.')) { const target = path.resolve(path.dirname(filename), id); if (fs.existsSync(target + '.ts')) return load(target + '.ts', overrides); } if (id.startsWith('@/')) { const target = id.slice(2); return fs.existsSync(path.join(root, target + '.ts')) ? load(target + '.ts', overrides) : original(path.join(root, target)); } return original(id); };
  mod._compile(source, filename); return mod.exports;
}
module.exports = load;
