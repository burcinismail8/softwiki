import { html } from "../../node_modules/lit-html/lit-html.js";
import { getRecentArticles } from "../data.js";

function classOfArticle(article) {
  let category = article.category;
  if (category == "JavaScript") {
    return "js";
  } else if (category == "Python") {
    return "python";
  } else if (category == "C#") {
    return "csharp";
  } else if (category == "Java") {
    return "java";
  }
}
const articleTemplate = (article) => html` <section
  class="recent ${classOfArticle(article)}"
>
  ${console.log(article)}
  <h2>${article.category}</h2>
  <article>
    ${article.title == ""
      ? html` <h3 class="no-articles">No articles yet</h3> `
      : html`<h3>${article.title}</h3>
          <p>${article.content}</p>`}
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
  </article>
</section>`;
const homeTemplate = (articles) => html`
  <section id="home-page" class="content">
    <h1>Recent Articles</h1>
    ${articles.map(articleTemplate)}
  </section>
`;
export async function homePage(ctx) {
  const articles = await getRecentArticles();
  ctx.render(homeTemplate(articles));
}
