(() => {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      :host {
        display: flex;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      .name {
        font-weight: bold;
        font-size: 20px;
      }
      .email {
        font-size: 14px;
        color: #343434;
      }
      .button {
        margin-top: 10px;
        background-color: #ccc;
        border: none;
        color: #333;
        width: 80px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
      }
      .button.active {
        background-color: orange;
        color: white;
      }
    </style>
    <img alt="" class="image">
    <div class="container">
    <div class="name"></div>
    <div class="email"></div>
    <button class="button"><slot name="button-text"></slot></button>
    </div>
    `;
    class UserCard extends HTMLElement {
        constructor() {
            super();

            this.shadow = this.attachShadow({
                mode: 'closed'
            });
            const content = document.importNode(template.content, true);
            this.shadow.appendChild(content);

            this.$button = this.shadow.querySelector(".button");
            this.$button.addEventListener("click", this.btnClick.bind(this));
        }

        // 当自定义元素首次被插入文档DOM时，被调用
        connectedCallback() {
            console.log('connectedCallback');
        }

        // 当自定义元素从文档DOM中删除时，被调用
        disconnectedCallback() {
            console.log('disconnectedCallback');
        }

        // 当自定义元素被移动到新文档时被调用
        adoptedCallback() {
            console.log('adoptedCallback');
        }

        // 需要监听的属性
        static get observedAttributes() {
            return ['image', 'name', 'email'];
        }

        // 当监听的属性被增加、移除或更改时被调用
        attributeChangedCallback(name, oldValue, newValue) {
            this[name]?.(newValue);
        }

        btnClick() {
            if (this.$button.className.includes('active')) {
                this.$button.classList.remove('active');
                this.$button.innerText = "关注";
            } else {
                this.$button.classList.add('active');
                this.$button.innerText = "取消关注";
            }
        }

        image(val) {
            this.shadow.querySelector(".image").src = val;
        }

        name(val) {
            this.shadow.querySelector(".name").innerText = val;
        }

        email(val) {
            this.shadow.querySelector(".email").innerText = val;
        }
    }
    customElements.define('user-card', UserCard);
})();