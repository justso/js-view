var W = window;
var C = W.console;
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Size = function (w, h) {
    this.w = isNaN(w) ? '?' : w;
    this.h = isNaN(h) ? '?' : h;
};
Size.prototype.toString = function () {
    var w = this.round2(this.w);
    var h = this.round2(this.h);
    return [w, h].join(' × ');
};
Size.prototype.round2 = function (x, y) {
    if (typeof x !== 'number') {
        return x;
    }
    y = Math.pow(10, parseInt(y || 2));
    return Math.round(x * y) / y;
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function labelize(ele, str) {
    var lab = $('<label>').text(str + ': ');
    ele.wrap(lab).data('label', lab);
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Desktop = {
    _: function () {},
    getBodySize: function () {
        return this.getElementSize('body');
    },
    getDocument: function () {
        return W.document.documentElement;
    },
    getDocumentSize: function () {
        return new Size();
    },
    getElementSize: function (ele) {
        ele = ele || 'div';
        if (typeof ele === 'string') {
            ele = $(ele)[0];
        }
        ele = W.getComputedStyle(ele);
        return new Size(parseFloat(ele.width), parseFloat(ele.height));
    },
    getScreenSize: function () {
        var ele = W.screen;
        return new Size(ele.width, ele.height);
    },
    getScrollSize: function () {
        return new Size(W.pageXOffset, W.pageYOffset);
    },
    getViewportSize: function () {
        var ele = this.getDocument();
        return new Size(ele.clientWidth, ele.clientHeight);
    },
    getWindowSize: function () {
        return new Size(W.innerWidth, W.innerHeight);
    },
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(function () {

    function updateInput() {
        var me = $(this);
        if (me.data()['function']) {
            return functionInput(me);
        }
        C.debug(me);
    }

    function functionInput(me) {
        var dat = me.data()['function']; //    read data
        var out = Desktop['get' + dat + 'Size']();
        me.val(out);

        if (!me.data()['label']) {
            labelize(me, dat);
        }
    }



















    // to get viewport size measure html
    $(W).on('load resize scroll', _.throttle(function () {
        $('input').each(updateInput);
    }, 333));

});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
