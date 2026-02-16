import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';

import { FORM_FIELDS, AZURE_FIELDS, FormFieldConfig } from './form.config';

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
export class ReactiveForm implements OnInit {
  userForm: FormGroup;
  visible: boolean = false;
  formFields = FORM_FIELDS;
  dynamicFields: FormFieldConfig[] = [];
  connectionCount: number = 1;

  get allFields(): FormFieldConfig[] {
    return [...this.formFields, ...this.dynamicFields];
  }

  get showNewConnectionButton(): boolean {
    return this.dynamicFields.length > 0;
  }

  get fieldGroups(): Array<{ groupName?: string, fields: FormFieldConfig[] }> {
    const groups: Array<{ groupName?: string, fields: FormFieldConfig[] }> = [];
    const fields = this.allFields;

    let currentGroup: { groupName?: string, fields: FormFieldConfig[] } | null = null;

    for (const field of fields) {
      if (field.groupName) {
        if (currentGroup && currentGroup.groupName === field.groupName) {
          currentGroup.fields.push(field);
        } else {
          if (currentGroup) groups.push(currentGroup);
          currentGroup = { groupName: field.groupName, fields: [field] };
        }
      } else {
        if (currentGroup) {
          groups.push(currentGroup);
          currentGroup = null;
        }
        groups.push({ fields: [field] });
      }
    }

    if (currentGroup) groups.push(currentGroup);

    return groups;
  }

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

  ngOnInit() {
    // Subscribe to process field changes
    this.userForm.get('process')?.valueChanges.subscribe(value => {
      const selectedProcess = value?.code || value;

      if (selectedProcess === 'Azure') {
        // Add Azure fields if not already present
        if (this.dynamicFields.length === 0) {
          this.dynamicFields = [...AZURE_FIELDS];

          // Add form controls for Azure fields
          AZURE_FIELDS.forEach(field => {
            this.userForm.addControl(
              field.key,
              this.fb.control('', field.validators || [])
            );
          });
        }
      } else {
        // Remove Azure fields
        if (this.dynamicFields.length > 0) {
          AZURE_FIELDS.forEach(field => {
            this.userForm.removeControl(field.key);
          });
          this.dynamicFields = [];
          this.connectionCount = 1; // Reset connection count
        }
      }
    });
  }

  addConnection() {
    this.connectionCount++;
    const connectionName = `Connection ${this.connectionCount}`;

    // Create new field configs for this connection
    const newFields: FormFieldConfig[] = [
      {
        key: `azureId${this.connectionCount}`,
        label: 'Id',
        type: 'text',
        required: true,
        placeholder: 'Enter Azure Id',
        validators: [Validators.required],
        groupName: connectionName
      },
      {
        key: `azureKey${this.connectionCount}`,
        label: 'Key',
        type: 'text',
        required: true,
        placeholder: 'Enter Azure Key',
        validators: [Validators.required],
        groupName: connectionName
      }
    ];

    // Add to dynamic fields
    this.dynamicFields = [...this.dynamicFields, ...newFields];

    // Add form controls
    newFields.forEach(field => {
      this.userForm.addControl(
        field.key,
        this.fb.control('', field.validators || [])
      );
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
