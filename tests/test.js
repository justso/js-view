var W = window;
var C = W.console;
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
        var ele = this.getDocument();
        return new Size(ele.offsetWidth, ele.offsetHeight);
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
    get$bodySize: function () {
        var ele = $('body');
        return new Size(ele.width(), ele.height());
    },
    get$documentSize: function () {
        var ele = $(W.document);
        return new Size(ele.width(), ele.height());
    },
    get$windowSize: function () {
        var ele = $(W);
        return new Size(ele.width(), ele.height());
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
