// export
const htmlTemplates = {
  formAddReply: (user, message = false, text = '') => {
    const template = `
      <div class="comment__add__reply" id="comment__add__reply">
        <div class="comment__add__reply__header">
        <div class="comment__add__reply__header__name"> ${user} </div>
        <div class="comment__add__reply__header__cancel">Cancel</div>
      </div>
      <textarea class="comment__textarea" placeholder="Your Message"> ${(message) ? text : ''}</textarea> 
      <input type="submit" class="comment__button" value="Send">
      </div>`;
    return template;
  },
  message: (text) => {
    const template = `
      <li class="comments" data-commentId=${text.id} data-userId= ${text.author.id}>
        <div class="comment">
          <img src= ${text.author.avatar} class="comment__photo">
          <div>
            <div>
              <span class="comment__name">${text.author.name} </span>
              <time class="comment__date">${text.created_at}</time>
            </div>
            <p class="comment__text">${text.content}</p>
          </div>
        </div>
        <ul class="reply"></ul>
      </li>`;
    return template;
  },
  reply: (nameReply, text) => {
    const template = `
      <li class="comment__reply" data-commentId=${text.id} data-userId= ${text.author.id}>
        <img src=${text.author.avatar} class="comment__photo">
        <div>
          <span class="comment__name">${text.author.name}</span>
          <span class="comment__name-reply">${nameReply}</span>
          <time class="comment__date">${text.created_at}</time>
          <p class="comment__text">${text.content}</p>
        </div>
      </li>`;
    return template;
  },
  actions: (edit = false, del = false, reply = false) => {
    const actionsEdit = '<div class="actions__icon actions__edit">Edit</div>';
    const actionsDelete = '<div class="actions__icon actions__delete">Delete</div>';
    const actionsReply = '<div class="actions__icon actions__reply">Reply</div>';

    const template = `
      <div class="actions"> 
         ${edit ? actionsEdit : ''} 
         ${del ? actionsDelete : ''} 
         ${reply ? actionsReply : ''}
      </div>`;

    return template;
  },
};
console.log(htmlTemplates);
