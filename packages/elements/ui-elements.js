if (typeof jQuery === 'undefined') {
  throw new Error('ThemeEngine\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.');
  if ((version[0] < 2 && version[1] < 9) || (version[0] === 1 && version[1] === 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('ThemeEngine\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);

$(document).ready(function (){
"use strict";

document.createElement('tab','portfolio','th-nav');//element declarartion
$("tab,portfolio,th-nav").css("display", "block");//element styles

$(function themeengine() {
if(document.querySelector('tab')){
$('tab').each(function(){
var tab = $(this);
tab.find('.tab-content').hide(); // Hide all divs
tab.find('.tab-content:first').show(); // Show the first div
tab.find('ul.tabs li:first').addClass('current'); // Set the class of the first link to active

tab.find('ul.tabs li').click(function(){ //When any link is clicked
    tab.find('ul.tabs li').removeClass('current'); // Remove active class from all links
    $(this).addClass('current'); //Set clicked link class to active

    var currentTab = tab.find($(this).attr('data-tab')); // Set variable currentTab to value of href attribute of clicked link

    tab.find('.tab-content').hide(); // Hide all divs
    $(currentTab).show(); // Show div with id equal to variable currentTab
    return false;
});

});//tab ends
}
else if(document.querySelector('portfolio')){
$('portfolio').each(function (){
var selectedPort = $(this);
selectedPort.find(".fil-btn").click(function(){
var selectedFil = $(this).attr("data-rel");
selectedPort.find('.fil-btn.active').removeClass('active');
$(this).addClass('active');
    selectedPort.find(".portfolio").fadeTo(100, 0.1);
	selectedPort.find(".portfolio .portfolio-item").not("."+selectedFil).fadeOut().removeClass(portanim);
    setTimeout(function() {
      $("."+selectedFil).fadeIn().addClass(portanim);
      $(".portfolio").fadeTo(300, 1);
    }, 300);

});

selectedPort.find(".portfolio-item a").click(function() {
	 var url = "ajax-lightbox/" + $(this).attr('data-href');
	    $.ajax({
        url: url,
        type: "get",
        dataType: "html",
        success: function (data) {
        selectedPort.find('.ajax-view').html(data);
		selectedPort.find(".ajax-view .port").addClass('item_open');
        },
		error:function (){
        alert('file resource not found');
		}
});

$('html, body').animate({
     scrollTop: parseInt(selectedPort.find(".ajax-view").offset().top)
     }, 400);
	 $('body').css('overflow','hidden');
	 return false;
});
selectedPort.find(".ajax-view").delegate(".portclose", "click", function(){
selectedPort.find('.port').removeClass('item_open');
$('body').removeAttr('style');
return false;
});

});//portfolio ends
}

else if(document.querySelector('modal')){

$('modal').each(function(){
var modal = $(this);
var modalbutton = '*['+'modal-target = "#' + modal.attr('id') + '"]';
$(modalbutton).click(function(){
$(modal).addClass('open');
});
modal.find('*[modal-close]').click(function(){
$(modal).removeClass('open');
});
});
}

else{
throw new Error('Theme Engine Says : ' + 'Use Theme Engine Elements');
}
});//themeengine ends

});
