function evalOperations(str, vars, ops) {
    function isLetter(c) {
        return /[a-zA-Z0-9]+/.test(c);
    }
    function isSpace(c) {
        return /\s/.test(c);
    }
    var buf = new Array();
    var opbuf = new Array();
    function clearStack(prior) {
        while (opbuf.length > 0 && opbuf[opbuf.length - 1].prior >= prior) {
            var op = opbuf.pop();
            var rhs = buf.pop();
            var lhs = buf.pop();
            lhs = op.op(lhs, rhs);
            buf.push(lhs);
        }
    }
    var eqpos = -1;
    for (var i = 0; i < str.length; ++i)
        if (str.charAt(i) === '=')
        {
            eqpos = i;
            break;
        }
    var resname = '';
    for (var i = 0; i < eqpos; ++i)
        if (!isSpace(str.charAt(i))) {
            resname += str.charAt(i);
        }

    var permitOp = false;
    for (var i = eqpos + 1; i < str.length; ++i) {
        if (isSpace(str.charAt(i))) {
            continue;
        }
        if (str.charAt(i) == '(') {
            if (permitOp)
                return undefined;
            opbuf.push({'prior': -10});
            continue;
        }
        if (str.charAt(i) == ')') {
            if (!permitOp)
                return undefined;
            clearStack(-9);
            if (opbuf.length == 0) {
                return undefined;
            }
            opbuf.pop();
            continue;
        }
        if (isLetter(str.charAt(i))) {
            if (permitOp)
                return undefined;
            var name = '';
            while (i < str.length && isLetter(str.charAt(i))) {
                name += str.charAt(i);
                ++i;
            }
            --i;
            if (vars[name] === undefined)
                return undefined;
            buf.push(vars[name]);
            permitOp = true;
            continue;
        }
        if (ops[str.charAt(i)]) {
            if (!permitOp)
                return undefined;
            clearStack(ops[str.charAt(i)].prior);
            opbuf.push(ops[str.charAt(i)]);
            permitOp = false;
            continue;
        }
        return undefined;
    }
    if (!permitOp)
        return undefined;
    clearStack(0);
    if (buf.length != 1 || opbuf.length != 0)
        return undefined;
    if (resname) {
        vars[resname] = buf[0];
    }
    return buf[0];
};

//var ops = {
//    '+': {op: function(a, b) {return a + b}, prior: 0},
//    '*': {op: function(a, b) {return a * b}, prior: 1}
//};
//
//var vars = { a: 12, b: 3, c: 7, asd: 1 };
