function is_youtubelink(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}
function is_imagelink(url) {
	var p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
	return (url.match(p)) ? true : false;
}
function is_vimeolink(url,el) {
	var id = false;
	$.ajax({
	  url: 'https://vimeo.com/api/oembed.json?url='+url,
	  async: true,
	  success: function(response) {
		if(response.video_id) {
		  id = response.video_id;
		  $(el).addClass('lightbox-vimeo').attr('data-id',id);
		}
	  }
	});
}

$(document).ready(function() {
	//add classes to links to be able to initiate lightboxes
	$("a").each(function(){
		var url = $(this).attr('href');
		if(url) {
			if(url.indexOf('vimeo') !== -1 && !$(this).hasClass('no-lightbox')) is_vimeolink(url,$(this));
			if(is_youtubelink(url) && !$(this).hasClass('no-lightbox')) $(this).addClass('lightbox-youtube').attr('data-id',is_youtubelink(url));
			if(is_imagelink(url) && !$(this).hasClass('no-lightbox')) {
				$(this).addClass('lightbox-image');
				var href = $(this).attr('href');
				var filename = href.split('/').pop();
				var split = filename.split(".");
				var name = split[0];
				$(this).attr('title',name);
			}
		}
	});
	//remove the clicked lightbox
	$("body").on("click", ".lightbox", function(event){
		if($(this).hasClass('gallery')) {
			$(this).remove();
			if($(event.target).attr('id')=='next') {
				//next item
				if($("a.gallery.current").nextAll("a.gallery:first").length) $("a.gallery.current").nextAll("a.gallery:first").click();
				else $("a.gallery.current").parent().find("a.gallery").first().click();
			}
			else if ($(event.target).attr('id')=='prev') {
				//prev item
				if($("a.gallery.current").prevAll("a.gallery:first").length) $("a.gallery.current").prevAll("a.gallery:first").click();
				else $("a.gallery.current").parent().find("a.gallery").last().click();
			}
			else {
				$("a.gallery").removeClass('gallery');
				$('html').removeClass('lb-disable-scrolling');
			}
		}
		else $(this).remove();
	});
	//prevent image from being draggable (for swipe)
	$("body").on('dragstart', ".lightbox img", function(event) { event.preventDefault(); });
	//add the youtube lightbox on click
	$("a.lightbox-youtube").click(function(event){
		event.preventDefault();
		$('<div class="lightbox"><a id="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://www.youtube.com/embed/'+$(this).attr('data-id')+'?autoplay=1&showinfo=0&rel=0"></iframe></div></div></div>').appendTo('body');
	});
	//add the image lightbox on click
	$("a.lightbox-image").click(function(event){
		event.preventDefault();
		$('<div class="lightbox"><a id="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><a id="rotate" href="#"><i class="fa fa-repeat" aria-hidden="true"></i> Rotate</a><img id="gallery-image" src="'+$(this).attr('href')+'" alt="'+$(this).attr('title')+'" title="'+$(this).attr('title')+'" /><span>'+$(this).attr('title')+'</span></div>').appendTo('body');
    
		$('#rotate').bind('click', function(event) {
		  event.stopPropagation();
		  event.preventDefault();
		  var $lightboxphoto = $('#gallery-image');
		  var degrees = ($lightboxphoto.data('angle') + 90) || 90;
		  $lightboxphoto.css('-ms-transform', 'translateX(-50%)', 'translateY(-50%) rotate(' + degrees + 'deg)');
		  $lightboxphoto.css('-webkit-transform', 'translate(-50%, -50%) rotate(' + degrees + 'deg)');  
		  $lightboxphoto.css('-moz-transform', 'translate(-50%, -50%) rotate(' + degrees + 'deg)');  
		  $lightboxphoto.css('-o-transform', 'translate(-50%, -50%) rotate(' + degrees + 'deg)');  
		  $lightboxphoto.css('transform', 'translate(-50%, -50%) rotate(' + degrees + 'deg)');  
		  $lightboxphoto.data('angle', degrees);
		});
	});
	//add the vimeo lightbox on click
	$("body").on("click", "a.lightbox-vimeo", function(event){
		event.preventDefault();
		$('<div class="lightbox"><a id="close"><i class="fa fa-times fa-lg" aria-hidden="true"></i></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://player.vimeo.com/video/'+$(this).attr('data-id')+'/?autoplay=1&byline=0&title=0&portrait=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div></div>').appendTo('body');
	});

	$("body").on("click", "a[class*='lightbox-']", function(){
		$('html').addClass('lb-disable-scrolling');
		var link_elements = $(this).parent().find("a[class*='lightbox-']");
		$(link_elements).removeClass('current');
		for (var i=0; i<link_elements.length; i++) {
			if($(this).attr('href') == $(link_elements[i]).attr('href')) {
				$(link_elements[i]).addClass('current');
			}
		}
		if(link_elements.length>1) {
			$('.lightbox').addClass('gallery');
			$(link_elements).addClass('gallery');
		}
	});

	
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        $("#prev").click();
        break;
        case 39: // right
        $("#next").click();
		break;
		case 82: // r
		$("#rotate").click();
		break;
		case 27: // esc
        $("#close").click();
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Check if you are in mobile or not
// Code credit: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
function isMobile() {
    try{ document.createEvent("TouchEvent"); return true; }
    catch(e){ return false; }
  }

if (isMobile()) {
    const mySwipeIt = new SwipeIt('body');
    mySwipeIt.on('swipeLeft',function(e){
        //check if lightbox is present
        if($('.lightbox').length >  0 ) {
            $("#next").click();
        }
    }).on('swipeRight',function(e){
        //check if lightbox is present
        if($('.lightbox').length >  0 ) {
            $("#prev").click();
        }
    });
}