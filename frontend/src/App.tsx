import PdfViewerComponent from "./components/Editor";
import { useState } from "react";
import axios from "axios";
import { Instance } from "pspdfkit";

function App() {
  const [document, setDocument] = useState<ArrayBuffer | null>(null);
  const [instance, setInstance] = useState<Instance | null>(null);

  const getPdf = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`, {
      responseType: "arraybuffer",
    });
    setDocument(response.data);
  };

  const savePdf = async () => {
    const pdf = await instance?.exportPDF();
    if (!pdf) return;
    const form = new FormData();
    const file = new File([pdf], "example.pdf", { type: "application/pdf" });
    form.append("file", file);
    await axios.post(`${import.meta.env.VITE_API_URL}/upload`, form);
    console.log("savePdf");
  };

  return (
    <div className="App">
      <div>
        <button onClick={getPdf}>Load Pdf</button>
        <button onClick={savePdf}>Save Pdf</button>
      </div>
      <div style={{ width: "100vw", height: "100%" }}>
        <PdfViewerComponent document={document} setInstance={setInstance} />
      </div>
    </div>
  );
}

export default App;
