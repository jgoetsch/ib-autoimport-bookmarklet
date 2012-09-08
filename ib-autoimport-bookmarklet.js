if (location.href.substr(0,34) != 'https://www.interactivebrokers.com')
  alert('This bookmarklet script must be run from the Account Management page on the Interactive Brokers website');
else (function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="http://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"1.8.1",function($,L){

  var document = top.frames["content"].document;

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          that.$element
            .attr('aria-hidden', false)
            .focus()

          that.enforceFocus()

          that.$element.trigger('shown')
        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .attr('aria-hidden', true)

        this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this

        if (this.isShown && this.options.backdrop) {

          this.$backdrop = $('<div style="position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000;opacity:0.6;filter:alpha(opacity=60)" />')
            .appendTo(document.body)

          if (this.options.backdrop != 'static') {
            this.$backdrop.click($.proxy(this.hide, this))
          }

          callback()

        } else if (!this.isShown && this.$backdrop) {
          this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal;

 /* BOOKMARKLET CODE
  * ======================= */

  var styleFooter = "padding:14px 15px 15px;margin-bottom:0;text-align:right;background-color:#f5f5f5;border-top:1px solid #ddd;-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;-webkit-box-shadow:inset 0 1px 0 #fff;-moz-box-shadow:inset 0 1px 0 #fff;box-shadow:inset 0 1px 0 #fff;*zoom:1";

  var deliverySettings = '/Universal/servlet/ReportManagement.Process.ProcessDeliverySettings',
      newReport = '/Universal/servlet/ReportManagement.Display.Flex.DisplayFlexTradeConfirmsConfigure?cmd=N',
      createReport = '/Universal/servlet/ReportManagement.Display.Flex.DisplayFlexTradeConfirmsConfigure',
      getReports = '/Universal/servlet/AccountAccess.Redirector?action=RM_FLEX_TRADE_CONFIRMS'

  var m = $('<div style="position:fixed;top:50%;left:50%;z-index:1050;overflow:auto;width:480px;margin:-150px 0 0 -240px;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,0.3);*border:1px solid #999;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 3px 7px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,0.3);box-shadow:0 3px 7px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box">' +
          '<div style="padding:9px 15px;border-bottom:1px solid #eee"><h3>Interactive Brokers Auto Import Setup</h3></div>' +
          '<div style="overflow-y:auto;max-height:400px;padding:10px">Loading...</div>' +
          '<div style="display:none;padding:14px 15px 15px;margin-bottom:0;background-color:#f5f5f5;border-top:1px solid #ddd;-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;-webkit-box-shadow:inset 0 1px 0 #fff;-moz-box-shadow:inset 0 1px 0 #fff;box-shadow:inset 0 1px 0 #fff;*zoom:1">' +
            '<button type="button" style="width: 80px">OK</button> ' +
            '<button type="button" style="width: 80px">Cancel</button>' +
          '</div></div>')
        .appendTo(document.body).modal().on('hidden', function() { $(this).remove() })
        .find('button:last').on('click', function() { m.parent().modal('hide') }).end()
        .children().eq(1);

  var errorHandle = function(err) {
    m.html('An error has occurred: ' + err).next().show().find('button:first').hide();
  };
  var requestIfNoMatch = function(content, matcher, ajaxParams, callback) {
    var result = matcher(content);
    if (result && result.length) callback(result)
    else $.ajax(ajaxParams).success(function(resp) {
      var result = matcher(resp);
      if (result && result.length) callback(result)
      else errorHandle('Token or report id not found');
    }).error(errorHandle);
  };

  $.get(deliverySettings, {set_flex_webservice_status: 'A', whichDiv: 'flex', whichForm: 'F'}, function(resp) {
    requestIfNoMatch(resp, function(c) { return c.match(/\d{24}/) },
    {type: 'POST', url: deliverySettings, data: {generate: 'generate', ip_address: '', stmt_window: 9, whichDiv: 'flex', whichForm: 'F'} },
    function(token) {

      var reportParams = 'cmd=S&outputFormat=TEXT&separator=comma&tcSettings=EXECUTION&textOptions=columnHeaders' +
          'tradeConfirmsIncluded=symbol&tradeConfirmsIncluded=description&tradeConfirmsIncluded=dateTime&tradeConfirmsIncluded=exchange&tradeConfirmsIncluded=buySell&tradeConfirmsIncluded=quantity&tradeConfirmsIncluded=price&tradeConfirmsIncluded=amount&tradeConfirmsIncluded=commission';

      m.load(newReport + ' select[name="accounts"]', function() {

        var sel = m.find('select').removeAttr('multiple')
          .before('<p style="line-height:1.1em;margin-bottom:8px"><strong>From which subaccount would you like to import trades?</strong></p>');

        m.prepend('<p style="line-height:1.1em;margin-bottom:10px">Hey, this nifty script will generate report templates and a web service token for you to give web apps to allow them to automatically import your trades.</div>')
        .next().show().find('button:first').on('click', function() {
          if (sel.length) {
            if (sel.val()) {
              reportParams += '&accounts=' + sel.val();
            } else {
              alert('You must select an account to proceed.');
              return;
            }
          }
          m.html('Setting up reports...').next().hide();
          $.get(getReports, function(resp) {
            var report = 'Auto Import Past' + (sel.length ? ' '+sel.val() : '');
            var matcher = function(c) { return $(c).find('td:contains("' + report + '")').prev().html(); };

            requestIfNoMatch(resp, matcher, {type: 'POST', url: createReport, data: reportParams + '&period=Last30CalendarDays&queryName=' + encodeURIComponent(report)},
            function(reportIdPast) {

              report = 'Auto Import Today' + (sel.length ? ' '+sel.val() : '');
              requestIfNoMatch(resp, matcher, {type: 'POST', url: createReport, data: reportParams + '&period=Today&queryName=' + encodeURIComponent(report)},
              function(reportIdToday) {

                m.html('<p>All done! Just copy the values below and paste them into your app.</p><table style="text-align:left">' +
                  '<tr><td><strong>Web Service Token:</strong></td><td style="border: 1px solid #aaa;padding:2px 6px">' + token +
                  '</td></tr><tr><td><strong>Report ID (Past):</strong></td><td style="border: 1px solid #aaa;padding:2px 6px">' + reportIdPast +
                  '</td></tr><tr><td><strong>Report ID (Today):</strong></td><td style="border: 1px solid #aaa;padding:2px 6px">' + reportIdToday + '</td></tr></table>')
                .next().show().find('button').first().hide().end().last().html('Close');

              });
            });
          }).error(errorHandle);
        });
      }).error(errorHandle);
    });
  }).error(errorHandle);

});