export const htmlTemplates = {
  addReply: (user) => {
    let template = `<div class="comment__add__reply"> 
						<div class="comment__add__reply__header">
							<div class="comment__add__reply__header__name">Kurt Thompson</div>
							<div class="comment__add__reply__header__cancel">Cancel</div>
						</div> 
						<textarea class="comment__textarea" placeholder="Your Message"></textarea> 
						<input type="submit" class="comment__button" value="Send">
					</div>`
  },

  message: (text) => {
    let template = `<li class="comments">
					<div class="comment">
						<img src="img/user.jpg" class="comment__photo">
						<div>
							<div>
								<span class="comment__name">Kurt Thompson </span>
								<time class="comment__date">2015-07-06 at 13:57</time>
							</div>
							<p class="comment__text">If not everyone makes money blogging, why is blogging so popular?</p>
							<div class="actions">
								<div class="actions__icon actions__edit">Edit</div>
								<div class="actions__icon actions__delete">Delete</div>
								<div class="actions__icon actions__reply">Reply</div>
							</div>
						</div>
					</div>
					<div class="comment__add__reply">
						<div class="comment__add__reply__header">
							<div class="comment__add__reply__header__name">Kurt Thompson</div>
							<div class="comment__add__reply__header__cancel">Cancel</div>
						</div>
						<textarea class="comment__textarea" placeholder="Your Message"></textarea>
						<input type="submit" class="comment__button" value="Send">
					</div>
					<ul class="reply"></ul>
		</li>`
  },
  reply:(nameReply,text) => {
    let template = `<li class="comment__reply">
							<img src="img/user.jpg" class="comment__photo">
							<div>
								<span class="comment__name">Kurt Thompson </span>
								<span class="comment__name-reply">Kurt Thompson </span>
								<time class="comment__date">2015-07-06 at 13:57</time>
								<p class="comment__text">If not everyone makes money blogging, why is blogging so popular?</p>
							</div>
					</li>`
  },
};