import { Products } from "../types/ProductTypes";

async function GetInfoApi(): Promise<Products[]> {
  try {
    const response = await fetch(
      "https://80b7-2800-e2-777f-f72a-8520-a2a8-8aba-a140.ngrok-free.app/products?studentName=Sary",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Products[] = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default GetInfoApi;

import { Products } from "../types/ProductTypes";

async function PostInfoApi(
  productData: Omit<Products, "id">
): Promise<Products> {
  try {
    const response = await fetch(
      "https://80b7-2800-e2-777f-f72a-8520-a2a8-8aba-a140.ngrok-free.app/products?studentName=Sary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          product: productData.product,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          image: productData.image,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Products = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar producto:", error);
    throw error;
  }
}

export default PostInfoApi;
