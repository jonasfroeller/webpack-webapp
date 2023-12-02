// https://lit.dev/docs/tools/adding-lit/

import {LitElement, html} from 'lit';

class CopyrightNotice extends LitElement {
  company: unknown;

  static override get properties() {
    return {
      company: {type: String},
    };
  }

  override render() {
    return html`© ${new Date().getFullYear()} ${this.company}`;
  }
}

customElements.define('copyright-notice', CopyrightNotice);
