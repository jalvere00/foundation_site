function toolbar_scroll(){
	if(($(window).scrollTop() - $("#header-navbar-container").offset().top)>0){
		$("#main_navbar").addClass("main_navbar_scroll");
	}else{
		$("#main_navbar").removeClass("main_navbar_scroll");
	}
}

$(document).ready(function(){
	$("#main_navbar>ul>li>a").click(function(event){
		let target = $(this.hash);
		target = target.length ? target : $(`[name=${this.hash.slice(1)}`);
		if(target.length){
			event.preventDefault();
			$('html,body').animate({
				scrollTop:target.offset().top
			}, 1000)
		}
	})

	toolbar_scroll()
	// $("#main_navbar").css("transition","background-color 0.3s ease")
	$(window).on('scroll',function(event){
		// console.log($(window).scrollTop() - $("#main_navbar").offset().top)
		toolbar_scroll()
	})
})