import { Agent } from "../Types/ApiTypes";

async function getInfoApi(): Promise<Agent[]> {
  try {
    const response = await fetch("https://valorant-api.com/v1/agents", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Agent[] = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getInfoApi;
