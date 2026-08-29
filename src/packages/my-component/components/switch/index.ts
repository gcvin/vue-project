import { MyComponent } from '@/packages/my-component/utils'

export class MySwitch extends MyComponent {
  static observedAttributes = ['model-value']
  state = { checked: false }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'model-value') {
      this.state.checked = newValue === 'true'
    }
  }

  handleClick = () => {
    this.state.checked = !this.state.checked
    const changeEvent = new CustomEvent('change', {
      detail: { checked: this.state.checked },
    })
    this.dispatchEvent(changeEvent)
  }

  render() {
    return this.html`
      <style>
        .switch {
          display: inline-flex;
        }
        .switch-core {
          width: 50px;
          height: 25px;
          border-radius: 15px;
          background-color: #ccc;
          margin: 0 10px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .switch-core.checked {
          background-color: #4cd964;
        }
        .switch-action {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: left 0.3s;
        }
        .switch-core.checked .switch-action {
          left: 27px;
        }
      </style>
      <div class="switch">
        <span class="left">
          <slot name="left"></slot>
        </span>
        <div class="switch-core${this.state.checked ? ' checked' : ''}" @click=${this.handleClick}>
          <div class="switch-action"></div>
        </div>
        <span class="right">
          <slot name="right"></slot>
        </span>
      </div>
    `
  }
}

customElements.define('my-switch', MySwitch)
