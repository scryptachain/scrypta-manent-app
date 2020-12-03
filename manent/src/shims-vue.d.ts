declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}


declare module '@scrypta/core' {
  class ScryptaCore {
    constructor(isBrowser:boolean): Object;
  }
  export = MyClass;
}