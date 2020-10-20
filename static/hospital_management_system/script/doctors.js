   $(document).on('keypress','#search_input',function(e){
     if (e.keyCode == 13){
          e.preventDefault();
          var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
          var data = $("#search_input").val();
          $.ajax({
          url:"check_doctors_data/" ,
          type: "POST" ,
          data: {csrfmiddlewaretoken : window.CSRF_TOKEN,name: data} ,

          success: function(data){
          $("div.navbar").css('display','none');
          $("div.left_container").html(data);
          $("div.left_container").css({"width":"18%","position":"fixed"});
          }

         });
          }
      });


    $(document).on('submit','#add_doctors',function(e){
        e.preventDefault();
        var formData = new FormData($('#add_doctors')[0]);
        $.ajax({
          type:"POST",
          url:"add_doctors/",
          processData: false,
          contentType: false,
          data:formData,
          success:function(data){
          $('.add_doctors').css('display','none');
          $('.doctors').html(data);
          $('#add_doctors')[0].reset()
          alert("successfully submitted");
          }
        });
        });


        $(document).on('click','.doctor_list_button',function(){
        $('.add_doctors').css('display','block');
        $('.doctor_list_button').hide();
        $('.doctors_list').css('display','none');
        });

         $(document).on('click','.doctor_profile',function(){
          var id = $(this).attr("data-catid");
          var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
          $.ajax({
          type: "POST" ,
          url:"view/" ,
          data: {csrfmiddlewaretoken : window.CSRF_TOKEN,id:id} ,
          success: function(data){
          $('.doctors_profile').html(data);
          $('.doctors_profile').css('display','block');
          $(document).on('click','.profile_close',function(){
                        $('.doctors_profile').hide();
                 });
            }
            });
            });





    $(document).on('click','.delete',function(){
          var id = $(this).attr("data-catid");
          var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
          $.ajax({
            type: "POST" ,
            url:"delete/" ,
            data: {csrfmiddlewaretoken : csrftoken,id:id} ,

            success: function(data){
            $('.doctors').html(data);
            alert('successfully deleted');
            }
            });
            });



$(document).on('click','.close',function(){
  $('.add_doctors').hide();
  $('.doctor_list_button').show();
  $('.doctors_list').show();
});



$("#search_input").on('focusout keydown',function(e){
var search_bar_value =$("#search_input").val()
if (search_bar_value == ""){
  $("div.left_container").css({'left':''});
  $("div.left_container").hide();
  $('.navbar').show();
} else {
  if (e.keyCode == 13){
  $("div.left_container").show();
  }
} });



$(document).on('focusout','#id_mobile',function(){
 var mob_no = $('#id_mobile').val();
 if (mob_no != ""){
 if (isNaN(mob_no)){
   $('#id_mobile').css('border',' 1px solid red');
   $(":submit").attr("disabled", true);
 } else {
   $('#id_mobile').css('border',' 1px solid blue');
   $(":submit").removeAttr("disabled");
 }
 } else {
   $('#id_mobile').css('border',' 1px solid blue');
   $(":submit").removeAttr("disabled");
 }
});



$(document).on('focusout','#id_name',function(){
 var name = $('#id_name').val();
 if (name != ""){
 if ( isNaN(name)){
    $('#id_name').css('border-bottom',' 1px solid blue');
    $(":submit").removeAttr("disabled");
 } else {
    $('#id_name').css('border-bottom',' 1.5px solid red');
    $(":submit").attr("disabled", true);
 }
 } else{
     $('#id_name').css('border-bottom',' 1px solid blue');
     $(":submit").removeAttr("disabled");
 }
});

