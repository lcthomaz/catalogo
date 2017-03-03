$(document).ready(function(){
    //--abre as configurações--//
    $(".ctn-header-tools").on('click', 'a[name="btn-GET-configuracoes"]', function(e) {
		$("body").removeClass("loading");
        $("body").addClass("modal-ALERT");
        $(window).scrollTop( 0 );
        $("#ctn-all").empty(); 

      		var htmlcontent='<div class="ctn-modal-default" name="area-config">';
              		htmlcontent+='<div class="wrapper-modal">';
                  htmlcontent+='<h1>Configurações:</h1>';
              			htmlcontent+='<div class="ctn-btn-group ctn-btn-modal-top btn-absolute">';
                  			htmlcontent+='<input type="button" value="FECHAR" name="btn-CLOSE-alert" class="lnk-btn">';
                  		htmlcontent+='</div>';
                  		
              		htmlcontent+='</div>';
                  	htmlcontent+='<nav class="ctn-navtabs" name="opcoesconfiguracoes">';
                    	htmlcontent+='<ul class="tabs">';
                      		htmlcontent+='<li role="presentation" class="item-tab" name="cursos"><a>Cursos</a></li>';
                      		htmlcontent+='<li role="presentation" class="item-tab" name="disciplinas"><a>Disciplinas</a></li>';
                      		htmlcontent+='<li role="presentation" class="item-tab" name="coordenadores"><a>Coordenadores</a></li>';
                      		htmlcontent+='<li role="presentation" class="item-tab" name="professores"><a>Professores</a></li>';
                    		htmlcontent+='</ul>';
                        htmlcontent+='<a href="organograma.php" target="_blank" class="lnk-blank">organograma</a>';
                  htmlcontent+='</nav>';
                  htmlcontent+='<div class="ctn-config-area wrapper-modal no-padding-bottom"></div>';
                htmlcontent+='</div>';

          $("#ctn-all").append(htmlcontent);

          //--verifica a última aba aberta e define o clique--//
          var ultimaTab=getCookie("tabconfig");
          var defName="";
          if(ultimaTab==null){
              defName="cursos";
          }else{
              defName=ultimaTab;
          }

          //--carrega json com status das configurações--//
          getFluxo(function(data){
              $.each(data, function(i, item) {
                        var valueFLUXO=item.fluxo;
                        var valueSTATUS=item.status;

                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem(valueFLUXO, valueSTATUS);
                        } else {
                            document.cookie = valueFLUXO+"="+valueSTATUS;
                        }
              });
          }); 
          //--FIM carrega json com status das configurações--//

          $("#ctn-all").find("li[name='"+defName+"']").click();
        	e.stopPropagation();             
    });
    //--FIM abre as configurações--//

    //--navegação entre abas--//
    $("#ctn-all").on('click','.item-tab', function() {
    	//--altera o status das abas--//
          $("#ctn-all .item-tab").removeClass("active");
          $(this).addClass("active");
          var tabNAME=$(this).attr('name'); 
          //--guarda a última aba clicada--//
             if (typeof(Storage) !== "undefined") {
                  //--storage--//
                  localStorage.setItem("tabconfig", tabNAME);
              } else {
                  //--cookie--//
                  document.cookie = "tabconfig="+tabNAME;
              }
          //--FIM guarda a última aba clicada--//
      
        //--FIM altera o status das abas--//
        //--carregamento de disciplinas ao clicar nas abas--//
       
        $("#ctn-all").find("div.ctn-config-area").empty(); 
        $("#ctn-all").find("div.ctn-config-area").attr("data-name-tag",tabNAME); 
        var htmltab='';

        if(tabNAME=="cursos"){
              htmltab+='<div class="lst-txt">';
                htmltab+='<div class="ctn-checkbox" name="DisableThis">';
                  var valorStatus=getCookie(tabNAME);
                  var configStatus='';
                  var configDisabled='';
                  if(valorStatus=="n"){
                    configStatus="checked";
                    configDisabled="disabled";
                  }

                  htmltab+='<input type="checkbox" name="DisableCursos" '+configStatus+'><label for="ckbox"><span></span></label>';
                htmltab+='</div>';
                htmltab+='<label for="DisableThis">Não utilizar a função Curso</label>';
              htmltab+='</div>';
              htmltab+='<ul class="lst-form-modal '+configDisabled+'">';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                    htmltab+='<h2 name="lbl-element">Inserir um Curso:</h2>'; 
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="nomecurso" placeholder="Nome do Curso" '+configDisabled+'>';
                        htmltab+='<label for="nomecurso">Nome do Curso</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-btn-group no-padding-bottom">';
                        htmltab+='<input type="button" value="ENVIAR" name="btn-SEND-action" disabled>';
                      htmltab+='</div>';
                  htmltab+='</div>'; 
                htmltab+='</li>';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                              htmltab+='<h2>Cursos Cadastrados:</h2>'; 
                                htmltab+='<div class="lst-group" name="lst-group">';
                                  htmltab+='<ul>';
                                  htmltab+='</ul>';  
                              htmltab+='</div>';  
                  htmltab+='</div>';
                htmltab+='</li>';
              htmltab+='</ul>';
              $("#ctn-all").find("div.ctn-config-area").append(htmltab); 

                  //--monta a lista de cursos--//
                  getCursos(function(data){
                    var optionscontent="";
                    $.each(data, function(i, item) {
                        var valueTITLE=item.title;
                        var valueID=item.id;
                          optionscontent+='<li id="'+valueID+'"><a>'+valueTITLE+'</a> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>';
                    });
                    $("#ctn-all").find("div[name='lst-group']").children("ul").append(optionscontent); 
                  }); 
                   //--FIM monta a lista de cursos--//  
        }
        if(tabNAME=="disciplinas"){
              htmltab+='<ul class="lst-form-modal">';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                    htmltab+='<h2 name="lbl-element">Inserir uma Disciplina:</h2>'; 
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="nomedisciplina" placeholder="Nome da Disciplina">';
                        htmltab+='<label for="nomedisciplina">Nome da Disciplina</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-select margin-top-negativa modal-config">'
                        htmltab+='<select name="SELECT-curso">';
                        htmltab+='</select>'; 
                        htmltab+='<label for="SELECT-curso">Selecione um curso</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-btn-group no-padding-bottom">';
                        htmltab+='<input type="button" value="ADICIONAR" name="btn-SEND-action" disabled>';
                      htmltab+='</div>';
                  htmltab+='</div>'; 
                htmltab+='</li>';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                              htmltab+='<h2>Disciplinas Cadastradas:</h2>'; 
                              htmltab+='<div class="ctn-select with-float">';
                                htmltab+='<select name="SELECT-order">';
                                  htmltab+='<option value="titulo">Título</option>';
                                  htmltab+='<option value="curso">Curso</option>';
                                htmltab+='</select>'; 
                              htmltab+='</div>';
                              htmltab+='<div class="lst-group" name="lst-group">';
                                  htmltab+='<ul>';
                                  htmltab+='</ul>';  
                              htmltab+='</div>';  
                  htmltab+='</div>';
                htmltab+='</li>';
              htmltab+='</ul>';
              $("#ctn-all").find("div.ctn-config-area").append(htmltab); 

                  //--monta a lista de cursos--//
                  getCursos(function(data){
                    var optionscontent='<option value="">Selecione um Curso</option>';
                    $.each(data, function(i, item) {
                        var valueTITLE=item.title;
                        var valueID=item.id;
                          optionscontent+='<option value="'+valueID+'">'+valueTITLE+'</option>';
                    });
                    $("#ctn-all").find("select[name='SELECT-curso']").append(optionscontent); 
                  }); 
                   //--FIM monta a lista de cursos--//

                   //--monta a lista de disciplinas--//
                  getDisciplinas("all","title",function(data){
                    var optionscontent='';
                    $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueCURSONAME=item.curso.title;
                             var valueCURSOID=item.curso.id;

                             optionscontent+='<li id="'+valueID+'"><div class="ctn-info-lst-group" data-ctn-id="'+valueCURSOID+'">'+valueTITLE+' - '+valueCURSONAME+'</div> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>';

                    });
                    $("#ctn-all").find("div[name='lst-group']").children("ul").append(optionscontent); 
                  });
                   //--FIM monta a lista de disciplinas--//



        }
        if(tabNAME=="coordenadores"){
              htmltab+='<div class="lst-txt">';
                htmltab+='<div class="ctn-checkbox" name="DisableThis">';
                 var valorStatus=getCookie(tabNAME);
                  var configStatus='';
                  var configDisabled='';
                  if(valorStatus=="n"){
                    configStatus="checked";
                    configDisabled="disabled";
                  }
                  htmltab+='<input type="checkbox" name="DisableCoordenadores" '+configStatus+'><label for="ckbox"><span></span></label>';
                htmltab+='</div>';
                htmltab+='<label for="DisableThis">Não utilizar o fluxo de Coordenadores</label>';
              htmltab+='</div>';
               htmltab+='<ul class="lst-form-modal '+configDisabled+'">';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                    htmltab+='<h2 name="lbl-element">Inserir um Coordenador:</h2>'; 
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="nomecoordenador" placeholder="Nome do Coordenador" '+configDisabled+'>';
                        htmltab+='<label for="nomecoordenador">Nome do Coordenador</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="emailcoordenador" placeholder="Email do Coordenador" '+configDisabled+'>';
                        htmltab+='<label for="emailcoordenador">Email do Coordenador</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-select margin-top-negativa modal-config">'
                        htmltab+='<select multiple name="SELECT-disciplina" '+configDisabled+'>';
                        htmltab+='</select>'; 
                        htmltab+='<label for="SELECT-disciplina">Disciplinas</label>';
                      htmltab+='</div>';

                      htmltab+='<div class="ctn-btn-group no-padding-bottom">';
                        htmltab+='<input type="button" value="ADICIONAR" name="btn-SEND-action" disabled>';
                      htmltab+='</div>';
                  htmltab+='</div>'; 
                htmltab+='</li>';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                              htmltab+='<h2>Coordenadores Cadastrados:</h2>'; 
                                htmltab+='<div class="lst-group" name="lst-group">';
                                  htmltab+='<ul>';
                                  htmltab+='</ul>';  
                              htmltab+='</div>';  
                  htmltab+='</div>';
                htmltab+='</li>';
              htmltab+='</ul>';
              $("#ctn-all").find("div.ctn-config-area").append(htmltab); 
                  //--monta a lista de disciplinas--//
                  getDisciplinas("all","title",function(data){
                    var optionscontent='';
                    $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueCURSONAME=item.curso.title;
                             optionscontent+='<option value="'+valueID+'">'+valueTITLE+' - '+valueCURSONAME+'</option>';

                    });
                    $("#ctn-all").find("select[name='SELECT-disciplina']").append(optionscontent); 
                  });
                  //--FIM monta a lista de disciplinas--//
                  //--monta a lista de coordenadores--//
                  getCoordenadores(function(data){
                    var optionscontent='';
                    $.each(data, function(i, item) {
                        var valueNAME=item.name;
                        var valueID=item.id;
                        var valueEMAIL=item.email;
                        var valueLISTADISCIPLINAS=item.listadisciplinas;
                        optionscontent+='<li id="'+valueID+'"><div class="ctn-info-lst-group" data-ctn-id="'+valueLISTADISCIPLINAS+'"><span>'+valueNAME+'</span> - <a mailto:'+valueEMAIL+'>'+valueEMAIL+'</a></div> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>';


                    });
                    $("#ctn-all").find("div[name='lst-group']").children("ul").append(optionscontent); 
                  });
        }
        if(tabNAME=="professores"){
            htmltab+='<div class="lst-txt">';
                htmltab+='<div class="ctn-checkbox" name="DisableThis">';
                var valorStatus=getCookie(tabNAME);
                  var configStatus='';
                  var configDisabled='';
                  if(valorStatus=="n"){
                    configStatus="checked";
                    configDisabled="disabled";
                  }
                  htmltab+='<input type="checkbox" name="DisableProfessores" '+configStatus+'><label for="DisableProfessores"><span></span></label>';
                htmltab+='</div>';
                htmltab+='<label for="DisableThis">Não utilizar o fluxo de Professores</label>';
              htmltab+='</div>';
               htmltab+='<ul class="lst-form-modal '+configDisabled+'">';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                    htmltab+='<h2 class="full-width">Inserir um Professor:</h2>'; 
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="nomeprofessor" placeholder="Nome do Professor" '+configDisabled+'>';
                        htmltab+='<label for="nomeprofessor">Nome do Professor</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-input full-width margin-bottom">';
                        htmltab+='<input type="text" name="emailprofessor" placeholder="Email do Professor" '+configDisabled+'>';
                        htmltab+='<label for="emailprofessor">Email do Professor</label>';
                      htmltab+='</div>';
                      htmltab+='<div class="ctn-select margin-top-negativa modal-config">'
                        htmltab+='<select multiple name="SELECT-disciplina" '+configDisabled+'>';
                        htmltab+='</select>'; 
                        htmltab+='<label for="SELECT-disciplina">Disciplinas</label>';
                      htmltab+='</div>';

                      htmltab+='<div class="ctn-btn-group no-padding-bottom">';
                        htmltab+='<input type="button" value="ADICIONAR" name="btn-SEND-action" disabled>';
                      htmltab+='</div>';
                  htmltab+='</div>'; 
                htmltab+='</li>';
                htmltab+='<li>';
                  htmltab+='<div class="form-default lst-txt">';
                              htmltab+='<h2>Professores Cadastrados:</h2>'; 
                                htmltab+='<div class="lst-group" name="lst-group">';
                                  htmltab+='<ul>';
                                  htmltab+='</ul>';  
                              htmltab+='</div>';  
                  htmltab+='</div>';
                htmltab+='</li>';
              htmltab+='</ul>';
              $("#ctn-all").find("div.ctn-config-area").append(htmltab); 
                  //--monta a lista de disciplinas--//
                  getDisciplinas("all","title",function(data){
                    var optionscontent='';
                    $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueCURSONAME=item.curso.title;
                             optionscontent+='<option value="'+valueID+'">'+valueTITLE+' - '+valueCURSONAME+'</option>';

                    });
                    $("#ctn-all").find("select[name='SELECT-disciplina']").append(optionscontent); 
                  });
                  //--FIM monta a lista de disciplinas--//
                  //--monta a lista de coordenadores--//
                  getProfessores(function(data){
                    var optionscontent='';
                    $.each(data, function(i, item) {
                        var valueNAME=item.name;
                        var valueID=item.id;
                        var valueEMAIL=item.email;
                        var valueLISTADISCIPLINAS=item.listadisciplinas;
                        optionscontent+='<li id="'+valueID+'"><div class="ctn-info-lst-group" data-ctn-id="'+valueLISTADISCIPLINAS+'"><span>'+valueNAME+'</span> - <a mailto:'+valueEMAIL+'>'+valueEMAIL+'</a></div> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>';

                    });
                    $("#ctn-all").find("div[name='lst-group']").children("ul").append(optionscontent); 
                  });

        }
        
      //--EVENTOS ABA CURSOS--//
      $("#ctn-all").on('change',"input[name='DisableCursos']", function() {
           var valStatus='';
           if(!$("#ctn-all div[data-name-tag='cursos']").find("ul.lst-form-modal").hasClass("disabled")){
                $("#ctn-all div[data-name-tag='cursos']").find("ul.lst-form-modal").addClass("disabled");
                $("#ctn-all div[data-name-tag='cursos']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',true);
                $("#ctn-all div[data-name-tag='cursos']").find("i.fa-trash").addClass("disabled");
                $("#ctn-all div[data-name-tag='cursos']").find("i.fa-pencil-square-o").addClass("disabled");
                 valStatus='n';

            }else{
                $("#ctn-all div[data-name-tag='cursos']").find("ul.lst-form-modal").removeClass("disabled");
                $("#ctn-all div[data-name-tag='cursos']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',false);
                $("#ctn-all div[data-name-tag='cursos']").find("i.fa-trash").removeClass("disabled");
                $("#ctn-all div[data-name-tag='cursos']").find("i.fa-pencil-square-o").removeClass("disabled");
                valStatus='s';
           }
           //--envia o status--//
            var idUser=getCookie("userid");
            var data = new FormData();
            data.append('idUser', idUser);
            data.append('fluxo', 'cursos');
            data.append('status', valStatus);
            data.append('metodo','updatefluxo');
            var msg="Fluxo alterado com sucesso!";
            var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
                sendConfing(data,msg,callback);
            //--FIM envia o status--//

      });
       $("#ctn-all div[data-name-tag='cursos']").on('change',"input[name='nomecurso']", function() {
            $("#ctn-all div[data-name-tag='cursos'] input[name='btn-SEND-action']").attr("disabled",false);
            $("#ctn-all div[data-name-tag='cursos'] input[name='btn-UPDATE-action']").attr("disabled",false);
      });

      $("#ctn-all").on('click',"div[data-name-tag='cursos'] i.fa-pencil-square-o", function() {
          if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idCurso=Element.attr("id");
              var nomeCurso=Element.children("a").html();

              //--altera a label do h2--//
               $('h2[name="lbl-element"]').empty();
               $('h2[name="lbl-element"]').html("Editar o Curso:");
               //--FIM altera a label do h2--//
               //--altera o name do input--//
               $("input[name='btn-SEND-action']").attr("disabled",true);
               $("input[name='btn-UPDATE-action']").attr("disabled",true);
               $('input[name="btn-SEND-action"]').attr("value","ALTERAR");
               $('input[name="btn-SEND-action"]').attr("name","btn-UPDATE-action");
               //--altera o name do input--//

              //--altera os valores do input--//
              $('#ctn-all').find("div[data-name-tag='cursos']").find('input[name="nomecurso"]').val(nomeCurso);
              $('#ctn-all').find("div[data-name-tag='cursos']").find('input[name="nomecurso"]').attr("data-curso-id",idCurso);
              //--FIM altera os valores do input--//
          }
          return;
      });
      $("#ctn-all").on('click',"div[data-name-tag='cursos'] i.fa-trash", function() {
        if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idCurso=Element.attr("id");
              var nomeCurso=Element.children("a").html();
              $('#ctn-all').addClass("firstdisabled");
              var htmlcontent='<div class="ctn-modal-alert ctn-del-curso sub-alert" name="del-curso" data-id-curso="'+idCurso+'">';
                              htmlcontent+='<div class="wrapper-modal">';
                                  htmlcontent+='<h1>Excluir Curso</h1>';
                                  htmlcontent+='<div class="ctn-conf-add">';
                                  htmlcontent+='<p>Deseja prosseguir com a solicitação de EXCLUSÃO do curso: <strong>'+nomeCurso+'</strong></p>';
                                  htmlcontent+='</div>';    
                                  htmlcontent+='<div class="ctn-btn-group">';
                                      htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SUBSEND-action">';
                                      htmlcontent+='<input type="button" value="CANCELAR" name="btn-SUBCLOSE-alert" class="lnk-btn">';
                                  htmlcontent+='</div>';
                              htmlcontent+='</div>';
                          htmlcontent+='</div>';
              $("#ctn-all").append(htmlcontent);
        }
        return;
      });
      
      $("#ctn-all").on('click',"div[data-name-tag='cursos'] input[name='btn-SEND-action']", function(e) {
        var nomeCurso=$("#ctn-all div[data-name-tag='cursos'] input[name='nomecurso']").val();
        var idUser=getCookie("userid");
         $('#ctn-all').addClass("firstdisabled");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeCurso', nomeCurso);
            data.append('metodo','novocurso');
        var msg="Curso inserido com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[data-name-tag='cursos'] input[name='btn-UPDATE-action']", function(e) {
        var nomeCurso=$("#ctn-all div[data-name-tag='cursos'] input[name='nomecurso']").val();
        var idCurso=$("#ctn-all div[data-name-tag='cursos'] input[name='nomecurso']").attr("data-curso-id");
        var idUser=getCookie("userid");
        $('#ctn-all').addClass("firstdisabled");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeCurso', nomeCurso);
            data.append('idCurso', idCurso);
            data.append('metodo','updatecurso');
        var msg="Curso alterado com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-curso'] input[name='btn-SUBSEND-action']", function(e) {
        var idCurso=$("#ctn-all div[name='del-curso']").attr("data-id-curso");
        var idUser=getCookie("userid");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('idCurso', idCurso);
            data.append('metodo','excluircurso');
        var msg="Curso EXCLUÍDO com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

       $("#ctn-all").on('click',"div[name='del-curso'] input[name='btn-SUBCLOSE-alert']", function(e) {
          $('#ctn-all').find("div.ctn-modal-default").removeClass("disabled");
          $('#ctn-all').find("div[name='del-curso']").remove();
       });

      //--FIM EVENTOS ABA CURSOS--//
      //--EVENTOS ABA DISCIPLINAS--//

      $("#ctn-all div[data-name-tag='disciplinas']").on('change',"input[name='nomedisciplina']", function() {
          if($("#ctn-all div[data-name-tag='disciplinas'] select[name='SELECT-curso']").find('option:selected').val()!=""){
              $("#ctn-all [data-name-tag='disciplinas'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all [data-name-tag='disciplinas'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all div[data-name-tag='disciplinas']").on('change',"select[name='SELECT-curso']", function() {
          if($("#ctn-all div[data-name-tag='disciplinas'] input[name='nomedisciplina']").val()!=""){
              $("#ctn-all [data-name-tag='disciplinas'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all [data-name-tag='disciplinas'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all").on('click',"div[data-name-tag='disciplinas'] i.fa-pencil-square-o", function() {
          if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idDisciplina=Element.attr("id");
              var nomeDisciplina=Element.children("div.ctn-info-lst-group").html();
              var idCurso=Element.children("div.ctn-info-lst-group").attr("data-ctn-id");

              //--altera a label do h2--//
               $('h2[name="lbl-element"]').empty();
               $('h2[name="lbl-element"]').html("Editar a Disciplina:");
               //--FIM altera a label do h2--//
               //--altera o name do input--//
               $("input[name='btn-SEND-action']").attr("disabled",true);
               $("input[name='btn-UPDATE-action']").attr("disabled",true);
               $('input[name="btn-SEND-action"]').attr("value","ALTERAR");
               $('input[name="btn-SEND-action"]').attr("name","btn-UPDATE-action");
               //--altera o name do input--//

              //--altera os valores do input--//
              $('#ctn-all').find("div[data-name-tag='disciplinas']").find('input[name="nomedisciplina"]').val(nomeDisciplina);
              $('#ctn-all').find("div[data-name-tag='disciplinas']").find('input[name="nomedisciplina"]').attr("data-disciplina-id",idDisciplina);
              //--FIM altera os valores do input--//

              //--marca o select option do curso--//
              $('#ctn-all').find("div[data-name-tag='disciplinas']").find('select[name="SELECT-curso"]').find('option:selected').attr("selected",false);
              $('#ctn-all').find("div[data-name-tag='disciplinas']").find('select[name="SELECT-curso"]').find('option[value="'+idCurso+'"]').attr("selected",true);

          }
          return;
      });
      $("#ctn-all").on('click',"div[data-name-tag='disciplinas'] i.fa-trash", function() {
        if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idDisciplina=Element.attr("id");
              var nomeDisciplina=Element.children("div.ctn-info-lst-group").html();
              var idCurso=Element.children("div.ctn-info-lst-group").attr("data-ctn-id");

              $('#ctn-all').addClass("firstdisabled");
              var htmlcontent='<div class="ctn-modal-alert ctn-del-disciplina sub-alert" name="del-disciplina" data-id-disciplina="'+idCurso+'">';
                              htmlcontent+='<div class="wrapper-modal">';
                                  htmlcontent+='<h1>Excluir Disciplina</h1>';
                                  htmlcontent+='<div class="ctn-conf-add">';
                                  htmlcontent+='<p>Deseja prosseguir com a solicitação de EXCLUSÃO da disciplina: <strong>'+nomeDisciplina+'</strong></p>';
                                  htmlcontent+='</div>';    
                                  htmlcontent+='<div class="ctn-btn-group">';
                                      htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SUBSEND-action">';
                                      htmlcontent+='<input type="button" value="CANCELAR" name="btn-SUBCLOSE-alert" class="lnk-btn">';
                                  htmlcontent+='</div>';
                              htmlcontent+='</div>';
                          htmlcontent+='</div>';
              $("#ctn-all").append(htmlcontent);
        }
        return;
      });

      $("#ctn-all").on('click',"div[data-name-tag='disciplinas'] input[name='btn-SEND-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeDisciplina=$("#ctn-all div[data-name-tag='disciplinas'] input[name='nomedisciplina']").val();
        var idCurso=$("#ctn-all div[data-name-tag='disciplinas'] select[name='SELECT-curso']").find('option:selected').val();
        
         $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeDisciplina', nomeDisciplina);
            data.append('idCurso', idCurso);
            data.append('metodo','novadisciplina');
        var msg="Disciplina inserida com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[data-name-tag='disciplinas'] input[name='btn-UPDATE-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeDisciplina=$("#ctn-all div[data-name-tag='disciplinas'] input[name='nomedisciplina']").val();
        var idDisciplina=$("#ctn-all div[data-name-tag='disciplinas'] input[name='nomedisciplina']").attr("data-disciplina-id");
        var idCurso=$("#ctn-all div[data-name-tag='disciplinas'] select[name='SELECT-curso']").find('option:selected').val();
        $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeDisciplina', nomeDisciplina);
            data.append('idDisciplina', idDisciplina);
            data.append('idCurso', idCurso);
            data.append('metodo','updatedisciplina');
        var msg="Disciplina alterada com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

       $("#ctn-all").on('click',"div[name='del-disciplina'] input[name='btn-SUBSEND-action']", function(e) {
        var idDisciplina=$("#ctn-all div[name='del-disciplina']").attr("data-id-disciplina");
        var idUser=getCookie("userid");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('idDisciplina', idDisciplina);
            data.append('metodo','excluirdisciplina');
        var msg="Disciplina EXCLUÍDA com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-disciplina'] input[name='btn-SUBCLOSE-alert']", function(e) {
          $('#ctn-all').find("div.ctn-modal-default").removeClass("disabled");
          $('#ctn-all').find("div[name='del-disciplina']").remove();
       });


      $("#ctn-all").on('change',"div[data-name-tag='disciplinas'] select[name='SELECT-order']", function(e) {
          var valorOrder=$("#ctn-all div[data-name-tag='disciplinas'] select[name='SELECT-order']").find('option:selected').val();
          $("#ctn-all").find("div[data-name-tag='disciplinas']").find("div[name='lst-group'] ul").empty();
              //--monta a lista de disciplinas--//
              getDisciplinas("all",valorOrder,function(data){
                var optionscontent='';
                $.each(data, function(i, item) {
                             var valueTITLE=item.title;
                             var valueID=item.id;
                             var valueCURSONAME=item.curso.title;
                             var valueCURSOID=item.curso.id;
                             optionscontent+='<li id="'+valueID+'"><div class="ctn-info-lst-group" data-ctn-id="'+valueCURSOID+'">'+valueTITLE+' - '+valueCURSONAME+'</div> <i class="fa fa-trash" aria-hidden="true"></i> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></li>';
                });
                $("#ctn-all").find("div[name='lst-group']").children("ul").append(optionscontent); 
              });
              //--FIM monta a lista de disciplinas--//
       });


      //--FIM EVENTOS ABA DISCIPLINAS--//
      //--EVENTOS ABA COORDENADORES--//
      $("#ctn-all div[data-name-tag='coordenadores']").on('change',"input[name='DisableCoordenadores']", function() {
           var valStatus='';
           if(!$("#ctn-all div[data-name-tag='coordenadores']").find("ul.lst-form-modal").hasClass("disabled")){
                $("#ctn-all div[data-name-tag='coordenadores']").find("ul.lst-form-modal").addClass("disabled");
                $("#ctn-all div[data-name-tag='coordenadores']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',true);
                $("#ctn-all div[data-name-tag='coordenadores']").find('ul.lst-form-modal').find('select[name="SELECT-disciplina"]').attr('disabled',true);
                $("#ctn-all div[data-name-tag='coordenadores']").find("i.fa-trash").addClass("disabled");
                $("#ctn-all div[data-name-tag='coordenadores']").find("i.fa-pencil-square-o").addClass("disabled");
                valStatus='n';
            }else{
                $("#ctn-all div[data-name-tag='coordenadores']").find("ul.lst-form-modal").removeClass("disabled");
                $("#ctn-all div[data-name-tag='coordenadores']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',false);
                $("#ctn-all div[data-name-tag='coordenadores']").find('ul.lst-form-modal').find('select[name="SELECT-disciplina"]').attr('disabled',false);
                $("#ctn-all div[data-name-tag='coordenadores']").find("i.fa-trash").removeClass("disabled");
                $("#ctn-all div[data-name-tag='coordenadores']").find("i.fa-pencil-square-o").removeClass("disabled");
                valStatus='s';
           }
           //--envia o status--//
            var idUser=getCookie("userid");
            var data = new FormData();
            data.append('idUser', idUser);
            data.append('fluxo', 'coordenadores');
            data.append('status', valStatus);
            data.append('metodo','updatefluxo');
            var msg="Fluxo alterado com sucesso!";
            var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
                sendConfing(data,msg,callback);
            //--FIM envia o status--//
      });
  
      $("#ctn-all div[data-name-tag='coordenadores']").on('change',"input[name='nomecoordenador']", function() {
          if($("#ctn-all div[data-name-tag='coordenadores'] input[name='emailcoordenador']").val()!="" && $("#ctn-all div[data-name-tag='coordenadores'] select[name='SELECT-disciplina']").find('option:selected').val()!=""){
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all div[data-name-tag='coordenadores']").on('change',"input[name='emailcoordenador']", function() {
          if($("#ctn-all div[data-name-tag='coordenadores'] input[name='nomecoordenador']").val()!="" && $("#ctn-all div[data-name-tag='coordenadores'] select[name='SELECT-disciplina']").find('option:selected').val()!=""){
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all div[data-name-tag='coordenadores']").on('change',"select[name='SELECT-disciplina']", function() {
          if($("#ctn-all div[data-name-tag='coordenadores'] input[name='nomecoordenador']").val()!="" && $("#ctn-all div[data-name-tag='coordenadores'] input[name='emailcoordenador']").val()!=""){
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='coordenadores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });
      $("#ctn-all div[data-name-tag='coordenadores']").on('click',"select[name='SELECT-disciplina'] option", function() {
        var disabledSelect=$(this).parent().attr("disabled");
          if(disabledSelect!="disabled"){
            if($(this).attr("selected")){
              $(this).attr("selected",false);
            }else{
              $(this).attr("selected",true);
            }
          }
      });
      $("#ctn-all").on('click',"div[data-name-tag='coordenadores'] i.fa-pencil-square-o", function() {
          if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idCoordenador=Element.attr("id");
              var nomeCoordenador=Element.children("div.ctn-info-lst-group").children("span").html();
              var emailCoordenador=Element.children("div.ctn-info-lst-group").children("a").html();
              var idlistDisciplina=Element.children("div.ctn-info-lst-group").attr("data-ctn-id");

              //--altera a label do h2--//
               $('h2[name="lbl-element"]').empty();
               $('h2[name="lbl-element"]').html("Editar o Coordenador:");
               //--FIM altera a label do h2--//
               //--altera o name do input--//
               $("input[name='btn-SEND-action']").attr("disabled",true);
               $("input[name='btn-UPDATE-action']").attr("disabled",true);
               $('input[name="btn-SEND-action"]').attr("value","ALTERAR");
               $('input[name="btn-SEND-action"]').attr("name","btn-UPDATE-action");
               //--altera o name do input--//

              //--altera os valores do input--//
              $('#ctn-all').find("div[data-name-tag='coordenadores']").find('input[name="nomecoordenador"]').val(nomeCoordenador);
              $('#ctn-all').find("div[data-name-tag='coordenadores']").find('input[name="nomecoordenador"]').attr("data-coordenador-id",idCoordenador);
              $('#ctn-all').find("div[data-name-tag='coordenadores']").find('input[name="emailcoordenador"]').val(emailCoordenador);
              //--FIM altera os valores do input--//

              //--marca o select option do curso--//
              var ArrayListaDisciplina=new Array();
                  ArrayListaDisciplina=idlistDisciplina.split(",");

              $('#ctn-all').find("div[data-name-tag='coordenadores']").find('select[name="SELECT-disciplina"]').find('option:selected').attr("selected",false);
               
               $.each(ArrayListaDisciplina, function(i, item) {
                         var valueID=item;
                         $('#ctn-all').find("div[data-name-tag='coordenadores']").find('select[name="SELECT-disciplina"]').find('option[value="'+valueID+'"]').attr("selected",true);
              });

          }
          return;
      });
       $("#ctn-all").on('click',"div[data-name-tag='coordenadores'] i.fa-trash", function() {
        if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idCoordenador=Element.attr("id");
              var nomeCoordenador=Element.children("div.ctn-info-lst-group").children("span").html();


              $('#ctn-all').addClass("firstdisabled");
              var htmlcontent='<div class="ctn-modal-alert ctn-del-coordenador sub-alert" name="del-coordenador" data-id-coordenador="'+idCoordenador+'">';
                              htmlcontent+='<div class="wrapper-modal">';
                                  htmlcontent+='<h1>Excluir Coordenador</h1>';
                                  htmlcontent+='<div class="ctn-conf-add">';
                                  htmlcontent+='<p>Deseja prosseguir com a solicitação de EXCLUSÃO do Coordenador: <strong>'+nomeCoordenador+'</strong></p>';
                                  htmlcontent+='</div>';    
                                  htmlcontent+='<div class="ctn-btn-group">';
                                      htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SUBSEND-action">';
                                      htmlcontent+='<input type="button" value="CANCELAR" name="btn-SUBCLOSE-alert" class="lnk-btn">';
                                  htmlcontent+='</div>';
                              htmlcontent+='</div>';
                          htmlcontent+='</div>';
              $("#ctn-all").append(htmlcontent);
        }
        return;
      });

      $("#ctn-all").on('click',"div[data-name-tag='coordenadores'] input[name='btn-SEND-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeCoordenador=$("#ctn-all div[data-name-tag='coordenadores'] input[name='nomecoordenador']").val();
        var emailCoordenador=$("#ctn-all div[data-name-tag='coordenadores'] input[name='emailcoordenador']").val();

        var idDisciplina = new Array();
            var getDisciplina=$("#ctn-all div[data-name-tag='coordenadores'] select[name='SELECT-disciplina']").find('option');
            $(getDisciplina).each(function() {
                  if($(this).attr("selected")=="selected"){
                    idDisciplina.push($(this).val());
                  }
            });
        $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeCoordenador', nomeCoordenador);
            data.append('emailCoordenador', emailCoordenador);
            data.append('idDisciplina', idDisciplina);
            data.append('metodo','novocoordenador');
        var msg="Coordenador cadastrado com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[data-name-tag='coordenadores'] input[name='btn-UPDATE-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeCoordenador=$("#ctn-all div[data-name-tag='coordenadores'] input[name='nomecoordenador']").val();
        var idCoordenador=$("#ctn-all div[data-name-tag='coordenadores'] input[name='nomecoordenador']").attr("data-coordenador-id");
        var emailCoordenador=$("#ctn-all div[data-name-tag='coordenadores'] input[name='emailcoordenador']").val();
        
        var idDisciplina = new Array();
            var getDisciplina=$("#ctn-all div[data-name-tag='coordenadores'] select[name='SELECT-disciplina']").find('option');
            $(getDisciplina).each(function() {
                  if($(this).attr("selected")=="selected"){
                    idDisciplina.push($(this).val());
                  }
            });

        $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeCoordenador', nomeCoordenador);
            data.append('idCoordenador', idCoordenador);
            data.append('emailCoordenador', emailCoordenador);
            data.append('idDisciplina', idDisciplina);
            data.append('metodo','updatecoordenador');
        var msg="Coordenador alterado com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-coordenador'] input[name='btn-SUBSEND-action']", function(e) {
        var idCoordenador=$("#ctn-all div[name='del-coordenador']").attr("data-id-coordenador");
        var idUser=getCookie("userid");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('idCoordenador', idCoordenador);
            data.append('metodo','excluircoodenador');
        var msg="Coordenador EXCLUÍDO com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-coordenador'] input[name='btn-SUBCLOSE-alert']", function(e) {
          $('#ctn-all').find("div.ctn-modal-default").removeClass("disabled");
          $('#ctn-all').find("div[name='del-coordenador']").remove();
       });
      //--FIM EVENTOS ABA COORDENADORES--//
            //--EVENTOS ABA PROFESSORES--//
      $("#ctn-all div[data-name-tag='professores']").on('change',"input[name='DisableProfessores']", function() {
           var valStatus='';
           if(!$("#ctn-all div[data-name-tag='professores']").find("ul.lst-form-modal").hasClass("disabled")){
                $("#ctn-all div[data-name-tag='professores']").find("ul.lst-form-modal").addClass("disabled");
                $("#ctn-all div[data-name-tag='professores']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',true);
                $("#ctn-all div[data-name-tag='professores']").find('ul.lst-form-modal').find('select[name="SELECT-disciplina"]').attr('disabled',true);
                $("#ctn-all div[data-name-tag='professores']").find("i.fa-trash").addClass("disabled");
                $("#ctn-all div[data-name-tag='professores']").find("i.fa-pencil-square-o").addClass("disabled");
                valStatus='n'
            }else{
                $("#ctn-all div[data-name-tag='professores']").find("ul.lst-form-modal").removeClass("disabled");
                $("#ctn-all div[data-name-tag='professores']").find('ul.lst-form-modal').find('input[type="text"]').attr('disabled',false);
                $("#ctn-all div[data-name-tag='professores']").find('ul.lst-form-modal').find('select[name="SELECT-disciplina"]').attr('disabled',false);
                $("#ctn-all div[data-name-tag='professores']").find("i.fa-trash").removeClass("disabled");
                $("#ctn-all div[data-name-tag='professores']").find("i.fa-pencil-square-o").removeClass("disabled");
                valStatus='s'
           }
           //--envia o status--//
            var idUser=getCookie("userid");
            var data = new FormData();
            data.append('idUser', idUser);
            data.append('fluxo', 'professores');
            data.append('status', valStatus);
            data.append('metodo','updatefluxo');
            var msg="Fluxo alterado com sucesso!";
            var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
                sendConfing(data,msg,callback);
            //--FIM envia o status--//
      });
  
      $("#ctn-all div[data-name-tag='professores']").on('change',"input[name='nomeprofessor']", function() {
          if($("#ctn-all div[data-name-tag='professores'] input[name='emailprofessor']").val()!="" && $("#ctn-all div[data-name-tag='professores'] select[name='SELECT-disciplina']").find('option:selected').val()!=""){
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all div[data-name-tag='professores']").on('change',"input[name='emailprofessor']", function() {
          if($("#ctn-all div[data-name-tag='professores'] input[name='nomeprofessor']").val()!="" && $("#ctn-all div[data-name-tag='professores'] select[name='SELECT-disciplina']").find('option:selected').val()!=""){
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });

      $("#ctn-all div[data-name-tag='professores']").on('change',"select[name='SELECT-disciplina']", function() {

          if($("#ctn-all div[data-name-tag='professores'] input[name='nomeprofessor']").val()!="" && $("#ctn-all div[data-name-tag='professores'] input[name='emailprofessor']").val()!=""){
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-SEND-action']").attr("disabled",false);
              $("#ctn-all div[data-name-tag='professores'] input[name='btn-UPDATE-action']").attr("disabled",false);
          }
      });
       $("#ctn-all div[data-name-tag='professores']").on('click',"select[name='SELECT-disciplina'] option", function() {
        var disabledSelect=$(this).parent().attr("disabled");
          if(disabledSelect!="disabled"){
            if($(this).attr("selected")){
              $(this).attr("selected",false);
            }else{
              $(this).attr("selected",true);
            }
          }
      });
      $("#ctn-all").on('click',"div[data-name-tag='professores'] i.fa-pencil-square-o", function() {
          if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idProfessor=Element.attr("id");
              var nomeProfessor=Element.children("div.ctn-info-lst-group").children("span").html();
              var emailProfessor=Element.children("div.ctn-info-lst-group").children("a").html();
              var idlistDisciplina=Element.children("div.ctn-info-lst-group").attr("data-ctn-id");

              //--altera a label do h2--//
               $('h2[name="lbl-element"]').empty();
               $('h2[name="lbl-element"]').html("Editar o Professor:");
               //--FIM altera a label do h2--//
               //--altera o name do input--//
               $("input[name='btn-SEND-action']").attr("disabled",true);
               $("input[name='btn-UPDATE-action']").attr("disabled",true);
               $('input[name="btn-SEND-action"]').attr("value","ALTERAR");
               $('input[name="btn-SEND-action"]').attr("name","btn-UPDATE-action");
               //--altera o name do input--//

              //--altera os valores do input--//
              $('#ctn-all').find("div[data-name-tag='professores']").find('input[name="nomeprofessor"]').val(nomeProfessor);
              $('#ctn-all').find("div[data-name-tag='professores']").find('input[name="nomeprofessor"]').attr("data-professor-id",idProfessor);
              $('#ctn-all').find("div[data-name-tag='professores']").find('input[name="emailprofessor"]').val(emailProfessor);
              //--FIM altera os valores do input--//

              //--marca o select option do curso--//
              var ArrayListaDisciplina=new Array();
                  ArrayListaDisciplina=idlistDisciplina.split(",");

              $('#ctn-all').find("div[data-name-tag='professores']").find('select[name="SELECT-disciplina"]').find('option:selected').attr("selected",false);
               
               $.each(ArrayListaDisciplina, function(i, item) {
                         var valueID=item;
                         $('#ctn-all').find("div[data-name-tag='professores']").find('select[name="SELECT-disciplina"]').find('option[value="'+valueID+'"]').attr("selected",true);
              });

          }
          return;
      });
       $("#ctn-all").on('click',"div[data-name-tag='professores'] i.fa-trash", function() {
        if(!$(this).hasClass("disabled")){
              var Element=$(this).parent();
              var idProfessor=Element.attr("id");
              var nomeProfessor=Element.children("div.ctn-info-lst-group").children("span").html();


              $('#ctn-all').addClass("firstdisabled");
              var htmlcontent='<div class="ctn-modal-alert ctn-del-professor sub-alert" name="del-professor" data-id-professor="'+idProfessor+'">';
                              htmlcontent+='<div class="wrapper-modal">';
                                  htmlcontent+='<h1>Excluir Professor</h1>';
                                  htmlcontent+='<div class="ctn-conf-add">';
                                  htmlcontent+='<p>Deseja prosseguir com a solicitação de EXCLUSÃO do Professor: <strong>'+nomeProfessor+'</strong></p>';
                                  htmlcontent+='</div>';    
                                  htmlcontent+='<div class="ctn-btn-group">';
                                      htmlcontent+='<input type="button" value="CONFIRMAR" name="btn-SUBSEND-action">';
                                      htmlcontent+='<input type="button" value="CANCELAR" name="btn-SUBCLOSE-alert" class="lnk-btn">';
                                  htmlcontent+='</div>';
                              htmlcontent+='</div>';
                          htmlcontent+='</div>';
              $("#ctn-all").append(htmlcontent);
        }
        return;
      });

      $("#ctn-all").on('click',"div[data-name-tag='professores'] input[name='btn-SEND-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeProfessor=$("#ctn-all div[data-name-tag='professores'] input[name='nomeprofessor']").val();
        var emailProfessor=$("#ctn-all div[data-name-tag='professores'] input[name='emailprofessor']").val();

        var idDisciplina = new Array();
            var getDisciplina=$("#ctn-all div[data-name-tag='professores'] select[name='SELECT-disciplina']").find('option');
            $(getDisciplina).each(function() {
                  if($(this).attr("selected")=="selected"){
                    idDisciplina.push($(this).val());
                  }
            });

       
        $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeProfessor', nomeProfessor);
            data.append('emailProfessor', emailProfessor);
            data.append('idDisciplina', idDisciplina);
            data.append('metodo','novoprofessor');
        var msg="Professor cadastrado com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[data-name-tag='professores'] input[name='btn-UPDATE-action']", function(e) {
        var idUser=getCookie("userid");
        var nomeProfessor=$("#ctn-all div[data-name-tag='professores'] input[name='nomeprofessor']").val();
        var idProfessor=$("#ctn-all div[data-name-tag='professores'] input[name='nomeprofessor']").attr("data-professor-id");
        var emailProfessor=$("#ctn-all div[data-name-tag='professores'] input[name='emailprofessor']").val();
        
        var idDisciplina = new Array();
            var getDisciplina=$("#ctn-all div[data-name-tag='professores'] select[name='SELECT-disciplina']").find('option');
            $(getDisciplina).each(function() {
                  if($(this).attr("selected")=="selected"){
                    idDisciplina.push($(this).val());
                  }
            });

        $('#ctn-all').addClass("firstdisabled");

        var data = new FormData();
            data.append('idUser', idUser);
            data.append('nomeProfessor', nomeProfessor);
            data.append('idProfessor', idProfessor);
            data.append('emailProfessor', emailProfessor);
            data.append('idDisciplina', idDisciplina);
            data.append('metodo','updateprofessor');
        var msg="Professor alterado com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-professor'] input[name='btn-SUBSEND-action']", function(e) {
        var idProfessor=$("#ctn-all div[name='del-professor']").attr("data-id-professor");
        var idUser=getCookie("userid");
        var data = new FormData();
            data.append('idUser', idUser);
            data.append('idProfessor', idProfessor);
            data.append('metodo','excluirprofessor');
        var msg="Professor EXCLUÍDO com sucesso!";
        var callback=$(".ctn-header-tools").find('a[name="btn-GET-configuracoes"]').click();
            sendConfing(data,msg,callback);
            e.stopPropagation();
      });

      $("#ctn-all").on('click',"div[name='del-professor'] input[name='btn-SUBCLOSE-alert']", function(e) {
          $('#ctn-all').find("div.ctn-modal-default").removeClass("disabled");
          $('#ctn-all').find("div[name='del-professor']").remove();
       });
      //--FIM EVENTOS ABA PROFESSORES--//
  });
 //--FIM navegação entre abas--//


});

function disabledModal(modo){
  if (modo=="ON"){
        $('#ctn-all').find(".ctn-modal-default.disabled").find('input[type="text"]').attr("disabled",true);
         $('#ctn-all').find('ul.lst-form-modal').find('i.fa').addClass("disabled");

  }else{

  }

}