// Generated by CoffeeScript 1.6.2
(function() {
  "use strict";
  var SeleniumAjax, SeleniumIDE;

  this.SeleniumIDE = SeleniumIDE = (function() {
    function SeleniumIDE() {}

    SeleniumIDE.prototype.init = function(param) {
      var _this = this;

      if (param == null) {
        param = {};
      }
      this.ajax = new SeleniumAjax(param.server || 'http://localhost:9515');
      this.desiredCapabilities = param.desiredCapabilities || {};
      this.requiredCapabilities = param.requiredCapabilities || {};
      this.windowName = param.windowName || '';
      this.getSessionId().next(function(result) {
        return _this.ajax.set('sessionId', result.sessionId);
      }).next(this.setWindowName.bind(this)).next(this.setUrl.bind(this));
      return this;
    };

    SeleniumIDE.prototype.getSessionId = function() {
      return this.ajax.post('/session', {
        'desiredCapabilities': this.desiredCapabilities,
        'requiredCapabilities': this.requiredCapabilities
      });
    };

    SeleniumIDE.prototype.setWindowName = function(name) {
      if (name == null) {
        name = this.windowName;
      }
      if (!name) {
        return;
      }
      return this.ajax.post('/session/:sessionId/window', {
        'name': name
      });
    };

    SeleniumIDE.prototype.setUrl = function(url) {
      return this.ajax.post('/session/:sessionId/url', {
        'url': 'http://frtrt.net/'
      });
    };

    SeleniumIDE.prototype.send = function() {};

    SeleniumIDE.prototype.quit = function() {
      return this.ajax["delete"]('/session/:sessionId');
    };

    return SeleniumIDE;

  })();

  SeleniumAjax = (function() {
    function SeleniumAjax(server, param) {
      this.server = server;
      this.param = param != null ? param : {};
    }

    SeleniumAjax.prototype.set = function(key, val) {
      return this.param[key] = val;
    };

    SeleniumAjax.prototype.ajax = function(param) {
      var defer, xhr,
        _this = this;

      if (typeof param.data !== 'string') {
        param.data = JSON.stringify(param.data);
      }
      param.url = param.url.replace(/:(\w+)/g, function(all, name) {
        return _this.param[name];
      });
      defer = Deferred();
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status !== 200) {
          return;
        }
        return defer.call(JSON.parse(xhr.responseText));
      };
      xhr.open(param.method, this.server + param.url);
      xhr.send(param.data);
      return defer;
    };

    SeleniumAjax.prototype.post = function(url, param) {
      if (param == null) {
        param = '';
      }
      return this.ajax({
        'url': url,
        'data': param,
        'method': 'POST'
      });
    };

    SeleniumAjax.prototype.get = function(url) {
      return this.ajax({
        'url': url,
        'method': 'GET'
      });
    };

    SeleniumAjax.prototype["delete"] = function(url, param) {
      if (param == null) {
        param = '';
      }
      return this.ajax({
        'url': url,
        'data': param,
        'method': 'DELETE'
      });
    };

    return SeleniumAjax;

  })();

}).call(this);
