
jQuery(document).ready(function($)
{

	var idUpdate;
	var isUpdate = false;

	//delete account handle  //success
	$('.js-btn-delete').click(function (e) {
		let id = $(this).attr('data-id');
		console.log(id);
		$.ajax({url:'http://localhost:8080/api/account/deleteAccount/' + id,
			type: 'get',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			dataType: 'text'

		})
			.done(function(result){
				console.log(result);
				alert("Xóa tài khoản thành công");
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
	$('.js-add-account').on("click", function(event) {
		event.preventDefault();
		$("#email").removeAttr("readonly");
		$("#username").removeAttr("readonly");
		$('.modal-title').html('Thêm mới tài khoản');
		$('.js-modal-add').html('Thêm mới tài khoản');
		$('.js-modal-add').attr('id', "addEventButton");
		$("#password").rules("add", "required");
		$("#confirmPassword").rules("add", "required");
		console.log($('.js-modal-add').attr('id'));
		modal.classList.add('open');
		isUpdate = false;
		resetForm();


		//add new account handle
		$('#addEventButton').click(function(e){
			e.preventDefault()

			if($("#form-upload").valid()) {
				insertAccount();
			}

		})
	});

	$('.js-modal-close').on("click", function(e){
		e.preventDefault();
		validator.resetForm();
		modal.classList.remove('open');

	})

	//logout
	$('#btn-logout').on("click", function (e) {
		e.preventDefault();
		localStorage.removeItem("token");
		// window.open("http://localhost:9090/admin/logout");
		window.location.replace("http://localhost:9090/admin/logout");
	})

	//update account  //success
	$('.js-btn-update').on("click", function (e) {
		e.preventDefault();
		modal.classList.add('open');
		$("#email").attr("readonly", "readonly");
		$("#username").attr("readonly", "readonly");
		$('.modal-title').html('Cập nhật thông tin tài khoản');
		$('.js-modal-update').html('Cập Nhật');
		$('.js-modal-update').attr('id', "updateEventButton");
		$("#password").rules("remove", "required");
		$("#confirmPassword").rules("remove", "required");
		console.log($('.js-modal-add').attr('id'));
		isUpdate = true;

		let idUpdate = $(this).attr('data-id');
		console.log(idUpdate);
		$.ajax({
			url:'http://localhost:8080/api/account/update/' + idUpdate,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			type: 'get'
		})
			.done(function(data){
				console.log(data)
				$("#fullname").val(data.fullname);
				$("#email").val(data.email);
				$("#username").val(data.username);
				$("#province").val(data.province_id);
				$("#birthday").val(data.date_of_birth);
				$("#phone").val(data.phone);
				$("#accountId").val(data.id);
				$(".password-label").html("Mật khẩu mới: ")
				$(".confirm-password-lable").html("Mật lại khẩu mới: ")



				// update ListenTest handle
				$("#updateEventButton").on("click", function (e) {
					e.preventDefault();
					if($("#form-upload").valid()) {
						updateAccount(idUpdate);
					}
				})
			})
			.fail(function(error){
				alert(error);
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	})


	//validate form on change or submit //success
	var validator = $("#form-upload").validate({
		errorClass : "error-message",
		onsubmit: true,
		rules: {
			fullname: {
				required: true
			},
			email: {
				required: true
			},
			username: {
				required: true
			},
			password: {
				required: true,
				minlength: 8
			},
			confirmPassword: {
				required: true,
				minlength: 8,
				equalTo: '[name="password"]'
			},
			province: {
				required: true
			},
			phone: {
				required: true
			},
			birthday: {
				required: true
			}
		},
		messages: {
			fullname: {
				required: 'Vui lòng nhập họ tên'
			},
			email: {
				required: 'Vui lòng nhập email'
			},
			email: {
				required: 'Vui lòng nhập tên đăng nhập'
			},
			password: {
				required: 'Vui lòng nhập mật khẩu',
				minlength: 'Mật khẩu phải ít nhất 8  ký tự'
			},
			confirmPassword: {
				required: 'Vui lòng nhập xác nhận mật khẩu',
				minlength: 'Mật khẩu phải ít nhất 8  ký tự',
				equalTo: 'Mật khẩu xác nhận không chính xác'

			},
			province: {
				required: "Vui lòng chọn địa chỉ"
			},
			phone: {
				required: "Vui lòng nhập số điện thoại"
			},
			birthday: {
				required: "Vui lòng chọn ngày sinh"
			}
		}
	})

	//reset form to value "" //success
	function resetForm() {
		$("#fullname").val("");
		$("#email").val("");
		$("#accountId").val("");
		$("#username").val("");
		$("#password").val("");
		$("#password").show();
		$("#confirmPassword").val("");
		$("#confirmPassword").show();
		$("#province").val("0");
		$("#birthday").val("");
		$("#phone").val("");
		$("lable").removeClass("error-message")
	}

	//call insert account //success
	function insertAccount() {
		var fullname = $("#fullname").val();
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var provinceId = $("#province").val();
		var birthday = $("#birthday").val();
		var phone = $("#phone").val();
		var gender = $('input[name=rdbSex]:checked').val();



		var data = {
			username: username,
			password: password,
			fullname: fullname,
			phone: phone,
			gender: +gender,
			dateOfBirth: birthday,
			email: email,
			roleID: +1,
			province: {
				id: +provinceId
			}
		}
		console.log(JSON.stringify(data));
		$.ajax({
			url:'http://localhost:8080/api/account/insertAccount',
			data: JSON.stringify(data),
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			dataType: "text",
			contentType: "application/json;",
			type: 'post'

		})
			.done(function(result){
				console.log(result);
				alert("Thêm mới tài khoản nghe thành công!!!");
				document.querySelector('.js-modal').remove("open");
				location.reload();

			})

			.fail(function(error){
				console.log(error);
				alert(error.responseText);
				document.querySelector('.js-modal').remove("open");
				location.reload()
			})
	}

	//call update subject //success
	function updateAccount(idUpdate) {
		var id = $("#accountId").val();
		var fullname = $("#fullname").val();
		var password = $("#password").val();
		var provinceId = $("#province").val();
		var birthday = $("#birthday").val();
		var phone = $("#phone").val();
		var gender = $('input[name=rdbSex]:checked').val();


		var data = {
			id: id,
			password: password,
			fullname: fullname,
			phone: phone,
			gender: +gender,
			date_of_birth: birthday,
			email: "",
			province_id: +provinceId
		}
		console.log(JSON.stringify(data));

		$.ajax({
			url: 'http://localhost:8080/api/account/updateAccount',
			data: JSON.stringify(data),
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			},
			dataType: "text",
			contentType: "application/json;",
			type: 'post'

		}).done(function (result) {
			console.log(result)
			alert("Cập nhật tài khoản thành công!!");
			location.reload();

		}).fail(function (error) {
			console.log(error)
			alert("Có lỗi xảy ra, vui lòng thử lại sau!!");
			location.reload();
		})
	}
})
