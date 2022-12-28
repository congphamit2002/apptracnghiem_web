
jQuery(document).ready(function($)
 {

	 var isUpdate = false;
	 var idPreview;
	 var linkExcel;

	//delete question handle //success
	 $('.js-btn-delete').click(function (e) {
		 let parent = $(this).attr('data-id');
		 console.log("data-id = "+parent);
		 $.ajax({url:'http://localhost:8080/api/questions/deleteByQGrDId/' + parent,
			 type: 'get',
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 dataType: 'text'

		 })
			 .done(function(result){
				 console.log(result);
				 alert("Xóa đề thi thành công");
				 location.reload();

			 })

			 .fail(function(error){
				 console.log(error);
				 alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				 location.reload()
			 })
	 })

	 const modal = document.querySelector('.js-modal');
	 //add new listen //success
	 $('.js-add-listen').on("click", function(event) {
		 event.preventDefault();
		 $('.modal-title').html('Thêm mới đề thi');
		 $('.js-modal-add').html('Thêm mới đề thi');
		 $('.js-modal-add').attr('id', "addEventButton");
		 console.log($('.js-modal-add').attr('id'));
		 modal.classList.add('open');
		 isUpdate = false;
		 resetForm();

		 $("#question-fileExcel").rules("add", "required");

		 //add new question handle
		 $('#addEventButton').click(function(e){
			 e.preventDefault()
			 if($("#form-upload").valid()) {
				 insertQuestion();
			 }

		 })
	 });

	 //close modal //success
	 $('.js-modal-close').on("click", function(e){
		 e.preventDefault();
		 validator.resetForm();
		 modal.classList.remove('open');
	 })


	 //handle update question click //success
	 $('.js-btn-update').on("click", function (e) {
		 e.preventDefault();
		 modal.classList.add('open');
		 $('.js-modal-update').html('Cập Nhật');
		 $('.js-modal-update').attr('id', "updateEventButton");
		 console.log($('.js-modal-add').attr('id'));
		 isUpdate = true;

		 let idUpdate = $(this).attr('data-id');
		 idPreview = idUpdate;
		 console.log(idUpdate);
		 $.ajax({
			 url:'http://localhost:8080/api/questions/getQGrDetailById/' + idUpdate,
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 type: 'get'
		 })
			 .done(function(data){
				 console.log(data)
				 $("#grDetail-Name").val(data.name_gr_detail);
				 $("#grDetail-Count").val(data.number_question);
				 $("#grDetail-Time").val(data.time);
				 $("#grDetail-Description").val(data.description);
				 // linkExcel = "http://localhost:8080/api/file/subjectExcel/"+ data.link_excel;
				 $("#previewExcel").removeClass("hidden");
				 $("#previewImageQuestion").removeClass("hidden");
				 $("#question-fileExcel").rules("remove", "required");

				// update ListenTest handle
				 $("#updateEventButton").on("click", function (e) {
					 e.preventDefault();
					 if($("#form-upload").valid()) {
						 updateQuestion(idUpdate);
					 }
				 })
			 })
			 .fail(function(error){
				 alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				 document.querySelector('.js-modal').remove("open");
				 location.reload()
			 })
	 })

	 //get List preview excel question
	 $("#previewExcel").on("click", function (e) {
		 e.preventDefault();
		 $.ajax({
			 method: "get",
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 url: "http://localhost:8080/api/questions/previewLinkExcel/" + idPreview
		 }).done(function (value) {
			 console.log(value);
			 window.open(value)
		 }) .fail(function (error) {
			 alert("ERROR");
		 })

	 })

	 //get List preview image question
	 $("#previewImageQuestion").on("click", function (e) {
		 e.preventDefault();
		 console.log("http://localhost:8080/api/questions/previewImage/" + idPreview);
		 $.ajax({
			 method: "get",
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 url: "http://localhost:8080/api/questions/previewImage/" + idPreview
		 }).done(function (value) {
			 console.log(value);
			 if(value != null) {
				 value.forEach(function (data) {
					 console.log(data.image);
					 var path = data.image;
					 console.log("Path " + path);
					 window.open(path);
				 })
			 }
		 }) .fail(function (error) {
			 alert("ERROR");
		 })
	 })

	//validate form when type and submit //success
	 var validator = $("#form-upload").validate({
		 errorClass : "error-message",
		 onsubmit: true,
		 rules: {
			 grDetailName: {
				required: true
			},
			 grDetailCount: {
				required: true
			},
			 grDetailTime: {
				 required: true
			 },
			 questionFileExcel: {
				 required: true
			 }
		 },
		 messages: {
			 grDetailName: {
				 required: "Vui lòng nhập tên đề thi"
			 },
			 grDetailCount: {
				 required: "Vui lòng nhập số câu hỏi"
			 },
			 grDetailTime: {
				 required: "Vui lòng thời gian thi (phút)"
			 },
			 questionFileExcel: {
				 required: "Vui lòng chọn file"
			 }
		 }
	 })


	 //reset form to value = "" //success
	 function resetForm() {
		 $("#grDetail-Name").val("");
		 $("#grDetail-Count").val("");
		 $("#grDetail-Time").val("");
		 $("#grDetail-Description").val("");
		 $("#previewExcel").attr("href", "");
		 $("#previewExcel").addClass("hidden");
		 $("#previewImageQuestion").addClass("hidden");
		 $("lable").removeClass("error-message")
		 changeExcel = false;

	 }

	 //call ajax insert question //success
	 function insertQuestion() {
		 var formData = new FormData($('#form-upload')[0]);
		 var qgrId = $('#questionGrID').val();
		 var grDetailName = $("#grDetail-Name").val();
		 var grDetailCount = $("#grDetail-Count").val();
		 var grDetailTime = $("#grDetail-Time").val();
		 var grDetailDescription = $("#grDetail-Description").val();
		 var questionFileExcel = $("#question-fileExcel").prop('files');
		 var questionImage = $("#question-image").prop('files');
		 formData.append("qgrId", qgrId);
		 formData.append("grDetailName", grDetailName);
		 formData.append("grDetailCount", grDetailCount);
		 formData.append("grDetailTime", grDetailTime);
		 formData.append("grDetailDescription", grDetailDescription);
		 formData.append("questionFileExcel", questionFileExcel);

		 for(var i = 0; i < questionImage.length; i++) {
			 formData.append("questionImage", questionImage[i]);
		 }

		 $.ajax({
			 url:'http://localhost:8080/api/questions/saveFile',
			 data: formData,
			 type: 'post',
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 processData : false,
			 contentType : false,
			 enctype : 'multipart/form-data',
			 cache : false,

		 })
			 .done(function(result){
				 console.log(result);
				 alert("Thêm mới đề thi thành công!!!");
				 document.querySelector('.js-modal').remove("open");
				 location.reload();

			 })

			 .fail(function(error){
				 alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				 document.querySelector('.js-modal').remove("open");
				 location.reload()
			 })
	 }

	 //call update question //success
	 function updateQuestion(idUpdate) {
		 var formData = new FormData($('#form-upload')[0]);
		 var qgrId = $('#questionGrID').val();
		 var grDetailName = $("#grDetail-Name").val();
		 var grDetailCount = $("#grDetail-Count").val();
		 var grDetailTime = $("#grDetail-Time").val();
		 var grDetailDescription = $("#grDetail-Description").val();
		 var questionFileExcel = $("#question-fileExcel").prop('files');
		 var questionImage = $("#question-image").prop('files');
		 formData.append("grDetailId", idUpdate);
		 formData.append("qgrId", qgrId);
		 formData.append("grDetailName", grDetailName);
		 formData.append("grDetailCount", grDetailCount);
		 formData.append("grDetailTime", grDetailTime);
		 formData.append("grDetailDescription", grDetailDescription);
		 formData.append("questionFileExcel", questionFileExcel);

		 console.log(formData.get('grDetailName'));
		 console.log(formData.get('grDetailCount'));
		 console.log(formData.get('grDetailTime'));
		 console.log(formData.get('grDetailDescription'));
		 for(var i = 0; i < questionImage.length; i++) {
			 formData.append("questionImage", questionImage[i]);
		 }


		 $.ajax({
			 url: 'http://localhost:8080/api/questions/updateFile',
			 type: 'post',
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 },
			 data: formData,
			 contentType: false,
			 processData: false,
			 enctype: 'multipart/form-data',
			 cache : false,

		 }).done(function (result) {
			 console.log(result)
			 alert("Cập nhật đề thi thành công!!");
			 location.reload();

		 }).fail(function (error) {
			 console.log(error)
			 alert("Có lỗi xảy ra, vui lòng thử lại sau!!");
			 location.reload();
		 })
	 }
	 //logout
	 $('#btn-logout').on("click", function (e) {
		 e.preventDefault();
		 localStorage.removeItem("token");
		 // window.open("http://localhost:9090/admin/logout");
		 window.location.replace("http://localhost:9090/admin/logout");
	 })
 })
