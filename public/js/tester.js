function checkMod(){
  if (Modernizr.mq('(min-width: 1025px)')) {
    //tester close button
    $('.close-btn-tester-wrap').click(function(){
      $('.tester-container').css({"transform":"translateX(81vw)"});
      $('.overlay').fadeOut();
    });
    //tester overlay close
    $('.overlay').click(function(){
      $('.tester-container').css({"transform":"translateX(81vw)"});
      $('.overlay').fadeOut();
    });
    //tester open
    $('.tester-btn').click(function(){
      $('.tester-container').css({"transform":"translateX(0)"});
      $('.overlay').fadeIn();
      placeCaretAtEnd($('.tester-field')[0]);
    });
  }
  else {
    $('.close-btn-tester-wrap').click(function(){
      $('.tester-container').css({"transform":"translateY(0)"});
      $('.overlay').fadeOut();
    });
    //tester open
    $('.tester-btn').click(function(){
      $('.tester-container').css({"transform":"translateY(-100vh)"});
      $('.overlay').fadeIn();
      placeCaretAtEnd($('.tester-field')[0]);
    });
    //ajust font size
    $('#size').val('20');

  }
}

$(function(){

  $(window).resize(checkMod);
  checkMod();

  //typeface
  const $text = $('.tester-field');
  $("#testerTypo").change(function(){
    $text.css('font-family',$(this).val());
    $('.buy-typo').text('');
    $('.buy-typo').append($(this).val());
  });
  $text.css('font-family',$("#testerTypo").val());
  $('.tester > .buy-typo').append($("#testerTypo").val());

  //weight
  $(".weigth-box").click(function(){
    const weight = $(this).data("weight");
    $text.css('font-weight', weight);
    $(".weigth-box").removeClass('active');
    $(this).addClass('active')
  });

  //Size
  $('#size').change(function(){
    $text.css('font-size', $(this).val());
    $('.tester-size').text($(this).val());
  });
  $text.css('font-size', $(this).val());
  //case
  $('.case-box').click(function(){
    $text.toggleClass($(this).data('case'));
    $(this).toggleClass('active');
  });

  //font
  $('.font-col-pk').colpick({
  	colorScheme:'dark',
  	layout:'rgbhex',
  	color:'F840A4',
  	onChange:function(hsb,hex,rgb,el,bySetColor) {
  		$(el).css('background-color', '#'+hex);
      $text.css("color",'#'+hex)
  	}
  });
  //background
  $('.bg-col-pk').colpick({
  	colorScheme:'dark',
  	layout:'rgbhex',
  	color:'#ffffff',
  	onChange:function(hsb,hex,rgb,el, bySetColor) {
  		$(el).css('background-color', '#'+hex);
      $('.tester-field').css("background-color",'#'+hex);
  	}
  })
});

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}
