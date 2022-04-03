/* eslint-disable no-console */
export class Loading {
    /** 当前加载器状态，true显示，false不显示 */
    private isShow = false;
    /** 延时器 */
    private timer: any = 0;
    /** 标记堆栈 */
    private stack: number[] = [];

    /** 当第一次调用show的时间戳与第一次调用hide的时间戳之间的间隔值的阈值，阈值以内不会显示loadding（单位：毫秒） */
    public static threshold = 0;

    /** hide被调用后延迟多长时间再隐藏loadding（单位：毫秒） */
    public static delay = 0;

    /** 负责具体显示的处理器 */
    public showHandler: Function = () => {
      console.log('请设置showHandler');
    };

    /** 负责具体隐藏的处理器 */
    public hideHandler: Function = () => {
      console.log('请设置hideHandler');
    };

    public show() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.showHandler();
          this.isShow = true;
          clearTimeout(this.timer);
        }, Loading.threshold);
      }
      this.stack.push(1);
    }

    public hide() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.stack.shift();
          if (this.stack.length === 0) {
            clearTimeout(this.timer);
            if (this.isShow === true) {
              this.hideHandler();
              this.isShow = false;
              this.timer = 0;
            }
          }
          resolve(true);
        }, Loading.delay);
      });
    }
}
