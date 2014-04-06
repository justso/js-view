var W = window;
var C = W.console;

function Size(w, h) {
    this.w = isNaN(w) ? '?' : w;
    this.h = isNaN(h) ? '?' : h;
}
Size.prototype.toString = function () {
    return this.w + ' × ' + this.h;
};

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

    function labelize(ele, str) {
        var lab = $('<label>');
        lab.text(str + ': ');
        ele.wrap(lab);
        ele.data('label', lab);
    }

    function updateInput() {
        var me = $(this);
        var dat = me.data()['part']; //    read data
        if (!dat) return functionInput(me);
        var vals = dat.split(' '); //   split data on space
        var ele = $(vals[0]); //        use first to choose element
        ele = (ele.length) ? ele : [window];
        var prop = vals[1]; //          use second to determine which property
        var out = ele[0][prop];
        me.val(out);
        C.debug(out);
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
    $(W).on('resize', _.throttle(function () {
        $('input').each(updateInput);
    }, 333)).resize();


});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
