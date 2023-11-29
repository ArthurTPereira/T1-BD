class UndefinedParameter extends Error {

    public static INVALIDA_VALUE : string = "Valor inválido";
  
    constructor(public message: string) {
      super(message);
      this.name = "UnexpectedInput";
      this.stack = (<any> new Error()).stack;
    }
  
  }
  
  export default UndefinedParameter;