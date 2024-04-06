import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMascotaComponent } from './asignar-mascota.component';

describe('AsignarMascotaComponent', () => {
  let component: AsignarMascotaComponent;
  let fixture: ComponentFixture<AsignarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarMascotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
