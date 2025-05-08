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
      const agents = await getInfoApi();
      this.render();
      //this.addEventListener();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    this.shadowRoot!.innerHTML = `
     
  `;
  }
}

export default CardsContainer;
