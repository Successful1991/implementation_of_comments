// import { htmlTemplates } from './html__templates.js';
window.addEventListener('load', () => {
  const user = {
    id: 1,
    email: '19successful91@gmail.com',
  };
  function changeFormatDate(date) {
    return moment(date).format('YYYY-MM-DD a hh:mm');
  }
  let commentsMessage;
  const urlComment = `http://frontend-test.pingbull.com/pages/${user.email}/comments/`;
  const commentMethod = {
    getComment: (counts = 2) => {
      console.log(urlComment);
      $.ajax({
        url: urlComment,
        type: 'GET',
        data: {
          count: counts,
          offset: 0,
        },
        success: (commentList) => {
          commentsMessage = commentList;
          renderComment(commentList);
        },
      });
    },

    setComment: (message, parentName = null) => {
      $.ajax({
        url: urlComment,
        type: 'POST',
        dateType: 'json',
        data: {
          content: message,
          parent: parentName,
        },
        success: () => {
          commentMethod.getComment(commentsMessage.length);
        },
      });
    },

    editComment: (message, messageId) => {
      $.ajax({
        url: urlComment + messageId,
        dateType: 'json',
        type: 'PUT',
        data: {
          content: message,
          _method: 'PUT',
        },
        success: () => {
          commentMethod.getComment(commentsMessage.length);
        },
      });
    },

    deleteComment: (commentId) => {
      $.ajax({
        url: urlComment + commentId,
        type: 'POST',
        data: {
          _method: 'DELETE',
        },
        success: () => {
          commentMethod.getComment(commentsMessage.length);
        },
      });
    },

    loadComment: () => {
      $.ajax({
        url: urlComment,
        type: 'GET',
        data: {
          count: commentsMessage.length + 5,
          offset: 0,
        },
        success: (commentList) => {
          commentsMessage = commentList;
          renderComment(commentsMessage);
        },
      });
    },
  };
  function addEventFormReplyCancel() {
    $('#comment__add__reply')
      .find('.comment__add__reply__header__cancel')
      .click(() => {
        $('#comment__add__reply').remove();
      });
  }

  function addEventFormSend(actionName, parentName) {
    $('#comment__add__reply')
      .find('.comment__button')
      .click((e) => {
        if ($(e.target).siblings('textarea')[0].value) {
          actionName($(e.target).siblings('textarea')[0].value, parentName);
        }

        $('#comment__add__reply').remove();
      });
  }

  function addActionsTemplate(commentClass, edit, del, reply) {
    $('#comments__all')
      .find(`.${commentClass}`)
      .eq(-1)
      .find('.comment__text')
      .after(htmlTemplates.actions(edit, del, reply));
  }

  function renderCommentReply(comment, i) {
    comment.children.forEach((el) => {
      const reply = el;
      reply.created_at = changeFormatDate(reply.created_at); // edit format date
      $('#comments__all')
        .find('.reply')
        .eq(i)
        .append(htmlTemplates.reply(comment.author.name, reply));

      if (reply.author.id === user.id) {
        addActionsTemplate('comment__reply', true, true, false);
      }
    });
  }

  function getItemObjectWhichClick(e) {
    let comment;
    const htmlBlockComment = e.closest('li');
    commentsMessage.forEach((el) => {
      if (+el.id === +htmlBlockComment.attr('data-commentId')) {
        comment = el;
      } else {
        el.children.forEach((reply) => {
          if (+reply.id === +htmlBlockComment.attr('data-commentId')) comment = reply;
        });
      }
    });
    return comment;
  }

  function actionCommentEdit(e) {
    const comment = getItemObjectWhichClick(e);
    console.log(comment);
    const htmlBlockComment = e.closest('li');
    $('#comment__add__reply').remove();
    if (htmlBlockComment.hasClass('comments')) {
      htmlBlockComment
        .find('.comment')
        .after(
          htmlTemplates.formAddReply(comment.author.name, true, comment.content),
        );
    } else if (htmlBlockComment.hasClass('comment__reply')) {
      htmlBlockComment
        .after(
          htmlTemplates.formAddReply(comment.author.name, true, comment.content),
        );
    }

    addEventFormReplyCancel();
    addEventFormSend(commentMethod.editComment, comment.id);
  }

  function actionCommentDelete(e) {
    commentMethod.deleteComment(e.closest('li').attr('data-commentId'));
  }

  function actionCommentReply(e) {
    const comment = getItemObjectWhichClick(e);
    const htmlBlockComment = e.closest('li');
    $('#comment__add__reply').remove();

    htmlBlockComment
      .find('.comment')
      .after(htmlTemplates.formAddReply(comment.author.name)); // added the answer form to html

    addEventFormReplyCancel();
    addEventFormSend(commentMethod.setComment, comment.id);
  }
  function addEventComment() {
    // hangs the event handler on the button wrapper, which checks the pressed element and
    // calls the desired function so as not to generate a bunch of event handlers.
    $('.comments').find('.actions').each((i, comment) => {
      $(comment).click((e) => {
        if ($(e.target).hasClass('actions__edit')) {
          console.log($(e.target));
          actionCommentEdit($(e.target));
        } else if ($(e.target).hasClass('actions__delete')) {
          actionCommentDelete($(e.target));
        } else if ($(e.target).hasClass('actions__reply')) {
          actionCommentReply($(e.target));
        }
      });
    });
  }

  function renderComment(comments) {
    // clear the block with comments and pars all the
    // comments again that we received
    $('#comments__all').empty();

    $.each(comments, (i, el) => {
      const comment = el;
      comment.created_at = changeFormatDate(comment.created_at); // edit format date
      $('#comments__all').append(htmlTemplates.message(comment));

      if (comment.author.id === user.id) {
        addActionsTemplate('comment', true, true, true);
      } else {
        addActionsTemplate('comment', false, false, true);
      }

      if (comment.children.length > 0) {
        renderCommentReply(comment, i);
      }
    });
    addEventComment();
  }

  function addComment() {
    const message = $('#comment__add__textarea')[0].value;
    commentMethod.setComment(message);
  }

  commentMethod.getComment();
  document.getElementById('comment__add__input').addEventListener('click', addComment);
  document.getElementById('comments__load').addEventListener('click', commentMethod.loadComment);
});
