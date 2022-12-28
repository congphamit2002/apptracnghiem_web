
jQuery(document).ready(function($)
{

	var idUpdate;
	var isUpdate = false;

	//delete listenTest handle  //success
	$('.js-btn-delete').click(function (e) {
		let parent = $(this).attr('data-id');
		console.log(parent);
		$.ajax({url:'http://localhost:8080/api/subject/delete/' + parent,
			type: 'get',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			dataType: 'text'

		})
			.done(function(result){
				console.log(result);
				alert("Xóa môn học thành công");
				location.reload();

			})

			.fail(function(error){
				console.log(error);
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				location.reload()
			})
	})

	const modal = document.querySelector('.js-modal');
	//add new listen  //success
	$('.js-add-subject').on("click", function(event) {
		event.preventDefault();
		$('.modal-title').html('Thêm mới môn học');
		$('.js-modal-add').html('Thêm mới môn học');
		$('.js-modal-add').attr('id', "addEventButton");
		console.log($('.js-modal-add').attr('id'));
		modal.classList.add('open');
		isUpdate = false;
		resetForm();


		$("#previewImage").attr("class", "hidden")
		$("#subject-name").rules("add", "required");
		$("#subject-image").rules("add", "required");

		//add new listenTest handle
		$('#addEventButton').click(function(e){
			e.preventDefault()
			if($("#form-upload").valid()) {
				insertSubject();
			}

		})
	});

	$('.js-modal-close').on("click", function(e){
		e.preventDefault();
		validator.resetForm();
		modal.classList.remove('open');
	})


	//update listenTest  //success
	$('.js-btn-update').on("click", function (e) {
		e.preventDefault();
		modal.classList.add('open');
		$('.modal-title').html('Cập nhật môn học');
		$('.js-modal-update').html('Cập Nhật');
		$('.js-modal-update').attr('id', "updateEventButton");
		console.log($('.js-modal-add').attr('id'));
		isUpdate = true;

		let idUpdate = $(this).attr('data-id');
		console.log(idUpdate);
		$.ajax({
			url:'http://localhost:8080/api/subject/getSubject/' + idUpdate,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			type: 'get'
		})
			.done(function(data){
				console.log(data)
				$("#subject-name").val(data.subjectName)
				$("#previewImage").attr("src", "http://localhost:8080/api/file/subjectImage/" + data.image);
				$("#previewImage").removeClass("hidden");
				$("#subject-image").rules("remove", "required");


				// update ListenTest handle
				$("#updateEventButton").on("click", function (e) {
					e.preventDefault();
					if($("#form-upload").valid()) {
						updateSubject(idUpdate);
					}
				})
			})
			.fail(function(error){
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	})


	//validate form on change or submit //success
	var validator = $("#form-upload").validate({
		errorClass : "error-message",
		onsubmit: true,
		rules: {
			subjectName: {
				required: true
			},
			image: {
				required: true
			}
		},
		messages: {
			subjectName: {
				required: "Vui lòng nhập tên môn học"
			},
			image: {
				required: "Vui lòng chọn file"
			}
		}
	})


	function resetForm() {
		$("#subject-name").val("");
		$("lable").removeClass("error-message")
	}

	//call insert subject //success
	function insertSubject() {
		var formData = new FormData($('#form-upload')[0]);
		var subject_Name = $("#subject-name").val();
		var image = $("#subject-image").prop('files');
		formData.append("subjectName", subject_Name);
		formData.append("image", image);

		$.ajax({
			url:'http://localhost:8080/api/subject/insertSubject',
			data: formData,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			type: 'post',
			processData : false,
			contentType : false,
			enctype : 'multipart/form-data',
			cache : false,

		})
			.done(function(result){
				console.log(result);
				alert("Thêm mới môn học thành công!!!");
				document.querySelector('.js-modal').remove("open");
				location.reload();

			})

			.fail(function(error){
				alert("Có lỗi trong quá trình thêm mới, vui lòng thử lại sau. . .");
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	}

	//call update subject //success
	function updateSubject(idUpdate) {
		var formData = new FormData($('#form-upload')[0]);
		var subjectName = $("#subject-name").val();
		var image = $("#subject-image").prop('files');
		formData.append("id", idUpdate);
		formData.append("subjectName", subjectName);
		formData.append("image", image);

		$.ajax({
			url: 'http://localhost:8080/api/subject/updateSubject',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			type: 'post',
			data: formData,
			contentType: false,
			processData: false,
			enctype: 'multipart/form-data',
			cache : false,

		}).done(function (result) {
			console.log(result)
			alert("Cập nhật môn học thành công!!");
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
