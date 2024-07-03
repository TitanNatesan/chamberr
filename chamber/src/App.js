import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Membershipform from "./Pages/Client/NewMember/Membershipform";
import Payment from "./Pages/Client/NewMember/Payment";
import Existing from "./Pages/Client/ExistingMember/Existing";
import Submittedform from "./Pages/Client/NewMember/Submittedform";
import Submittedpayment from "./Pages/Client/NewMember/Submittedpayment";
import Login from "./Pages/Client/ExistingMember/Login";

import Home from "./Pages/Admin/Home";
import Analysis from "./Pages/Admin/Analysis";
import LoginAdmin from "./Pages/Admin/LoginAdmin";
import Allmembers from "./Pages/Admin/Allmembers";
import Now from "./Pages/Client/NewMember/now";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Membershipform />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/updateform" element={<Existing />} />
          <Route path="/submitted" element={<Submittedform />} />

          <Route path="/login" element={<Login />} />
          <Route path="/submittedpayment" element={<Submittedpayment />} />
          <Route path="/now" element={<Now />} />

          {/* Admin */}

          <Route path="/adminhome" element={<Home />} />
          <Route path="/allmembers" element={<Allmembers />} />
          <Route path="/adminlogin" element={<LoginAdmin />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
