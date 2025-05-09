import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElLoading,
} from "element-plus";

// 考虑封装 loadingInstance 管理为内部闭包变量，避免模块级状态污染
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

export function useModal() {
  return {
    // 可以合并 msg/msgSuccess/msgError/msgWarning 为一个通用函数接受 type 参数，避免重复
    msg: (content: string) => ElMessage.info(content),
    msgSuccess: (content: string) => ElMessage.success(content),
    msgError: (content: string) => ElMessage.error(content),
    msgWarning: (content: string) => ElMessage.warning(content),

    // alert 系列同样可封装为 alert(type, content) 提高复用性
    alert: (content: string) => ElMessageBox.alert(content, "系统提示"),
    alertSuccess: (content: string) =>
      ElMessageBox.alert(content, "系统提示", { type: "success" }),
    alertError: (content: string) =>
      ElMessageBox.alert(content, "系统提示", { type: "error" }),
    alertWarning: (content: string) =>
      ElMessageBox.alert(content, "系统提示", { type: "warning" }),

    notify: (content: string) => ElNotification.info(content),
    notifySuccess: (content: string) => ElNotification.success(content),
    notifyError: (content: string) => ElNotification.error(content),
    notifyWarning: (content: string) => ElNotification.warning(content),

    // confirm/prompt 建议也合并为通用弹窗函数，如 messageBox(type, content, options?)
    confirm: (content: string) =>
      ElMessageBox.confirm(content, "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }),

    prompt: (content: string) =>
      ElMessageBox.prompt(content, "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }),

    loading: (content: string) => {
      // 如果 loadingInstance 已存在，考虑避免重复创建
      loadingInstance = ElLoading.service({
        lock: true,
        text: content,
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    closeLoading: () => {
      loadingInstance?.close();
    },
  };
}
