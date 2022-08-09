import compile from './redonkulizer.js'

let code = `console.log("Hello world!")`

let compiled = compile(code);

eval(compiled);

debugger;