!function(e, t) {
    if (typeof module != "undefined")
        module.exports = t();
    else if (typeof define == "function" && typeof define.amd == "object")
        define(t);
    else
        this[e] = t()
}("r", function(e) {
    function h(e) {
        c = 1;
        while (e = t.shift())
            e()
    }
    var t = [],
        n,
        r = false,
        i = document,
        s = i.documentElement,
        o = s.doScroll,
        u = "DOMContentLoaded",
        a = "addEventListener",
        f = "onreadystatechange",
        l = "readyState",
        c = /^loade|c/.test(i[l]);
    i[a] && i[a](u, n = function() {
        i.removeEventListener(u, n, r);
        h()
    }, r);
    o && i.attachEvent(f, n = function() {
        if (/^c/.test(i[l])) {
            i.detachEvent(f, n);
            h()
        }
    });
    return e = o ? function(n) {
        self != top ? c ? n() : t.push(n) : function() {
            try {
                s.doScroll("left")
            } catch (t) {
                return setTimeout(function() {
                    e(n)
                }, 50)
            }
            n()
        }()
    } : function(e) {
        c ? e() : t.push(e)
    }
})
r(function() {
    ord = Math.random();
    ord = ord * 10000000000000000000;
    var img = new Image();
    img.src = '//googleads.g.doubleclick.net/pagead/viewthroughconversion/987715410/?value=0&label=W1abCM6UnwQQ0q791gM&guid=ON&script=0';
    (document.getElementsByTagName('body')[0]).appendChild(img);
})

