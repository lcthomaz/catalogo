var tour = {
    id: 'sagah-tour',
    steps: [
        {
            target: 'myDps-open',
            title: 'Disciplinas',
            content: 'Clique aqui para abrir/fechar o menu de Disciplinas.',
            placement: 'left',
            onNext: function() {
                $('#myDps').slideDown(500).delay(1000);
            }
        },
        {
            target: 'content',
            title: 'Minhas Disciplinas',
            content: 'Menu para gerenciar suas Disciplinas.',
            placement: 'left',
            yOffset: 32,
            onNext: function() {
                $('#newDp').click().delay(1000);
            }
        },
        {
            target: 'box',
            title: 'Criar Disciplina',
            content: 'Preencha os campos para criar sua disciplina.',
            placement: 'top',
            xOffset: -5,
            onNext: function() {
                $('#modal #dpName').attr('placeholder', '');
                $('#modal #dpName').attr('value', 'Física_Tour');
                $('#modal #dpHours').attr('placeholder', '');
                $('#modal #dpHours').attr('value', '6');
            }
        },
        {
            target: 'box',
            title: 'Criar Disciplina',
            content: 'Clique no botão "criar" para gerar uma nova Disciplina.',
            placement: 'bottom',
            xOffset: 310,
            yOffset: 05,
            onNext: function() {
                $('#modal').hide();
            }
        },
        {
            target: 'count-target',
            title: 'Número de UAs',
            content: 'Quantidade de UAs que você pode adicionar à esta Disciplina.',
            placement: 'left',
            xOffset: -1,
            yOffset: -20,
            onNext: function() {
                $('#myDps').slideUp();
            }
        },
        {
            target: 'addUa-target',
            title: 'Visualizar UA',
            content: 'Clique no título da UA para visualizá-la.',
            placement: 'right',
            xOffset: 240,
            yOffset: -25,
            onNext: function() {
                $('.info h1').click();
            }
        },
        {
            target: 'addUa-target',
            title: 'Navegue',
            content: 'Navegue pela UA, veja seu conteúdo, infográficos, vídeos e muito mais.',
            placement: 'left',
            xOffset: 400,
            yOffset: -100,
            onNext: function() {
                $('#uaPreview').fadeOut();
                $('nav').slideDown(300);
            }
        },
        {
            target: 'addUa-target',
            title: 'Adicionar UA',
            content: 'Clique no botão para adicionar esta UA à Disciplina desejada.',
            placement: 'right',
            xOffset: 10,
            yOffset: -24,
            onNext: function() {
                $('.add').click();
            }
        },
        {
            target: 'box',
            title: 'Selecione a Disciplina',
            content: 'Selecione a Disciplina que você deseja adicionar esta UA.',
            placement: 'right',
            yOffset: 90
        },
        {
            target: 'box',
            title: 'Adicionar',
            content: 'Após selecionar a Disciplina clique em "Adicionar".',
            placement: 'bottom',
            xOffset: 310,
            onNext: function() {
                $('.confirm').click();
                $('#myDps').slideDown();
            }
        },
        {
            onStart: function () {
                $('#dps .name').click();
            },
            target: 'dps',
            title: 'Fechar Pedido',
            content: 'Clique em "Enviar Disciplina" para finalizar pedido.',
            placement: 'left',
            xOffset: 0,
            yOffset: 70
        }
    ],
    onEnd: function() {
        $('#modal').fadeOut();
        $('#dps .name').click();
    },
    showPrevButton: true,
    scrollTopMargin: 100
},


/* ========== */
/* TOUR SETUP */
/* ========== */

addClickListener = function(el, fn) {
  if (el.addEventListener) {
    el.addEventListener('click', fn, false);
  }
  else {
    el.attachEvent('onclick', fn);
  }
},

init = function() {
  var startBtnId = 'startTourBtn',
      calloutId = 'startTourCallout',
      mgr = hopscotch.getCalloutManager(),
      state = hopscotch.getState();

  if (state && state.indexOf('sagah-tour:') === 0) {
    // Already started the tour at some point!
    hopscotch.startTour(tour);
  }
  else {
    // Looking at the page for the first(?) time.
    setTimeout(function() {
    }, 100);
  }

  addClickListener(document.getElementById(startBtnId), function() {
    if (!hopscotch.isActive) {
      mgr.removeAllCallouts();
      hopscotch.startTour(tour);
    }
  });
};

init();

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
