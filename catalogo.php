<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SAGAH | Catálogo de UAs</title>
    <meta name="author" content="SAGAH">
    <meta name="description" content="Sagah - Loja Virtual">
    <meta name="keywords" content="">
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome-4.7.0/css/font-awesome.min.css">
    <link href="css/core.css" rel="stylesheet">
    <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/configs.js"></script>
    <script type="text/javascript" src="js/bibliotecas.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
  </head>
  <body name="PageCatalogo">
    <!--cabeçalho-->
    <div class="ctn-header full-wrapper lightgray" name="top-header">
      <header class="cabecalho-catalogo">
        <a href=""><h1 class="logotipo">Sagah - Soluções Educacionais Integradas</h1></a>
        <input type="search" name="buscaunidade" data-find-type="search" placeholder="Buscar Unidades de Aprendizagem. São mais de 4765 UAs no nosso catálogo."><label for="buscaunidade"><span></span></label>
        <div class="ctn-user-info">
          <p>Olá, <span id="lbl-login"></span></p>
          <p class="ctn-header-tools"><a name="btn-GET-logout">Sair</a></p>
        </div>
      </header>
    </div>
    <!--FIM cabeçalho-->
    <!--cabeçalho segundo nível-->
     <div class="ctn-header full-wrapper mediumgray" name="nav-header">
          <header class="sec-cabecalho-catalogo">
              <div class="wrapper">
                <h2 class="tlt-content">Catálogo</h2>
                <h2 class="lnk-area-editavel" id="minhasdisciplinas"> <!--ícone área ativada--><i class="fa fa-chevron-circle-right" aria-hidden="true"></i><!--FIM ícone área ativada--> Minhas Disciplinas</h2>
              </div>
          </header>
      </div>
    <!--FIM cabeçalho segundo nível-->
    <div class="full-wrapper pos-relative ">
    <div class="wrapper ctn-sections">
    <!--conteúdo-->
    <section name="catalogoUAs" class="wrapper">
        <div class="ctn-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td valign="top" class="mediumgray">
                    <aside name="categorias" class="lst-categorias mediumgray">
                      <nav>
                        <!--menu de categorias-->
                          <ul data-find-type="level-prim">
                          </ul>
                        <!--FIM menu de categorias-->
                      </nav>
                    </aside>
                </td>
                <td valign="top" class="main">
                    <!--breadcrumb-->
                    <ol class="breadcrumb">
                      <li class="active">UAs</li>
                      <li>São mais de 4765 UAs no nosso catálogo.</li>
                    </ol>
                    <!--FIM breadcrumb-->

                    <!--filter labels-->
                     <ol class="filterlabels" data-find-type="tag" name="areaGeralPrincipal"></ol>
                    <!--FIM filter labels-->

                    <!--sortbar-->
                    <aside class="sortbar">
                      <!--title-->
                      <div class="lbl-sort">
                        
                        <h3>Lista de Unidades</h3>
                      </div>
                      <!--FIM title-->
                      <!--form-->
                      <div class="form-short">
                        <label for="numUAs">Mostrar:</label>
                        <select name="numUAs" class="mediumgray" data-find-type="numresult">
                          <option value="5">5</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                        </select>

                         <label for="sortOptions">Ordenar por:</label>
                         <select name="sortOptions" class="mediumgray" data-find-type="sort">
                          
                          <option value="1" selected>Últimas adicionadas</option>
                          <option value="1">Mais Pedidas</option>
                          <option value="2">Ordem Alfabética</option>
                        </select>
                      </div>
                      <!--FIM form-->
                    </aside> 
                    <!--FIM sortbar-->
                    <article name="listadeUAs" class="lst-uas">
                        <ul id="ctnlistaUAs">
 
                        </ul>
                    </article>
                     <!--pagination-->
                        <nav class="ctn-pagination">
                          <label for="pagination">Página</label>
                          <ul class="pagination" name="pagination">
                                <li><input type="text" name="pagenumber" data-find-type="position" value="1"></li>
                                <li>de</li>
                                <li><span>25</span></li>
                          </ul>
                        </nav>
                        <!--FIM pagination-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </section>
    <!--FIM conteúdo-->
   <!--minhas unidades-->
    <section name="minhasUAs" class="wrapper lightgray no-display">

    </section>
  </div>
  </div>
    <!--FIM minhas unidades-->
    <!--footer-->
    <footer class="full-wrapper ctn-gnc-footer">
        <div class="wrapper">
            <h5>SAGAH</h5>
            <p><a href="mailto:contatos@sagah.com.br">contatos@sagah.com.br</a><br>
              (51) 3073-3910</p>

            <p>Av. Jerônimo de Ornelas, 670 – Bairro Santana<br>
              CEP 900340-040 – Porto Alegre/RS</p>
        </div>
    </footer>
    <!--FIM footer-->
    <!--ctn geral-->
    <div id="ctn-all">

    </div>
    <!--FIM ctn geral-->
  </body>
</html>