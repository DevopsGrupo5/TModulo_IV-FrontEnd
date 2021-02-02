import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculo10pComponent } from './calculo10p.component';

describe('Calculo10pComponent', () => {
  let component: Calculo10pComponent;
  let fixture: ComponentFixture<Calculo10pComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculo10pComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculo10pComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
