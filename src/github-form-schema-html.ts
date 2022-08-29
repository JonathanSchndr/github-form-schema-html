import yaml from 'js-yaml';
import md from 'markdown-it';

import {
  Options, Form,
  MarkdownAttributes,
  TextareaAttributes,
  TextareaValidations,
  InputAttributes,
  InputValidations,
  DropdownAttributes,
  DropdownValidations,
  CheckboxesAttributes,
} from './github-form-schema-html.d';

export class GitHubFormSchemaHtml {
  options: Options;
  #elementRender: {
    markdown: (...args: any[]) => string;
    textarea: (...args: any[]) => string;
    input: (...args: any[]) => string;
    dropdown: (...args: any[]) => string;
    checkboxes: (...args: any[]) => string;
  };

  constructor(options: Options) {
    this.options = options;

    this.#elementRender = {
      markdown(attributes: MarkdownAttributes) {
        return `<div class="markdown-body">${md().render(attributes.value)}</div>`
      },
      textarea(attributes: TextareaAttributes, validations: TextareaValidations) {
        return `
          <div class="form-group">
            <div class="form-group-header">
              <label>${attributes.label}${validations.required ? ' <span>*</span>' : '' }</label>
              <p class="note">${attributes.description}</p>
            </div>
            <div class="form-group-body">
              <textarea class="form-control" placeholder="${attributes.placeholder}" ${validations.required ? 'required' : '' }>${attributes.value}</textarea>
            </div>
          </div>
        `
      },
      input(attributes: InputAttributes, validations: InputValidations) {
        return `
          <div class="form-group">
            <div class="form-group-header">
              <label>${attributes.label}${validations.required ? ' <span>*</span>' : '' }</label>
              <p class="note">${attributes.description}</p>
            </div>
            <div class="form-group-body">
              <input class="form-control" type="text" value="${attributes.value}" placeholder="${attributes.placeholder}" aria-label="${attributes.label}" ${validations.required ? 'required' : '' } />
            </div>
          </div>
        `
      },
      dropdown(attributes: DropdownAttributes, validations: DropdownValidations) {
        return `
          <div class="form-group">
            <div class="form-group-header">
              <label>${attributes.label}${validations.required ? ' <span>*</span>' : '' }</label>
              <p class="note">${attributes.description}</p>
            </div>
            <div class="form-group-body">
              <select class="form-control" ${attributes.multiple ? 'multiple' : ''} ${validations.required ? 'required' : ''}>
                ${attributes.options.map(option => `<option value="${option.label}">${option.label}</option>`).join('')}
              </select>
            </div>
          </div>
        `
      },
      checkboxes(attributes: CheckboxesAttributes) {
        return `
          <div class="form-group">
            <div class="form-group-header">
              <label>${attributes.label}</label>
              <p class="note">${attributes.description}</p>
            </div>
            ${attributes.options.map(option => `<label><input type="checkbox" ${option.required ? 'required' : ''} />${option.label}</label>`).join('')}
          </div>
        `
      }
    }
  }

  render (): string {
    const ymlParsed = yaml.load(this.options.yml) as Form[];

    let htmlExport: string = '';
    for (const element of ymlParsed) {
      htmlExport += this.#elementRender[element.type](element.attributes, element?.validations);
    }

    return htmlExport;
  }
}
