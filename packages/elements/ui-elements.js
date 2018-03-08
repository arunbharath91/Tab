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

document.createElement('tab');//element declarartion
$("tab").css("display", "block");//element styles

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

else{
throw new Error('Theme Engine Says : ' + 'Use Theme Engine Elements');
}
});//themeengine ends

});
