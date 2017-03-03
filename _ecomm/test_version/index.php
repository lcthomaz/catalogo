<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>SAGAH | Catálogo de UAs</title>
    <meta name="author" content="SAGAH">
    <meta name="description" content="Sagah - Loja Virtual">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="favicon.png"/>
    <link rel="stylesheet" type="text/css" href="stylesheets/reset.min.css">
    <link rel="stylesheet/less" href="stylesheets/style.less">

    <!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body>
    <div id="loading"><img src="images/load.gif" width="78" height="36" alt="Carregando..."><br>Aguarde</div>
    <div id="uaPreview">
        <div id="titulo">
            <div class="container">
                <h2>Saúde > Ciências Biológicas e da Saúde > Amostra e Amostragem</h2>
                <span class="close">x</span>
                <button class="btn-add">Adicionar UA</button>
                <ul class="estrelas"></ul>
            </div>
        </div>
        <div id="conteudo">
            <iframe id="frame"></iframe>
        </div>
    </div>
    <div class="box-shadow" id="myDps">
        <div id="title">
            Minhas Disciplinas
            <span id="myDps-close">x</span>
            <span id="myDps-expand">-</span>
            <img src="images/icons/move.svg" class="drags" alt="Mover">
        </div>
        <div id="content">
            <button id="newDp">+ Criar Disciplina</button>
            <ul id="dps"></ul>
        </div>
    </div>
    <div id="modal">
        <div id="box">
            <div id="header">
                <h1>Title H1</h1>
                <button class="close">x</button>
            </div>
            <div id="body">
                <div class="message"></div>
            </div>
            <div id="footer"></div>
        </div>
    </div>
    <nav>
        <div class="container">
            <a id="logo" href="">
                <img src="images/sagah-logo-horizontal-branco.png" width="110" height="56" alt="Sagah - Soluções Educacionais Integradas">
            </a>
            <div id="profile">
                <p>Olá, <span></span></p>
                <a href="#" id="logout">Sair</a>
            </div>
            <div id="myDps-open">
                <span></span>
            </div>
            <form id="search">
                <input type="text" id="searchInput" value="">
                <img src="images/buscar.png" alt="Busca">
            </form>
            <ul id="menu"></ul>
        </div>
    </nav>
    <div id="pageIndex" class="container">
        <div id="slider">
            <a href="#" class="control_next"><img src="images/icons/arrowRight.png" alt="Mover Direita"></a>
            <a href="#" class="control_prev"><img src="images/icons/arrowLeft.png" alt="Mover Esquerda"></a>
            <ul>
                <li style='background: url("images/1.jpg");'></li>
                <li style='background: url("images/2.jpg");'></li>
                <li style='background: url("images/3.jpg");'></li>
            </ul>
        </div>
        <section id="lasts" class="unidades">
            <h2 id="lasts-target"><img src="images/icons/flag.png" width="24" height="24" alt="Últimas Adicionadas"> Últimas adicionadas:</h2>
            <div class="listUas"></div>
            <div class="uasHidden"></div>
            <button>Ver Mais</button>
        </section>
        <section id="favorites" class="unidades">
            <h2 id="favorites-target"><img src="images/icons/starb.png" width="24" height="24" alt="Unidades mais Pedidas"> Unidades mais pedidas:</h2>
            <div class="listUas"></div>
            <div class="uasHidden"></div>
            <button>Ver Mais</button>
        </section>
    </div>
    <div id="pageSection" class="container">
        <div class="title">
           <span>Filtrar por:</span>
            <select id="areaGeral"></select>
            <select id="areaFormacao"></select>
            <select id="areaGeralPrincipal"></select>
        </div>
        <div class="listUas"></div>
        <div class="holder"></div>
    </div>
    <div id="pageSearch" class="container">
        <h1 class="title">Pesquisa</h1>
        <div class="listUas"></div>
        <div class="holder"></div>
    </div>

    <div class="container">
        <hr>
        <footer>
            <p>&copy; SAGAH 2015<br><br></p>
        </footer>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/1.7.4/less.min.js"></script>
    <script src="javascript/script.min.js"></script>
</body>
</html>
