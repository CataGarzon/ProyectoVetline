// cliente.ts

export interface Cliente {
    _id: number;           // Identificador único del cliente (solo lectura)
    nombre: string;        // Nombre del cliente
    direccion: string;     // Dirección del cliente
    telefono: number;      // Número de teléfono del cliente
    email: string;         // Dirección de correo electrónico del cliente
    tipoDocumento: string; // Tipo de documento del cliente (ej. Pasaporte, DNI)
    numeroDocumento: string;// Número de documento del cliente
    estado: boolean;       // Estado del cliente (activo o inactivo)
}
