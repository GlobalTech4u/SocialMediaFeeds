import AppRoutes from "../routes";
import { AuthProvider } from "../components/authContext/AuthContext";

import "./App.css";

function App() {
  return (
    <div className={"app"}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
