$(document).ready(function(){
    window.reserve = false;
    $.ajax({
        url:"/parkingContext",
        success:function(result){
            console.log(result);
            $('#spaceCounter').html(result.freeSpaces);
            $('section').fadeIn(500);
        }
    });
    setInterval(reloadData, 1000);



    $('#reserve').click(function(){
        $('.removeReserve').hide();
        if(window.reserve) {
            $('.alert').html("Нельзя бронировать больше одного места");
            setTimeout(function(){
                $('.alert').html("Для Вас забронировано 1 место");
                $('.removeReserve').fadeIn(500);
            }, 2000);
            return false;
        }
        $.ajax({
            url:"/bookPlace",
            method:"POST",
            success:function(){
                console.log('2');
                $('.alert').html("Мы забронировали Вам место!").fadeIn(300);
                window.reserve = true;
                setTimeout(function(){
                    $('.alert').html("Для Вас забронировано 1 место");
                    $('.removeReserve').fadeIn(500);
                }, 2000);
            }
        });
    })
    $('.removeReserve').click(function(){

        $.ajax({
            url:"/unbookPlace",
            method:"POST",
            success:function(){
                $('.alert').html("Спасибо :)").fadeIn(500);
                $('.removeReserve').hide()
                window.reserve = true;
                setTimeout(function(){
                    $('.alert').fadeOut(500);
                }, 2000);
            }
        });
    })

})

function reloadData(){
    $.ajax({
        url:"/parkingContext",
        success:function(result){
            $('#spaceCounter').html(result.freeSpaces);
        }
    });
}