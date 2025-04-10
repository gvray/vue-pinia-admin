import request from "@/utils/request";

// 登录方法
export function login(username: string, password: string) {
  const data = {
    username,
    password,
  };
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/currentUser",
    method: "get",
  });
}
