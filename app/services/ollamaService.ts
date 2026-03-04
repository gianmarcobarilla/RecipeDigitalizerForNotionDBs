import ollama from "ollama/browser";

export async function extractTextFromImage(base64: string): Promise<string> {
  console.log("Extracting text from image using Ollama...");
  const response = await ollama.chat({
    model: "qwen3.5:latest",
    messages: [
      {
        role: "user",
        content:
          "Extract all text from this image. Divide text into: title, ingredients, description, instructions and tips. ",
        images: [base64],
      },
    ],
  });
  console.log(response.message.content);
  return response.message.content;
}
