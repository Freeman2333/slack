import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
  body: string;
}

const Renderer = ({ body }: RendererProps) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
    });

    quill.enable(false);

    const contents = JSON.parse(body);
    quill.setContents(contents);

    const isEmpty = quill.getText().replace("/s*/g", "").trim().length === 0;
    setIsEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [body]);

  if (isEmpty) return null;

  return (
    <div>
      <div ref={containerRef} className="ql-editor ql-renderer" />
    </div>
  );
};

export default Renderer;
