$(document).ready(function(){
	$("#main_navbar>ul>li>a").click(function(event){
		let target = $(this.hash);
		target = target.length ? target : $(`[name=${this.hash.slice(1)}`)
		if(target.length){
			event.preventDefault();
			$('html,body').animate({
				scrollTop:target.offset().top
			}, 1000,function(){
				console.log("works")
			})
		}
	})
})