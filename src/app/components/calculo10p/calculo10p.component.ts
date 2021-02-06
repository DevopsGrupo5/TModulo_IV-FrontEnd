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

  getAllTask(): any {
    this.diezppService.getAllTask().subscribe((res: any) => {
      this.diezpp = res;
      console.log('diezpp: ', this.diezpp);
    },
     // console.error(err)
    );
  }

  traeResultados(formValue: any): any {

    this.diezppService.getAllTask().subscribe((res: any) => {
      this.diezpp = res;
      console.log('diezpp: ', this.diezpp);
      this.add_CtrlResultados(formValue.SaldoAhorrado, formValue.Sueldo, );
    },
     // console.error(err)
    );
  }

  add_CtrlResultados(saldo: number, sueldo: number): any {

    console.log('nombre: ', saldo, sueldo);
    const miSaldo: string = Intl.NumberFormat('de-DE').format(saldo);
    const miSueldo: string = Intl.NumberFormat('de-DE').format(sueldo);
    console.log('nombre: ', miSaldo, miSueldo);
    // tslint:disable-next-line:no-string-literal
    const control = this.fcalculoDzpp.controls['crt_resultados'] as FormArray;
    if (this.isAdd) {
      this.fcalculoDzpp = this.fb.group({
        SaldoAhorrado: [''],
        Sueldo: [''],

        crt_resultados: this.fb.array([this.fb.group({
          asaldoAhorrado: [miSaldo],
          asueldo: [miSueldo],
          diezpp: [0, {disabled: false}],
          saldoRestante: [0, {disabled: false}],
          Impuesto: [0, {disabled: false}],
        })])
       });

  } else {
      control.push(this.fb.group({
        asaldoAhorrado: [miSaldo],
        asueldo: [miSueldo],
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
