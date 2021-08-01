





(function($) {
  $(document).ready(function(){
    $('video').get(0).pause();
    // $('#somevid2').get(0).pause();
  });
})(jQuery);

// Modal script
(function($) {
	$(function(){

	var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

		$('a[data-modal-id]').click(function(e) {
			e.preventDefault();
			$("body").append(appendthis);
			$(".modal-overlay").fadeTo(500, 0.9);
			//$(".js-modalbox").fadeIn(500);
			var modalBox = $(this).attr('data-modal-id');
			$('#'+modalBox).fadeIn($(this).data());
			// Show a specific class when opened
			$('#'+modalBox).addClass('opened');
      if (($('.modal-box.opened').find('video').attr('autoplay') === 'autoplay')) {
        $('.modal-box.opened').find('video').get(0).play();
      }
		});

	$(".js-modal-close, .modal-overlay").click(function() {
		$(".modal-box, .modal-overlay").fadeOut(500, function() {
			$(".modal-overlay").remove();
		});
		// Remove the specific class
		$('.modal-box').removeClass('opened');
		// Stop the video from playing
		$('.modal-box').find('video').each(function() {
				$(this).get(0).pause();
		});
	});

	$(window).resize(function() {
		$(".modal-box").css({
			//top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
			//left: ($(window).width() - $(".modal-box").outerWidth()) / 2

			top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
			left: ($(window).width() - $(".modal-box").outerWidth()) / 2

		});
	});

	$(window).resize();

	});
})(jQuery);




function upload(){
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var post=document.getElementById('post').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      //handle error here
      console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set({
                 text:post,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   alert("Error while uploading");
               }else{
                   alert("Successfully uploaded");
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('posts');
      //remove all remaining data in that div
      posts.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);


      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){



   console.log(value.imageURL.split(".").pop());



        var  stringName = "<div> <p> ayubo </p>  </div>"
        posts_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
        "<div class='card'>"+
        "<object  style='height:250px;'  autoplay='false' autostart='0'>"+


    "<param name='autoplay' value='false'><param name='ShowControls' value='true'>"+

    '<embed src="'+value.imageURL+'" width="100%" height="144" autoplay="false" controller="false" style="height:250px;"></embed>'+


        "</object>"+
        "<div class='card-body'><p class='card-text'>"+value.text+"</p>"+
        "<button class='btn btn-danger' id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
        "</div></div></div>"+posts_div.innerHTML;
      }

    });
}

function delete_post(key){
    firebase.database().ref('blogs/'+key).remove();
    getdata();

}
