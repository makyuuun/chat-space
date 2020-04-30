$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="mainchat__messages__message" data-message-id=${message.id}>
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
      `<div class="mainchat__messages__message" data-message-id=${message.id}>
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.mainchat__messages__message:last').data("message-id");

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.mainchat__messages').append(insertHTML);
        $('.mainchat__messages').animate({ scrollTop: $('.mainchat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
