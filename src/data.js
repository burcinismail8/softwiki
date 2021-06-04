import * as api from "./api.js";
export const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// specific ones
//get all cars
export async function getAllAricles() {
  return await api.get(host + "/data/wiki?sortBy=_createdOn%20desc");
}
//get specific one
export async function detailsOfArticle(id) {
  return await api.get(host + "/data/wiki/" + id);
}
//create one
export async function createArticle(body) {
  return await api.post(host + "/data/wiki", body);
}
//edit one
export async function editArticle(id, body) {
  return await api.put(host + "/data/wiki/" + id, body);
}
//delete one
export async function deleteArticle(id) {
  return await api.del(host + "/data/wiki/" + id);
}
///data/cars?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc
export async function getRecentArticles() {
  return await api.get(
    host + `/data/wiki?sortBy=_createdOn%20desc&distinct=category`
  );
}
export async function search(query) {
  return await api.get(host + `/data/cars?where=year%3D${query}`);
}
