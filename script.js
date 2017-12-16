$(function(){
   //init Date picker
    $("#datepicker").datepicker();
    
   //hover effect in top navigation
    
    var screen_width = $(window).width();
        if(screen_width > 1024){
        
             $("ul.top-menu li").hover(
                function(){
                    $(this).children("ul.child-menu").finish().slideDown('medium');
                },function(){
                    $(this).children("ul.child-menu").finish().slideUp('medium');
                });
            
        }else{
            var count = 0;
            $("ul.top-menu li").on('click',function(){
                count++;
                if(count % 2 == 0){
                    $(this).children("ul.child-menu").finish().slideUp('medium');
                }else{
                    $(this).children("ul.child-menu").finish().slideDown('medium');
                }
                return false;
            });
        }
    
    
    //toggleBtn for mobile and tablet version
    var count_click = 0;
    $(".toggleBtn").on("click",function(){
        count_click++;
        if(count_click % 2 == 0){
            $("ul.top-menu").finish().slideUp('medium');
        }else{
            $("ul.top-menu").finish().slideDown('medium');
        }
    });
});