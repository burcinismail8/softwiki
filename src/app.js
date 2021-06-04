import * as api from "./data.js";
import page from "../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "./utility.js";
import { logout } from "./api.js";

window.api = api;
const main = document.querySelector("main");
document.getElementById("logoutBtn").addEventListener("click", logoutFunc);
setUserNav();

import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { catalogPage } from "./views/catalogue.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

import { createPage } from "./views/create.js";

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/catalogue", decorateContext, catalogPage);
page("/create", decorateContext, createPage);
page("/edit/:id", decorateContext, editPage);
page("/details/:id", decorateContext, detailsPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();
  next();
}

function setUserNav() {
  const user = getUserData();
  if (user) {
    document.getElementById("user").style.display = "";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "";
  }
}

function logoutFunc() {
  logout();
  setUserNav();
  page.redirect("/");
}
