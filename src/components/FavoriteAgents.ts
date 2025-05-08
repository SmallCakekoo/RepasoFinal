class FavoriteAgents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <cards-container>
      </cards-container>
  `;
  }
}

export default FavoriteAgents;
