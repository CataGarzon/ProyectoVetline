// cliente-model.ts

export class ClienteModel {
    constructor(
        public nombre: string,
        public telefono: number,
        public email: string,
        public tipoDocumento: string,
        public numeroDocumento: string,
        public estado?: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public direccion?: string
    ) {}
}
