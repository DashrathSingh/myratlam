var supportTouch = $.support.touch,
       scrollEvent = "touchmove scroll",
       touchStartEvent = supportTouch ? "touchstart" : "mousedown",
       touchStopEvent = supportTouch ? "touchend" : "mouseup",
       touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
$.event.special.swipeupdown = {
    setup: function () {
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function (event) {
            var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY],
                        origin: $(event.target)
                    },
                    stop;

            function moveHandler(event) {
                if (!start) {
                    return;
                }
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY]
                };

                // prevent scrolling
                if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                    event.preventDefault();
                }
            }
            $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                    Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                    Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                        .trigger("swipeupdown")
                                        .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
        });
    }
};
$.each({
    swipedown: "swipeupdown",
    swipeup: "swipeupdown"
}, function (event, sourceEvent) {
    $.event.special[event] = {
        setup: function () {
            $(this).bind(sourceEvent, $.noop);
        }
    };
});


var myDate = new Date();
var _Currentpath = "";
var _genVar = 0;
var _timeZone = myDate.getTimezoneOffset();



document.addEventListener("deviceready", onDeviceReady, false);

function showAlert() {
    navigator.notification.alert(
        'You are the winner!',  // message
        onConfirmnew,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}


function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

function onConfirmnew() {
    alert('You selected button new ');
}

// Show a custom confirmation dialog
//
function showConfirm() {
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart', 'Exit']         // buttonLabels
    );
}



document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

var pictureSource;
var destinationType;
var ImageListAndroid = [];



var mouseEventTypes = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
};

for (originalType in mouseEventTypes) {
    document.addEventListener(originalType, function (originalEvent) {
        event = document.createEvent("MouseEvents");
        touch = originalEvent.changedTouches[0];
        event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
                window, 0, touch.screenX, touch.screenY, touch.clientX,
                touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
                touch.metaKey, 0, null);
        originalEvent.target.dispatchEvent(event);
    });
}


//window.onerror = function (error, file, line) {
//    alert("Error below described");
//    alert(error + ", " + file + ", " + line);
//}



function vibrate() {
}


function playBeep() {
}





function onDeviceReady() {
    var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;




    //InitializeModal();

    //$cordovaSplashscreen.hide();
}

function onOffline() {

    $(".nointernet").show();
}

function onOnline() {

    $(".nointernet").hide();
}


function doOnOrientationChange() {
    switch (window.orientation) {
        case -90:
        case 90:

            alert("Change mode");

            break;
        default:
            alert("Change mode");
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();






(function ($, window, document, undefined) {

    debugger;

    var pluginName = "addClear";

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var $this = $(this.element),
              me = this,
              options = this.options;

            $this.wrap("<div class='add-clear-span form-group has-feedback " + options.wrapperClass + "'></div>");
            $this.after($("<span class='add-clear-x form-control-feedback " + options.symbolClass + "' style='display: none;'>" + options.closeSymbol + "</span>"));
            $this.next().css({
                'color': options.color,
                'cursor': 'pointer',
                'text-decoration': 'none',
                'display': 'none',
                'overflow': 'hidden',
                'position': 'absolute',
                'pointer-events': 'auto',
                'right': options.right,
                'top': options.top,
                'z-index': options.zindex
            }, this);

            if ($this.val().length >= 1 && options.showOnLoad === true) {
                $this.siblings(".add-clear-x").show();
            }

            $this.on('focus.addclear', function () {
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                }
            });

            $this.on('blur.addclear', function () {
                var self = this;

                if (options.hideOnBlur) {
                    setTimeout(function () {
                        $(self).siblings(".add-clear-x").hide();
                    }, 50);
                }
            });

            $this.on('keyup.addclear', function (e) {

                if (options.clearOnEscape === true && e.keyCode == 27) {
                    $(this).val('').focus();
                    if (options.onClear) {
                        options.onClear($(this).siblings("input"));
                    }
                }
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                } else {
                    $(this).siblings(".add-clear-x").hide();
                }
            });

            $this.on('input.addclear change.addclear paste.addclear', function () {
                if ($(this).val().length >= 1) {
                    $(this).siblings(".add-clear-x").show();
                } else {
                    $(this).siblings(".add-clear-x").hide();
                }
            });

            $this.siblings(".add-clear-x").on('click.addclear', function (e) {
                debugger;



                $(this).siblings(me.element).val("");
                $(this).hide();
                if (options.returnFocus === true) {
                    $(this).siblings(me.element).focus();
                }
                if (options.onClear) {
                    options.onClear($(this).siblings("input"));
                }
                $(this).siblings(me.element).trigger('input');
                e.preventDefault();
            });
        }

    };

    $.fn[pluginName] = function (options, optionName, optionValue) {
        return this.each(function () {
            if (options === "option") {
                var $this = $(this);
                if (optionName === "show") {
                    $this.siblings(".add-clear-x").show();
                } else if (optionName === "hide") {
                    $this.siblings(".add-clear-x").hide();
                }
            }
            var isSetOption = optionName && optionName !== "show" && optionName !== "hide";
            if (isSetOption) {
                var oldInstance = $.data(this, "plugin_" + pluginName);
                if (!oldInstance || !oldInstance.options) {
                    throw "Cannot set option, plugin was not instantiated";
                }
                oldInstance.options[optionName] = optionValue;
            } else {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this,
                        "plugin_" + pluginName,
                        new Plugin(this, options));
                }
            }

        });
    };

    $.fn[pluginName].Constructor = Plugin;

    var defaults = $.fn[pluginName].defaults = {
        closeSymbol: "",
        symbolClass: 'glyphicon glyphicon-remove-circle',
        color: "#CCC",
        top: 0,
        right: 0,
        returnFocus: true,
        showOnLoad: false,
        onClear: null,
        hideOnBlur: false,
        clearOnEscape: true,
        wrapperClass: '',
        zindex: 99
    };

})(jQuery, window, document);





