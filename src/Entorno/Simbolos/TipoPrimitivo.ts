export enum TipoPrimitivo {
    Integer,
    Double,
    Char,
    String,
    Null,
    Boolean,
    Void,
    Retornable_como_la_coca
}


export type Retorno = {
    value: any,
    type: TipoPrimitivo
}