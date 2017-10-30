(function(d) {
  var config = {
    kitId: 'uzk1bmh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

$(function(){
  //tester
  setInterval(function(){
    $('.tester-btn-anim').animate({"opacity": "0"})
                        .delay(200)
                        .animate({"opacity": "1"});
  },1000);

  const testerbtnHtml = $('.tester-btn').html();
  $('.tester-btn').hover(function(){
    $('.tester-btn').html('Click me');
  }, function(){
    $('.tester-btn').html(testerbtnHtml);
  })

  //contact-form
  $('.form-field').hover(function(){
    $(this).find('.cotact-label').addClass('goAbove');
  }, function(){
    $(this).find('.cotact-label').removeClass('goAbove');
  });

  $('.form-field').click(function(){
    console.log("hi");
    $(this).find('.cotact-label').css('top','-10px');
  });

  //Category
  $('#filter').change(function(){
    $('.element-item').addClass('hide');
    const category = $(this).val();
    $('.element-item').each(function(){
      if($(this).data('category') === category || category === 'all'){
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    })
  });

  //home
  const colArr = ["#FDDF36", "#6C5DFF", "#F840A4"];
  let a = 1
  setInterval(function(){
    if(a > 2){
      a=0
    }
    $('.home-clip-svg').css('fill',colArr[a]);
    a++
  },800)

//   $('#filter').change(function(){
//     $grid.isotope({ filter: $(this).val()});
//   });
//
  // init Isotope
  // var $grid = $('.grid').isotope({
  //   itemSelector: '.element-item',
  //   layoutMode: 'fitRows'
  // });
  // $grid.isotope({ filter: 'sans' });
  // $('#filter').on('change', function() {
  //   console.log($( this ).val());
  //   var filterValue = $( this ).val();
  //   $grid.isotope({ filter: filterValue });
  // });

  //mobile nav
  $('.humberger').click(function(){
    $('.nav').css('transform','translateX(0)');
  });
  $('.close-btn-nav').click(function(){
    $('.nav').css('transform','translateX(60vw)');
  })


});
