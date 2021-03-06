// CONFIG'S

var timeFadeOut = 300;
var timeFadeIn = 600;
var timeSlideUp = 300;
var timeSlideDown = 600;
var timeSlideToggle = 400;
var timeSlider = 4500;
var titleMaxChar = 39;
var areaMaxChar = 30;

// VAR'S

var areasGerais = [];
var uas = [];
var user = "";
var disciplinas = [];

// KEYS

$(document).keyup(function(e) {
  if (e.keyCode == 27) { $('#uaPreview .close').click(); }
});
$(document).keyup(function(e) {
    if (e.keyCode == 13) { e.preventDefault(); }
});
$("input").keypress(function (e) {
    var charCode = e.charCode || e.keyCode;
    if (charCode  == 13) {
        return false;
    }
});

// DOCUMENT READY

$(document).ready(function() {
    // HIDE

    $('#uaPreview').hide();
    $('#pageSection').hide();
    $('#pageSearch').hide();
    $('#loading').hide();
	
    // LOADING

    function showLoading() {
        $('#loading').fadeIn(timeFadeIn);
    }
    function hideLoading() {
        $('#loading').fadeOut(timeFadeOut);
    }

    // LOGIN

    getUserId();
    function getUserId() {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=getUserId',
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    $('.alert').html(data.erro.mensagem);
                } else {
                    var userId = data[0];
                    var userName = data[1];

                    if (userId == null) {
                        window.location.replace("login.php");

                    } else {
                        $('#profile span').html(userName);

                        // FUNCTIONS

                        loadMenu();
                        getSlider();

                        getUas('#lasts .listUas',1,0,0,0,9);
                        getUas('#lasts .uasHidden',1,0,0,10,19);
                        getUas('#favorites .listUas',1,0,0,0,6);
                        getUas('#favorites .uasHidden',1,0,0,7,13);
                        getDps();

/*                         firstTime(); */
                    }
                }
            }, error:   function(e) {
                        var error = data;
                        $('.alert').html(error);
                    }
        });
    }

    // LOGOUT

    $('#logout').click(function(e) {
        e.preventDefault();
        openModal('logout');
    });
    function logout() {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=logout',
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    $('.alert').html(data.erro.mensagem);
                } else {
                    window.location.replace("login.php");
                }
            }
        });
    }

    // FIRSTTIME

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    function firstTime() {
        var user = getCookie("username");
        if (user != "") {
            return "";
        } else {
            var modal = $('#modal');
            var headerClose = $('#modal #header #close');
            var heightDocument = $(document).height();
            var confirm = 'Iniciar <b>Tour</b>';
            var cancel = 'Cancelar';
            var footer = '<button class="confirm">'+confirm+'</button><button class="cancel">'+cancel+'</button>';

            modal.css('height', heightDocument);

            $('#modal #header h1').html('Site Tour');
            $('#modal #body .message').html('Seja bem-vindo(a), verificamos que esta é a sua primeira vez na página. Faça um <b>"tour"</b> para aprender a criar suas Disciplinas.');
            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').click(function() {
                setCookie('username', 'visited', 30);
                hopscotch.startTour(tour);
                modal.hide(300);
            });
            $('#modal #footer .cancel').click(function() {
                modal.hide(200);
            });
            $('#modal').show();
        }
    }

    // NAV
	
	var areasGeraisInvertidas = [];
    function loadMenu() {
         $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=loadHome',
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    $('.alert').html(data.erro.mensagem);

                } else {
                    areasGerais = data[0];

                    for (i = 0; i < areasGerais.length; i++) {
                        nome = areasGerais[i][0];
                        nomeLink = nome.toLowerCase();
                        id = areasGerais[i][1];
						areasGeraisInvertidas[id] = i;
                        str += '<li id="'+id+'"><a href="#">'+nome+'</a></li>';
                    }

                    $('nav #menu').append(str);

                    $('nav #menu li').click(function() {
						$('#pageSection').fadeIn(timeFadeIn);
                        thisId = $(this).attr('id');

                        if(thisId == 'ajuda') {
                            hopscotch.startTour(tour);
                        } else {
							// limpa .holder
                            $('.holder').html('');
							// registra id da seção
                            idSection = $(this).attr('id');
							// carrega seção
                            loadArea(idSection);
							// carrega #areaGeral opções
							$('#areaGeral').html('');
							str = '';
							for (i = 0; i < areasGerais.length; i++) {
								nome = areasGerais[i][0];
								id = areasGerais[i][1];
								str += '<option id="'+id+'">'+nome+'</li>';
							}
							// aplica opções	
							$('#areaGeral').append(str);
							// marca opção
           					$('select#areaGeral option[id='+thisId+']').attr('class','selected');
            				$('select#areaGeral option[id='+thisId+']').prop('selected', true);
                        }
                    });
                }
        }, error:   function(e) {
                        var error = data;
                        $('.alert').html(error);
                    }
        });
    }
    function getSubAreas(idAreaGeral, idAreaFormacao) {
         $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=getSubAreas&idAreaGeral='+idAreaGeral+'&idAreaFormacao='+idAreaFormacao,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    $('.alert').html(data.erro.mensagem);
                } else {
                    subArea = data;
                    str +='<option>Subárea</option>';
                    for (i = 0; i < data.length; i++) {
                        nomeSubArea = subArea[i][0];
                        idSubArea = subArea[i][1];
                        str += '<option id="'+idSubArea+'">'+nomeSubArea+'</option>';
                    }
                    $('select#areaGeralPrincipal').html(str);
                }
            }, error:   function(e) {
                        var error = data;
                        $('.alert').html(error);
                    }
        });
    }

    // LOAD AREA

    $('select#areaGeral').change(function(){
        idAreaGeral = $(this).children(":selected").attr('id');
        loadArea(idAreaGeral);
    });
    $('select#areaFormacao').change(function(){
        idAreaFormacao = $(this).children(":selected").attr('id');
        idAreaGeral = $('#areaGeral option:selected').attr('id');

        if (idAreaFormacao === "default") {
            $('select#areaGeralPrincipal').hide();
            loadArea(idAreaGeral);
        } else {
            loadArea(idAreaGeral, idAreaFormacao);
        }
    });
    $('select#areaGeralPrincipal').change(function(){
        idAreaGeralPrincipal = $(this).children(':selected').attr('id');
        idAreaFormacao = $('#areaFormacao .selected').attr('id');
        idAreaGeral = $('#areaGeral .selected').attr('id');
        loadArea(idAreaGeral, idAreaFormacao, idAreaGeralPrincipal);
    });

    function loadArea(level1, level2, level3) {
        var pageSection = $('#pageSection');
        var pageSearch = $('#pageSearch');
        var pageIndex = $('#pageIndex');
        var pagePreview = $('#uaPreview');
        var pageSectionList = $('#pageSection .listUas');
        var pageSectionTitle = $('#pageSection #title');

        pageSectionAreaForamacao = $('select#areaFormacao');
        pageSectionAreaGeralPrincipal = $('select#areaGeralPrincipal');
        pageSectionAreaGeralPrincipal.hide();
		
		iLevel1 = areasGeraisInvertidas[level1];
		
		showLoading();
		pageIndex.fadeOut(timeFadeOut);
		pageSearch.fadeOut(timeFadeOut);
		pagePreview.fadeOut(timeFadeOut);
		pageSectionList.html('');
		$('.holder').html('');

        if (level3 != null) {
			// exibe select
            pageSectionAreaGeralPrincipal.show();
			// marca select
            $('select#areaGeralPrincipal option[id='+level3+']').attr('class','selected');
			// carrega unidades
            getUas(pageSectionList, level1, level2, level3, 0, 0, 'y');
            hideLoading();

        } else if (level2 != null) {
			// exibe select
            pageSectionAreaGeralPrincipal.show();
			// carrega opções
            getSubAreas(level1, level2);
			// carrega opções
            str = '<option id="default">Area de Formação</option>';
            for (j = 0; j < areasGerais[iLevel1][2].length; j++) {
                nomeAreaFormacao = areasGerais[iLevel1][2][j][0];
                idAreaFormacao = areasGerais[iLevel1][2][j][1];
                str += "<option id='"+idAreaFormacao+"'>"+nomeAreaFormacao+"</option>";
            }
			// insere opções
            $('select#areaFormacao').html(str);
			// marca opção
			$('select#areaFormacao option[id='+level2+']').attr('class','selected');
            $('select#areaFormacao option[id='+level2+']').prop('selected', true);
			// carrega unidades
            getUas(pageSectionList, level1, level2, 0, 0, 0, 'y');
            hideLoading();
        } else if (level1 != '') {
			// carrega opções
            str = '<option>Area de Formação</option>';
            for (j = 0; j < areasGerais[iLevel1][2].length; j++) {
                nomeAreaFormacao = areasGerais[iLevel1][2][j][0];
                idAreaFormacao = areasGerais[iLevel1][2][j][1];
                str += "<option id='"+idAreaFormacao+"'>"+nomeAreaFormacao+"</option>";
            }
			// insere opções
            $('select#areaFormacao').html(str);
			// carrega unidades
            getUas(pageSectionList, level1, 0, 0, 0, 22, 'y');
			// marca opção
			$('select#areaGeral .selected').removeClass('selected');
            $('select#areaGeral option[id='+level1+']').attr('class','selected');
            $('select#areaGeral option[id='+level1+']').prop('selected', true);
			hideLoading();
        }
    }

    // PAGINATION

    function paginate(object, idAreaGeral, idAreaFormacao,idSubArea, inicial, prox) {
        var itens = 21;
        var holder='';

        if(inicial > 0) {
            holder += "<a class='ant' href='#'>&lt;</a>";
        }
        if(prox > 0) {
            holder += "<a class='prox' href='#'>&gt;</a>";
        }

        $('.holder').html(holder);

        $('.holder .ant').click(function() {
                ninicial = inicial - itens;
                nfinal = inicial+1;
                getUas(object, idAreaGeral, idAreaFormacao,idSubArea, ninicial, nfinal, 'y');
            });

        $('.holder .prox').click(function() {
                ninicial = inicial + itens;
                nfinal = inicial+ 2*itens + 1;
                getUas(object, idAreaGeral, idAreaFormacao,idSubArea, ninicial, nfinal, 'y');
            });
    }

    // UA'S

    function getUas(objeto, idAreaGeral, idAreaFormacao,idSubArea,inicial,final, pagination) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=getUAs&idAreaGeral='+idAreaGeral+'&idAreaFormacao='+idAreaFormacao+'&idSubArea='+idSubArea+'&inicial='+inicial+'&final='+final,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    if (data.length > 21) {
                           prox = 1;
                           ult = 21;
                    } else {
                           prox = 0;
                           ult = data.length;
                    }
                    for (i = 0; i < ult; i++) {
                        id = data[i][1];
                        uas[id] = {};
                        uas[id]['nome'] = data[i][0];
                        uas[id]['estrelas'] = data[i][2];
                        uas[id]['areaFormacaoStr'] = data[i][3];
                        uas[id]['subArea'] = data[i][4];
                        uas[id]['areaGeralPrincipal'] = data[i][5];
                        uas[id]['url'] = data[i][6];

                        if (uas[id]['areaFormacaoStr'] === null) {
                            uas[id]['areaFormacaoStr'] = 'Não cadastrada';
                        }

                        str += "<article class='ua'>";
                        str += "<div class='icon' id='addUa-target'>";
                        str +="<img src='"+getIcon(uas[id]['subArea'])+"' class='area' id='"+uas[id]['idAreaPrincipal']+"' alt='Area Principal'>";
                        str += "<img src='images/icons/plus.png' class='add' id='"+id+"' alt='Adicionar'></div>";
                        str += "<div class='info'><h1 id='ua_"+id+"'>"+uas[id]['nome'].trimToLength(titleMaxChar)+"</h1>";
                        str += "<span>"+uas[id]['areaFormacaoStr'].trimToLength(areaMaxChar)+"</span></div></article>";
                    }

                    $(objeto).html(str);

                    if (pagination === 'y') {
                        paginate(objeto, idAreaGeral, idAreaFormacao,idSubArea, inicial, prox);
                    }

                    $('.ua .add').click(function() {
                        idUa = $(this).attr('id');
                        openModal('addUa', idUa);
                    });

                    $('.info h1').click(function() {
                        openPreview($(this).attr('id'));
                    });
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }

    // UA TITLE

    String.prototype.trimToLength = function(m) {
        return (this.length > m)
            ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
            : this;
    };

    // HIDDEN UAS

    $('.unidades .uasHidden').hide();
    $(document).on('click', '.unidades button', function() {
        $(this).html($(this).html() == "Ver menos" ? "Ver mais" : "Ver menos");
        if ($(this).prev('.uasHidden').is(':visible')) {
            $(this).prev('.uasHidden').hide(200);
        } else {
           $(this).prev('.uasHidden').show(200);
        };
    });

    // ADD UA

    function addUa(idDp, idUa) {
         $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=adicionarUaNaDisciplina&idDisciplina='+idDp+'&idUA='+idUa,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    if (data != 0) {
                        openModal('confirm', 1);
                    } else {
                        openModal('confirm', 6);
                    }
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }

    // PREVIEW

    var keys = [37, 38, 39, 40];

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }
    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }
    function wheel(e) {
        preventDefault(e);
    }
    function disable_scroll() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        $('body').css('overflow','hidden');
    }
    function enable_scroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        $('body').css('overflow','auto');
    }
    $('#uaPreview .close').click(function() {
        enable_scroll();
        closePreview();
    });
    function openPreview(id) {
        var body = $("html, body");
        id = id.substr(3);
		
        showLoading();
        body.scrollTop(0);
        loadStars(id);
		$('#uaPreview').css('visibility', 'visible');
        $('#uaPreview #titulo h2').html(uas[id]['nome']);
        $('#uaPreview #titulo .btn-add').attr('id', id);
        $('nav').slideUp(timeSlideUp);
        $('#uaPreview #titulo').slideDown(timeSlideDown);

        $('#frame').attr("src", uas[id]['url']);
        disable_scroll();

        $('#frame').on('load', function () {
            var windowHeight = $(window).height();
            $('#frame').css('height', windowHeight-64+'px');
            $('#frame').css('marginTop', '64px');
        	$('#uaPreview #conteudo').fadeIn(timeFadeIn);
        	$('#uaPreview').fadeIn(timeFadeIn);
			hideLoading();
        });

        $('#uaPreview .btn-add').click(function() {
            openModal('addUa', id);
        });
		
    }
    function closePreview() {
		showLoading();
        $('#frame').attr("src", "");
        $('#uaPreview #titulo h2').html("");
		
        $('#uaPreview #titulo').slideUp(timeSlideUp);
        $('#uaPreview #conteudo').fadeOut(timeFadeOut);
		$('#uaPreview').css('visibility', 'hidden');
        $('nav').slideDown(timeSlideDown);
		hideLoading();
    }

    // SLIDER

    $('#myDps-open').hover(function() {
        nUas = $('#myDps-open span').html();
        $('#myDps-open span').html('Minhas Disciplinas');
    }, function() {
        $('#myDps-open span').html(nUas);
    });
    function getSlider() {
        var slideCount = $('#slider ul li').length;
        var slideWidth = $('#slider ul li').width();
        var slideHeight = $('#slider ul li').height();
        var sliderUlWidth = slideCount * slideWidth;

        $('#slider').css({ width: slideWidth, height: slideHeight });

        $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

        $('#slider ul li:last-child').prependTo('#slider ul');

        function moveLeft() {
            $('#slider ul').animate({
                left: + slideWidth
            }, 400, function () {
                $('#slider ul li:last-child').prependTo('#slider ul');
                $('#slider ul').css('left', '');
            });
        };

        function moveRight() {
            $('#slider ul').animate({
                left: - slideWidth
            }, 420, function () {
                $('#slider ul li:first-child').appendTo('#slider ul');
                $('#slider ul').css('left', '');
            });
        };

        $('a.control_prev').click(function () {
            moveLeft();
        });

        $('a.control_next').click(function () {
            moveRight();
        });

        setInterval(function () {
            moveRight();
        }, timeSlider);
    }

    // SEARCH
    
    $("#search img").click(function() {
        var searchInputHide = $("#searchInput").width();
        
        if (searchInputHide == 0) {
            $("#menu").fadeOut(200);
            $("#searchInput").animate({width: 420});
        } else {
            $("#menu").fadeIn();
            $("#searchInput").animate({width: 0});
        }
    });

    $("#searchInput").on("focus", function(e){
        e.preventDefault();
        $(this).val("");
    });
    $("#searchInput").focusout(function(e){
        e.preventDefault();
        var valor = $(this).val();
        var mensagem = "DIGITE AQUI A SUA BUSCA";

        if (valor == "") {
            $(this).val(mensagem);
        } else {
            $(this).val(valor);
            search(valor);
        }
    });
    $(function() {
        var timer;
        $("#searchInput").keyup(function() {
            clearTimeout(timer);
            var ms = 500; // milliseconds
            var val = this.value;
            timer = setTimeout(function() {
                search(val);
            }, ms);
        });
    });
    var uas = {};
    function search(term) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=pesquisa&termos='+encodeURIComponent(term),
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    subAreas = data[0];
                    uasPesq = data[1];

                    for (i = 0; i < uasPesq.length; i++) {
                        id = uasPesq[i][1];
                        uas[id] = [];
                        uas[id]['nome'] = uasPesq[i][0];
                        uas[id]['estrelas'] = uasPesq[i][2];
                        uas[id]['areaFormacaoStr'] = uasPesq[i][3];
                        uas[id]['subArea'] = uasPesq[i][4];
                        uas[id]['areaGeralPrincipal'] = uasPesq[i][5];
                        uas[id]['url'] = uasPesq[i][6];
                        str += "<article class='ua'><div class='icon'><img src='images/icons/area01.png' class='area' alt='Area'><img src='images/icons/plus.png' class='add' id='"+id+"' alt='Adicionar'></div><div class='info'><h1 id='ua_"+id+"'>"+ uas[id]['nome'].trimToLength(titleMaxChar) +"</h1><span>"+ uas[id]['areaFormacaoStr'] +"</span></div></article>";
                    }
                    $('.holder').html('');
                    $('#pageSearch .listUas').html(str);
                    
                    
                    $("#menu").fadeIn();
                    $("#searchInput").animate({width: 0});

                    $('.ua .add').click(function() {
                        idUa = $(this).attr('id');
                        openModal('addUa', idUa);
                    });

                    $('.info h1').click(function() {
                        openPreview($(this).attr('id'));
                    });

                    $('#pageIndex, #pageSection').fadeOut(timeFadeOut);

                     $.when($('#pageIndex').fadeOut(timeFadeOut)).done(function() {
                        $('#pageSearch').fadeIn(timeFadeIn);
                        $('#pageSearch #title').html('Pesquisando '+term+'...');
                     });
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }

    // STARS

    function loadStars(id) {
        $('#uaPreview .estrelas').html("");
        id = id;
        numEstrelas = uas[id]['estrelas'];

        var i = 0;
        while (i < numEstrelas) {
            $('#uaPreview .estrelas').append('<img src="images/icons/starb.png" width="24" alt="estrela">');
            i++;
        }

        while (numEstrelas < 5) {
            $('#uaPreview .estrelas').append('<img src="images/icons/star.png" width="24" alt="estrela">');
            numEstrelas++;
        }
    }
    function saveStars(id, stars) {}

    // DISCIPLINAS

    $('#myDps').hide();

    function openDps() {
        $('#myDps').slideToggle(300);
    }
    function closeDps() {
        $('#myDps').slideUp(timeSlideUp);
    }
    function toggleDps() {
        $('#myDps #content').slideToggle(300);
    }

    $('#myDps-open').click(function() {
        openDps();
    });
    $('#myDps-close').click(function() {
        closeDps();
    });
    $('#myDps-expand').click(function() {
        toggleDps();
    });

    function getDps() {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=loadHome',
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                strH = "";
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    disciplinas = data[1];
                    n = 0;

                    for (i = 0; i < disciplinas.length; i++) {
                        var nome = disciplinas[i][0];
                        var idDp = disciplinas[i][1];
                        var horas = Math.round(disciplinas[i][2]/2);
                        var status = disciplinas[i][3];
                        var dpUas = disciplinas[i][4];

                        var strUa = '';

                        for (j = 0; j < dpUas.length; j++) {
                            var nomeUa = dpUas[j][0];
                            var idUa = dpUas[j][1];

                            strUa += '<li id="'+idUa+'">';
                            strUa +='<span class="name"> - '+nomeUa.trimToLength(titleMaxChar)+'</span><span class="delete" id="'+idDp+'">x</span></li>';
                        }

                        var nUas = j;

                        if(status != 'X') {
                            str += '<li id="'+idDp+'">';
                            str += '    <img src="images/icons/arrow.svg" width="12" class="rotate" alt="Rotacionar">';
                            str += '    <span class="name">'+nome+'</span>';
                            str += '    <span class="edit" id="'+idDp+'">editar</span>';
                            str += '    <span class="count" id="count-target"><b>('+j+' / '+horas+')</b></span><br>';
                            str += '    <ul id="uaDp">'+strUa;
                            n++;

                            if (nUas != horas) {
                                str += '';
                            } else {
                                str += '<button id="sendDp" data-id="'+i+'">Enviar Disciplina</button>';
                            }

                            str += '</ul></li>';
                        } else {
                            strH += '<span data-id="'+idDp+'">'+nome+'</span>, ';
                        }
                    }


                    $("#myDps #content #dps").html(str + '<br><small id="history-btn">Histórico</small><div id="history">'+strH+'</div>');
                    $('#myDps-open span').html(n);


                    $('#history').hide();
                    $('#history-btn').on('click', function(){
                        $('#history').slideToggle(timeSlideToggle);
                    });

                    $('#myDps #dps #uaDp').hide();
                    $('#myDps #content ul li .name').click(function(){
                        if ($(this).next().next().next().next().is(':visible')) {
                            $(this).prev().css({transform: 'rotate(0deg)'});
                            $(this).next().next().next().next().slideUp(timeSlideUp);
                        } else {
                            $(this).prev().css({transform: 'rotate(90deg)'});
                            $(this).next().next().next().next().slideDown(timeSlideDown);
                        }
                    });

                    $('#myDps #content .edit').click(function() {
                        dpId = $(this).attr('id');
                        i = $(this).parent('li').index();
                        openModal('editDp', dpId, i);
                    });

                    $('#myDps #uaDp li .name').click(function() {
                        uaId = $(this).parent().attr('id');
                        openPreview(uaId);
                        $('#myDps').slideUp(timeSlideUp);
                    });

                    $('#myDps #uaDp li .delete').click(function() {
                        idDp = $(this).attr('id');
                        idUa = $(this).parent().attr('id');
                        openModal('removeUa', idUa, idDp);
                    });
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }

    $(document).on('click', '#sendDp', function() {
        var id = $(this).data('id');
        openModal('sendDp', id);
    });
    $('#myDps #newDp').click(function() {
        openModal('newDp');
    });

    function newDp(dpName, dpHours) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=novaDisciplina&nome='+dpName+'&horas='+dpHours,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    showLoading();
                    openModal('confirm', 2);
                    hideLoading();
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }
    function editDp(id, dpName, dpHours) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=alterarDisciplina&id='+id+'&nome='+dpName+'&horas='+dpHours,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    showLoading();
                    openModal('confirm', 3);
                    hideLoading();
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }
    function sendDp(id) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=enviarDisciplina&id='+id,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    showLoading();
                    openModal('confirm', 5);
                    hideLoading();
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }
    function removeUa(idDp, idUa) {
        $.ajax({
            url: '/sagahcm/serv_ecommerce.php?method=removerUaDaDisciplina&idDisciplina='+idDp+'&idUA='+idUa,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data) {
                str = "";
                if (data.erro != null) {
                    alert("Erro: "+data.erro.codigo+": "+data.erro.mensagem);
                } else {
                    showLoading();
                    openModal('confirm', 4);
                    hideLoading();
                }
            },
            error: function(e) {
                alert('Erro de HTTP/parsing');
            }
        });
    }

    // ICONS

    function getIcon(title) {
        if (title === "Ciências Biológicas e da Saúde") {
            icon = '01';
        } else if (title === "Ciências Humanas e Sociais") {
            icon = '02';
        } else if (title === "Conhecimentos Biotecnológicos") {
            icon = '03';
        } else if (title === "Ciências Exatas") {
            icon = '04';
        } else if (title === "Farmácia") {
            icon = '05';
        } else if (title === "Conhecimentos Fisioterapêuticos") {
            icon = '06';
        } else if (title === "Ciências da Enfermagem") {
            icon = '07';
        } else if (title === "Conteúdos Básicos") {
            icon = '08';
        } else if (title === "Conteúdos Específicos") {
            icon = '09';
        } else if (title === "Conteúdos Profissionalizantes") {
            icon = '10';
        } else {
            icon = '00';
        }

        return icon = 'images/icons/area'+icon+'.png';
    }

    // MODAL

    $('#modal').hide();
    function closeModal() {
        $('#modal').hide();
    }
    function openModal(type, id, i) {
        var modal = $('#modal');
        var headerClose = $('#modal #header #close');
        var heightDocument = $(document).height();
        var confirm = '';
        var cancel = 'Cancelar';
        var footer = '<button class="confirm">'+confirm+'</button><button class="cancel">'+cancel+'</button>';

        modal.css('height', heightDocument);
        modal.fadeIn(timeFadeIn);

        $('#modal #footer').html(footer);

        $('#modal #header .close').click(function() {
            modal.fadeOut(timeFadeOut);

            $.when($('#modal').fadeOut(timeFadeOut)).done(function() {
                $('#modal #footer').html('');
            });
        });

        if(type == "addUa") {
            $('#modal #header h1').html('Adicionar UA');
            $('#modal #body .message').html('<b>'+uas[id]['nome']+'</b> à disciplina:');

            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html("Adicionar");

            $('#modal #body .message').append("<select id='dps'>");

            var str = "";

            for (i = 0; i < disciplinas.length; i++) {
                var nome = disciplinas[i][0];
                var idDp = disciplinas[i][1];
                var horas = Math.round(disciplinas[i][2]/2);
                var status = disciplinas[i][3];
                var dpUas = disciplinas[i][4];

                for (j = 0; j < dpUas.length; j++) {}
                var nUas = j;

                if (status === "A") {
                    if(nUas < horas) {
                        str += '<option id="'+idDp+'">'+nome+'</option>';
                    }
                }
            }

            if (str != "") {
                $('#modal #body .message').find('#dps').append(str);
                $('#modal #body .message').append("</select>");
            } else {
                str = '<option>Nenhuma Disciplina</option><option id="cad_dp">Cadastrar Disciplina</option>';
                $('#modal #body .message').find('#dps').append(str);
                $('#modal #body .message').append("</select>");
            };

            $("#modal #dps").change(function(){
                if ($("#modal #dps").val() == "Cadastrar Disciplina") {
                    closeModal();
                    openModal('newDp');
                } else {}
            });

            $('#modal #footer .confirm').click(function() {
                var idDp = $('select#dps option:selected').attr('id');
                showLoading();
                addUa(idDp, id);
                hideLoading();
                $('#modal #footer').html('');
            });
        }

        if(type == "removeUa") {
            $('#modal #header h1').html('Remover UA');
            $('#modal #body .message').html('<br>Você gostaria de remover?');

            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Remover');

            $('#modal #footer .confirm').click(function() {
                removeUa(i, id);
            });
        }

        if(type == "newDp") {
            $('#modal #header h1').html('Nova Disciplina');
            $('#modal #body .message').html('<input type="text" id="dpName" placeholder="Nome da Disciplina"><br><input type="text" id="dpHours" class="only-numbers" placeholder="Carga Horária"><div class="errmsg"></div>');
            $('.errmsg').hide();

            // DIGITS ONLY

            $(".only-numbers").keypress(function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    $(this).next('.errmsg').html("Apenas números.").show().delay(400).fadeOut("slow");
                    return false;
                }
            });

            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Criar');

            $('#modal #footer .confirm').click(function() {
                var dpName = $('#dpName').val();
                var dpHours = $('#dpHours').val();
                showLoading();
                newDp(dpName, dpHours);
                hideLoading();
            });
        }

        if(type == "editDp") {
            $('#modal #header h1').html('Editar Disciplina');
            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Editar');
            $('#modal #footer').append('<div id="'+id+'"></div>');

            $('#modal #body .message').html('<input type="text" id="dpName" value="'+disciplinas[i][0]+'"><br><input type="text" id="dpHours" class="only-numbers" value="'+disciplinas[i][2]+'"><div class="errmsg"></div>');

            $(".only-numbers").keypress(function (e) {
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    $(this).next('.errmsg').html("Apenas números.").show().delay(400).fadeOut("slow");
                    return false;
                }
            });

            $('#modal #body .message #dpName').css('color', '#000');
            $('#modal #body .message #dpHours').css('color', '#000');

            $('#modal #footer .confirm').click(function() {
                dpName = $('#modal #body #dpName').val();
                dpHours = $('#modal #body #dpHours').val();
                idDp = $(this).next().next().attr('id');

                editDp(idDp, dpName, dpHours);
            });
        }

        if(type == "sendDp") {
            $('#modal #header h1').html('Enviar Disciplina');
            $('#modal #body .message').html('Você realmente gostaria de enviar a disciplina <b>'+disciplinas[id][0]+' </b>?');

            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Confirmar');
            $('#modal #footer .cancel').html('Cancelar');

            $('#modal #footer .confirm').click(function() {
                showLoading();
                sendDp(disciplinas[id][1]);
                hideLoading();
            });
        }

        if(type == "confirm") {
            $('#modal #header h1').html('Confirmação');
            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Ok');

            $('#modal #footer .confirm').click(function() {
                $('#modal').fadeOut(timeFadeOut);
                closePreview();
                $.when($('#modal').fadeOut(timeFadeOut)).done(function() {
                    $('#modal #footer').html('');
                });
            });
            if(id == 1) {
                $('#modal #body .message').html('<br>UA adicionada com sucesso!');
                getDps();
            }

            if(id == 2) {
                $('#modal #body .message').html('<br>Disciplina criada com sucesso!');
                getDps();
            }

            if(id == 3) {
                $('#modal #body .message').html('<br>Disciplina editada com sucesso!');
                getDps();
            }

            if(id == 4) {
                $('#modal #body .message').html('<br>UA removida com sucesso!');
                getDps();
            }
            if(id == 5) {
                $('#modal #body .message').html('<br>Disciplina enviada com sucesso!');
                getDps();
            }
            if(id == 6) {
                $('#modal #header h1').html('Erro');
                $('#modal #body .message').html('<br>UA já cadastrada na Disciplina!');
            }
        }
        if(type == "logout") {
            $('#modal #header h1').html('Logout');
            $('#modal #body .message').html('Você realmente gostaria de sair?');

            $('#modal #footer').html(footer);
            $('#modal #footer .confirm').html('Sair');
            $('#modal #footer .cancel').html('Fechar');

            $('#modal #footer .confirm').click(function() {
                logout();
            });
        }

        $('#modal #footer .cancel').click(function() {
            modal.fadeOut(timeFadeOut);

            $.when($('#modal').fadeOut(timeFadeOut)).done(function() {
                $('#modal #footer').html('');
            });
        });
    }

    // DRAGGABLE

    $('.drags').hover(function(){
        $('#myDps').drags();
    });
    $.fn.drags = function(opt) {
        opt = $.extend({handle:""}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {

                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    }
});
