import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteArticle, detailsOfArticle } from "../data.js";

const detailsTemplate = (article, onDelete) => html`<section
  id="details-page"
  class="content details"
>
  <h1>${article.title}</h1>

  <div class="details-content">
    <strong>Published in category ${article.category}</strong>
    <p>${article.content}</p>

    <div class="buttons">
      <a
        href="javascript:void(0)"
        class="btn delete"
        id="deleteBtn"
        @click=${onDelete}
        >Delete</a
      >
      <a href="/edit/${article._id}" class="btn edit" id="editBtn">Edit</a>
      <a href="/" class="btn edit">Back</a>
    </div>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const articleId = ctx.params.id;
  const article = await detailsOfArticle(articleId);
  ctx.render(detailsTemplate(article, onDelete));

  const isOwner = ctx.user && ctx.user._id == article._ownerId;
  if (!isOwner) {
    document.getElementById("editBtn").style.display = "none";
    document.getElementById("deleteBtn").style.display = "none";
  } else {
    document.getElementById("editBtn").style.display = "";
    document.getElementById("deleteBtn").style.display = "";
  }
  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteArticle(articleId);
      ctx.page.redirect("/");
    }
  }
}
