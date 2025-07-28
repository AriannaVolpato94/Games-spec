import Routing  from "./routes/Routing";
import SessionProvider from "../src/context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";

export default function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}