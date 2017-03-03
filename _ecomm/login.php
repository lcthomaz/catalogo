<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>SAGAH | Catálogo de UAs</title>
    <meta name="author" content="SAGAH">
    <meta name="description" content="Sagah - Loja Virtual">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="stylesheets/reset.min.css">
    <link rel="shortcut icon" type="image/png" href="favicon.png"/>
    <link rel="stylesheet/less" href="stylesheets/style.less">

    <!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body>
    <div id="loading"><img src="images/load.gif" width="78" height="36" alt="Loading..."><br>Aguarde</div>
    <a href="http://www.grupoa.com.br" target="_blank">
    <img src="images/grupoa-hoeper.png" width="220" height="59" id="grupoa" alt="GrupoA - Educação"></a>
    <div id="pageLogin">
        <div class="container">
            <img src="images/sagah-logo-vertical-branco.png" width="300" height="192" id="sagah" alt="Sagah - Soluções Educacionais Integradas">
            <form method="post">
                <input type="text" id="user" placeholder="Usuário"><br>
                <input type="password" id="pass" placeholder="Senha"><br>
                <div class="alert"></div>
                <button id="submit" type="button">Entrar</button>
            </form>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/1.7.4/less.min.js"></script>
    <script src="javascript/login.js"></script>
<?php
   if (@$_POST['user'] != null && @$_POST['pass'] != null) {
?>
<script>
   $(document).ready(function() {
      $('#pageLogin #user').val('<?php echo $_POST['user'] ?>');
      $('#pageLogin #pass').val('<?php echo $_POST['pass'] ?>');
      $('#pageLogin #submit').click();
   });
</script>
<?php
   }
?>
</body>
</html>
