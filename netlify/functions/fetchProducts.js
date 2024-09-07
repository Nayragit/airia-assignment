const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const apiUrl = "https://cdn.drcode.ai/interview-materials/products.json";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: "Error fetching products" };
  }
};
