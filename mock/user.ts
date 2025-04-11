import dayjs from "dayjs";
import { MockMethod } from "vite-plugin-mock";
import { Random } from "mockjs";

const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
const now = Date.now();
const resultData = new Map<number, any>();
let index = 39;
for (let i = 1; i <= index; i++) {
  resultData.set(i, {
    createBy: "admin",
    createTime: now - (i - 1) * oneDay, // 每条数据减去 (i-1) 天
    updateBy: null,
    updateTime: null,
    remark: "管理员",
    userId: i,
    userName: "admin" + i,
    nickName: "Gavin" + i,
    email: "admin@gmail.com",
    phoneNumber: "1588888888" + (i % 10),
    sex: "1",
    status: i % 2 === 0 ? "0" : "1",
    delFlag: "0",
  });
}

export default [
  {
    url: "/api/user/list",
    method: "get",
    timeout: 500,
    response: ({ query }) => {
      const {
        pageNum,
        pageSize,
        userName,
        phoneNumber,
        params: { beginTime, endTime } = {}, // 解构嵌套参数
        status,
      } = parseQuery(query);
      let rows = [...resultData.values()].filter((item) => {
        let flag = true;
        if (userName && !item.userName.includes(userName)) flag = false;
        if (phoneNumber && !item.phoneNumber.includes(phoneNumber))
          flag = false;
        if (status && item.status !== status) flag = false;

        if (beginTime && endTime) {
          const startDate = dayjs(beginTime);
          const endDate = dayjs(endTime);
          const createDate = dayjs(item.createTime);

          if (
            !(
              createDate.isSame(startDate, "day") ||
              createDate.isSame(endDate, "day") ||
              (createDate.isAfter(startDate) && createDate.isBefore(endDate))
            )
          ) {
            flag = false;
          }
        }

        return flag;
      });

      const page = parseInt(pageNum);
      const size = parseInt(pageSize);
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;

      return {
        success: true,
        code: 200,
        message: "操作成功",
        data: {
          rows: rows.slice(startIndex, endIndex),
          total: rows.length,
        },
      };
    },
  },
  {
    url: "/api/user/:id",
    method: "get",
    response: ({ params }) => {
      const user = resultData.get(parseInt(params.id));
      return {
        success: true,
        code: 200,
        message: "操作成功",
        data: user,
      };
    },
  },
  {
    url: "/api/user/:id",
    method: "delete",
    response: ({ params }) => {
      resultData.delete(parseInt(params.id));
      return {
        success: true,
        code: 200,
        message: "操作成功",
      };
    },
  },
  {
    url: "/api/user",
    method: "post",
    response: ({ body }) => {
      const userId = ++index;
      resultData.set(userId, {
        createTime: new Date().getTime(),
        userId,
        ...body,
      });
      return {
        success: true,
        code: 200,
        message: "操作成功",
      };
    },
  },
  {
    url: "/api/user",
    method: "put",
    timeout: 1000,
    response: ({ body }) => {
      const { userId, ...rest } = body;
      const oldUser = resultData.get(parseInt(userId));
      resultData.set(userId, {
        ...oldUser,
        ...rest,
        updateTime: new Date().getTime(),
        userId,
      });
      return {
        success: true,
        code: 200,
        message: "操作成功",
      };
    },
  },
] as MockMethod[];

function parseQuery(query: Record<string, any>) {
  const parsed: any = {};
  for (const key in query) {
    if (key.includes("[") && key.includes("]")) {
      // 例如：params[beginTime]
      const match = key.match(/^(\w+)\[(\w+)\]$/);
      if (match) {
        const [, parentKey, childKey] = match;
        parsed[parentKey] = parsed[parentKey] || {};
        parsed[parentKey][childKey] = query[key];
      }
    } else {
      parsed[key] = query[key];
    }
  }
  return parsed;
}
