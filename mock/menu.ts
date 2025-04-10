import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/menu/list",
    method: "get",
    response: ({ headers }) => {
      return {
        success: true,
        code: 200,
        message: "菜单获取成功",
        data: [
          { key: "user", icon: "UserOutlined", label: "menu.users" },
          { key: "docs", icon: "VideoCameraOutlined", label: "menu.documents" },
        ],
      };
    },
  },
] as MockMethod[];
