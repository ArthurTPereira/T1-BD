class TagNotFoundException extends Error {

    public static TAG_NOT_FOUND : string = "Tag não encontrada";
  
    constructor(public message: string) {
      super(message);
      this.name = "UnexpectedInput";
      this.stack = (<any> new Error()).stack;
    }
  
  }
  
  export default TagNotFoundException;