class setContext {
  /**@type {setContext} */
  static instance;
  /**@type {Map} */
  flowContext: any;
  /**@type {Map} */
  methodContext: any;

  constructor() {
    this.flowContext = new Map();
    this.methodContext = new Map();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new setContext();
    }
    return this.instance;
  }

  async add(key: any, ctxInfo = {}) {
    this.flowContext.set(key, ctxInfo);
  }

  get(key) {
    return this.flowContext.get(key);
  }

  delete(key) {
    return this.flowContext.delete(key);
  }
}

export const botContext = setContext.getInstance();
