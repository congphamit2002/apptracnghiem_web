
 $(document).ready(function() {
	
		const modal = document.querySelector('.js-modal');
	//add new listen
	$('.js-add-voca').on("click", function(event) {
		event.preventDefault();
				 modal.classList.add('open');
				 console.log("oke", event);
	});
	
	$('.js-modal-close').on("click", function(e){
		event.preventDefault();
				 modal.classList.remove('open');
				 console.log("oke", event);
	})


})