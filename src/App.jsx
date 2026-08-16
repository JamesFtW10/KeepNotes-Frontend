import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Trash from "./pages/Trash";
import EditLabels from "./pages/EditLabels";
import Archive from "./pages/Archive";
import Reminders from "./pages/Reminders";
import ClientLayout from "./shared/components/Layout/ClientLayout";
import LandingPageLayout from "./shared/components/Layout/LandingPageLayout";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import AuthGuard from "./shared/components/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AuthGuard />}>
        <Route path="/app" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="trash" element={<Trash />} />
          <Route path="edit-labels" element={<EditLabels />} />
          <Route path="archive" element={<Archive />} />
          <Route path="reminders" element={<Reminders />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
