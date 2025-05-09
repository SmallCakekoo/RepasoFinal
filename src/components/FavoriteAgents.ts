import { store } from "../flux/Store";
import { Agent } from "../Types/ApiTypes";
import getInfoApi from "../services/GetInfoApi";

class FavoriteAgents extends HTMLElement {
  private agents: Agent[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      this.agents = await getInfoApi();
      store.subscribe(this.handleStoreChange.bind(this));
      this.render();
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  private handleStoreChange() {
    this.render();
  }

  render() {
    const likedAgents = this.agents.filter((agent) =>
      store.getState().likedAgents.includes(agent.uuid)
    );

    this.shadowRoot!.innerHTML = `
      <style>
        .favorites-container {
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .favorites-container h2 {
          color: #333;
          margin-bottom: 1rem;
        }
        .favorites-list {
          list-style: none;
          padding: 0;
        }
        .favorites-list li {
          padding: 0.5rem;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .favorites-list li img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .favorites-list li:last-child {
          border-bottom: none;
        }
      </style>
      <div class="favorites-container">
        <h2>Agentes Favoritos</h2>
        <ul class="favorites-list">
          ${
            likedAgents.length > 0
              ? likedAgents
                  .map(
                    (agent) => `
                <li>
                  <img src="${agent.displayIcon}" alt="${agent.displayName}">
                  ${agent.displayName}
                </li>
              `
                  )
                  .join("")
              : "<li>No hay agentes favoritos aún</li>"
          }
        </ul>
      </div>
    `;
  }
}

export default FavoriteAgents;
