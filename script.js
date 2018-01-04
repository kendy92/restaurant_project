//update 04/01/2018
$(function(){
   //init Date picker
    $("#datepicker").datepicker();
    $("#eventdate").datepicker();
    
    //special dish random value
    var dishes = ["Mulligatowny Soup","Chicken Karahi","Chicken Jalfrezi","Mutton Home Style", "Beef Manalu"];
    //var randDish = dishes[Math.floor(Math.random() * dishes.length)];
    
    //slideshow
    $(".banner-section > .slideshow:gt(0)").hide();
    var delayTime = 1000;
    var count_dish = 0;
    setInterval(function(){
        count_dish++;
        if(count_dish >4){
            count_dish = 0;
        }
       $("#special-dish").text(dishes[count_dish]);
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
        $(this).children("h3").fadeIn(500);
                               },function(){
        //out
        $(this).children("img").removeClass("flipped");
        $(this).children("h3").fadeOut(500);
    });
    
    //validation booking form
    var get_venue = "";
    $("#venue li #bookbtn").on('click',function(){
       get_venue = $(this).attr("data");
       $("#selected-venue").text("You have select " + get_venue + " venue.");
    });
    
    $("#venue li img").hover(function(){
        $(this).addClass("full-size-img");
    }, function(){
        $(this).removeClass("full-size-img");
    });
    
    $("#btnsubmit").on('click',function(){
        var ename = $("#eventname").val();
        var etype = $("#eventtype").val();
        var edate = $("#eventdate").val();
        var estart = $("#starttime").val();
        var eend = $("#endtime").val();
        var eguest = $("#guest").val();
        var venue = get_venue;
        var ebudget = $("#budget").val();
        var econtactname = $("#contactname").val();
        var ephone = $("#phone").val();
        var eemail = $("#email").val();
        var einfo = $("#addinfo").val();
        var checkbox1 = $("#checkbox1").prop('checked');
        var checkbox2 = $("#checkbox2").prop('checked');
        
        if(ename === ""){
            alert("Please enter event name!");
            $("#eventname").focus();
            return false;
        }else if(edate === ""){
            alert("Please choose event date!");
            $("#eventdate").focus();
            return false;
        }else if(venue === ""){
            alert("Please select venue to operate event!");
            $("#venue").focus();
            return false;
        }else if(ebudget === ""){
            alert("Please enter your budget!");
            $("#budget").focus();
            return false;
        }else if(econtactname === ""){
            alert("Please enter your contact name!");
            $("#contactname").focus();
            return false;
        }else if(ephone === ""){
            alert("Please enter your contact number!");
            $("#phone").focus();
            return false;
        }else if(eemail === ""){
            alert("Please enter your email!");
            $("#email").focus();
            return false;
        }else if(estart >= eend){
            alert("The end time cannot be lower than start time !");
            return false;
        }else if(checkbox1 === false || checkbox2 === false){
            alert("Please check all the agreement!");
            return false;
        }else{
            alert("Thanks for booking event with us. We will contact you soon!");
            return true;
        }
        
        
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