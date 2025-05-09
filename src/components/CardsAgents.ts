import { Agent } from "../Types/ApiTypes";
import getInfoApi from "../services/GetInfoApi";
import { store, State } from "../flux/Store";
import { LikeActions } from "../flux/Actions";

class CardsAgents extends HTMLElement {
  private Agent: Agent[] = [];
  private isLiked: boolean = false;
  private likeCount: number = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      this.Agent = await getInfoApi();
      this.render();
      this.setupEventListeners();
      store.subscribe(this.handleStoreChange.bind(this));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  private handleStoreChange(state: State) {
    const agentId = this.getAttribute("uuid");
    if (agentId) {
      this.isLiked = state.likedAgents.includes(agentId);
      this.likeCount = state.likedAgents.filter(
        (id: string) => id === agentId
      ).length;
      this.updateLikeButton();
      this.updateLikeCount();
    }
  }

  private updateLikeButton() {
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      button.textContent = this.isLiked ? "Unlike" : "Like";
      button.style.backgroundColor = this.isLiked ? "#dc3545" : "#007bff";
    }
  }

  private updateLikeCount() {
    const likeCountElement = this.shadowRoot?.querySelector(".like-count");
    if (likeCountElement) {
      likeCountElement.textContent = `Likes: ${this.likeCount}`;
    }
  }

  private setupEventListeners() {
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      button.addEventListener("click", () => {
        const agentId = this.getAttribute("uuid");
        if (agentId) {
          LikeActions.toggleLike(agentId);
        }
      });
    }
  }

  render() {
    const image =
      this.getAttribute("image") || "https://placehold.co/100x100.png";
    const name = this.getAttribute("name") || "Producto desconocido";
    const description = this.getAttribute("description") || "Sin descripción";

    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card img {
          width: 100%;
          height: auto;
          border-radius: 4px;
        }
        .card h2 {
          margin: 0.5rem 0;
        }
        .card button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .card button:hover {
          background-color: #0056b3;
        }
        .like-count {
          margin-top: 0.5rem;
          font-weight: bold;
          color: #666;
        }
      </style>
      <div class="card">
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>${description}</p>
        <button>Like</button>
        <p class="like-count">Likes: ${this.likeCount}</p>
      </div>
    `;
  }
}

export default CardsAgents;
