// KEYS

$(document).keyup(function(e) {
    if($('#pageLogin').is(':visible')) {
        if (e.keyCode == 13) { $('#pageLogin #submit').click(); }
    }
});


// READY

$(document).ready(function() {
    $('#loading').hide();
    $('#pageLogin .alert').hide();

    function showLoading() {
        $('#loading').fadeIn(300);
    }

    function hideLoading() {
        $('#loading').fadeOut(300);
    }

    $('#pageLogin #submit').click(function(e) {
        e.preventDefault();
        var userLogin = $('#pageLogin #user').val();
        var passLogin = $('#pageLogin #pass').val();

        if (userLogin == '' || passLogin == '') {
            showLoading();
            $('#pageLogin .alert').html('Preencha todos os campos.');
            $('#pageLogin .alert').slideDown(300);
            hideLoading();
            $('#pageLogin #user').val("Usuário");
            $('#pageLogin #pass').val("Senha");
        } else {
            $.ajax({
                url: 'https://homologacao.sagah.com.br/sagahcm/serv_ecommerce.php?method=login&usuario='+userLogin+'&senha='+passLogin,
                type: 'GET',
                data: '',
                dataType: 'json',
                beforeSend: function() {
                    showLoading();
                },
                success: function(data) {
                    hideLoading();
                    str = "";
                    if (data.erro != null) {
                        $('#pageLogin .alert').html(data.erro.mensagem);
                        $('#pageLogin .alert').slideDown(300);
                        $('#pageLogin #user').val("Usuário");
                        $('#pageLogin #pass').val("Senha");
                    } else {
                        window.location.href = 'index.php';
                    }
                },
                error: function(e) {
                    var error = data;
                    $('#pageLogin .alert').html(error);
                    $('#pageLogin .alert').slideDown(300);
                    $('#pageLogin #user').val("Usuário");
                    $('#pageLogin #pass').val("Senha");
                }
            });
        }
    });
});
