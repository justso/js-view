/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Size = function (w, h) {
    this.w = isNaN(w) ? '?' : w;
    this.h = isNaN(h) ? '?' : h;
};
Size.prototype.toString = function () {
    var w = this.round0(this.w);
    var h = this.round0(this.h);
    return [w, h].join(' × ');
};
Size.prototype.round2 = function (x, y) {
    if (typeof x !== 'number') {
        return x;
    }
    y = Math.pow(10, parseInt(y || 2));
    return Math.round(x * y) / y;
};
Size.prototype.round0 = function (x) {
    if (typeof x !== 'number') {
        return x;
    }
    return (x + 0.5) | 0;
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
