


$('#enquiry_form #event').on('change', function(event) {
		var values = '';
		var html = '';
		if(this.value =='Birthday'){
			values = ["","Decoration","Photography","Cakes","Gifts","Entertainment","Venue","Foods"];
		}
		if(this.value =='Baby Shower'){
			values = ["","Decoration","Photography","Makeup","Mehndi","Entertainment","Venue","Foods"];
		}
		if(this.value =='New Born'){
			values = ["","Photography"];
		}
		if(this.value =='House Warming'){
			values = ["","Decoration","Photography","Cakes","Gifts","Foods"];
		}
		if(this.value =='Puberty'){
			values = ["Decoration","Photography","Gifts","Makeup","Entertainment","Venue","Foods"];
		}
		if(this.value =='Engagement'){
			values = ["","Decoration","Photography","Gifts","Makeup","Mehndi","Entertainment","Venue","Foods"];
		}
		if(this.value =='Wedding'){
			values = ["","Decoration","Photography","Cakes","Gifts","Makeup","Mehndi","Entertainment","Venue","Foods"];
		}
		if(this.value =='Festivals'){
			values = ["","Decoration","Cakes","Gifts","Entertainment","Venue","Foods"];
		}
		if(this.value =='Surprise Party'){
			values = ["","Decoration","Foods"];
		}
		if(this.value =='Other Occasions'){
			values = ["","Decoration","Photography","Cakes","Gifts","Mehndi","Entertainment","Venue","Foods"];
		}
		$.each( values, function( index, value ){
		if(index){
			html += '<li><label><input id="serviceval" type="checkbox" value="' + value + '" name="services[]" />' + value + '</label></li>';
		}
		});
		$('.checkbox-dropdown-list').html(html);
});
$('#example1').calendar({
	type: 'date'
});


$(window).on('load', function(){
  setTimeout(removeLoader, 1000); //wait for page load PLUS two seconds.
});

document.querySelectorAll('.mmtav-nav a').forEach(function(everyitem){ 	
	
	var tabTrigger = new bootstrap.Tab(everyitem)
	everyitem.addEventListener('mouseenter', function(){
		tabTrigger.show();
	});
	
});

function removeLoader(){
    $( "#loadingDiv" ).fadeOut(500, function() {
      // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}

 // tabbed content
    $(".tab_container .tab_content").hide();
    $(".tab_container .tab_content:first").show();

  /* if in tab mode */
    $("ul.tabs li").mouseenter(function() {
		
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();		
		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

	  $(".tab_drawer_heading").removeClass("d_active");
	  $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
	  
    });
	/* if in drawer mode */
	$(".tab_drawer_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
	  
	  $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
	  
	  $("ul.tabs li").removeClass("active");
	  $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
		
	/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
	$('ul.tabs li').last().addClass("tab_last");

$(document).on('ready', function() {
	
	
	var pageWidth = $(window).width();
		var body= document.getElementsByTagName('body')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		if (pageWidth >800) {
			const body = document.body;
			const triggerMenu = document.querySelector("#he-header");
			const scrollUp = "scroll-up";
			const scrollDown = "scroll-down";
			const scrollanimi = "sscroll-animi";
			let lastScroll = 0;
			
			window.addEventListener("scroll", () => {
			  const currentScroll = window.pageYOffset;
			  if (currentScroll <= 0) {
				body.classList.remove(scrollUp);
				body.classList.remove(scrollanimi);
				return;
			  }

			  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {			// down
				body.classList.remove(scrollUp);
				body.classList.add(scrollDown);
				body.classList.add(scrollanimi);
			  } else if (
				currentScroll < lastScroll &&
				body.classList.contains(scrollDown)
			  ) {
				body.classList.remove(scrollDown);
				body.classList.add(scrollUp);
				body.classList.add(scrollanimi);
			  }
			  lastScroll = currentScroll;
			});
		}else{
			
		};
		body.appendChild(script);
	
	
	
	
	
	$("input[type='tel']").keyup(function(event) {
		name = $(this).val();
		name = name.replace(/[^0-9]/g, '');
		$(this).val(name);
	});
	$("input[type='tel']").keypress(function(e) {
		var value = $(this).val().length;
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) || value > 9) {
			return false;
		}
		this.value = this.value.replace(/[^0-9]/g, '');
	});
	
	$('#enquiry_form #serviceval').on('change', function(event) {
		var text = $("#serviceval:checked").map(function() {
			return this.value;
		}).get().join(",");
		$("#service").val(text);
		if(text){
			$("#selectedservice").text(text);
		}else{
			$("#selectedservice").text('Choose Services');
		}
	});
	$(".checkbox-dropdown").click(function () {
		$(this).toggleClass("is-active");
	});
	$("input").focus(function(){
		if($(".checkbox-dropdown").hasClass("is-active")){
			$(".checkbox-dropdown").toggleClass("is-active");
		}
	});
	$('select').click(function(){ 
		if($(".checkbox-dropdown").hasClass("is-active")){
			$(".checkbox-dropdown").toggleClass("is-active");
		}
	});

	$(".checkbox-dropdown ul").click(function(e) {
		e.stopPropagation();
	});
	
	
	$('#enquiry_form').on('submit', function(event) {
		event.preventDefault();
		var filter = $(this);
		var fileSelected = $("#inputGroupFile01").val();
		if(fileSelected) {
			var file_data = $('#inputGroupFile01').prop('files')[0]; 
		} else {
			var file_data = ''; 
		}
		var formData = new FormData($('#enquiry_form')[0]);				
		formData.append('file', file_data);                            
			$.ajax({
				url: 'enquire.php',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,                         
				type: 'post',
				beforeSend: function() {
					filter.find("#loader").css('display','block');
					filter.find('button.EnquireSubmit').prop('disabled', true);
				},
				success:function(data){
					filter.find("#loader").css('display','none');
					filter.find('button.EnquireSubmit').prop('disabled', false);
					
					if(data==0)
					{
						var msg = "There was an error trying to send your message. Please try again later.";
					}
					else if(data==1)
					{
						var msg = "Thank you for your message. It has been sent.";
						window.location.replace("thank-you.html");
						
						$(this)[0].reset();
					}
					else if(data==2)
					{
						var msg = "Invalid Google Captcha Code";
					}
					else{ 
						var msg=data;
					}
					$("#mail_response").html(msg);
				},
			});
	});

	$("#hamburgerlink").click(function(){	
		$("#hammennusect").addClass("mmmm-opened");		
	});

	$("#mns-hamburger-icon").click(function(){	
		$("#hammennusect").addClass("mmmm-opened");		
	});

	$("#hammennu-close").click(function(){	
		$("#hammennusect").removeClass("mmmm-opened");	
	}); 
	
	$(".similarpro-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint:1300,
			  settings: {
				slidesToShow:3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".decorat-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint:1300,
			  settings: {
				slidesToShow:4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".assocPartners-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint:1300,
			  settings: {
				slidesToShow:5,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".homeserview-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint:1300,
			  settings: {
				slidesToShow:6,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".decbyocca-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".htrend-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 801,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	$(".hclient-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
		touchMove: false,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 500,
		responsive: [
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 860,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 501,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});
	
	//Check if an element was in a screen
    function isScrolledIntoView(elem){
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom));
    }
    //Count up code
    function countUp() {
        $('.counter').each(function() {
          var $this = $(this), // <- Don't touch this variable. It's pure magic.
              countTo = $this.attr('data-count');
              ended = $this.attr('ended');

        if ( ended != "true" && isScrolledIntoView($this) ) {
            $({ countNum: $this.text()}).animate({
            countNum: countTo
          },
          {
            duration: 2500, //duration of counting
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
        $this.attr('ended', 'true');
        }
        });
    }
    //Start animation on page-load
    if ( isScrolledIntoView(".counter") ) {
        countUp();
    }
    //Start animation on screen
    $(document).scroll(function() {
        if ( isScrolledIntoView(".counter") ) {
            countUp();
        }
    });
	
	grecaptcha.ready(function() {
		grecaptcha.execute('6LeECO0gAAAAAC2OxVngcGIr5MIl5uFKdn59KjFa', {
			action: 'validate_captcha'
		}).then(function(token) {
			document.getElementById('g-recaptcha-response').value = token;
		});
	});
	
	
	
	
});
$(document).ready(function() {
	$('.ge_file_btn').on('click', function() {
		$('.custom-file-input').trigger('click');
	});

	$('.custom-file-input').on('change', function() {
		var fileName = $(this)[0].files[0].name;    
		$('#ge_file_name').val(fileName);
	});
})

/* class FileInputController extends Stimulus.Controller {
  static get targets() {
    return ['value', 'input']
  }
  
  display(evt) {
    const fileName = evt.target.value.split('\\').pop();
    
    if (this.valueTarget.nodeName == 'INPUT') {
      this.valueTarget.placeholder = fileName;
    } else {
      this.valueTarget.innerHTML = fileName;
    }
  }
}

const application = Stimulus.Application.start()
application.register('file-input', FileInputController)	
 */
