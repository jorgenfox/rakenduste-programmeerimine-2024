import "./App.css";
import Cats from "./components/Cats";
import Todos from "./components/Todos";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Cats />
        <Todos />
      </UserProvider>
    </>
  );
}

export default App;
