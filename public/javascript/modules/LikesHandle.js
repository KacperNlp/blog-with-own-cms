import { bindWithHtml } from "./BindWithHtml.js";

const ATRIBUTE_WITH_COMMENT_AUTHOR = "data-author";
const ATRIBUTE_WITH_COMMENT_ID_IN_DATA = "data-id";
const CLASS_FOR_NOT_LIKED_COMMENT = "far";
const CLASS_FOR_LIKED_COMMENT = "fas";
const LIKES_CONTAINER_COUNTER_ID = "heart";

class LikesHandle {
  constructor() {
    this.likesCounterContainers = bindWithHtml.bindElementsBySelector(
      `#${LIKES_CONTAINER_COUNTER_ID}`
    );

    this.#init();
  }

  #init() {
    if (!!this.likesCounterContainers.length) {
      this.likesCounterContainers.forEach((comment) => {
        comment.addEventListener("click", this.#handleForComment);
      });
    }
  }

  #handleForComment = (event) => {
    const { target } = event;
    const commentID = target.getAttribute(ATRIBUTE_WITH_COMMENT_ID_IN_DATA);
    const commentAuthor = target.getAttribute(ATRIBUTE_WITH_COMMENT_AUTHOR);
    let numberOfLikes = Number(target.textContent);

    const isLiked = target
      .getAttribute("class")
      .includes(CLASS_FOR_LIKED_COMMENT);

    if (isLiked) {
      numberOfLikes--;
      target.textContent = numberOfLikes > 0 ? numberOfLikes : "";
      target.classList.remove(CLASS_FOR_LIKED_COMMENT);
      target.classList.add(CLASS_FOR_NOT_LIKED_COMMENT);

      this.#sendToBackend(numberOfLikes, commentID, commentAuthor);
    } else {
      numberOfLikes++;
      target.textContent = numberOfLikes;
      target.classList.add(CLASS_FOR_LIKED_COMMENT);
      target.classList.remove(CLASS_FOR_NOT_LIKED_COMMENT);

      this.#sendToBackend(numberOfLikes, commentID, commentAuthor);
    }
  };

  #sendToBackend(numberOfLikes, commentID, commentAuthor) {
    const currentSiteURL = window.location.href;

    fetch(`${currentSiteURL}/${commentID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: numberOfLikes, commentAuthor }),
    }).catch((err) => {
      if (err) throw Error(err);
    });
  }
}

export const likesHandle = new LikesHandle();
