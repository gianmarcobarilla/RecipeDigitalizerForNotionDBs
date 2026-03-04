import { useEffect, useState } from "react";

export const HomePage = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      return data.text;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  useEffect(() => {
    if (!selectedFile) return;

    setLoading(true);
    handleUpload(selectedFile)
      .then((text) => {
        if (text) setResult(text);
      })
      .finally(() => setLoading(false));
  }, [selectedFile]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      {loading && <p>Loading...</p>}
      {result && <p>Result: {result}</p>}
    </div>
  );
};
