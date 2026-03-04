import { extractTextFromImage } from "~/services/ollamaService";
import type { Route } from "./+types/api.extract-text";

export async function action({ request }: Route.ActionArgs) {
  // Check HTTP Method
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const formData = await request.formData();
  const imageFile = formData.get("image") as File;

  const base64 = await fileToBase64(imageFile);
  const text = await extractTextFromImage(base64);

  return new Response(JSON.stringify({ success: true, text }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);

  let binary = "";
  for (let i = 0; i < byteArray.byteLength; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }

  return btoa(binary);
}
