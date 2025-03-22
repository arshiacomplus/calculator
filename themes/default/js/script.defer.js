
let a=0;
let op=``;
let lastNum=``;
let isSecondFunctionActive = false;
$(`#pad button`).addClass("btn btn-outline-secondary");
$(`.num`).click(function(){
    let num=$(this).html();
    $(`#result`).val($(`#result`).val()+num);
})
$(`#add,#mins,#cross,#div,#mod`).click(function(){
    $(`#result`).val($(`#result`).val()+$(this).html().replace(/x<sup>y<\/sup>/g,`^`).replace(/mod/g,"%"));
    // revResult=reversStr($(`#result`).val())
    // .replace(/[×^÷+-]/g,"||")
    // .slice(2);
    // if (revResult.indexOf("||")>=0){
    //     lastNum=revResult.slice(0,revResult.indexOf("||"));
    // }
    // else
    // {
    //     lastNum=revResult;
    // }
    // lastNum=reversStr(lastNum);
});
$(`#power`).click(() => {
    if (isSecondFunctionActive) {
        yRootSet($(`#result`).val());
    } else {
        $(`#result`).val($(`#result`).val() + '^');
    }
});
$(`#fact`).click(()=>{
    factSet($(`#result`).val());
});
$(`#eq`).click(()=>{
    setResult(getResult($(`#result`).val()));
})
$(`#back-space`).click(()=>{
    let tmep=$(`#result`).val();
    $(`#result`).val(tmep.substr(0,tmep.length-1));
});
$(`#del-all`).click(()=>{
    $(`#result`).val(``);
    a=0;
});
$(`.parents`).click(function(){
    $(`#result`).val($(`#result`).val()+$(this).html());
});
$(`#plus-min`).click(()=>{
    plusMin($(`#result`).val());
})
$(`#abs`).click(()=>{
    absSet($(`#result`).val());
})
$(`#log`).click(()=>{
    if (isSecondFunctionActive)
    {
        logBaseSet($(`#result`).val());
    }
    else
    {
        logSet($(`#result`).val());
    }
})
$('#ln').click(() => {
    if (isSecondFunctionActive) {
        EXSet($('#result').val());
    } else {
        lnSet($('#result').val());
    }
});
$('#sqrt').click(() => {
    if (isSecondFunctionActive) {
        cbrtSet($('#result').val());
    } else {
        sqrtSet($('#result').val());
    }
});

$('#sqr').click(() => {
    if (isSecondFunctionActive) {
        cubeSet($('#result').val());
    } else {
        sqrSet($('#result').val());
    }
});

$(`#tenpower`).click(()=>{
    if (isSecondFunctionActive) {
        twoPowerSet($(`#result`).val());
    }
    else{
        tenPowerSet($(`#result`).val());
    }
    
})
$(`#mathE`).click(()=>{
    $(`#result`).val(mathE($(`#result`).val()));
})
$(`#oneDiv`).click(()=>{
    oneDivSet($(`#result`).val());
})
$(`#mathPI`).click(()=>{
    $(`#result`).val(mathPI($(`#result`).val()));
})
$('#exp').click(() => {
    expSet($('#result').val());
});

$(`#2nd`).click(()=>{
    isSecondFunctionActive = !isSecondFunctionActive;
    newButtons();
})
newButtons = () => {
    const buttons = {
        '#sqr': { first: 'x<sup>2</sup>', second: 'x<sup>3</sup>' },
        '#sqrt': { first: '&#8730;', second: '<sup>3</sup>&#8730;' },
        '#power': { first: 'x<sup>y</sup>', second: '<sup>y</sup>&#8730;x' },
        '#log': { first: 'log', second: 'log<sup>y</sup>x' },
        '#ln': { first: 'Ln', second: 'e<sup>x</sup>' },
        '#tenpower': { first: '10<sup>x</sup>', second: '2<sup>x</sup>' }
    };

    Object.keys(buttons).forEach(selector => {
        $(selector).html(isSecondFunctionActive ? buttons[selector].second : buttons[selector].first);
    });
    if(isSecondFunctionActive) $(`#2nd`).addClass(`active-effect`)
    else $(`#2nd`).removeClass(`active-effect`)
};
reversStr=(str)=>{
    return str.split('').reverse().join('');
}
setResult=(val)=>
{
    try{
        $(`#result`).val(val);
    }
    catch(e){
        $(`#result`).val("Error");
    }
};
getResult=(n)=>
{
    n=n
    .replace(/×/g,`*`)
    .replace(/÷/g,`/`)
    .replace(/\^/g,`**`);
    return Function(`return ${n}`)();
};
checkSet=(n,funcN,rgx,isTwo=false)=>{
    const match = n.match(rgx[0]);
    if (match) {
        const lastNum = match[1];
        const closingParens = match[2] || '';
        let newNum;
        const rgxRegex =rgx[1];
        const rgxMatch = lastNum.match(rgxRegex);

        if (rgxMatch)
        {
            newNum = rgxMatch[1];
        }
        else
        {
            newNum = `${funcN}(` + lastNum + (isTwo ? ",1":"") + ')';
        }

        const totalLength = lastNum.length + closingParens.length;
        const newVal = n.slice(0, -totalLength) + newNum + closingParens;
        setResult(newVal);
    }
}
factSet = (n) => {
    checkSet(n,"fact",[
    /(fact\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
    /fact\((-?\d+\.?\d*)\)/]);
};
fact=(n)=>
{
    if(n==1) return 1;
    else if(n==0) return 0;

    return n*fact(n-1);
};
plusMin = (n) => {
    const match = n.match(/(-?\d+\.?\d*)(\)*)$/);
    if (match) {
        const lastNum = match[1];
        const closingParens = match[2] || '';
        let newNum;
        if (lastNum.startsWith('-'))
        {
            newNum = lastNum.slice(1);
        }
        else
        {
            newNum = '-' + lastNum;
        }
        const totalLength = lastNum.length + closingParens.length;
        const newVal = n.slice(0, -totalLength) + newNum + closingParens;
        setResult(newVal);
    }
};

abs=(res)=>{
    if (res<0){
        res*=-1
    }
    return res;
};
absSet=(n)=>{
    checkSet(n, "abs", [
        /(abs\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /abs\((-?\d+\.?\d*)\)/
    ]);
}
log=(n)=>{
    return Math.log10(n);
}
logSet = (n) => {
    checkSet(n, "log", [
        /(log\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /log\((-?\d+\.?\d*)\)/
    ]);
};

log_base = (num, base) => {
    return new Decimal(num).log(base);
};
logBaseSet = (n) => {
    checkSet(n, "log_base", [
        /(log_base\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /log_base\((-?\d+\.?\d*)\)/
    ],true);
};

lnSet = (n) => {
    checkSet(n,"ln",[
        /(Ln\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /Ln\((-?\d+\.?\d*)\)/]);
};
ln=(n)=>{
    return Math.log(n);
}
sqrtSet = (n) => {
    checkSet(n,"sqrt",[
        /(sqrt\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /sqrt\((-?\d+\.?\d*)\)/]);
};
sqrt=(n)=>{
    return Math.sqrt(n);
}
sqrSet=(n)=>{
    checkSet(n,"sqr",[
        /(sqr\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /sqr\((-?\d+\.?\d*)\)/]);
};
cbrtSet = (n) => {
    checkSet(n, "cbrt", [
        /(cbrt\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /cbrt\((-?\d+\.?\d*)\)/
    ]);
};
cbrt = (n) => {
    return Math.cbrt(n);
};
cubeSet = (n) => {
    checkSet(n, "cube", [
        /(cube\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /cube\((-?\d+\.?\d*)\)/
    ]);
};
cube = (n) => {
    return n ** 3;
};
sqr=(n)=>{
    return n**2;
};
tenPowerSet=(n)=>{
    checkSet(n,"10^",[
        /(-?\d+\.?\d*)(\)*)$/,
        /10\^\((-?\d+\.?\d*)\)/]);
}
twoPowerSet=(n)=>{
    checkSet(n,"2^",[
        /(-?\d+\.?\d*)(\)*)$/,
        /2\^\((-?\d+\.?\d*)\)/]);
}
mathE=(n)=>{
    return n+Math.E;
}
oneDivSet=(n)=>{
    checkSet(n,"1/",[
        /(-?\d+\.?\d*)(\)*)$/,
        /1\/\((-?\d+\.?\d*)\)/]);
};
mathPI=(n)=>{
    return n+Math.PI;
}
expSet = (n) => {
    checkSet(n, "exp", [
        /(exp\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /exp\((-?\d+\.?\d*)\)/
    ]);
};
exp = (n) => {
    return `${n}e+0`;
};
EXSet=(n)=>{
    checkSet(n, "EX", [
        /(EX\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /EX\((-?\d+\.?\d*)\)/
    ]);
}
EX=(n)=>{
    return new Decimal(n).exp();
}
yRootSet = (n) => {
    checkSet(n, "yroot", [
        /(yroot\(-?\d+\.?\d*\)|-?\d+\.?\d*)(\)*)$/,
        /yroot\((-?\d+\.?\d*)\)/
    ],true);
};
yroot = (x, y) => {
    return new Decimal(x).pow(new Decimal(1).div(y));
};
