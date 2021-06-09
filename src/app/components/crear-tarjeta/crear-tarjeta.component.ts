import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  form: FormGroup;
  loading= false;
  titulo="Agregar tarjeta";
  id: string|undefined;

  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService,
              private toastr: ToastrService) {

    this.form = fb.group({
      titular: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      ccv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void { 
    this._tarjetaService.getTarjetaEdit().subscribe(data=>{
      this.id= data.id;
      this.titulo="editar tarjeta";
      this.form.patchValue({
        titular:data.titular,
        numeroTarjeta:data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        ccv:data.ccv
      });
    })
   }

  guardarTarjeta( ){  
    
    if(this.id === undefined){
      //Crear nueva tarjeta
      this.agregarTarjeta();
    }else{
      //Editar nueva tarjeta
      this.editarTarjeta(this.id);
    }
    
  }
  editarTarjeta(id: string) {
    const TARJETA: any={
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      ccv: this.form.value.ccv,
      //fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    this.loading=true;
    this._tarjetaService.editarTarjeta(id, TARJETA).then( () => {
      this.loading=false;
      this.titulo="crear tarjeta";
      this.form.reset();
      this.id= undefined;
      this.toastr.info("Tarjeta actualizada","Registro de tarjetas");
    },error =>{
      console.log(error);
    }  );
  }
  
  agregarTarjeta(){
    const TARJETA: TarjetaCredito={
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      ccv: this.form.value.ccv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
  
    this.loading=true;
  
    this._tarjetaService.guardarTarjeta(TARJETA).then(()=> {
      this.loading=false;
      this.toastr.success("Tarjeta registrada correctamente","Registro de tarjeta");
      this.form.reset();
    },error=>{
      this.loading=false;
      this.toastr.error("Ooops...ocurrió un error",error);
      console.log(error);
    });

  }

}
