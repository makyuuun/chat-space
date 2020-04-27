$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="mainchat__messages__message">
         <div class="mainchat__messages__message__upper">
           <div class="mainchat__messages__message__upper__user-name">
             ${message.user_name}
           </div>
           <div class="mainchat__messages__message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="mainchat__messages__message__lower">
           <p class="mainchat__messages__message__lower__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="mainchat__messages__message">
         <div class="mainchat__messages__message__upper">
           <div class="mainchat__messages__message__upper__user-name">
             ${message.user_name}
           </div>
           <div class="mainchat__messages__message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="mainchat__messages__message__lower">
           <p class="mainchat__messages__message__lower__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    console.log(data);
    var html = buildHTML(data);
    $('.mainchat__messages').append(html);
    $('.mainchat__messages').animate({scrollTop: $('.mainchat__messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
    $('.mainchat__form__submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});
