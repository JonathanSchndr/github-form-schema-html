export interface Options {
  yml: string
}

export interface Form {
  type: 'markdown' | 'textarea' | 'input' | 'dropdown' | 'checkboxes';
  id?: string;
  attributes: MarkdownAttributes | TextareaAttributes | InputAttributes | DropdownAttributes | CheckboxesAttributes;
  validations?: TextareaValidations | InputValidations | DropdownValidations;
}

export interface MarkdownAttributes {
  value: string;
}

export interface TextareaAttributes {
  label: string;
  description?: string;
  placeholder?: string;
  value?: string;
  render?: string;
}

export interface TextareaValidations {
  required?: boolean;
}

export interface InputAttributes {
  label: string;
  description?: string;
  placeholder?: string;
  value?: string;
}

export interface InputValidations {
  required?: boolean;
}

export interface DropdownAttributes {
  label: string;
  description?: string;
  multiple?: boolean;
  options: { label: string }[];
}

export interface DropdownValidations {
  required?: boolean;
}

export interface CheckboxesAttributes {
  label: string;
  description?: string;
  options: { label: string, required?: boolean }[];
}
