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
    <script type="text/javascript" src="js/bibliotecas.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
  </head>
  <body name="PageLogin" onload="getSession()">
    <!--cabeçalho-->
    <div class="ctn-header full-wrapper lightgray" name="top-header">
      <header class="cabecalho-catalogo">
        <a href=""><h1 class="logotipo">Sagah - Soluções Educacionais Integradas</h1></a>
      </header>
    </div>
    <!--FIM cabeçalho-->
    <!--cabeçalho segundo nível-->
     <div class="ctn-header full-wrapper mediumgray" name="nav-header">
          <header class="sec-cabecalho-catalogo">
              <div class="wrapper">
                <h2 class="tlt-content">Catálogo</h2>
              </div>
          </header>
      </div>
    <!--FIM cabeçalho segundo nível-->
    <div class="full-wrapper pos-relative ctn-BG-home">
    <div class="wrapper ctn-sections">
    <!--conteúdo-->
    <section name="pageLogin" class="wrapper ctn-home">
        <div class="ctn-content">
             <!--área de login-->
             <div class="ctn-modal-alert box-area">
            <div class="wrapper-modal">
                <h1>Digite seu USUÁRIO e SENHA para acessar o catálogo:</h1>

                <form method="post" name="form-login">
                  <div class="form-default lst-txt">
                      <div class="ctn-input" name="ctn-user">
                          <input type="text" id="user" placeholder="Usuário">
                          <label for="nomecurso">Usuário</label>
                      </div>
                      <div class="ctn-input" name="ctn-pass">
                          <input type="password" id="pass" placeholder="Senha">
                          <label for="nomecurso">Senha</label>
                      </div>                   
                  </div>
                  <!--botões-->
                  <div class="ctn-btn-group">
                    <input type="button" value="ENVIAR" name="btn-SEND-login" disabled>
                  </div>
                  <!--FIM botões-->
                </form>
            </div> 
        </div>

             <!--FIM área de login-->
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