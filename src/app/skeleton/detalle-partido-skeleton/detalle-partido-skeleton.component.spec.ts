import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePartidoSkeletonComponent } from './detalle-partido-skeleton.component';

describe('DetallePartidoSkeletonComponent', () => {
  let component: DetallePartidoSkeletonComponent;
  let fixture: ComponentFixture<DetallePartidoSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePartidoSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePartidoSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
