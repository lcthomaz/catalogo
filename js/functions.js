$(document).ready(function(){
    leftPos=0;
    leftPosLnk=0;
    leftPosFix=0;
     if($('body[name="PageCatalogo"]').is(':visible')) {
        InitConfig();
    }
        //--carregamento inicial--//
        function InitConfig(){
            //--HEADER--//
            var lbluserName=getCookie("username");
            var logPapel=getCookie("userpapel");

            if(lbluserName==null){
                alertMessage("Sua sessão expirou","login");
            }else{
                $('span#lbl-login').html(lbluserName);
                if(logPapel=="CR" || logPapel=="AD"){
                    $('.ctn-header-tools').prepend('<a name="btn-GET-configuracoes">Configurações</a> | ');
                }
            }
            //--MENU--//
            //--carrega o JSON com os dados das áreas--//
            var urlMenu="./json/json_MENU.json?orderby=title";
            var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
            xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {
                    var content=JSON.parse(this.responseText);
                    //--limpa a coluna com as áreas--//
                    $("aside[name='categorias'] nav ul").empty();

                    //--popula a coluna com os itens carregados--//
                    $.each(content, function(i, item) {
                         var valueAREA=item.area;
                         var valueID=item.id;
                         $("aside[name='categorias'] nav ul").append('<li id="'+valueID+'" name="areaGeral"><a class="menu-lnk">'+valueAREA+'</a></li>');
                    });
                }
            };
            xhttp.open("GET", urlMenu, true);
            xhttp.send();
            //--FIM MENU--//
            //--carrega a lista de Unidades--//
            var parameters={classif:"featured",modo:"init",orderby:"title", inic:0, num:5, areaGeral:"all", areaFormacao:"all", areaGeralPrincipal:"all", words:"all"};
            carregaUAs(parameters);
            //--FIM carrega a lista de Unidades--//
        }
        //--FIM carregamento inicial--//
        //--funcionamento do MENU--//
        //--carregamento do SUBMENU--//
        $("aside[name='categorias'] nav ul").on('click', 'a.menu-lnk', function() {
                //--remove selected--//
                $("aside[name='categorias'] nav ul li.selected").children("a").nextAll().remove();
                $("aside[name='categorias'] nav ul li").removeClass("selected");
                //--FIM remove selected--//    
                var Element=$(this).parent();
                if(!Element.hasClass("selected")){
                    //--retorna o id da área--//
                    var idThis=Element.attr('id');
                    //--adiciona a class selected--//
                    Element.addClass("selected");
                    Element.children("a").nextAll().remove();
                    //--carrega o JSON com os dados das subareas--//
                    var urlSubMenu="./json/json_subMENU.json?idarea="+idThis+"&&orderby=title";
                    var xhttp = new XMLHttpRequest();
                        xhttp.addEventListener("loadstart", showLoading, false);
                        xhttp.addEventListener("loadend", hideLoading, false);
                        xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                       if (this.readyState == 4 && this.status == 200) {
                            var content=JSON.parse(this.responseText);
                            //--cria a ul para incluir as subareas--//
                            Element.children("a").after( '<ul class="cnt-sub" data-find-type="level-sec"></ul>' );
                            //--popula a coluna com os itens carregados--//
                            $.each(content, function(i, item) {
                                 var valueAREA=item.area;
                                 var valueID=item.id;
                                 Element.children('ul').append('<li id="'+valueID+'" name="areaFormacao"><a class="submenu-lnk">'+valueAREA+'</a></li>');
                            });
                        }
                    };
                    xhttp.open("GET", urlSubMenu, true);
                    xhttp.send();
                }else{
                    //--remove a class selected--//
                    Element.removeClass("selected");
                    Element.children("a").nextAll().remove();
                }
         });
        //--FIM carregamento do SUBMENU--//

        //--carregamento do 3o nível--//
        $("aside[name='categorias'] nav ul").on('click', 'a.submenu-lnk', function() {

            var Element=$(this).parent().parent().parent();
            var SubElement=$(this).parent();
            var idArea=Element.attr('id');
            var idSubArea=SubElement.attr('id');
             if(!SubElement.hasClass("selected")){
                SubElement.addClass("selected");
                SubElement.children("a").nextAll().remove();


                 //--carrega o JSON com os dados do 3o nível--//
                    var urlOptions="./json/json_OptionssubMENU.json?idarea="+idArea+"&&idsubarea="+idSubArea+"&&orderby=title";
                    var xhttp = new XMLHttpRequest();
                        xhttp.addEventListener("loadstart", showLoading, false);
                        xhttp.addEventListener("loadend", hideLoading, false);
                        xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                       if (this.readyState == 4 && this.status == 200) {
                            var content=JSON.parse(this.responseText);
                            
                            //--cria a ul para incluir as subareas--//
                             $( '<div name="tagUAs" class="mediumgray no-display area-tags"></div>' ).appendTo(SubElement);
                            //--popula a coluna com os itens carregados--//
                            $.each(content, function(i, item) {
                                 var valueAREA=item.area;
                                 var valueID=item.id;

                                 if($("ol[name='areaGeralPrincipal'] li").filter('[id="'+valueID+'"]').length>0){
                                    SubElement.children("div[name='tagUAs']").append('<a data-area-id="'+valueID+'" class="selected" title="'+valueAREA+'">'+valueAREA+'</a>');
                                 }else{
                                    SubElement.children("div[name='tagUAs']").append('<a data-area-id="'+valueID+'" title="'+valueAREA+'">'+valueAREA+'</a>');
                                 }                            
                            });
                            SubElement.children("div[name='tagUAs']").removeClass("no-display");


                            /*//--cria a ul para incluir as subareas--//
                             $( '<select multiple name="tagUAs" class="mediumgray no-display"></select>' ).appendTo(SubElement);
                            //--popula a coluna com os itens carregados--//
                            $.each(content, function(i, item) {
                                 var valueAREA=item.area;
                                 var valueID=item.id;

                                 if($("ol[name='areaGeralPrincipal'] li").filter('[id="'+valueID+'"]').length>0){
                                    SubElement.children("select").append('<option value="'+valueID+'" selected title="'+valueAREA+'">'+valueAREA+'</option>');
                                 }else{
                                    SubElement.children("select").append('<option value="'+valueID+'" title="'+valueAREA+'">'+valueAREA+'</option>');
                                 }                            
                            });
                            SubElement.children("select").removeClass("no-display");*/

                        }
                    };
                    xhttp.open("GET", urlOptions, true);
                    xhttp.send();

             }else{
                //--remove a class selected--//
                SubElement.removeClass("selected");
                SubElement.children("a").nextAll().remove();
             }
        });
        //--FIM carregamento do 3o nível--//
        //--FIM funcionamento do MENU--//
        //--carregamento da área Minhas Disciplinas--//
    
        $("#minhasdisciplinas").on('click', function() {

            if(!$("#minhasdisciplinas").hasClass("opened")){
                leftPos = (Math.ceil($("section[name='catalogoUAs']").offset().left))+980;
                leftPosLnk = Math.ceil($(".lnk-area-editavel").offset().left);
                $("#minhasdisciplinas").addClass("opened");
            }

            if(!$("section[name='catalogoUAs']").hasClass("disabled")){
                $("section[name='minhasUAs']").css( "opacity", "1" );
                $("section[name='catalogoUAs']").addClass("disabled");
                $("section[name='minhasUAs']").empty();
                $("section[name='minhasUAs']").addClass("enabled");
                $(".ctn-sections").addClass("fix-width");
               
                $("body").addClass("modal-ON");
                //--desabilitar o select--//
                $("select[name='numUAs']").attr('disabled',true);
                $("select[name='sortOptions']").attr('disabled',true);
                //--FIM desabilitar o select--//

                //--posiciona a section Minhas Unidades--//
                //--FIM posiciona a section Minhas Unidades--//
                $("section[name='minhasUAs']").removeClass("no-display");
                //--FIM posiciona a section Minhas Unidades--//
                //--insere o html da section Minhas Unidades----//           
                var htmlcontent='<nav class="ctn-navtabs" name="opcoesdisciplinas">';
                        htmlcontent+='<ul class="tabs">';
                            htmlcontent+='<li role="presentation" class="active item-tab" name="active"><a>Atuais</a></li>';
                            htmlcontent+='<li role="presentation" class="item-tab" name="approved"><a>Histórico</a></li>';
                        htmlcontent+='</ul>';
                        htmlcontent+='<input type="button" value="CRIAR DISCIPLINA" name="btn-ADD-disciplina" class="btn-absolute">';
                    htmlcontent+='</nav>';
                    htmlcontent+='<article name="listadeDisciplinas" class="ctn-disciplinas">';
                        htmlcontent+='<ul>';
                        htmlcontent+='</ul>';
                    htmlcontent+='</article>';
                    $("section[name='minhasUAs']").append(htmlcontent);
                //--FIM insere o html da section Minhas Unidades----//  

                //--ajuste de altura--//
                var windowHeight = window.innerHeight;
                var windowWidth = window.innerWidth;
                var topHeight = Math.ceil($("div[name='top-header']").height());
                var navHeight = Math.ceil($("div[name='nav-header']").height());
                var opcoesHeight = Math.ceil($("nav[name='opcoesdisciplinas']").height()+20);

                var alturaArticle = windowHeight-(topHeight+navHeight+opcoesHeight);

                $("section[name='minhasUAs']").children("article").css("height", alturaArticle);
                //--FIM ajuste de altura--//
                //--clica na aba active--//
                $("section[name='minhasUAs']").css("opacity","0");
                $("section[name='minhasUAs']").find("li[name='active']").click();
                $("section[name='minhasUAs']").animate({opacity: 1}, 500);

                //---move a section do catálogo--//
                var widthPosFix=windowWidth+980;
                var leftPosFix=(windowWidth-980)/2;
                    leftPosFix=(980-leftPosFix)+60;
                $(".fix-width").css("width",widthPosFix);
                $(".fix-width").animate({
                    left: -(leftPosFix)
                }, 500, function() {
                });
                //--FIM mova a section do catálogo--//
                //--move os elementos do header--//
                $(".sec-cabecalho-catalogo .tlt-content").animate({left: "-660"}, 500);
                $(".sec-cabecalho-catalogo .lnk-area-editavel").addClass("active");
                $(".sec-cabecalho-catalogo .lnk-area-editavel").animate({left: "0"}, 500, function() {
                });
                //--FIM move os elementos do header--//
                //--carrega as disciplinas--//
                //--FIM carrega as disciplinas--//
            }else{
                //---move a section do catálogo--//
                //--FIM mova a section do catálogo--//
                //---move a section Minhas Unidades--//
                var windowWidth = window.innerWidth;
                var leftPosFixRefresh=(windowWidth-980)/2;
                $(".fix-width").animate({
                    left: leftPosFixRefresh
                }, 500, function() {
                    $("section[name='minhasUAs']").animate({
                        opacity: 0
                        }, 200, function() {
                            $("section[name='catalogoUAs']").removeClass("disabled");
                            $("section[name='catalogoUAs']").removeClass("no-margin");
                            $("body").removeClass("modal-ON");
                            $("section[name='minhasUAs']").addClass("no-display");
                            $("section[name='minhasUAs']").removeClass("enabled");
                            $("#minhasdisciplinas").removeClass("opened");
                            //--desabilitar o select--//
                            $("select[name='numUAs']").attr('disabled',false);
                            $("select[name='sortOptions']").attr('disabled',false);
                            //--FIM desabilitar o select--//
                            $(".fix-width").css("left","0");
                            $(".ctn-sections").css("width","980px");
                            $(".ctn-sections").removeClass("fix-width");
                        });
                });
                //---FIM move a section Minhas Unidades--//
                //--move os elementos do header--//
                  $(".sec-cabecalho-catalogo .tlt-content").animate({left: "0"}, 500);
                  $(".sec-cabecalho-catalogo .lnk-area-editavel").removeClass("active");
                  $(".sec-cabecalho-catalogo .lnk-area-editavel").removeAttr("style");
                 //--FIM move os elementos do header--//
            }


        });
        //--FIM carregamento da área Minhas Disciplinas--//
        //--alteração de abas--//
        $("section[name='minhasUAs']").on('click','.item-tab', function() {

             //--altera o status das abas--//
             $("section[name='minhasUAs'] .item-tab").removeClass("active");
              $(this).addClass("active");
             //--FIM altera o status das abas--//
             //--carregamento de disciplinas ao clicar nas abas--//
             var tabNAME=$(this).attr('name'); 

             //--possíveis status: approved => disciplinas com as configurações concluídas (antigo histórico), active => disciplinas menos as com as configurações concluídas, sent => disciplinas enviadas para aprovação; new => discplinas que ainda não foram enviadas para aprovação; disapproved => disciplinas com solicitação de mudança--//

              //--carrega a lista de Disciplinas-//
                var idUser=getCookie("userid");
                var urlJSON="./json/json_LISTADISCIPLINAS.json?idcliente="+idUser+"&&status="+tabNAME+"&&orderby=title&&num=all";
                var xhttp = new XMLHttpRequest();
                        xhttp.addEventListener("loadstart", showLoading, false);
                        xhttp.addEventListener("loadend", hideLoading, false);
                        xhttp.addEventListener("error", errorLoading, false);

                xhttp.onreadystatechange = function() {
                   if (this.readyState == 4 && this.status == 200) {
                        var content=JSON.parse(this.responseText);
                        //--limpa a coluna com as áreas--//
                        $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").empty();

                        //--popula a área de disciplinas--//
                        $.each(content, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueNUMDEFAULT=item.numUA.default;
                             var valueNUMCONFIG=item.numUA.config;
                             var valueSTATUS=item.status;
                             var valueMSG=item.mensagem;

                             //--adiciona a class lst-NEW quando for uma nova disciplina--//
                             var classcontent='';
                             if(valueNUMDEFAULT==0){
                                            classcontent='lst-NEW';
                              }
                              var htmlcontent='<li id="'+valueID+'" class="item-disciplina '+classcontent+' '+valueSTATUS+'">';
                                    htmlcontent+='<div class="ctn-info-disciplina">';
                                    htmlcontent+='<h3>'+valueTITLE+'</h3>';
                                    htmlcontent+='<div class="ctn-config-UAs">';
                                    htmlcontent+='<p>';
                                        //--número de unidades--//    
                                        htmlcontent+='<span name="totalUAs">'+valueNUMCONFIG+'</span> / <span name="totalConfig">'+valueNUMDEFAULT+'</span>';
                                        //--FIM número de unidades--// 
                                        if(valueSTATUS!="sent" && valueSTATUS!="approved"){
                                            htmlcontent+='<i class="fa fa-pencil" aria-hidden="true"></i>';
                                        }
                                    htmlcontent+='</p>';
                                    htmlcontent+='</div>';

                                    htmlcontent+='<div class="ctn-flag">';
                                        //--coloca o ícone conforme o status--//
                                        if(valueSTATUS=="sent"){
                                            htmlcontent+='<i class="fa fa-flag" aria-hidden="true" alt="Enviado para avaliação" title="Enviada para Avaliação"></i>';
                                        }
                                        if(valueSTATUS=="new"){
                                            htmlcontent+='<i class="fa fa-exclamation-triangle" aria-hidden="true" alt="Disciplina em Configuração" title="Disciplina em Configuração"></i>';
                                        }
                                        if(valueSTATUS=="disapproved"){
                                            htmlcontent+='<i class="fa fa-ban" aria-hidden="true" alt="Disciplina com Revisões" title="Disciplina com Revisões"></i>';
                                        }
                                        if(valueSTATUS=="approved"){
                                            htmlcontent+='<i class="fa fa-check-circle" aria-hidden="true" alt="Disciplina Aprovada" title="Disciplina Aprovada"></i>';
                                        }
                                        //--FIM coloca o ícone conforme o status--//
                                    htmlcontent+='</div>';
                                    if(valueNUMDEFAULT>0){
                                      htmlcontent+='<i class="fa fa-angle-down" aria-hidden="true"></i>';
                                    }
                                    htmlcontent+='</div>';


                                    //--INSERE FORMS CONFORME O STATUS DA DISCIPLINA--//
                                    if(valueSTATUS=="new" && valueNUMDEFAULT==0){
                                      //--container de primeiro acesso--//
                                      htmlcontent+='<div class="ctn-config-inic">';
                                      htmlcontent+='<p>Você deve configurar o número de UAs que serão inseridas</p>';
                                      htmlcontent+='<input type="text" name="NUMtotalConfig" placeholder="0">';
                                        //--checkbox--//
                                        htmlcontent+='<div class="ctn-checkbox" name="ApplyConfig">';
                                        htmlcontent+='<input type="checkbox" name="optionVal" value="s"><label for="ckbox"><span></span></label>';
                                        htmlcontent+='</div>';
                                        htmlcontent+='<label for="ApplyConfig">Aplicar este número de UAs para todas as Disciplinas</label>';
                                        //--FIM checkbox--//

                                      htmlcontent+='</div>';
                                      htmlcontent+='<div class="ctn-btn-group">';
                                        htmlcontent+='<input type="button" value="SALVAR" name="btn-SAVE-disciplina" disabled>';
                                      htmlcontent+='</div>';
                                      //--FIM container de primeiro acesso--//
                                    }
                                    //--FIM INSERE FORMS CONFORME O STATUS DA DISCIPLINA--//

                                    //--INSERE MENSAGEM--//
                                    if(valueMSG!=""){
                                        htmlcontent+='<div class="ctn-tooltip" name="tooltipinic">';
                                        htmlcontent+='<i class="fa fa-chevron-left" aria-hidden="true"></i>';
                                        htmlcontent+='<p>'+valueMSG+'</p>';
                                        htmlcontent+='</div>';
                                    }
                                    //--FIM INSERE MENSAGEM--//

                                htmlcontent+='</li>';
                                $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").append(htmlcontent);
                        });
                    }
                };
                xhttp.open("GET", urlJSON, true);
                xhttp.send();
                //--FIM carrega a lista de Disciplinas--//




             //--FIM carregamento de disciplinas ao clicar nas abas--//
        });
        //--FIM alteração de abas--//

    //--carrega as unidades da disciplina--//
    $("section[name='minhasUAs']").on('click','.item-disciplina div.ctn-info-disciplina i.fa', function(e) {
        //--retorna o id da disciplina--//
        var idElement=$(this).parent().parent().attr('id');
        var Element=$(this).parent().parent();

        if(!Element.hasClass('active') && !Element.hasClass('lst-NEW')){
              Element.addClass('active');
              Element.children("div.ctn-info-disciplina").children("i.fa").removeClass("fa-angle-down");
              Element.children("div.ctn-info-disciplina").children("i.fa").addClass("fa-angle-up");

              //--carrega a lista de Unidades--//
              var urlListaUAs="./json/json_LISTAUAs.json?class=all&&iddisc="+idElement+"&&orderby=position&&num=all";
              var xhttp = new XMLHttpRequest();
                        xhttp.addEventListener("loadstart", showLoading, false);
                        xhttp.addEventListener("loadend", hideLoading, false);
                        xhttp.addEventListener("error", errorLoading, false);
              xhttp.onreadystatechange = function() {
                 if (this.readyState == 4 && this.status == 200) {
                      var content=JSON.parse(this.responseText);
                      //--limpa a coluna com as áreas--//
                      Element.children("div.ctn-info-disciplina").nextAll().remove();
                      Element.children("div.ctn-info-disciplina").after( '<ul class="lst-UAs"></ul>' );
                      //--popula a área de unidades do catálogo--//
                      $.each(content, function(i, item) {
                            var listaUA=item.list;
                            //--ordena lista--//
                            listaUA.sort(function(a, b) {
                                return parseFloat(a.posicao) - parseFloat(b.posicao);
                            });
                            //--FIM ordena lista--//

                            $.each(listaUA, function(i, item) {
                                   var valueTITLE=item.title;
                                   var valueID=item.id;
                                   var valueTAGTITLE=item.tag.title;
                                   var valueTAGID=item.tag.id;
                                   var valueURL=item.url;
                                   var valueOBJETIVOS01=item.objetivos.obj01;
                                   var valueOBJETIVOS02=item.objetivos.obj02;
                                   var valueOBJETIVOS03=item.objetivos.obj03;

                                    var htmlcontent='<li id="'+valueID+'" data-url-ua="'+valueURL+'">';
                                          htmlcontent+='<a>'+valueTITLE+'</a>'; 
                                          htmlcontent+='<div class="ctn-tool-icon">';
                                                  htmlcontent+='<i class="fa fa-window-restore btn-open-UA" aria-hidden="true" alt="Acessar a Unidade" title="Acessar a Unidade"></i>';
                                                  htmlcontent+='<i class="fa fa-trash btn-del-UA" aria-hidden="true" alt="Excluir a Unidade" title="Excluir a Unidade"></i>';
                                          htmlcontent+='</div>';

                                        htmlcontent+='</li>';

                                       Element.children("ul.lst-UAs").append( htmlcontent );
                            });
                      });
                        Element.children("ul.lst-UAs").sortable({
                            start: function (event, ui) {
                                var currPos = ui.item.index();
                                var idItem = $('ul.lst-UAs li').eq(currPos).attr( 'id' );

                            },
                            update: function(e, ui) {
                                var novaPosicao = ui.item.index();
                                var idUser =getCookie("userid");
                                var idUnidade = $('ul.lst-UAs li').eq(novaPosicao).attr( 'id' );
                                var idDisciplina = $('ul.lst-UAs li').eq(novaPosicao).parent().parent().attr( 'id' );
                                

                             

                                var data = new FormData();
                                    data.append('idUser', idUser);
                                    data.append('idUnidade', idUnidade);
                                    data.append('idDisciplina', idDisciplina);
                                    data.append('novaPosicao', novaPosicao);
                                    data.append('metodo','updateposicaoua');
                                var msg="";
                                var callback=null;
                                    sendConfing(data,msg,callback);

                            }
                        });
                        Element.children("ul.lst-UAs").disableSelection();
                        //---ADICIONA OS BOTÕES DE AÇÃO CONFORME O STATUS--//
                                var htmlcontentFORM='';
                                  //--botões--//
                                  if(Element.hasClass("new")){
                                    var valueNUMDEFAULT=Element.children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("span[name='totalConfig']").html();
                                    var valueNUMCONFIG=Element.children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("span[name='totalUAs']").html();
                                        if(valueNUMCONFIG==valueNUMDEFAULT){
                                          htmlcontentFORM='<div class="ctn-btn-group">';
                                            htmlcontentFORM+='<input type="button" value="ENVIAR" name="btn-SEND-disciplina">';
                                            htmlcontentFORM+='<input type="button" value="EXCLUIR" name="btn-DEL-disciplina">';
                                          htmlcontentFORM+='</div>';
                                        }else{
                                          htmlcontentFORM='<div class="ctn-btn-group">';
                                            htmlcontentFORM+='<input type="button" value="EXCLUIR" name="btn-DEL-disciplina">';
                                          htmlcontentFORM+='</div>';
                                        }
                                  }
                                  if(Element.hasClass("disapproved")){
                                          htmlcontentFORM='<div class="ctn-btn-group">';
                                            htmlcontentFORM+='<input type="button" value="EXCLUIR" name="btn-DEL-disciplina">';
                                          htmlcontentFORM+='</div>';
                                  }
                                  if(Element.hasClass("sent")){
                                          htmlcontentFORM='<div class="ctn-btn-group">';
                                           var logPapel=getCookie("userpapel");
                                           if(logPapel=="PR"){
                                                htmlcontentFORM+='<input type="button" value="EXCLUIR" name="btn-DEL-disciplina">';
                                           }else{
                                                htmlcontentFORM+='<input type="button" value="APROVAR" name="btn-APPROVED-disciplina">';
                                                htmlcontentFORM+='<input type="button" value="DEVOLVER" name="btn-GIVEBACK-disciplina">';
                                           }                                            
                                           htmlcontentFORM+='</div>';
                                  }
                                  if(Element.hasClass("approved")){
                                          htmlcontentFORM='<div class="ctn-btn-group">';
                                            htmlcontentFORM+='<input type="button" value="REABRIR" name="btn-REOPEN-disciplina">';
                                            htmlcontentFORM+='<input type="button" value="DUPLICAR" name="btn-DUPLICATE-disciplina">';
                                          htmlcontentFORM+='</div>';
                                  }
                                  
                                Element.children("ul.lst-UAs").after( htmlcontentFORM );
                                  //--FIM botões--//
                        //--FIM ADICIONA OS BOTÕES DE AÇÃO CONFORME O STATUS--//
                  }
              };
              xhttp.open("GET", urlListaUAs, true);
              xhttp.send();
              //--FIM carrega a lista de Unidades--//
        }else{
            if(!Element.hasClass('lst-NEW')){
              Element.removeClass('active');
              Element.children("div.ctn-info-disciplina").children("i.fa").addClass("fa-angle-down");
              Element.children("div.ctn-info-disciplina").children("i.fa").removeClass("fa-angle-up");
              Element.children("div.ctn-info-disciplina").nextAll().remove();
            }
        }

        e.stopPropagation();
    });
     //--FIM carrega as unidades da disciplina--//
    //--ativa o botão salvar na alteração do input--//
    $("section[name='minhasUAs']").on('change',"input[name='NUMtotalConfig']", function() {
      var Element=$(this);
      var idElement=Element.parent().parent().attr('id');
      var ElementValue=Element.val();
      if(ElementValue>0){
          $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").children("li#"+idElement).children("div.ctn-btn-group").children("input[name='btn-SAVE-disciplina']").attr('disabled',false);
      }
    });
    //--FIM ativa o botão salvar na alteração do input--//  
    //--LOGIN--//
        $("input[id='user']").on('change focus', function() {
                $("div[name='ctn-user']").removeClass("error");
                $("div[name='ctn-user']").children("label").empty();
                $("div[name='ctn-user']").children("label").append("Usuário");

                if($("input[id='user']").val().length>0 && $("input[id='pass']").val().length){
                    $("input[name='btn-SEND-login']").removeAttr("disabled");
                }else{
                    $("input[name='btn-SEND-login']").attr("disabled",true);
                }
        });
        $("input[id='pass']").on('change focus', function() {
                $("div[name='ctn-pass']").removeClass("error");
                $("div[name='ctn-pass']").children("label").empty();
                $("div[name='ctn-pass']").children("label").append("Senha");

                if($("input[id='user']").val().length>0 && $("input[id='pass']").val().length){
                    $("input[name='btn-SEND-login']").removeAttr("disabled");
                }else{
                    $("input[name='btn-SEND-login']").attr("disabled",true);
                }
        });
        $("input[name='btn-SEND-login']").on('click', function() {
                var userLogin = $("input[id='user']").val();
                var passLogin = $("input[id='pass']").val();

                getLogin(userLogin,passLogin);
        });
        //--logout--//
        $("a[name='btn-GET-logout']").on('click', function(e) {
            e.preventDefault();
            $("body").addClass("modal-ALERT");
            $(window).scrollTop( 0 );
            var htmlcontent='<div class="ctn-modal-alert">';
                    htmlcontent+='<div class="wrapper-modal">';
                        htmlcontent+='<h1>SAIR:</h1>';
                        htmlcontent+='<p>Deseja sair do catálogo?</p>';
                          htmlcontent+='<div class="ctn-btn-group">';
                            htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-CONFIRM-logout">';
                            htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';

                          htmlcontent+='</div>';
                    htmlcontent+='</div>';
                htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        });
        $("#ctn-all").on('click',"input[name='btn-CONFIRM-logout']", function() {
                var userLogin = $("input[id='user']").val();
                var passLogin = $("input[id='pass']").val();

              getLogout(userLogin);
        });
    
    //--FIM LOGIN--//
    //--adiciona a Unidade em uma disciplina--//
    $("#ctnlistaUAs").on('click',"input.btn-add-UA", function() {
          var Element=$(this);
          var idElement=Element.parent().attr('id');
            $("body").removeClass("loading");
            $("body").addClass("modal-ALERT");
            $(window).scrollTop( 0 );
            $("#ctn-all").empty();        

            //--busca as disciplinas--//
            var optionscontent='<option value="" selected>Lista de Disciplinas</option>';
            getDisciplinas("active","title",function(data){

                $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueNUMDEFAULT=item.numUA.default;
                             var valueNUMCONFIG=item.numUA.config;
                             var valueSTATUS=item.status;

                             optionscontent+='<option value="'+valueID+'">'+valueTITLE+'</option>';

                });
                             
                var lblUA=$("#ctnlistaUAs").children("#"+idElement).children("div.ctn-infos-UA").children("h4").children("a").html();
                var sublblUA=$("#ctnlistaUAs").children("#"+idElement).children("div.ctn-infos-UA").children("h5").children("a").html();
                var htmlcontent='<div class="ctn-modal-alert ctn-add-ua" name="config-add-ua" data-id-ua="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>'+lblUA+'</h1>';
                            htmlcontent+='<h2>'+sublblUA+'</h2>';
                            htmlcontent+='<div class="ctn-conf-add">';
                            htmlcontent+='<p>Adicionar esta Unidade à disciplina: </p> ';
                                htmlcontent+='<div class="ctn-select">';
                                    htmlcontent+='<select name="SELECT-disciplina">';
                                        htmlcontent+=optionscontent;
                                    htmlcontent+='</select>'; 
                                    htmlcontent+='<label for="SELECT-disciplina">Lista de Disciplina</label>';
                                htmlcontent+='</div>';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="ADICIONAR" name="btn-SEND-action" disabled>';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        });       
    });
    $("#ctn-all").on('change',"div[name='config-add-ua'] select[name='SELECT-disciplina']", function() {
            $("#ctn-all input[name='btn-SEND-action']").attr("disabled",false);
    });

    $("#ctn-all").on('click',"div[name='config-add-ua'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='config-add-ua'] select[name='SELECT-disciplina']").find('option:selected').val();
        var idUser=getCookie("userid");
        if(idUser===null){
            alertMessage("Sua sessão expirou!","login");
        }
        var idUA=$("div[name='config-add-ua']").attr('data-id-ua');

        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('idUA', idUA);
            data.append('metodo','adicionaunidade');

        var msg="A Unidade foi adicionada com sucesso!";

        var callback=null;

        if(idUser===null){
            alertMessage("Sua sessão expirou!","login");
        }else{
             sendConfing(data,msg,callback);
        }
           
        return;
    });
    //--FIM adiciona a Unidade em uma disciplina--//
    //--salvar o número de UAS (primeiro acesso)--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-SAVE-disciplina']", function() {
        var Element=$(this);
        var idDisciplina=Element.parent().parent().attr('id');
        var idUser=getCookie("userid");
        var numUAS=Element.parent().parent().find("input[name='NUMtotalConfig']").val();
        var optionVAL;

        if(Element.parent().parent().find("input[name='optionVal']").is(':checked')){
            optionVAL="s";
        }else{
            optionVAL="n";
        }

        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('numUAS', numUAS);
            data.append('optionVAL', optionVAL);
            data.append('metodo','primeiraconfig');

        var msg = "Disciplina configurada com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
     });
    //--FIM salvar o número de UAS (primeiro acesso)--//
    //--solicitação para excluir uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-DEL-disciplina']", function() {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var lblDISCIPLINA=$("article[name='listadeDisciplinas']").children("ul").children("#"+idElement).children("div.ctn-info-disciplina").children("h3").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-del-disciplina" name="send-del-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Excluir Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add">';
                            htmlcontent+='<p>Deseja prosseguir com a solicitação de EXCLUSÃO da disciplina:</p> ';
                            htmlcontent+='<p><strong>'+lblDISCIPLINA+'</strong></p> ';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SEND-action">';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);


     });
     $("#ctn-all").on('click',"div[name='send-del-disciplina'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-del-disciplina']").attr('data-id-disciplina');
        var idUser=getCookie("userid");


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('metodo','excluirdisciplina');

        var msg="A sua solicitação de EXCLUSÃO foi enviada com sucesso!";

        var callback=null;

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM solicitação para excluir uma disciplina--//
    //--envio para aprovação de uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-SEND-disciplina']", function() {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        //--busca as disciplinas--//
            var optionscontent='<option value="" selected>Selecionar o coordenador</option>';
            getCoordenadores(function(data){

                $.each(data, function(i, item) {
                             var valueNAME=item.name;
                             var valueID=item.id;
                             optionscontent+='<option value="'+valueID+'">'+valueNAME+'</option>';
                });
                             
                var lblDISCIPLINA=$("article[name='listadeDisciplinas']").children("ul").children("#"+idElement).children("div.ctn-info-disciplina").children("h3").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-send-disciplina" name="send-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Enviar disciplina para aprovação</h1>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                            htmlcontent+='<p class="full-width">Confirma o envio da disciplina:<br>';
                            htmlcontent+='<strong>'+lblDISCIPLINA+'</strong></p> ';
                                htmlcontent+='<div class="ctn-select full-width">';
                                    htmlcontent+='<select name="SELECT-coordenador">';
                                        htmlcontent+=optionscontent;
                                    htmlcontent+='</select>'; 
                                    htmlcontent+='<label for="SELECT-coordenador">Selecionar o coordenador</label>';
                                htmlcontent+='</div>';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="ENVIAR" name="btn-SEND-action" disabled>';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        });       
     });
    $("#ctn-all").on('change',"div[name='send-disciplina'] select[name='SELECT-coordenador']", function() {
            $("#ctn-all input[name='btn-SEND-action']").attr("disabled",false);
    });

    $("#ctn-all").on('click',"div[name='send-disciplina'] input[name='btn-SEND-action']", function() {
        var idCoordenador=$("#ctn-all div[name='send-disciplina'] select[name='SELECT-coordenador']").find('option:selected').val();
        var idUser=getCookie("userid");
        var idDisciplina=$("div[name='send-disciplina']").attr('data-id-disciplina');

        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('idCoordenador', idCoordenador);
            data.append('metodo','aprovacaodisciplina');

        var msg="A Disciplina foi enviada com sucesso para aprovação!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM envio para aprovação de uma disciplina--//
    //--reabrir uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-REOPEN-disciplina']", function() {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var lblDISCIPLINA=$("article[name='listadeDisciplinas']").children("ul").children("#"+idElement).children("div.ctn-info-disciplina").children("h3").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-reabrir-disciplina" name="send-reabrir-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Reabrir Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add">';
                            htmlcontent+='<p>Confirma a reabertura da disciplina:</p> ';
                            htmlcontent+='<p><strong>'+lblDISCIPLINA+'</strong></p> ';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SEND-action">';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);


     });
     $("#ctn-all").on('click',"div[name='send-reabrir-disciplina'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-reabrir-disciplina']").attr('data-id-disciplina');
        var idUser=getCookie("userid");


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('metodo','reabrirdisciplina');

        var msg="Reabertura feita com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM reabrir uma disciplina--//
    //--duplicar uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-DUPLICATE-disciplina']", function() {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var htmlcontent='<div class="ctn-modal-alert ctn-duplicar-disciplina" name="send-duplicar-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Duplicar Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                                htmlcontent+='<div class="ctn-input full-width margin-top-bottom">';
                                    htmlcontent+='<input type="text" class="full-width" name="nomesdisciplinas" placeholder="Entre com o(s) nome(s) das novas disciplinas separados por ponto-e-vírgula">';
                                    htmlcontent+='<label for="nomesdisciplinas">Entre com o(s) nome(s) das novas disciplinas separados por ponto-e-vírgula</label>';
                                htmlcontent+='</div>'; 
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="DUPLICAR" name="btn-SEND-action" disabled>';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);


     });
    $("#ctn-all").on('change',"div[name='send-duplicar-disciplina'] input[name='nomesdisciplinas']", function() {
            $("#ctn-all input[name='btn-SEND-action']").attr("disabled",false);
    });
    $("#ctn-all").on('click',"div[name='send-duplicar-disciplina'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-duplicar-disciplina']").attr('data-id-disciplina');
        var idUser=getCookie("userid");
        var listaDisciplina=$("#ctn-all div[name='send-duplicar-disciplina'] input[name='nomesdisciplinas']").val();


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('listaDisciplina', listaDisciplina);
            data.append('metodo','duplicardisciplina');

        var msg="Disciplina duplicada com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM duplicar uma disciplina--//

    //--criar uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-ADD-disciplina']", function() {
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 


        var optionscontent='<option value="" selected>Lista de Cursos</option>';
        getCursos(function(data){

                $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;

                             optionscontent+='<option value="'+valueID+'">'+valueTITLE+'</option>';

                });
                             

                var htmlcontent='<div class="ctn-modal-alert ctn-add-disciplina" name="config-add-disciplina">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Solicitar a Criação de Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                                htmlcontent+='<div class="ctn-input full-width margin-top-bottom">';
                                    htmlcontent+='<input type="text" class="full-width" name="nomedisciplina" placeholder="Nome da Disciplina">';
                                    htmlcontent+='<label for="nomedisciplina">Nome da Disciplina</label>';
                                htmlcontent+='</div>';
                                htmlcontent+='<div class="ctn-select full-width">';
                                    htmlcontent+='<select name="SELECT-curso" class="full-width">';
                                        htmlcontent+=optionscontent;
                                    htmlcontent+='</select>'; 
                                    htmlcontent+='<label for="SELECT-curso">Lista de Cursos</label>';
                                htmlcontent+='</div>';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="ADICIONAR" name="btn-SEND-action" disabled>';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        });       
     });
     $("#ctn-all").on('change',"div[name='config-add-disciplina'] input[name='nomedisciplina']", function() {
            $("#ctn-all").on('change',"div[name='config-add-disciplina'] select[name='SELECT-curso']", function() {
                $("#ctn-all input[name='btn-SEND-action']").attr("disabled",false);
            });
    });

    $("#ctn-all").on('click',"div[name='config-add-disciplina'] input[name='btn-SEND-action']", function() {
        var nomeDisciplina=$("#ctn-all div[name='config-add-disciplina'] input[name='nomedisciplina']").val();
        var idUser=getCookie("userid");
        var idCurso=$("#ctn-all div[name='config-add-disciplina'] select[name='SELECT-curso']").find('option:selected').val();

        var data = new FormData();
            data.append('nomeDisciplina', nomeDisciplina);
            data.append('idUser', idUser);
            data.append('idCurso', idCurso);
            data.append('metodo','novadisciplina');

        var msg="A solicitação para criação da disciplina foi enviada com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM criar uma disciplina--//
    //--aprovar uma disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-APPROVED-disciplina']", function(e) {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var lblDISCIPLINA=$("article[name='listadeDisciplinas']").children("ul").children("#"+idElement).children("div.ctn-info-disciplina").children("h3").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-aprovar-disciplina" name="send-aprovar-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Aprovar Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                            htmlcontent+='<p class="full-width">Confirma a aprovação da disciplina:</p> ';
                            htmlcontent+='<p class="full-width"><strong>'+lblDISCIPLINA+'</strong>?</p> ';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SEND-action">';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        e.stopPropagation();
    
    });

    $("#ctn-all").on('click',"div[name='send-aprovar-disciplina'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-aprovar-disciplina']").attr('data-id-disciplina');
        var idUser=getCookie("userid");


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('metodo','aprovardisciplina');

        var msg="Disciplina aprovada com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM aprovar uma disciplina--//
    //--devolver uma disciplina--//
     $("section[name='minhasUAs']").on('click',"input[name='btn-GIVEBACK-disciplina']", function(e) {
        var Element=$(this);
        var idElement=Element.parent().parent().attr('id');
     
        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var lblDISCIPLINA=$("article[name='listadeDisciplinas']").children("ul").children("#"+idElement).children("div.ctn-info-disciplina").children("h3").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-devolver-disciplina" name="send-devolver-disciplina" data-id-disciplina="'+idElement+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Devolver Disciplina</h1>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                            htmlcontent+='<p class="full-width">Confirma a devolução da disciplina:<br>';
                            htmlcontent+='<strong>'+lblDISCIPLINA+'</strong> para o professor?</p> ';
                                htmlcontent+='<div class="ctn-input full-width margin-top-bottom">';
                                    htmlcontent+='<input type="text" class="full-width" name="motivodevolucao" placeholder="Motivo da devolução">';
                                    htmlcontent+='<label for="motivodevolucao">Motivo da devolução</label>';
                                htmlcontent+='</div>';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="DEVOLVER" name="btn-SEND-action" disabled>';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);
        e.stopPropagation();
    
    });
    $("#ctn-all").on('change',"div[name='send-devolver-disciplina'] input[name='motivodevolucao']", function() {
                $("#ctn-all input[name='btn-SEND-action']").attr("disabled",false);
    });
    $("#ctn-all").on('click',"div[name='send-devolver-disciplina'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-devolver-disciplina']").attr('data-id-disciplina');
        var idUser=getCookie("userid");
        var motivoDisciplina=$("#ctn-all div[name='send-devolver-disciplina'] input[name='motivodevolucao']").val();


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('motivoDisciplina', motivoDisciplina);
            data.append('metodo','devolverdisciplina');

        var msg="Disciplina devolvida com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM devolver uma disciplina--//
    //--abrir uma UA--//
    $("section[name='minhasUAs']").on('click',"i.btn-open-UA", function(e) {
      var Element=$(this);
      var idUA=Element.parent().parent().attr('id');
      var urlUA=Element.parent().parent().attr('data-url-ua');

      $("body").removeClass("loading");
      $("body").addClass("modal-ALERT");
      $(window).scrollTop( 0 );
      $("#ctn-all").empty(); 

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var larguraModal=Math.ceil((96*windowWidth)/100);
        var alturaModal=Math.ceil((96*windowHeight)/100);
        var leftModal=(windowWidth-larguraModal)/2;
        var topModal=(windowHeight-alturaModal)/2;

        var valHeight=alturaModal-40;



      var htmlcontent='<div class="ctn-modal-alert full-modal" name="view-unidade">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<div class="ctn-btn-group ctn-btn-modal-top">';
                                htmlcontent+='<input type="button" value="REPORTAR UM PROBLEMA" name="btn-REPORTPROBLEM-alert" class="lnk-btn">';
                                htmlcontent+='<input type="button" value="FECHAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                            htmlcontent+='<iframe src="'+urlUA+'" frameborder="0" width="'+larguraModal+'" height="'+valHeight+'" align="middle" scrolling="no" class="ctn-iframe-ua"></iframe>';
                            htmlcontent+='</div>';    
                         
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);

                $(".full-modal").css("width", larguraModal);
                $(".full-modal").css("height", alturaModal);
                $(".full-modal").css('left', leftModal);
                $(".full-modal").css('top', topModal);


      e.stopPropagation();
    });
    $("article[name='listadeUAs']").on('click',"a.lnk-UA", function(e) {
        e.preventDefault();
        var Element=$(this);
        var urlUA = Element.attr('href');

        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var larguraModal=Math.ceil((96*windowWidth)/100);
        var alturaModal=Math.ceil((96*windowHeight)/100);
        var leftModal=(windowWidth-larguraModal)/2;
        var topModal=(windowHeight-alturaModal)/2;

        var valHeight=alturaModal-40;

        var htmlcontent='<div class="ctn-modal-alert full-modal" name="view-unidade">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<div class="ctn-btn-group ctn-btn-modal-top">';
                                htmlcontent+='<input type="button" value="REPORTAR UM PROBLEMA" name="btn-REPORTPROBLEM-alert" class="lnk-btn">';
                                htmlcontent+='<input type="button" value="FECHAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                            htmlcontent+='<div class="ctn-conf-add full-width">';
                            htmlcontent+='<iframe src="'+urlUA+'" frameborder="0" width="'+larguraModal+'" height="'+valHeight+'" align="middle" scrolling="no" class="ctn-iframe-ua"></iframe>';
                            htmlcontent+='</div>';    
                         
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);

                $(".full-modal").css("width", larguraModal);
                $(".full-modal").css("height", alturaModal);
                $(".full-modal").css('left', leftModal);
                $(".full-modal").css('top', topModal);

    });
    //--FIM abrir uma UA--//
    //--excluir uma UA--//
    $("section[name='minhasUAs']").on('click',"i.btn-del-UA", function(e) {
        var Element=$(this);
        var idUA=Element.parent().parent().attr('id');
        var idDisciplina=Element.parent().parent().parent().parent().attr('id');

        $("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 
      
        var lblUnidade=$("article[name='listadeDisciplinas']").children("ul").children("#"+idDisciplina).children("ul").children("#"+idUA).children("a").html();

                var htmlcontent='<div class="ctn-modal-alert ctn-del-unidade" name="send-del-unidade" data-id-disciplina="'+idDisciplina+'" data-id-unidade="'+idUA+'">';
                        htmlcontent+='<div class="wrapper-modal">';
                            htmlcontent+='<h1>Excluir Unidade</h1>';
                            htmlcontent+='<div class="ctn-conf-add">';
                            htmlcontent+='<p>Confirma a EXCLUSÃO da Unidade:</p> ';
                            htmlcontent+='<p><strong>'+lblUnidade+'</strong></p> ';
                            htmlcontent+='</div>';    
                            htmlcontent+='<div class="ctn-btn-group">';
                                htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SEND-action">';
                                htmlcontent+='<input type="button" value="CANCELAR" name="btn-CLOSE-alert" class="lnk-btn">';
                            htmlcontent+='</div>';
                        htmlcontent+='</div>';
                    htmlcontent+='</div>';
                $("#ctn-all").append(htmlcontent);

        e.stopPropagation();
     });
     $("#ctn-all").on('click',"div[name='send-del-unidade'] input[name='btn-SEND-action']", function() {
        var idDisciplina=$("#ctn-all div[name='send-del-unidade']").attr('data-id-disciplina');
        var idUA=$("#ctn-all div[name='send-del-unidade']").attr('data-id-unidade');
        var idUser=getCookie("userid");


        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUA', idUA);
            data.append('idUser', idUser);
            data.append('metodo','excluirunidade');

        var msg="A Unidade fui EXCLUÍDA com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM excluir uma UA--//
    //--salva número de Unidades de uma Disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-SAVE-num']", function() {
      var Element=$(this);
      var idDisciplina=Element.parent().parent().parent().parent().parent().attr('id');
      var idUser=getCookie("userid");
      var numUnidades=$("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").children("li[id='"+idDisciplina+"']").children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("span[name='editConfig']").children("input[name='NUMtotalConfig']").val();

        var data = new FormData();
            data.append('idDisciplina', idDisciplina);
            data.append('idUser', idUser);
            data.append('numUnidades', numUnidades);
            data.append('metodo','alteranumerodeua');

        var msg="Número de unidades da disciplina alterado com sucesso!";

        var callback=$("section[name='minhasUAs']").find("li[name='active']").click();

            sendConfing(data,msg,callback);
        return;
    });
    //--FIM salva número de Unidades de uma Disciplina--//
    //--CANCELA salva número de Unidades de uma Disciplina--//
    $("section[name='minhasUAs']").on('click',"input[name='btn-CANCEL-num']", function(e) {
        var Element=$(this);
        var idDisciplina=Element.parent().parent().parent().parent().parent().attr('id');
      
        $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").children("li[id='"+idDisciplina+"']").children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("span[name='editConfig']").remove();
        $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").children("li[id='"+idDisciplina+"']").children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("span[name='totalConfig']").css("display","initial");
        $("section[name='minhasUAs']").children("article[name='listadeDisciplinas']").children("ul").children("li[id='"+idDisciplina+"']").children("div.ctn-info-disciplina").children("div.ctn-config-UAs").children("p").children("i.fa-pencil").css("display","initial");
        e.stopPropagation();
    });
    //--FIM CANCELA salva número de Unidades de uma Disciplina--//

    //--tagfilter--//
    $("aside[name='categorias'] nav ul").on('click',"div[name='tagUAs'] a", function() {
      var Element=$(this);

      if (!Element.hasClass("selected")){
            Element.addClass("selected");
            var primLabel=Element.parent().parent().parent().parent().children("a").text();
            var secLabel=Element.parent().parent().children("a").text();
            var labelCont=primLabel+" > "+secLabel;

            var valueElement=Element.attr("data-area-id");
            var labelElement=Element.text();
            var htmlcontent = '<li id="'+valueElement+'" alt="'+labelCont+'" title="'+labelCont+'"><a>'+labelElement+'</a></li>';
            $(".filterlabels").append( htmlcontent ); 

              if($("aside[name='categorias'] nav ul div[name='tagUAs'] a").filter('[data-area-id="'+valueElement+'"]').length>0){
                $("aside[name='categorias'] nav ul div[name='tagUAs'] a").filter('[data-area-id="'+valueElement+'"]').addClass("selected");
              }   

        }else{
             Element.removeClass("selected");
             var idElement=Element.attr("data-area-id");
             $(".filterlabels").children("#"+idElement).remove();

              if($("aside[name='categorias'] nav ul div[name='tagUAs'] a").filter('[data-area-id="'+idElement+'"]').length>0){
                $("aside[name='categorias'] nav ul div[name='tagUAs'] a").filter('[data-area-id="'+idElement+'"]').removeClass("selected");
              } 


        }
    });
    $(".filterlabels").on('click',"li", function() {
        var Element=$(this);
        var idElement=Element.attr('id');
        $(".filterlabels").children("#"+idElement).remove();
        //--busca no select e retira o selected do option correspondente--//
        $("aside[name='categorias'] nav ul li div[name='tagUAs'] a").each(function() {
            if($( this ).attr('data-area-id')==idElement){
                $( this ).removeClass("selected");
            }
        });
        //--FIM busca no select e retira o selected do option correspondente--//
    });
    //--tagfilter--//


    //--FIND--//
    //search; tag; level-prim; level-sec; position; numresult; sort;//

    var findElements = ["buscaunidade", "sortOptions", "numUAs"];
    $(findElements).each(function(index, item) {
        $("[name='"+item+"']").on( "change", function(e) {
            var Element=$(this);
            findUAs(Element);
            e.stopPropagation();
        });
    });

    $("aside[name='categorias'] nav ul").on( "click", "[name='areaGeral']", function(e) {
            var Element=$(this);
            findUAs(Element);
            e.stopPropagation();
    });

    $("aside[name='categorias'] nav ul").on( "click", "[name='areaFormacao']", function(e) {
            var Element=$(this);
            findUAs(Element);
            e.stopPropagation();
    });
    $("aside[name='categorias'] nav ul").on( "click", "div[name='tagUAs']", function(e) {
            var Element=$(this);
            findUAs(Element);
            e.stopPropagation();
    });
    $("ol[name='areaGeralPrincipal']").on( "click", "li", function(e) {
            var Element=$(this);
            findUAs(Element);
            e.stopPropagation();
    });

    $("[name='pagenumber']").on( "change", function(e) {
            var Element=$(this);
            var maxPages=parseInt($("ul[name='pagination'] li").last().text());
            var getInputPages=parseInt($("ul[name='pagination'] input[name='pagenumber']").val());
            if(getInputPages>maxPages){
                $("ul[name='pagination'] input[name='pagenumber']").val(maxPages);
            }
            findUAs(Element);
            e.stopPropagation();
    });


    function findUAs(){
       var Element=$(this);
       var valuePrimFind; var valueSearchFind; var valueSecFind = new Array(); var valueSecFindTEMP = new Array(); var valuePositionFind; var valueSortFind; var valueTagFind = new Array(); var valueNumResultsFind; var valueSearch = new Array();
       $("[data-find-type]").each(function(){
                var DataFindType = $(this).attr('data-find-type');
          

                if(DataFindType=="search"){
                    valueSearchFind=$(this).val();
                    //--tratar as palavras--//
                    valueSearch=valueSearchFind.split(" ");
                    for (i = 0; i < valueSearch.length; i++) {
                            var txtword = valueSearch[i];
                            if(txtword.length<3){
                                index = valueSearch.indexOf(txtword);
                                valueSearch.splice(index, 1);
                            }
                    }
                    //--FIM tratar as palavras--//
                }
                if(DataFindType=="level-prim"){
                    //--busca a li .select--//
                    $("aside[name='categorias'] nav ul li[name='areaGeral'].selected").each(function(){
                        valuePrimFind=$(this).attr('id');
                    });
                    if(valuePrimFind==null){
                        valuePrimFind="all";
                    }
                    //--FIM busca a li .select--//
                }
                if(DataFindType=="level-sec"){
                     //--busca a li .select--//
                    $("aside[name='categorias'] nav ul li[name='areaGeral'].selected ul li[name='areaFormacao'].selected").each(function(){
                        valueSecFindTEMP.push($(this).attr('id'));
                    });
                    //--FIM busca a li .select--//
                }
                //--area formação pode não existir na página--//
                if(valueSecFindTEMP.length==0){
                        valueSecFind.toString();
                        valueSecFind="all";
                }else{
                        valueSecFind = new Array();
                        valueSecFind = valueSecFindTEMP;
                }
                //--FIM area formação pode não existir na página--//

                if(DataFindType=="tag"){
                    //--busca tag--//
                    $("ol.filterlabels li").each(function(){
                        valueTagFind.push($(this).attr('id'));
                    });
                    if(valueTagFind.length==0){
                        valueTagFind="all";
                    }
                    //--FIM busca tag--//

                }
                if(DataFindType=="position"){
                    valuePositionFind=$(this).val();
                }
                if(DataFindType=="numresult"){
                    valueNumResultsFind=$(this).val();
                }

                if(DataFindType=="sort"){
                    valueSortFind=$(this).val();
                }
        });
        
        

        parameters={classif:"all",modo:"find",orderby:valueSortFind, inic:valuePositionFind, num:valueNumResultsFind, areaGeral:valuePrimFind, areaFormacao:valueSecFind, areaGeralPrincipal:valueTagFind, words:valueSearch};
       // event.stopPropagation();
        //--carrega a lista de Unidades--//
        carregaUAs(parameters);
        //--FIM carrega a lista de Unidades--//
    }
    //--FIND--//

    //--bloqueia o clique nos link da section desabilitada--//
    $("section").on('click', function(e) {
       if($(this).hasClass("disabled")){
          e.preventDefault(); 
      }
    }); 
    //--FIM bloqueia o clique nos link da section desabilitada--//

    //--editar o número de unidades--//
    $("section[name='minhasUAs']").on('click',"i.fa-pencil", function(e) {
        var Element=$(this);
        var idElement=Element.parent().parent().parent().parent().attr('id');
        var valorInput=$("section[name='minhasUAs'] #"+idElement+" span[name='totalConfig']").html();

        $("section[name='minhasUAs'] #"+idElement+" span[name='totalConfig']").css("display","none");
        $("section[name='minhasUAs'] #"+idElement+" i.fa-pencil").css("display","none");
        

        var htmlcontent = '<span name="editConfig">';
                htmlcontent+='<input type="text" name="NUMtotalConfig" value="'+valorInput+'">'; 
                htmlcontent+='<input type="button" name="btn-SAVE-num" value="&#xf00c;">'; 
                htmlcontent+='<input type="button" name="btn-CANCEL-num" value="&#xf00d;">';
            htmlcontent+='</span>';

            Element.after( htmlcontent );
         e.stopPropagation();
    });
    //--FIM editar o número de unidades--//

    //--ajuste na home--//
    resizeHome();

    //--Fecha o Alert--//
    $("#ctn-all").on('click',"input[name='btn-CLOSE-alert']", function() {
        $("#ctn-all").empty();
        $("body").removeClass("modal-ALERT");
    });
    //--FIM Fecha o Alert--//


     //--Reportar um problema--//
    $("#ctn-all").on('click',"input[name='btn-REPORTPROBLEM-alert']", function() {
        alert("chamar o serviço do helpdesk");
    });
    //--FIM Reportar um problema--//
   


});

$(window).on('resize', function(e) {
   resizeHome();
});
$(window).bind('orientationchange', function(event) {
   resizeHome();
});