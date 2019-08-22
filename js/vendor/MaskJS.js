(function(elementoPrincipal, factory) {
        if (typeof define === 'function' && define.amd) {
            define(factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        } else {
            elementoPrincipal.MaskJS = factory();
        }
    }
)( this, function () {
    return alert();
});