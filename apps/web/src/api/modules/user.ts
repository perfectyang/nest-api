import { Ajax } from "../index";

console.log("Ajax", Ajax);

// Netoff 列表
export const userGet = () => Ajax.get("/user/get");
export const userAdd = (data) => Ajax.post("/user/add", data);
