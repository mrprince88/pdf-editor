import { useEffect, useRef, SetStateAction } from "react";
import PSPDFKit, { Instance } from "pspdfkit";

export default function PdfViewerComponent(props: {
  document: ArrayBuffer | null;
  setInstance: SetStateAction<Instance | null>;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    PSPDFKit.load({
      container: containerRef.current,
      document: props.document ?? new ArrayBuffer(0),
      baseUrl: `${window.location.protocol}//${window.location.host}/public/`,
    }).then((instance) => {
      props.setInstance(instance);
    });

    return () => {
      PSPDFKit.unload(containerRef.current);
    };
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
