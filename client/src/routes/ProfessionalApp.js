import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import FindJobsPage from "../pages/Professional/FindJobsPage";
import ComponentIndex from "../components/ComponentIndex";
import UpdatePersonalProfile from "../pages/Professional/UpdateProfile";

// Components
import Sidebar from "../components/Utilities/SideBar";

function ProfessionalApp() {
  return (
    <div className="App">
      <Sidebar barRole="professional" />
      <Routes>
        <Route path="/components" element={<ComponentIndex />} />
        <Route path="*" element={<NotFoundPage />}></Route>
        {/* Professional Route Start Here ------------------------------------ */}
        <Route path="/" element={<FindJobsPage />} />
        <Route path="/findjobs" element={<FindJobsPage />} />
        <Route path="/applications" element={<NotFoundPage />} />
        <Route path="/following" element={<NotFoundPage />} />
        <Route path="/updateprofile" element={<UpdatePersonalProfile />} />
      </Routes>
    </div>
  );
}

export default ProfessionalApp;
