/*
 * jQuery-search for jQuery
 * 1.0.0, 23 April 2016
 *
 * Using the jQuery-search plugin, you can easily add a live search on your html pages
 *
 * Copyright 2016 @egoettelmann, https://github.com/egoettelmann/
 * Released under the MIT License
 */
!(function(e) {
    e.fn.jsearch = function(s) {
        var i = e.extend({
                rowClass: ".jsearch-row",
                fieldClass: ".jsearch-field",
                minLength: 3,
                triggers: "keyup",
                caseSensitive: !1,
            },
            s
        );
        return (
            this.on(i.triggers, function() {
                var s = e(this).val();
                i.caseSensitive || (s = s.toLowerCase()),
                    s.length >= i.minLength ?
                    e(i.rowClass).each(function() {
                        var n = e(this),
                            t = !1;
                        e(i.fieldClass, n).each(function() {
                                var n = e(this).html();
                                i.caseSensitive || (n = n.toLowerCase()),
                                    n.indexOf(s) > -1 && (t = !0);
                            }),
                            t ? n.show() : n.hide();
                    }) :
                    0 == s.length &&
                    e(i.rowClass).each(function() {
                        var s = e(this);
                        s.show();
                    });
            }),
            this
        );
    };
})(jQuery);