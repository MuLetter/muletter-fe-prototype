import { Route, Routes } from "react-router-dom";
import RootPage from "./pages";
import MailBoxPage from "./pages/MailBoxPage";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<MainPage />} />
          <Route path="mailbox/*" element={<MailBoxPage />} />
          <Route path="map" element={<MapPage />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
