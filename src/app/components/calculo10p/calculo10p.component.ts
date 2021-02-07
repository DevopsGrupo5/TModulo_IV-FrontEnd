import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import {ErrorStateMatcher} from '@angular/material/core';


import { DiezppService } from './service/diezpp.service';
import { Diezpp } from './service/diezpp';

@Component({
  selector: 'app-calculo10p',
  templateUrl: './calculo10p.component.html',
  styleUrls: ['./calculo10p.component.less']
})
export class Calculo10pComponent implements OnInit {

  MyForm1 = NgForm;
  fcalculoDzpp!: FormGroup;

  isAdd = true;
  diezpp: any = {
    userid: 'string',
    id: '',
    title: '',
    completed: true
  };
   calculos:any;

  constructor(private diezppService: DiezppService,
              private fb: FormBuilder
              ) {
                this.diezpp = new MatTableDataSource();
               }

  ngOnInit(): void {

    this.fcalculoDzpp = this.fb.group({
      SaldoAhorrado: [],
      Sueldo: [],

      crt_resultados: this.fb.array([this.fb.group({
        asaldoAhorrado: [''],
        asueldo: [''],
        diezpp: [''],
        saldoRestante: [''],
        Impuesto: ['']
      })])

    });
  }


  // tslint:disable-next-line:typedef
  get getResultado_conf() {
    return this.fcalculoDzpp.get('crt_resultados') as FormArray;
  }

  getAllTask(sueldo:number,ahorro:number): any {
    this.diezppService.getAllTask(sueldo,ahorro).subscribe((res: any) => {
      this.diezpp = res;
      console.log('diezpp: ', this.diezpp);
    },
     // console.error(err)
    );
  }

  traeResultados(formValue: any): any {
  
    this.diezppService.getAllTask(formValue.Sueldo,formValue.SaldoAhorrado).subscribe((res: any) => {
      this.calculos = res;
      
       
      this.add_CtrlResultados(formValue.Sueldo,formValue.SaldoAhorrado);
    },
     // console.error(err)
    );
  }

  add_CtrlResultados(sueldo:number,saldo:number): any {

   
    // tslint:disable-next-line:no-string-literal
    const control:any = this.fcalculoDzpp.controls['crt_resultados'] as FormArray;
    let saldo_restante=parseInt(this.calculos.saldo)-parseInt(this.calculos.impuesto);

    const miSaldo: string = Intl.NumberFormat('de-DE').format(saldo);
    const miSueldo: string = Intl.NumberFormat('de-DE').format(sueldo);
    console.log('nombre: ', miSaldo, miSueldo);
    // tslint:disable-next-line:no-string-literal


    if (this.isAdd) {
      this.fcalculoDzpp = this.fb.group({
        SaldoAhorrado: [''],
        Sueldo: [''],
     
        crt_resultados: this.fb.array([this.fb.group({

          asaldoAhorrado: [this.calculos.saldo],
          asueldo: [this.calculos.sueldo],
          diezpp: [this.calculos.dxc, {disabled: false}],
          saldoRestante: [saldo_restante, {disabled: false}],
          Impuesto: [this.calculos.impuesto, {disabled: false}],

        

        })])
       });

  } else {
      control.push(this.fb.group({

        asaldoAhorrado: [this.calculos.saldo],
        asueldo: [this.calculos.sueldo],

        diezpp: [0, {disabled: false}],
        saldoRestante: [0, {disabled: false}],
        Impuesto: [0, {disabled: false}],
      }));
    }

    this.isAdd = false;
  }

  validaNumericos(event: any): boolean {
    if (event.charCode >= 48 && event.charCode <= 57)
    {
      return true;
     }else {
       return false;
     }
  }

}
