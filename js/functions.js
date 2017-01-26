$(document).ready(function(){
    leftPos=0;
    leftPosLnk=0;
    leftPosFix=0;
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
                            //SubElement.children("a").after( '<select multiple name="tagUAs" class="mediumgray no-display"></select>' );
                             $( '<select multiple name="tagUAs" class="mediumgray no-display"></select>' ).appendTo(SubElement);
                            //--popula a coluna com os itens carregados--//
                            $.each(content, function(i, item) {
                                 var valueAREA=item.area;
                                 var valueID=item.id;
                                 SubElement.children("select").append('<option value="'+valueID+'">'+valueAREA+'</option>');
                            });
                            SubElement.children("select").removeClass("no-display");
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
            var urlJSON="./json/json_LISTADISCIPLINAS.json?status="+tabNAME+"&&orderby=title&&num=all";
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
                                    htmlcontent+='<input type="checkbox" name="ckbox"><label for="ckbox"><span></span></label>';
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
     $("section[name='minhasUAs']").on('click','.item-disciplina', function() {
        //--retorna o id da disciplina--//
        var idElement=$(this).attr('id');
        var Element=$(this);

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
                           var valueTITLE=item.title;
                           var valueID=item.id;
                           var valueTAGTITLE=item.tag.title;
                           var valueTAGID=item.tag.id;
                           var valueURL=item.url;
                           var valueOBJETIVOS01=item.objetivos.obj01;
                           var valueOBJETIVOS02=item.objetivos.obj02;
                           var valueOBJETIVOS03=item.objetivos.obj03;

                            var htmlcontent='<li id="'+valueID+'">';
                                  htmlcontent+='<a>'+valueTITLE+'</a>'; 
                                  htmlcontent+='<div class="ctn-tool-icon">';
                                          htmlcontent+='<i class="fa fa-window-restore btn-open-UA" aria-hidden="true" alt="Acessar a Unidade" title="Acessar a Unidade"></i>';
                                          htmlcontent+='<i class="fa fa-trash btn-del-UA" aria-hidden="true" alt="Excluir a Unidade" title="Excluir a Unidade"></i>';
                                  htmlcontent+='</div>';

                                htmlcontent+='</li>';

                               Element.children("ul.lst-UAs").append( htmlcontent );
                      });
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
                                            htmlcontentFORM+='<input type="button" value="EXCLUIR" name="btn-DEL-disciplina">';
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

//--FALTA--//
//--salvar o número de UAS (primeiro acesso)--//
$("section[name='minhasUAs']").on('click',"input[name='btn-SAVE-disciplina']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  alert("id: "+idElement);
 });
//--FIM salvar o número de UAS (primeiro acesso)--//
//--solicitação para excluir uma disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-DEL-disciplina']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  alert("id: "+idElement);
 });
//--FIM solicitação para excluir uma disciplina--//
//--envio para aprovação de uma disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-SEND-disciplina']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  alert("id: "+idElement);
 });
//--FIM envio para aprovação de uma disciplina--//
//--reabrir uma disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-REOPEN-disciplina']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  alert("id: "+idElement);
 });
//--FIM reabrir uma disciplina--//
//--duplicar uma disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-DUPLICATE-disciplina']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  alert("id: "+idElement);
 });
//--FIM duplicar uma disciplina--//

//--criar uma disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-ADD-disciplina']", function() {
  alert("nova disciplina");
 });
//--FIM criar uma disciplina--//
//--abrir uma UA--//
$("section[name='minhasUAs']").on('click',"i.btn-open-UA", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  var idDisciplina=Element.parent().parent().parent().parent().attr('id');
});
//--FIM abrir uma UA--//
//--excluir uma UA--//
$("section[name='minhasUAs']").on('click',"i.btn-del-UA", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().attr('id');
  var idDisciplina=Element.parent().parent().parent().parent().attr('id');
});
//--FIM excluir uma UA--//
//--salva número de Unidades de uma Disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-SAVE-num']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().parent().parent().parent().attr('id');
  alert(idElement)
});
//--FIM salva número de Unidades de uma Disciplina--//
//--CANCELA salva número de Unidades de uma Disciplina--//
$("section[name='minhasUAs']").on('click',"input[name='btn-CANCEL-num']", function() {
  var Element=$(this);
  var idElement=Element.parent().parent().parent().parent().parent().attr('id');
  alert(idElement)
});
//--FIM CANCELA salva número de Unidades de uma Disciplina--//
//--FIM FALTA--//

//--tagfilter--//
$("aside[name='categorias'] nav ul").on('click',"select[name='tagUAs'] option", function() {

  var Element=$(this);
  var status=Element.attr("selected");
  if (status!="selected"){
        Element.attr("selected",true);
        var primLabel=Element.parent().parent().parent().parent().children("a").text();
        var secLabel=Element.parent().parent().children("a").text();
        var labelCont=primLabel+" > "+secLabel;

        var valueElement=Element.val();
        var labelElement=Element.text();
        var htmlcontent = '<li id="'+valueElement+'" alt="'+labelCont+'" title="'+labelCont+'"><a>'+labelElement+'</a></li>';
        $(".filterlabels").append( htmlcontent );
    }else{
         Element.attr("selected",false);
         var idElement=Element.val();
         $(".filterlabels").children("#"+idElement).remove();
    }
});
$(".filterlabels").on('click',"li", function() {
    var Element=$(this);
    var idElement=Element.attr('id');
    $(".filterlabels").children("#"+idElement).remove();
    //--busca no select e retira o selected do option correspondente--//
    $("aside[name='categorias'] nav ul li select[name='tagUAs'] option").each(function() {
        if($( this ).val()==idElement){
            $( this ).attr("selected",false);
        }
    });
    //--FIM busca no select e retira o selected do option correspondente--//
});
//--tagfilter--//


//--FIND--//
//search; tag; level-prim; level-sec; position; sort;//

var findElements = ["buscaunidade", "pagenumber", "sortOptions", "numUAs"];
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
$("aside[name='categorias'] nav ul").on( "click", "select[name='tagUAs']", function(e) {
        var Element=$(this);
        findUAs(Element);
        e.stopPropagation();
});
$("ol[name='areaGeralPrincipal']").on( "click", "li", function(e) {
        var Element=$(this);
        findUAs(Element);
        e.stopPropagation();
});


function findUAs(){
    var Element=$(this);

   $("[data-find-type]").each(function(){
            var DataFindType = $(this).attr('data-find-type');
            var valuePrimFind; var valueSearchFind; var valueSecFind = new Array(); var valuePositionFind; var valueSortFind; var valueTagFind = new Array();

            if(DataFindType=="search"){
                valueSearchFind=$(this).val();
            }
            if(DataFindType=="level-prim"){
                //--busca a li .select--//
                $("aside[name='categorias'] nav ul li[name='areaGeral'].selected").each(function(){
                    valuePrimFind=$(this).attr('id');
                });
                //--FIM busca a li .select--//
            }
            if(DataFindType=="level-sec"){
                 //--busca a li .select--//
                $("aside[name='categorias'] nav ul li[name='areaGeral'].selected ul li[name='areaFormacao'].selected").each(function(){
                    valueSecFind.push($(this).attr('id'));
                });
                //--FIM busca a li .select--//
            }
            if(DataFindType=="tag"){
                //--busca tag--//
                $("ol.filterlabels li").each(function(){
                    valueTagFind.push($(this).attr('id'));
                });
                //--FIM busca tag--//

            }
            if(DataFindType=="position"){
                valuePositionFind=$(this).val();
            }
            if(DataFindType=="sort"){
                valueSortFind=$(this).val();
            }
            
    
    });

    event.stopPropagation();

    //return;
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
$("section[name='minhasUAs']").on('click',"i.fa-pencil", function() {
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

});
//--FIM editar o número de unidades--//

//--Fecha o Alert--//
$("#ctn-all").on('click',"input[name='btn-CLOSE-alert']", function() {
    $("#ctn-all").empty();
    $("body").removeClass("modal-ALERT");
});
//--FIM Fecha o Alert--//
});



//--carregamento inicial--//
function InitConfig(){
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
    carregaUAs("featured","title",0,5,"init");
    //--FIM carrega a lista de Unidades--//

 
}
//--FIM carregamento inicial--//

//--loading--//
function showLoading(){
    $("body").addClass("loading");
}
function hideLoading(){
    $("body").removeClass("loading");
}
function errorLoading(){
    $("body").removeClass("loading");
    $("body").addClass("modal-ALERT");

    var htmlcontent='<div class="ctn-modal-alert">';
            htmlcontent+='<div class="wrapper-modal">';
                htmlcontent+='<h1>ERRO:</h1>';
                htmlcontent+='<p>Ocorreu um  <strong>ERROR</strong> e não foi possível concluir o carregamento da requisição.</p>';
                  htmlcontent+='<div class="ctn-btn-group">';
                    htmlcontent+='<input type="button" value="FECHAR" name="btn-CLOSE-alert">';
                  htmlcontent+='</div>';
            htmlcontent+='</div>';
        htmlcontent+='</div>';

        $("#ctn-all").append(htmlcontent);
}





function carregaUAs(classif,orderby,inic,num,modo){
     //--carrega a lista de Unidades--//

     
    if(modo=="init"){
        var urlListaUAs="./json/json_LISTAUAs.json?class="+classif+"&&orderby="+orderby+"&&inic="+inic+"&&num="+num;
    }
     if(modo=="find"){
        var urlListaUAs="./json/json_LISTAUAs.json?class="+classif+"&&orderby="+orderby+"&&inic="+inic+"&&num="+num;
    }

    var xhttp = new XMLHttpRequest();
        xhttp.addEventListener("loadstart", showLoading, false);
        xhttp.addEventListener("loadend", hideLoading, false);
        xhttp.addEventListener("error", errorLoading, false);
        xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {
                     
                    var content=JSON.parse(this.responseText);


                    //--limpa a coluna com as áreas--//
                    $("article[name='listadeUAs'] ul#ctnlistaUAs").empty();

                    //--popula a área de unidades do catálogo--//
                    $.each(content, function(i, item) {

                        //--objeto com a lista de UAs--//
                        var listaUA=item.list;
                        
                        $.each(listaUA, function(i, item) {

                         var valueTITLE=item.title;
                         var valueID=item.id;
                         var valueTAGTITLE=item.tag.title;
                         var valueTAGID=item.tag.id;
                         var valueURL=item.url;
                         var valueOBJETIVOS01=item.objetivos.obj01;
                         var valueOBJETIVOS02=item.objetivos.obj02;
                         var valueOBJETIVOS03=item.objetivos.obj03;

                          

                          var htmlcontent='<input type="button" class="btn-add-UA" id="'+valueID+'" value="&#xf067;">';
                                htmlcontent+='<div class="ctn-infos-UA">';
                                htmlcontent+='<h4><a href="'+valueURL+'" class="lnk-UA">'+valueTITLE+'</a></h4>';
                                htmlcontent+='<h5><a id="'+valueTAGID+'">'+valueTAGTITLE+'</a></h5>';

                                    htmlcontent+='<h6>Objetivos de Aprendizagem:</h6>';
                                          htmlcontent+='<ul class="lst-txt">';
                                            htmlcontent+='<li><i class="fa fa-square" aria-hidden="true"></i><p>'+valueOBJETIVOS01+'</p></li>';
                                            htmlcontent+='<li><i class="fa fa-square" aria-hidden="true"></i><p>'+valueOBJETIVOS02+'</p></li>';
                                            htmlcontent+='<li><i class="fa fa-square" aria-hidden="true"></i><p>'+valueOBJETIVOS01+'</p></li>';
                                          htmlcontent+='</ul>';
                                htmlcontent+='</div>';

                            $("article[name='listadeUAs'] ul#ctnlistaUAs").append('<li id="'+valueID+'">'+htmlcontent+'</li>');
                        });

                        //--valores total de UAS e subtotal--//
                        var subtotalaUA=item.subtotal;
                        var totalaUA=item.totalgeral;

                        ///--atualiza labels com os totais--//
                        
                        $("input[name='buscaunidade']").attr("placeholder", "Buscar Unidades de Aprendizagem. São mais de "+totalaUA+" UAs no nosso catálogo.");

                        if(modo=="find"){
                            $("div.lbl-sort").empty();
                            $("div.lbl-sort").append('<h3>'+subtotalaUA+' <span class="lbl-light">Unidades encontradas</span></h3>');

                            

                        }

                    });
                    
                }
    };
    xhttp.open("GET", urlListaUAs, true);
    xhttp.send();
    //--FIM carrega a lista de Unidades--//
    return;
}

