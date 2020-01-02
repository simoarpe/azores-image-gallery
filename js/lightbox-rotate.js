// Check if you are in mobile or not
// Code credit: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      onShow: function() {
        if (isMobile()) {
          const mySwipeIt = new SwipeIt('body');
          var lb = this;
          mySwipeIt.on('swipeLeft',function(e){
              lb.navigateLeft();
          }).on('swipeRight',function(e){
              lb.navigateRight();
          });
        }

      $('.ekko-lightbox-container').append('<div class="rotate-button"><a href="#" class="pull-right rotate" style="font-size: 18px;padding: 3px 0;"><i class="fa fa-repeat" aria-hidden="true"></i> Rotate</a></div>')
    
      $('.rotate').bind('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var $lightboxphoto = $('.ekko-lightbox').children().find('img');
        var degrees = ($lightboxphoto.data('angle') + 90) || 90;
        $lightboxphoto.css('-ms-transform', 'rotate(' + degrees + 'deg)');
        $lightboxphoto.css('-webkit-transform', 'rotate(' + degrees + 'deg)');  
        $lightboxphoto.css('-moz-transform', 'rotate(' + degrees + 'deg)');  
        $lightboxphoto.css('-o-transform', 'rotate(' + degrees + 'deg)');  
        $lightboxphoto.css('transform', 'rotate(' + degrees + 'deg)');  
        $lightboxphoto.data('angle', degrees);
      });
    },
  });
});
   