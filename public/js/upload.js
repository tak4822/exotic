$(function(){
  $('.upload-btn').on('click', function(){
    $(this).siblings('.upload-input').click();
  });

  $('.upload-input').on('change', function(){
    const uploadInput = $(this);
    if(uploadInput.val() != ''){
      const formData = new FormData();
      formData.append('upload', uploadInput[0].files[0]);
      console.log(formData)
      $.ajax({
          url: '/upload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
            uploadInput.val('');
          },
          error: function(err){
            console.log(err);
          }
      });
    }
  }); //upload for insert

  $('.insert-images-btn').on('click', function(){
    $(this).siblings('.upload-images').click();
  });

  $('.upload-images').on('change', function(){
    const uploadInput = $(this);
    const id = uploadInput.data("id");
    const type = uploadInput.data("type");
    const column = uploadInput.data("column");
    const columnUrl = "/" + type + "/" + column +"/" + id;

    if(uploadInput.val() != ''){
      const formData = new FormData();
      formData.append('upload', uploadInput[0].files[0]);
      $.ajax({
          url: columnUrl,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
            uploadInput.val('');
            if(typeof data.redirect == 'string'){
                window.location = data.redirect
            }
          },
          error: function(err){
            console.log(err);
          }
      });
    }
  }); //upload for client and images

})
