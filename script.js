$(function(){
   //init Date picker
    $("#datepicker").datepicker();
    
   //hover effect in top navigation
    $("ul.top-menu li").hover(
    function(){
        $(this).children("ul.child-menu").finish().slideDown('medium');
    },function(){
        $(this).children("ul.child-menu").finish().slideUp('medium');
    });
});