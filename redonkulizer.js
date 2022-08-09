const basics = {
    0: "+[]",
    1: "+!![]",
    false: "![]",
    true: "!![]",
    undefined: "[][[]]",
    NaN: "+[![]]"
}

const number = (n) => {
    if (+n === 0) return basics[0];
    if (+n === 1) return basics[1];
    if (n.toString().length === 1) return Array.from({ length: n }, () => basics.true).join("+");
    return "+(" + ([] + n).split("").map(x => `[${number(x)}]`).join("+") + ")";
}

const char = (s, n) => "(" + basics[s] + "+[])" + `[${number(n)}]`;

const letters = {}
letters.f = char(false, 0);
letters.l = char(false, 2);
letters.t = char(true, 0);
letters.e = char(true, 3);
letters.r = char(true, 1);
letters.a = char(false, 1);
letters.u = char(undefined, 0);
letters.n = char(undefined, 1);
letters.s = char(false, 3);
letters.i = char(undefined, 5);

const fromString = (str) => str.split('').map(c => {
    if ("0123456789".includes(c)) {
        return `(${number(c)}+[])`;
    }
    if (letters[c]) {
        return letters[c];
    }
    else {
        return `([]+[])[${fromString("constructor")}][${fromString("fromCharCode")}](${number(c.charCodeAt())})`
    }
}).join("+");

const letterOrdinal = (n) => `(${number(n)})[(${fromString("to")}+([]+[])[${fromString("constructor")}][${fromString("name")}])](${number(n + 1)})`

letters[' '] = `([]+[][${fromString("at")}])[${number(8)}]`;
letters.c = `([]+[][${fromString("at")}])[${number(3)}]`;
letters.o = `([]+[][${fromString("at")}])[${number(25)}]`;
letters.d = `([]+[][${fromString("at")}])[${number(26)}]`;
letters.m = `([]+(+[])[${fromString("constructor")}])[${number(11)}]`

letters.p = letterOrdinal(25);
letters.b = letterOrdinal(11);
letters.h = letterOrdinal(17);
letters.v = letterOrdinal(31);

letters.C = `[][${fromString("at")}][${fromString("constructor")}](${fromString("return escape")})()(([]+[])[${fromString("bold")}]())[${number(2)}]`

letters["{"] = `([]+[][${fromString("at")}])[${number(14)}]`;
letters["}"] = `([]+[][${fromString("at")}])[${number(30)}]`;
letters["("] = `([]+[][${fromString("at")}])[${number(11)}]`;
letters[")"] = `([]+[][${fromString("at")}])[${number(12)}]`;

letters["."] = `([]+(+(${fromString("11e20")})))[${number(1)}]`
letters["+"] = `([]+(+(${fromString("11e20")})))[${number(4)}]`;
letters['"'] = `([]+[])[${fromString("fontcolor")}]()[${number(12)}]`;

const decoder = `function f(t){return('').constructor.fromCharCode(t)}`;
const charEncoder = (n) => `${fromString('f(')}+(${number(n.charCodeAt())})+${fromString(')')}`;

const encoder = (str) => {
    return fromString(decoder)
        + "+"
        + str.split("")
            .map(x => charEncoder(x))
            .join(`+${fromString("+")}+`)
}

const evaluator = (str) => `(${fromString("eval(")})+${str}+${fromString(")")}`
const runner = (str) => `([])[${fromString('at')}][${fromString('constructor')}](${str})()`;

const compile = (code) => {
    let base = encoder(code);
    let baseWithQuotations = fromString('"') + "+" + base + "+" + fromString('"');
    let funcs = evaluator(baseWithQuotations)
    let codeString = evaluator(funcs)
    let executable = runner(codeString)
    return executable;
}

export default compile