export class UsuarioModel {
    constructor(
      public readonly _id: string,
      public nombre: string,
      public email: string,
      public tipoDocumento: string,
      public numeroDocumento: number,
      public login: string,
      public rol: string,
      public estado: boolean,
      public createdAt: Date,
      public password?: string
    ) {}
  }