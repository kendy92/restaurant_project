//update 04/01/2018
$(function(){
    
    //init Date picker
    $("#datepicker").datepicker();
    $("#eventdate").datepicker();
    
    //scroll to top
    $('#backToTop').on('click',function(){
       $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    
    
    //top navigation
    $(".top-nav li").hover(function(){
       $(this).children(".child-nav").slideDown(500);
    }, function(){
        $(this).children(".child-nav").slideUp(500);
    });
    
    //special dish random value
    var dishes = ["Mulligatowny Soup","Chicken Karahi","Chicken Jalfrezi","Mutton Home Style", "Beef Manalu"];
    
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
    
   
    //validation reserve table form
    $(".btnReserve").on('click',function(){
        var name = $("#name").val();
        var phone = $("#phone").val();
        var date = $("#datepicker").val();
        var time = $("#time").val();
        var groupsize = $("#group_size").val();
        
        if(name === ""){
            alert("Please enter your name!");
            $("#name").focus();
            return false;
        }else if(phone === ""){
            alert("Please enter your phone number!");
            $("#phone").focus();
            return false;
        }else if(date === ""){
            alert("Please choose a date!");
            $("#datepicker").focus();
            return false;
        }else if(time === ""){
            alert("Please choose time to reserve!");
            $("#time").focus();
            return false;
        }else if(time === ""){
            alert("Please choose group size!");
            $("#group_size").focus();
            return false;
        }else{
            alert("Thanks for reserving table with us. We will contact you soon!");
            return true;
        }
        
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
        }else if(ebudget === "" || isNaN(ebudget)){
            alert("Please enter your budget!");
            $("#budget").focus();
            return false;
        }else if(ebudget < 100){
            alert("The minimum budget is $100!");
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
    
    
    //preview giftcard
    var get_amt = 0;
    $("#amount li").on('click', function(){
        $("#amount_value").val("");
        get_amt = $(this).attr("data");
        $(this).siblings().css({"background-color":"transparent", "color":"#fff"});
        $(this).css({"background-color":"rgba(0,0,0,0.3)","color":"#fff"});
    });
    
    $("#preview-btn").on('click',function(){
        var sender = $("#sender_name").val();
        var recipient = $("#recipient_name").val();
        var custom_amt = $("#amount_value").val();
        var email = $("#recipient_email").val();
        var msg = $("#message").val();
        var quantity = $("#quantity").val();
        var checkbox1 = $("#checkbox1").prop("checked");
        var checkbox2 = $("#checkbox2").prop("checked");
        
        if(get_amt === 0 && custom_amt === ""){
            alert("Please select or enter custom amount of giftcard!");
            return false;
        }else if(recipient === ""){
            alert("Please enter recipient name!");
            return false;
        }else if(email === ""){
            alert("Please enter recipient email!");
            return false;
        }else if(msg === ""){
            alert("Please enter message to recipient!");
            return false;
        }else if(quantity < 1){
            alert("Minimum order is 1");
        }else if(checkbox1 === false || checkbox2 === false){
            alert("Please check all the agreement!");
            return false;
        }else{
            $(".giftcard-preview").fadeIn(500);
            var d= new Date();
            var expire_date = d.getDate() + "/" + (d.getUTCMonth() + 2) + "/" + d.getFullYear();
            $(".date").text("Expired on " + expire_date);
            $(".giftcard_recipient").text("Dear " + recipient);
            $(".message").text(msg);
            if(custom_amt === ""){
                $(".giftcard_amt").text("$" + get_amt);
            }else{
                $(".giftcard_amt").text("$" + custom_amt);
            }
            
            $(".giftcard_sender").html("<p>Loads of love</p><p>"+sender+"</p>")
        }
    });
    
    
    //show on scroll effect
    var windowHeight, windowScrollPos, currentPos, objectOffsetTop;
    
    $.fn.showOnScroll = function(direction, speed){
        return $(this).each(function(){
            objectOffsetTop = $(this).offset().top;
            
            if(!$(this).hasClass("hidden")){
                if(direction == "right"){
                    $(this).css({
                           "opacity"	: 0,
                            "right"		: "1000px",
                            "position"	: "relative" 
                    });
                }else{
                    $(this).css({
                           "opacity"	: 0,
                            "right"		: "-1000px",
                            "position"	: "relative" 
                    });
                }
                $(this).addClass("hidden");
            }
            
            if(!$(this).hasClass("animated")){
                    if(currentPos > objectOffsetTop){
                        $(this).animate({
                            "opacity": 1,
                            "right": 0
                        },speed).addClass("animated");
                    }
            }
        });
    }
    
    $(window).scroll(function(){
        windowHeight = $(window).height();
        windowScrollPos = $(window).scrollTop();
        currentPos = windowHeight + windowScrollPos;
        
        $(".about-us").showOnScroll("left",1000);
        $(".thumbnail:nth-child(1)").showOnScroll("right",1000);
        $(".thumbnail:nth-child(2)").showOnScroll("left",1000);
        $(".thumbnail:nth-child(3)").showOnScroll("right",1000);
        
        $(".menu:nth-child(2n)").showOnScroll("left",1000);
        $(".menu:nth-child(2n+1)").showOnScroll("right",1000);
        
        $(".customer-1").showOnScroll("left",1500);
        $(".customer-2").showOnScroll("right",1800);
        $(".customer-3").showOnScroll("left",2100);
        $(".reservation-form").showOnScroll("left",2300);
    });
    
    
});