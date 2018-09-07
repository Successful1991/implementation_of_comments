//import './html__templates.js';
window.addEventListener( 'load', () => {


  function getComment() {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/19successful91@gmail.com/comments',
      type:'GET',
      data: {
        count: 5,
        offset: 0
      },
      success:function (commentList) {
        randerComment(commentList);
      }
    });
  }
  function setComment(message,parentName = null) {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/19successful91@gmail.com/comments',
      type:'POST',
      dateType: 'json',
      data: {
        content: message,
        parent: parentName,
      },
      success: function () {
        getComment();
      }
    });
  }
  function deleteComment(comment__id) {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/19successful91@gmail.com/comments/' + comment__id,
      type:'POST',
      data: {
        _method: 'DELETE'
      },
      success: function () {
        getComment();
      }
    });
  }

  function randerComment(comments) {
    console.log(comments);
    $('#comments__all').empty();
    comments.forEach( (comment) => {
      //console.log(comment);
      comment.created_at = changeFormatDate(comment.created_at);
      let commentTemp = $('#comments__all').append( htmlTemplates.message(comment));
      if(comment.children.length > 0){
        comment.children.forEach( reply => {
          reply.created_at = changeFormatDate(reply.created_at);
          $(commentTemp).find('.reply').append( htmlTemplates.reply( comment.author.name, reply));
        });
      }
    });
    addEventComment();
  }

  function addEventComment() {
    $('.comments').find('.actions').each( (i,comment) => {
      $(comment).click( (e) => {
        if($(e.target).hasClass('actions__edit')){

        } else if($(e.target).hasClass('actions__delete')){

            const commentId = $(e.target).closest('.comments').attr('data-commentId');
            deleteComment( commentId );

        } else if($(e.target).hasClass('actions__reply')){
          $('#comment__add__reply').remove();
          const htmlBlockComment = $(e.target).closest('.comments');
          const commentId = htmlBlockComment.attr('data-commentId');
          const userName = htmlBlockComment.find('.comment').find('.comment__name').text();
          htmlBlockComment
            .find('.comment')
            .after( htmlTemplates.formAddReply(userName) );

          addEventFormReplyCancel ();
          addEventFormReplySend (commentId);
        }
      });
    });
  }

  function addEventFormReplyCancel (){
    $('#comment__add__reply')
      .find('.comment__add__reply__header__cancel')
      .click( () => {
        $('#comment__add__reply').remove()
      });
  }

  function addEventFormReplySend (parentName){
    $('#comment__add__reply')
      .find('.comment__button')
      .click( (e) => {

        console.log(  $(e.target).siblings('textarea')[0].value );
        if($(e.target).siblings('textarea')[0].value){

          setComment($(e.target).siblings('textarea')[0].value,parentName);
        }

        $('#comment__add__reply').remove();
      });
  }

  function changeFormatDate(date) {
    return moment(date).format('YYYY-MM-DD a hh:mm')
  }
  
  function addComment() {
    let message = $('#comment__add__textarea')[0].value;
    setComment(message);
  }

  getComment();
  document.getElementById('comment__add__input').addEventListener( 'click', addComment );
});



