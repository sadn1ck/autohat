import { RefCallback, useCallback, useState } from "react";
import { Layer, Stage, Text } from "react-konva";

export const CanvasWorkArea = () => {
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const refCallback: RefCallback<HTMLDivElement> = useCallback((node) => {
    if (node) {
      setDims((prev) => ({ ...prev, width: node.clientWidth, height: node.clientHeight }));
    }
  }, []);

  return (
    <div ref={refCallback} className="w-full h-full rounded-md border border-slate-6">
      <Stage width={dims.width} height={dims.height}>
        <Layer>
          <Text
            draggable
            onDragEnd={(e) => {
              console.log("drag end", e.target.attrs.x, e.target.attrs.y);
            }}
            onClick={(e) => console.log("clicked", e)}
            text="Hello World"
            fill={"white"}
            id="uuid"
          />
        </Layer>
      </Stage>
    </div>
  );
};
