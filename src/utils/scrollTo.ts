// 声明扩展 Math 对象
declare global {
  interface Math {
    easeInOutQuad(t: number, b: number, c: number, d: number): number;
  }
}

// 缓动函数：easeInOutQuad
Math.easeInOutQuad = function (t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame 兼容封装
const requestAnimFrame = (function (): (callback: FrameRequestCallback) => number {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback: FrameRequestCallback): number {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**
 * 设置滚动位置（为兼容性，尝试多个元素）
 * @param amount 滚动到的位置
 */
function move(amount: number): void {
  document.documentElement.scrollTop = amount;
  if (document.body.parentNode instanceof HTMLElement) {
    document.body.parentNode.scrollTop = amount;
  }
  document.body.scrollTop = amount;
}

/**
 * 获取当前滚动位置
 */
function position(): number {
  return (
    document.documentElement.scrollTop ||
    (document.body.parentNode instanceof HTMLElement ? document.body.parentNode.scrollTop : 0) ||
    document.body.scrollTop
  );
}

/**
 * 平滑滚动到指定位置
 * @param to 滚动到的目标位置
 * @param duration 动画持续时间（默认 500ms）
 * @param callback 动画完成后的回调函数
 */
export function scrollTo(to: number, duration: number = 500, callback?: () => void): void {
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  function animateScroll(): void {
    currentTime += increment;
    const val = Math.easeInOutQuad(currentTime, start, change, duration);
    move(val);
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  animateScroll();
}
