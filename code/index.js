var str = "";
var authdata;
var English_dict = {};
var Chinese_dict = {};
var Japanese_dict = {};

$(document).ready(function(){
	$("#error").hide();
});

var cateogry = document.getElementById("category").value;
var app_name = document.getElementById("app_name").value;
var img_url = document.getElementById("img_url").value;
var download_url = document.getElementById("download_url").value;
var Korean = document.getElementById("Korean").value;
var English = document.getElementById("English").value;
var Japanese = document.getElementById("Japanese").value;
var Chinese = document.getElementById("Chinese").value;
var check_check = document.getElementById("check_check");
var str="";
var English_img = document.getElementById("English_img").files;
var Chinese_img = document.getElementById("Chinese_img").files;
var Japanese_img = document.getElementById("Japanese_img").files;
var file;
var English_a = new Array();
var Chinese_a = new Array();
var Japanese_a = new Array();

var storageRef = firebase.storage().ref();
var storage = firebase.storage();
var metadata = {
		  contentType: 'image/jpeg'
};


var dummy="";
function gokakao(){
	location.href="./kakao.html";
}

//현재 로그인 상태를 감지해서 로그인이 되었으면 화면에 띄우고 아니면 경고창 띄우는 함수 
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
    	document.getElementById("log-button").innerHTML = user.email+"님 환영합니다.";
    	document.getElementById("log-button").style.color= "rgba(255, 255, 255, 0.65)";
    }
    else{
   		alert("로그인이 필요합니다.");
    }
  });

function English_func(UploadTask,filename){
	 UploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			   function(snapshot) {
			    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			    var progress = await (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			    console.log('Upload is ' + progress + '% done');
			    switch (snapshot.state) {
			      case firebase.storage.TaskState.PAUSED: // or 'paused'
			        console.log('Upload is paused');
			        break;
			      case firebase.storage.TaskState.RUNNING: // or 'running'
			        console.log('Upload is running');
			        break;
			    }
			  }, function(error) {
			}, function() {
			  // Upload completed successfully, now we can get the download URL
				UploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			    console.log('File available at',filename,downloadURL);
			    var new_filename = filename.split('.')[0];
			    English_dict[new_filename] = downloadURL;
			    var app_name = document.getElementById("app_name").value;
			    console.log(app_name);
			    var e_userRef =  database.ref('/app_category/'+category.options[category.selectedIndex].value+'/apps/'+app_name+'/explain_img/english_img');
				for(var key in English_dict){
					e_userRef.child(key).set(English_dict[key]);
				}
			  });
			  
			});
}

function Chinese_func(UploadTask,filename){
	UploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			   function(snapshot) {
			   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			    var progress = await (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			    console.log('Upload is ' + progress + '% done');
			    switch (snapshot.state) {
			      case firebase.storage.TaskState.PAUSED: // or 'paused'
			        console.log('Upload is paused');
			        break;
			      case firebase.storage.TaskState.RUNNING: // or 'running'
			        console.log('Upload is running');
			        break;
			    } 
			  }, function(error) {
			},function() {
			  // Upload completed successfully, now we can get the download URL
				UploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			    console.log('File available at',filename,downloadURL);
			    var new_filename = filename.split('.')[0];
			    Chinese_dict[new_filename] = downloadURL;
			    var app_name = document.getElementById("app_name").value;
			    console.log(app_name);
			    var e_userRef =  database.ref('/app_category/'+category.options[category.selectedIndex].value+'/apps/'+app_name+'/explain_img/chienese_img');
				for(var key in Chinese_dict){
					e_userRef.child(key).set(Chinese_dict[key]);
				}
			  });
			  
			});
}

function Japanese_func(UploadTask,filename){
	 UploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			   function(snapshot) {
			    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			    var progress = await (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			    console.log('Upload is ' + progress + '% done');
			    switch (snapshot.state) {
			      case firebase.storage.TaskState.PAUSED: // or 'paused'
			        console.log('Upload is paused');
			        break;
			      case firebase.storage.TaskState.RUNNING: // or 'running'
			        console.log('Upload is running');
			        break;
			    }
			  }, function(error) {			  	
			}, function() {
			  // Upload completed successfully, now we can get the download URL
				UploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			    console.log('File available at',filename,downloadURL);
			    var new_filename = filename.split('.')[0];
			    Japanese_dict[new_filename] = downloadURL;
			    var app_name = document.getElementById("app_name").value;
			    console.log(app_name);
			    var e_userRef =  database.ref('/app_category/'+category.options[category.selectedIndex].value+'/apps/'+app_name+'/explain_img/japan_img');
				for(var key in Japanese_dict){
				  e_userRef.child(key).set(Japanese_dict[key]);
				}
			 });
			});
}

//table의 체크박스 값을 가져와서 Database에 저장하는 함수 
function Register(){	
	var cateogry = document.getElementById("category").value;
	var app_name = document.getElementById("app_name").value;
	var img_url = document.getElementById("img_url").value;
	var download_url = document.getElementById("download_url").value;
	var Korean = document.getElementById("Korean").value;
	var English = document.getElementById("English").value;
	var Japanese = document.getElementById("Japanese").value;
	var Chinese = document.getElementById("Chinese").value;
	var check_check = document.getElementById("check_check");
	var str="";
	
	var English_img = document.getElementById("English_img").files;
	var Chinese_img = document.getElementById("Chinese_img").files;
	var Japanese_img = document.getElementById("Japanese_img").files;
	var file;
	
	var English_a = new Array();
	var Chinese_a = new Array();
	var Japanese_a = new Array();
	
	var storageRef = firebase.storage().ref();
	var storage = firebase.storage();
	var metadata = {
			  contentType: 'image/jpeg'
	};
	
	for (var i = 0; i < English_img.length; i++) {
		  file = English_img[i];
		  var uploadTask= storageRef.child(app_name+'/english/'+ file.name).put(file, metadata);
		  setTimeout(English_func(uploadTask,file.name), 3000);
	}
	setTimeout(console.log('STOP'),3000);
	for (var i = 0; i < Chinese_img.length; i++) {
		  file = Chinese_img[i];
		  var uploadTask = storageRef.child(app_name+'/chienese/'+ file.name).put(file, metadata);
		  setTimeout(Chinese_func(uploadTask,file.name), 3000);
	}
	setTimeout(console.log('STOP'),3000);
	for (var i = 0; i < Japanese_img.length; i++) {
		  file = Japanese_img[i];
		  var uploadTask = storageRef.child(app_name+'/japanese/'+ file.name).put(file, metadata); 
		  setTimeout(Japanese_func(uploadTask,file.name), 3000);
	}
	

	console.log(check_check);
	$('input:checkbox:checked').each(function(index){
		str += $(this).attr('id')+",";
	});
	console.log(str);

	
	//현재 email을 감지해서 Database에 등록하는 함수 
	firebase.auth().onAuthStateChanged(function(user) {
	    authData = user;
	    //storageRef = storage.ref(user.id);
	    if (user) {
	      authdata = user;
	    }

		var userRef = database.ref('/app_category/'+category.options[category.selectedIndex].value+'/apps/'+app_name);
		
		var data = {
				email : user.email,
				app_img : img_url,
		
				download_url : download_url,
				download_rank : 0,
				english : {
					app_explain : English,
					app_name : app_name
				},
				korean : {
					app_explain : Korean,
					app_name : app_name
				},
				japanese : {
					app_explain : Japanese,
					app_name : app_name
				},
				chinese : {
					app_explain : Chinese,
					app_name : app_name
				},
				korean_use_rank : 10,
				other_lang : str
		}
		console.log(user);
		userRef.set(data);
			
		alert("어플리케이션 등록 성공!");
	});
}
	//sign up 하는 함수 
	  function signUp() {
		    var id = $("#su_id").val();
		    var pw = $("#su_pw").val();
		    var cf = $("#su_cf").val();
		    
		    if(pw != cf) {
		        alert("Password does not match the confirm password.");
		        return;
		    }
		 
		    firebase.auth().createUserWithEmailAndPassword(id, pw)
		            .then(function() {
		                alert("Signed Up!");
		                location.href="./TP_2.html";
		            })
		            .catch(function(e) {
		             	alert("bb");
		                $("#error #errmsg").html(e.message);
		                $("#error").show();
		          //      $("#signUp").hide();
		                return;
		            });
		}

	 //로그인 (sing in) 하는 함수
	 function signIn() {
	      var id = $("#si_id").val();
	      var pw = $("#si_pw").val();
	      firebase.auth().signInWithEmailAndPassword(id, pw)
	              .then(function() {
	                  $("#signIn").hide();
	                  $("#authorized").show();
	                  location.href="./TP_2.html";
	              })
	              .catch(function(e) {
	                  lastWork = "signIn";
	                  $("#error #errmsg").html(e.message);
	                  $("#error").show();
	                  $("#signIn").hide();
	                  return;
	              }); 
	  }   
	  //되돌아 가는 함수
	  function back() {
	      $("#" + lastWork).show();
	      $("#error").hide();
	  }
