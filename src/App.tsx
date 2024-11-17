import { ActionPanel } from "./ui/components/action-panel";
import { CanvasWorkArea } from "./ui/components/work-area";
import { RootLayout } from "./ui/layouts/root";

function App() {
  return <RootLayout panel={<ActionPanel />} workArea={<CanvasWorkArea />} />;
}

export default App;
