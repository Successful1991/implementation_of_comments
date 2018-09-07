//export
let htmlTemplates = {
  formAddReply: (user) => {
    return  `<div class="comment__add__reply" id="comment__add__reply"> 
						<div class="comment__add__reply__header">
							<div class="comment__add__reply__header__name">${user}</div>
							<div class="comment__add__reply__header__cancel">Cancel</div>
						</div> 
						<textarea class="comment__textarea" placeholder="Your Message"></textarea> 
						<input type="submit" class="comment__button" value="Send">
					</div>`;
  },
  message: (text) => {
    let template = `<li class="comments" data-commentId=${text.id} data-userId= ${text.author.id} >
					<div class="comment">
						<img src=${text.author.avatar} class="comment__photo">
						<div>
							<div>
								<span class="comment__name">${text.author.name} </span>
								<time class="comment__date">${text.created_at}</time>
							</div>
							<p class="comment__text">${text.content}</p>
							<div class="actions">
								<div class="actions__icon actions__edit">Edit</div>
								<div class="actions__icon actions__delete">Delete</div>
								<div class="actions__icon actions__reply">Reply</div>
							</div>
						</div>
					</div>
					<ul class="reply"></ul>
		</li>`;
    return template
  },
  reply: (nameReply,text) => {
    return  `<li class="comment__reply">
							<img src= ${text.author.avatar} class="comment__photo">
							<div>
								<span class="comment__name">${text.author.name}</span>
								<span class="comment__name-reply">${nameReply}</span>
								<time class="comment__date">${text.created_at}</time>
								<p class="comment__text">${text.content}</p>
							</div>
					</li>`;
  }
};
