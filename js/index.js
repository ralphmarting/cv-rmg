$('.collapse-toggle').click(function() {
  $('.collapse-toggle').toggle();

  let collapseElementList = [].slice.call($('.accordion-collapse'));
  collapseElementList.map(function(collapseEl) {
    new bootstrap.Collapse(collapseEl);
  });
});

$(window).scroll(function() {
  if ($(this).scrollTop()) {
    $('.btn-back-to-top').fadeIn(200);
  } else {
    $('.btn-back-to-top').fadeOut(200);
  }
});

$('.btn-back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
});

$('#navAbout').click(function() {
  $('html, body').animate({
    scrollTop: $("#about").offset().top
  }, 500);
});

$('#navSkills').click(function() {
  $('html, body').animate({
    scrollTop: $("#skills").offset().top
  }, 500);
});

$('#navCareer').click(function() {
  $('html, body').animate({
    scrollTop: $("#career").offset().top
  }, 500);
});

$('#navEducation').click(function() {
  $('html, body').animate({
    scrollTop: $("#education").offset().top
  }, 500);
});

$('.copyright-year').append(" - "+ new Date().getFullYear())
