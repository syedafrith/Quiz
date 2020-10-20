$(document).ready(function() {
$('.mob_data').focusout(function(){
alert("success");
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
var num;
num = $("#mobdata").val()
$.ajax(
{
    type:"POST",
    url: "check/",
    data:{
           csrfmiddlewaretoken : csrftoken,
            mob_no: num
          },

success: function(data)
{
   data =JSON.parse(data);
   $("#namedata").val(data["name"]);
   $("#emaildata").val(data["email"]);
    } }) }); });






$("#add_doctors").on('submit',function(e){
e.preventDefault();
var formData = new FormData($('#add_doctors')[0]);
$.ajax({
  type:"POST",
  url:"doctors_form/",
  processData: false,
  contentType: false,
  data:formData,
  success:function(data){
  $('#add_doctors')[0].reset()
  alert("successfully submitted");
  }
});
});





