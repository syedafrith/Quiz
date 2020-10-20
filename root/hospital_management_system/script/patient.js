   $(document).on('keypress','#search_input',function(e){
     if (e.keyCode == 13){
          e.preventDefault();
          var data = $("#search_input").val();
          $.ajax({

    url:"check_patients_data/",
    type: "POST" ,
    data: {csrfmiddlewaretoken : window.CSRF_TOKEN,mobile: data} ,

    success: function(data){
    $("div.search_container").html(data);
    $("div.search_container").css({'display':'block','margin-left':'25%'});
    $('div.patient_list').hide();
     }
    });
          }
    });

    $(document).on('click','.submit',function(e){
        e.preventDefault();
         $('.submit .loader').show();
         $('.submit .button_value').hide();
         $('.submit').attr('disabled',true);
        var formData = new FormData($('#add_patients')[0]);
        $.ajax({
          type:"POST",
          url:"add_patients/",
          processData: false,
          contentType: false,
          data:formData,
          success:function(data){
          $('.patients').html(data);
          $('#add_patients')[0].reset();
          $('.submit .loader').hide();
          $('.submit .button_value').show();
          $('.submit').attr('disabled',false);
          alert("successfully submitted");
          }
        });
        });


        $(document).on('click','.submit1',function(e){
        e.preventDefault();
        $('.submit1 .loader').show();
        $('.submit1 .button_value').hide();
        $('.submit1').attr('disabled',true);
        var formData = new FormData($('#outpatient')[0]);
        $.ajax({
          type:"POST",
          url:"out_patients/",
          processData: false,
          contentType: false,
          data:formData,
          success:function(data){
          $('#outpatient')[0].reset();
          alert(data);
          $('.submit1 .loader').hide();
          $('.submit1 .button_value').show();
          $('.submit1').attr('disabled',true);
          $('#success').text("this");
          }
        });
        });



    $(document).on('click','.op',function(){
    name = $(this).attr("data-name");
    mobile = $(this).attr("data-mobile")
    $('#outpatient #id_name').val(name);
    $('#outpatient #id_mobile').val(mobile);
    $('div.patient_list').hide();
    $('.patients_form').hide();
    $('.outpatient_form').css({'display':'block','margin-left':'30%'});
    });

    $(document).on('click','.close',function(){
     $('.outpatient_form').hide();
     $('.search_container').hide();
     $('div.patient_list').show();
     $('.patients_form').show();
     });

     $(document).on('click','#add_icon',function(){
     $('.patients_form').css({'position':'static','float':'usnet','margin':'auto'});
     $('.patients_form').toggle();
     $('div.patient_list').toggle();
     });

     $(document).on('click','.appointment',function(){
       $('.appointment_form').css('display','block');
    });

    $(document).on('click','.close',function(){
     $('.outpatient_form').hide();
     });

     $(document).on('click','.visit_history',function(){
     $(this).children('div.visit_container').toggle();
     });


$("#search_input").on('focusout keydown',function(e){
var search_bar_value =$("#search_input").val()
if (search_bar_value == ""){
  $("div.search_container").hide();
  $('.outpatient_form').css('display','none');
  $('div.patient_list').show();
} else {
  if (e.keyCode == 13){
  $("div.search_container").show();
  }
} });



