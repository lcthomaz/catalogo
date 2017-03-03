saveCallback = new Object();
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
    $(window).scrollTop( 0 );

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


function carregaUAs(parameters){

    var classif = parameters.classif;
    var modo = parameters.modo;
    var orderby = parameters.orderby;
    var inic = parameters.inic;
    var num =  parameters.num;
    var areaGeral = parameters.areaGeral;
    var areaFormacao = parameters.areaFormacao;
    var areaGeralPrincipal = parameters.areaGeralPrincipal;
    var words = parameters.words;

    //classif,orderby,inic,num,modo
     //--carrega a lista de Unidades--//   

    var urlListaUAs="./json/json_LISTAUAs.json?class="+classif+"&&orderby="+orderby+"&&inic="+inic+"&&num="+num+"&&areageral="+areaGeral+"&&areaformacao="+areaFormacao+"&&areageralprincipal="+areaGeralPrincipal+"&&words="+words;

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

                          

                          var htmlcontent='<input type="button" class="btn-add-UA" value="&#xf067;">';
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


                        ///--TRATAMENTOS DE LABELs--///
                        ///--atualiza labels com os totais--//
                        
                        $("input[name='buscaunidade']").attr("placeholder", "Buscar Unidades de Aprendizagem. São mais de "+totalaUA+" UAs no nosso catálogo.");

                        if(modo=="find"){
                            $("div.lbl-sort").empty();
                            $("div.lbl-sort").append('<h3>'+subtotalaUA+' <span class="lbl-light">Unidades encontradas</span></h3>');
                        }

                        //--trata o select de número de UAs por página--//
                        var numUas=0;
                        $("select[name='numUAs']").empty();
                         $("select[name='numUAs']").append('<option value="5">5</option>');
                         if(modo=="init"){
                            var initQuant=totalaUA-5;
                        }
                        if(modo=="find"){
                            var initQuant=subtotalaUA-5;
                        }
                        var QuantUAs=Math.ceil(initQuant/50);
                        var countOptions=50
                        
                        for (i = 0; i < QuantUAs; i++) {
                            if(countOptions==num){
                                 $("select[name='numUAs']").append('<option value="'+countOptions+'" selected>'+countOptions+'</option>');
                            }else{
                                $("select[name='numUAs']").append('<option value="'+countOptions+'">'+countOptions+'</option>');
                            }
                             countOptions=countOptions+50;
                        }

                        //--FIM trata o select número de UAs por página--//

                        //--trata a numeração de páginas--//
                        var GetNumUA=$("select[name='numUAs']").val();
                        if(modo=="init"){
                            var NumPages=Math.ceil(totalaUA/GetNumUA);
                            if(GetNumUA==totalaUA){
                                NumPages=1;
                            }

                        }
                        if(modo=="find"){
                            var NumPages=Math.ceil(subtotalaUA/GetNumUA);
                            if(GetNumUA==subtotalaUA){
                                NumPages=1;
                            }
                        }
                        if(NumPages==1){
                            $("input[name='pagenumber']").attr('disabled','disabled');
                        }else{
                            $("input[name='pagenumber']").removeAttr('disabled');
                        }
                        $("ul[name='pagination'] li").last().empty();
                        $("ul[name='pagination'] li").last().append(NumPages);
                        //--FIM trata a numeração de páginas--//
                        ///--FIM TRATAMENTOS DE LABELs--///

                    });
                    
                }
    };
    xhttp.open("GET", urlListaUAs, true);
    xhttp.send();
    //--FIM carrega a lista de Unidades--//
    return;
}

// KEYS
$(document).keyup(function(e) {
    if($('section[name="pageLogin"]').is(':visible')) {
        if (e.keyCode == 13) { $("input[name='btn-SEND-login']").click(); }
    }
});
function getLogin(userLogin,passLogin){
     var urlLogin='https://homologacao.sagah.com.br/sagahcm/serv_ecommerce.php?method=login&usuario='+userLogin+'&senha='+passLogin;

                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         var content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            var mensagem=content.erro.mensagem;

                            $("div[name='ctn-user']").addClass("error");
                            $("div[name='ctn-pass']").addClass("error");
                            $("input[name='btn-SEND-login']").attr("disabled",true);

                            $("div[name='ctn-user']").children("label").empty();
                            $("div[name='ctn-user']").children("label").append(mensagem);
                            $("div[name='ctn-pass']").children("label").empty();
                            $("div[name='ctn-pass']").children("label").append(mensagem);

                         }else{
                            $("#ctn-all").empty();
                            getUserId();
                         }

                    }
                };
                xhttp.open("GET", urlLogin, true);
                xhttp.send();
    return;
}
function getLogout(userLogin){
      var url='https://homologacao.sagah.com.br/sagahcm/serv_ecommerce.php?method=logout';
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var content=JSON.parse(this.responseText);
                        //--excluir cookies--//
                            if (typeof(Storage) !== "undefined") {
                                //--storage--//
                                localStorage.userid = null;
                                localStorage.removeItem("userid");
                                localStorage.username = null;
                                localStorage.removeItem("username");                                           
                            } else {
                                //--cookie--//
                                document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                            }
                        //--FIM excluir cookies--//
                        if(content.erro != null){
                            alertMessage(content.erro.mensagem,"login");
                        }else{

                            alertMessage("Sua sessão foi encerrada com sucesso.","login");
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send();
    return;
}
function getUserId(){
   var logUserID=getCookie("userid");
   if(logUserID==null){
       var url='https://homologacao.sagah.com.br/sagahcm/serv_ecommerce.php?method=getUserId';
       var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("loadstart", showLoading, false);
            xhttp.addEventListener("loadend", hideLoading, false);
            xhttp.addEventListener("error", errorLoading, false); 
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var content=JSON.parse(this.responseText);
              
                        //--MOCKUP RETORNO--//
                        var mocLogin='["sagah","SAGAH","CR"]'; //CR-coordenador; PR-professor; AD-administrador//
                        content=JSON.parse(mocLogin);
                        console.log(content);
                        //--FIM MOCKUP RETORNO--//

                        if(content.erro != null){
                            alertMessage(content.erro.mensagem,"login");
                        }else{
                            var userId = content[0];
                            var userName = content[1];
                            var userPapel = content[2];
                            //--grava o cookie com o usuário--//
                            saveCookie(userId,userName,userPapel);
                            //--FIM grava o cookie com o usuário--//
                            window.location.href = 'catalogo.php';
                        }
                    }
                };
            xhttp.open("GET", url, true); 
            xhttp.send();
    }
    
    return;

}
function getSession(){
    var logUserID=getCookie("userid");
    if(logUserID!=null){
        window.location.href = 'catalogo.php';
    }
    return;
}
function redirectSession(){
    var logUserID=getCookie("userid");
    if(logUserID!=null){
        window.location.href = 'catalogo.php';
    }else{
        window.location.href = 'login.php';
    }
    return;
}
function getDisciplinas(status,order,callBack){
       var logUserID=getCookie("userid");
       var url="./json/json_LISTADISCIPLINAS.json?idcliente="+logUserID+"&&status="+status+"&&orderby="+order+"&&num=all";
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simple");
                         }else{
                            callBack(content);
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send(false);
    return;
}

function getCoordenadores(callBack){
       var logUserID=getCookie("userid");
       var content;
       var url="./json/json_COORDENADORES.json?userId="+logUserID;
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simple");
                         }else{
                            callBack(content);
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send(false);
}
function getProfessores(callBack){
       var logUserID=getCookie("userid");
       var content;
       var url="./json/json_PROFESSORES.json?userId="+logUserID;
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simple");
                         }else{
                            callBack(content);
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send(false);
}
function getCursos(callBack){
       var logUserID=getCookie("userid");
       var content;
       var url="./json/json_CURSOS.json?userId="+logUserID;
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simple");
                         }else{
                            callBack(content);
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send(false);
        return;
}
function getFluxo(callBack){
       var logUserID=getCookie("userid");
       var content;
       var url="./json/json_CONFIGURACOES.json?userId="+logUserID;
                var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("loadstart", showLoading, false);
                    xhttp.addEventListener("loadend", hideLoading, false);
                    xhttp.addEventListener("error", errorLoading, false);
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         content=JSON.parse(this.responseText);

                         if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simple");
                         }else{
                            callBack(content);
                        }
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send(false);
        return;
}
function saveCookie(userid,username,userpapel){
    if (typeof(Storage) !== "undefined") {
        //--storage--//
        localStorage.setItem("userid", userid);
        localStorage.setItem("username", username);
        localStorage.setItem("userpapel", userpapel);
    
    } else {
        //--cookie--//
        document.cookie = "userid="+userid;
        document.cookie = "username="+username;
        document.cookie = "userpapel="+userpapel;
    }
}
function getCookie(element){
    var retorno;
   if (typeof(Storage) !== "undefined") {
       //--storage--//
       retorno=localStorage.getItem(element);
    } else {
        //--cookie--//
        var getcookievalue = document.cookie;
        retorno= getcookievalue.element;
    }
    return retorno;
}
function deleteCookie(){
    if (typeof(Storage) !== "undefined") {
        //--storage--//
        localStorage.userid = null;
        localStorage.removeItem("userid");
        localStorage.username = null;
        localStorage.removeItem("username");                                           
    } else {
        //--cookie--//
        document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}
function sendConfing(data,msg,callback){

    var idUser=getCookie("userid");
    if(idUser===null){
            alertMessage("Sua sessão expirou!","login");
    }else{



        var getCallback = new Object();
        getCallback = callback;

        if(getCallback!=null){
             saveCallback = new Object();
             saveCallback=getCallback;
        }else{
            saveCallback = null;
        }

        

    var urlSEND="./_php/teste.php";
        var xhttp = new XMLHttpRequest();
            xhttp.addEventListener("loadstart", showLoading, false);
            xhttp.addEventListener("loadend", hideLoading, false);
            xhttp.addEventListener("error", errorLoading, false);
            xhttp.onreadystatechange = function() {
                   if (this.readyState == 4 && this.status == 200) {
                        var content=JSON.parse(this.responseText);
                        if(content.erro != null){
                            alertMessage(content.erro.mensagem,"simplemsg");
                        }else{
                            if(msg!=""){
                                alertMessage(msg,"simplemsg");
                            }
                        }
                    }                 
                    
            };
            xhttp.open("POST", urlSEND, true);
            xhttp.send(data);
    }
    return;    
}
///--ALERTAS--//
function alertMessage(msg,acao){
    $("body").removeClass("loading");
    if(!$("body").hasClass("modal-ALERT")){
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
    }

    $("#ctn-all").children('div.ctn-modal-alert').remove();
    var htmlcontent='<div class="ctn-modal-alert" name="generic-alert">';
            htmlcontent+='<div class="wrapper-modal">';
                htmlcontent+='<h1>ATENÇÃO:</h1>';
                htmlcontent+='<p>'+msg+'</p>';
                  htmlcontent+='<div class="ctn-btn-group">';
                    htmlcontent+='<input type="button" value="FECHAR" data-action="'+acao+'" name="btn-SEND-action">';
                  htmlcontent+='</div>';
            htmlcontent+='</div>';
        htmlcontent+='</div>';

        $("#ctn-all").append(htmlcontent);
        return;
}
///--FIM ALERTAS--//
//--ajuste area de imagem home--//
function resizeHome(){
    //--ajuste na home--//
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var alturaCTN=windowHeight-334;
    $(".ctn-home").css("min-height", alturaCTN);
}

//--FIM ajuste area de imagem home--//

$(document).ready(function(){
    $("#ctn-all").on('click',"div[name='generic-alert'] input[name='btn-SEND-action']", function() {
             var acao=$(this).attr('data-action');

                switch (acao) {
                    case "login":
                        window.location.replace("login.php");
                        $("#ctn-all").empty();
                        $("body").removeClass("modal-ALERT");
                        break;
                    case "simplemsg":
                        if(saveCallback!=null){
                            saveCallback;
                            $("#ctn-all").removeClass("firstdisabled");
                            $("#ctn-all").children('div.ctn-modal-alert').remove();

                            if($("#ctn-all").find('div[name="area-config"]').length===0){
                                $("body").removeClass("modal-ALERT");
                            }
                            
                        }else{
                            $("#ctn-all").empty();
                            $("body").removeClass("modal-ALERT");
                        }
                        break;
                    default: 
                        window.location.replace("login.php");
                        $("#ctn-all").empty();
                        $("body").removeClass("modal-ALERT");
                        break;
                }
            
            return;
    });
});