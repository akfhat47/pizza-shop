import AddOrder from "./components/AddOrder";
import MainTable from "./components/MainTable";
import Stages from "./components/Stages";
import { useConsole } from "./hooks/ConsoleStateHook";
import { formatTime } from "./utils";

function App() {
  const console = useConsole();
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <AddOrder />
      <Stages />
      <MainTable />
    </div>
  );
}

export default App;
