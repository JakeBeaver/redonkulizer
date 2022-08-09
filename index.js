import './meta-redonkulizer.js'

let code = `console.log("Hello world!")`

let compiled = global.redonkulize(code);

eval(compiled);

debugger;