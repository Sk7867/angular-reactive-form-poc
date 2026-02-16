import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';

import { FORM_FIELDS } from './form.config';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FloatLabelModule,
    DrawerModule,
    SelectModule
  ],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  userForm: FormGroup;
  visible: boolean = false;
  formFields = FORM_FIELDS;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      role: [{ name: 'User', code: 'User' }, Validators.required],
      process: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }

  get role() { return this.userForm.get('role'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
}
