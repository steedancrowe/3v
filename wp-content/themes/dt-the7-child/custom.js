jQuery(document).ready(function ($) {
	console.log('this is a test');
	$(".arm_user_block").on("click", function(){
		window.open($(this).find('a').attr("href"));
	});
	$(".arm_user_block a").on("click", function(e){
		e.preventDefault();
	});
});