//update 03/01/2018
$(function(){
   //init Date picker
    $("#datepicker").datepicker();
    
    
    //special dish random value
    var dishes = ["Mulligatowny Soup","Chicken Karahi","Chicken Jalfrezi","Mutton Home Style", "Beef Manalu"];
    var randDish = dishes[Math.floor(Math.random() * dishes.length)];
    $("#special-dish").text(randDish);
    
    
    //slideshow
    $(".banner-section > .slideshow:gt(0)").hide();
    var delayTime = 1000;
    
    setInterval(function(){
       $(".banner-section > .slideshow:first")
        .fadeOut(delayTime)
        .next()
        .fadeIn(delayTime)
        .end()
        .appendTo(".banner-section");
    }, 3000);
    
    
    //menu box flip effect
    $("[class*='menu']").hover(function(){
                               //in
        $(this).children("img").addClass("flipped");
        $(this).children("h3").show();
                               },function(){
        //out
        $(this).children("img").removeClass("flipped");
        $(this).children("h3").hide();
    });
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
    
    //Fix the navigation menu disappear when scroolling to different screen size
    window.onresize = function(){
    var screenW = window.innerWidth;
    if(screenW > 780){
        $("ul.top-menu").css('display','flex');
    }else{
        $("ul.top-menu").css('display','none');
    }
}
});