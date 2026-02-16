import { Validators } from '@angular/forms';

export interface FormFieldConfig {
    key: string;
    label: string;
    placeholder?: string;
    type: 'text' | 'password' | 'email' | 'select';
    required: boolean;
    options?: any[]; // For select inputs
    optionLabel?: string; // Property to display for options
    validators?: any[];
    defaultValue?: any;
}

export const FORM_FIELDS: FormFieldConfig[] = [
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        placeholder: 'Select a Role',
        defaultValue: { name: 'User', code: 'User' },
        options: [
            { name: 'Admin', code: 'Admin' },
            { name: 'Business', code: 'Business' },
            { name: 'User', code: 'User' }
        ],
        optionLabel: 'name',
        validators: [Validators.required]
    },
    {
        key: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your first name',
        validators: [Validators.required]
    },
    {
        key: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: false,
        placeholder: 'Enter your last name'
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter your email',
        validators: [Validators.required, Validators.email]
    },
    {
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Enter your password',
        validators: [Validators.required]
    }
];
