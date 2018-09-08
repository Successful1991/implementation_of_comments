//import './html__templates.js';
window.addEventListener( 'load', () => {

  const user = {
    id: 1,
    email: '19successful91@gmail.com'
  };
  let commentsAll;

  function getComment() {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/'+user.email+'/comments',
      type:'GET',
      data: {
        count: 2,
        offset: 0
      },
      success:function (commentList) {
        commentsAll = commentList;
        renderComment(commentList);
      }
    });
  }
  function setComment(message,parentName = null) {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/'+user.email+'/comments',
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
  function editComment(message,messageId) {
    console.log(message,messageId);
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/'+user.email+'/comments/'+ messageId,
      dateType: 'json',
      type:'PUT',
      data: {
        content: message,
        _method: 'PUT'
      },
      success: function () {
        getComment();
      }
    });
  }
  function deleteComment(comment__id) {
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/'+user.email+'/comments/' + comment__id,
      type:'POST',
      data: {
        _method: 'DELETE'
      },
      success: function () {
        getComment();
      }
    });
  }
  function loadComment() {
    console.log(commentsAll.length);
    $.ajax({
      url: 'http://frontend-test.pingbull.com/pages/'+user.email+'/comments',
      type:'GET',
      data: {
        count: commentsAll.length + 5 ,
        offset: 0
      },
      success:function (commentList) {
        commentsAll = commentList;
        renderComment(commentsAll);
      }
    });
  }


  function renderComment( comments ) {
    $('#comments__all').empty();

    $.each(comments,(i,comment) => {
      comment.created_at = changeFormatDate(comment.created_at);  // edit format date
      $('#comments__all').append( htmlTemplates.message(comment));

      if( comment.author.id === user.id ){
        addActionsTemplate('comment',true,true,true);
      } else {
        addActionsTemplate('comment',false,false,true);
      }

      if(comment.children.length > 0){
        renderCommentReply(comment,i);
      }
    });
    addEventComment();
  }
  function renderCommentReply(comment,i){
    comment.children.forEach( reply => {
      reply.created_at = changeFormatDate(reply.created_at); // edit format date
      $('#comments__all')
        .find('.reply')
        .eq(i)
        .append( htmlTemplates.reply( comment.author.name, reply));

      if(reply.author.id === user.id){
        addActionsTemplate('comment__reply',true,true,false);
      }
    });
  }
  function addActionsTemplate(commentClass,edit,del,reply) {
    $('#comments__all')
      .find('.'+commentClass)
      .eq(-1)
      .find('.comment__text')
      .after( htmlTemplates.actions(edit,del,reply) );
  }

  function addEventComment() {
    $('.comments').find('.actions').each( (i,comment) => {
      $(comment).click( (e) => {
        if($(e.target).hasClass('actions__edit')){
          actionCommentEdit($(e.target));
        } else if($(e.target).hasClass('actions__delete')){
          actionCommentDelete($(e.target));
        } else if($(e.target).hasClass('actions__reply')){
          actionCommentReply($(e.target));
        }
      });
    });
  }

  function actionCommentEdit(e) {
    let comment = getItemObjectWhichClick(e);
    const htmlBlockComment = e.closest('li');
    $('#comment__add__reply').remove();

    if( htmlBlockComment.hasClass('comments') ){
      htmlBlockComment
        .find('.comment')
        .after(
          htmlTemplates.formAddReply(comment.author.name ,true,comment.content)
        );

    } else if( htmlBlockComment.hasClass('comment__reply') ){
      htmlBlockComment
        .after(
          htmlTemplates.formAddReply(comment.author.name ,true,comment.content)
        );
    }

    addEventFormReplyCancel ();
    addEventFormSend ( editComment, comment.id );
  }

  function actionCommentDelete(e) {
    deleteComment( e.closest('li').attr('data-commentId') );
  }

  function actionCommentReply(e) {
    let comment = getItemObjectWhichClick(e);
    const htmlBlockComment = e.closest('li');
    $('#comment__add__reply').remove();

    htmlBlockComment
      .find('.comment')
      .after( htmlTemplates.formAddReply(comment.author.name) );  //added the answer form to html

    addEventFormReplyCancel ();
    addEventFormSend (setComment,comment.id);
  }

  function getItemObjectWhichClick(e){
    let comment;
    const htmlBlockComment = e.closest('li');
    commentsAll.forEach( el => {
      if(+el.id === +htmlBlockComment.attr('data-commentId'))comment = el;
    });
    return comment;
  }


  function addEventFormReplyCancel (){
    $('#comment__add__reply')
      .find('.comment__add__reply__header__cancel')
      .click( () => {
        $('#comment__add__reply').remove()
      });
  }

  function addEventFormSend (actionName ,parentName){
    $('#comment__add__reply')
      .find('.comment__button')
      .click( (e) => {
        if($(e.target).siblings('textarea')[0].value){
          actionName($(e.target).siblings('textarea')[0].value,parentName);
        }

        $('#comment__add__reply').remove();
      });
  }

  function changeFormatDate(date) {
    return moment(date).format('YYYY-MM-DD a hh:mm');
  }
  
  function addComment() {
    let message = $('#comment__add__textarea')[0].value;
    setComment(message);
  }

  getComment();
  document.getElementById('comment__add__input').addEventListener( 'click', addComment );
  document.getElementById('comments__load').addEventListener( 'click', loadComment );
});



