export class TarjetaCredito{
    id?:string; // ?: indica que es un atributo opcional
    titular: string;
    numeroTarjeta:string;
    fechaExpiracion:string;
    ccv:number;
    fechaCreacion:Date;
    fechaActualizacion: Date;

    constructor(titular:string, numeroTarjeta:string, fechaExpiracion:string, ccv:number){
        this.titular=titular;
        this.numeroTarjeta= numeroTarjeta;
        this.fechaExpiracion=fechaExpiracion;
        this.ccv=ccv;
        this.fechaCreacion= new Date();
        this.fechaActualizacion= new Date();
    }
}