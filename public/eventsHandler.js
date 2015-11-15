$(document).ready(function(){
    window.reserve = false;
    $.ajax({
        url:"/parkingContext",
        success:function(result){
            $('#spaceCounter').html(result.freeSpaces);
            $('section').fadeIn(500);
        }
    });

    $('#reserve').click(function(){
        if(reserve) {
            $('#alert').html("Нельзя бронировать больше одного места");
            setTimeout(function(){
                $('#alert').html("Для Вас забронировано 1 место");
            }, 2000);
            return false;
        }
        $.ajax({
            url:"/bookPlace",
            method:"POST",
            success:function(){
                $('#alert').html("Мы забронировали Вам место!").fadeIn(300);
                setTimeout(function(){
                    $('#alert').html("Для Вас забронировано 1 место");
                }, 2000);
            }
        });
    })

})