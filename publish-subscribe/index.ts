// 实现一个发布订阅器
interface IEvent {
  listener: Function;
  once: boolean;
}
interface Events {
  [eventName: string]: IEvent[];
}

class EventBus {
  events: Events = {}; // 缓存所有添加的事件

  private static instance: EventBus;

  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  // 触发事件
  emit(eventName: string, ...args) {
    if (!this.events[eventName]) return;
    for (const event of this.events[eventName]) {
      const { listener, once } = event;
      listener(...args);
      if (once) {
        this.off(eventName, listener);
      }
    }
  }

  // 添加一个事件监听
  on(eventName: string, listener: Function, once?: boolean) {
    const event = { listener, once: !!once };
    // 已添加
    // if (this.events[eventName]) {
    //   this.events[eventName].push(event);
    // } else {
    //   this.events[eventName] = [event];
    // }
    // 不用if，更简洁的写法
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(event);
  }

  // 添加一个事件监听，当触发一次后就移除监听
  once(eventName: string, listener: Function) {
    this.on(eventName, listener, true);
  }

  // 移除事件监听
  off(eventName: string, listener?: Function) {
    if (!this.events[eventName]) return;
    if (listener) {
      this.events[eventName] = this.events[eventName].filter(
        (event) => event?.listener !== listener
      );
    } else {
      delete this.events[eventName];
    }
  }
}

export default EventBus.getInstance();

const eventBus = new EventBus();

const callback = (x) => {
  console.log('Click', x.id);
};
eventBus.on('click', callback);
eventBus.on('click', callback);

// 只打印一次
const onceCallback = (x) => console.log('Once Click', x.id);
eventBus.once('click', onceCallback);
eventBus.once('click', onceCallback);

//=> 3
eventBus.emit('click', { id: 3 });

//=> 4
eventBus.emit('click', { id: 4 });
