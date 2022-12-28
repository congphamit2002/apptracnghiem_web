
jQuery(document).ready(function($)
{

	// var idUpdate;
	var isUpdate = false;

	//delete question group handle  //success
	$('.js-btn-delete').click(function (e) {
		let parent = $(this).attr('data-id');
		console.log(parent);
		$.ajax({url:'http://localhost:8080/api/questionGroups/delete/' + parent,
			type: 'get',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			dataType: 'text'

		})
			.done(function(result){
				console.log(result);
				alert("Xóa bộ đề thành công");
				location.reload();

			})

			.fail(function(error){
				console.log(error);
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				location.reload()
			})
	})

	const modal = document.querySelector('.js-modal');
	//add new question group //success
	$('.js-add-questionGr').on("click", function(event) {
		event.preventDefault();
		$('.js-modal-add').html('Thêm mới bộ đề');
		$('.js-modal-add').attr('id', "addEventButton");
		console.log($('.js-modal-add').attr('id'));
		modal.classList.add('open');
		isUpdate = false;
		resetForm();

		$("#questionGr-name").rules("add", "required");

		//add new listenTest handle
		$('#addEventButton').click(function(e){
			e.preventDefault()
			if($("#form-upload").valid()) {
				insertQuestionGr();
			}

		})
	});

	$('.js-modal-close').on("click", function(e){
		e.preventDefault();
		validator.resetForm();
		modal.classList.remove('open');
	})


	//update question group
	$('.js-btn-update').on("click", function (e) {
		e.preventDefault();
		modal.classList.add('open');
		$('.js-modal-update').html('Cập Nhật');
		$('.js-modal-update').attr('id', "updateEventButton");
		console.log($('.js-modal-add').attr('id'));
		isUpdate = true;

		let idUpdate = $(this).attr('data-id');
		console.log(idUpdate);
		$.ajax({
			url:'http://localhost:8080/api/questionGroups/getQGById/' + idUpdate,
			type: 'get',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		})
			.done(function(data){
				console.log(data)
				 $("#questionGr-name").val(data.nameGroup)

				// update question group handle
				$("#updateEventButton").on("click", function (e) {
					e.preventDefault();
					if($("#form-upload").valid()) {
						updateQGrs(idUpdate);
					}
				})
			})
			.fail(function(error){
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	})


	//validate form when change and submit
	var validator = $("#form-upload").validate({
		errorClass : "error-message",
		onsubmit: true,
		rules: {
			questionGrName: {
				required: true
			}
		},
		messages: {
			questionGrName: {
				required: "Vui lòng nhập tên môn học"
			}
		}
	})


	function resetForm() {
		$("#subject-name").val("");
		$("lable").removeClass("error-message")
	}

	//call insert question gr
	function insertQuestionGr() {
		var formData = new FormData($('#form-upload')[0]);
		var nameGroup = $("#questionGr-name").val();
		var subjectId = $("#subjectId").val();
		formData.append("nameGroup", nameGroup);
		formData.append("subjectId", subjectId);

		$.ajax({
			url:'http://localhost:8080/api/questionGroups/insert',
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
				alert("Thêm mới bộ đề thành công!!!");
				document.querySelector('.js-modal').remove("open");
				location.reload();

			})

			.fail(function(error){
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	}

	//call update qgrs
	function updateQGrs(idUpdate) {
		var formData = new FormData($('#form-upload')[0]);
		var nameGroup = $("#questionGr-name").val();
		var subjectId = $("#subjectId").val();
		var id = idUpdate;
		formData.append("nameGroup", nameGroup);
		formData.append("subjectId", subjectId);
		formData.append("id", id);

		$.ajax({
			url: 'http://localhost:8080/api/questionGroups/update',
			type: 'post',
			data: formData,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			contentType: false,
			processData: false,
			enctype: 'multipart/form-data',
			cache : false,

		}).done(function (result) {
			console.log(result)
			alert("Cập nhật bộ đề thành công!!");
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
