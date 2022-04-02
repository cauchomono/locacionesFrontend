import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocacionesService } from './services/locaciones/locaciones.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'locacionesFrontend';

  public locacionForm!: FormGroup;
  public locaciones: any;

  constructor(
    public formBuilder: FormBuilder,
    public locacionesService: LocacionesService,
    private toastr: ToastrService,
    
  ) {}

  showFailureSave() {
    this.toastr.error(
      'Error al guardar, revise que los campos esten completos','Error!'
    );
  }

  ngOnInit(): void {
    this.locacionForm = this.formBuilder.group({
      name: ['', Validators.required],
      area_m2: ['', Validators.required],
      parentLocation: ['', Validators.required],
    });

    this.locacionesService.getAllLocaciones().subscribe(
      (response: any) => {
        this.locaciones = response;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  public saveForm() {
    this.locacionesService.saveLocacion(this.locacionForm.value).subscribe(
      (response: any) => {
        window.location.reload();
        this.locacionForm.reset();
      },
      (err: any) => {
        this.showFailureSave();
        console.error(err);
      }
    );
  }
}
