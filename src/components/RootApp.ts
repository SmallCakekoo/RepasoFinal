import { store } from "../flux/Store";
class RootApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.load();
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <style>
    display: 
     grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 2rem;
    </style>
    <div class="container">
    <cards-container>
    </cards-container>

    <favorite-agents>
    </favorite-agents>
    </div>
`;
  }
}

export default RootApp;
