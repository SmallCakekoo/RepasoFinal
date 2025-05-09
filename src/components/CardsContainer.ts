import { Agent } from "../Types/ApiTypes";
import getInfoApi from "../services/GetInfoApi";

class CardsContainer extends HTMLElement {
  private agents: Agent[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const data = await getInfoApi();
      console.log("Datos recibidos:", data);
      this.agents = Array.isArray(data) ? data : [];
      this.render();
    } catch (error) {
      console.error("Error fetching data:", error);
      this.agents = [];
      this.render();
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
      </style>
      <div class="container">
        ${this.agents
          .map((agent) => {
            const image =
              agent.displayIcon || "https://placehold.co/100x100.png";
            const name = agent.displayName || "Agente desconocido";
            const description = agent.description || "Sin descripción";
            return `
              <cards-agents
                uuid="${agent.uuid}"
                image="${image}" 
                name="${name}"
                description="${description}">
              </cards-agents>
            `;
          })
          .join("")}
      </div>
    `;
  }
}

export default CardsContainer;
