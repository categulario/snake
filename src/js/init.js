$(document).ready(function(){
	var width = $(window).width();
	var height = $(window).height();

	$('#canvas').attr('width', width);
	$('#canvas').attr('height', height-40);
});