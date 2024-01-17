import CompaignsPage from "./compaigns/card";
import Info from "./compaigns/Info";
import DealTerms from "./compaigns/dealterms";
import Documents from "./compaigns/documents";
import Pitch from "./compaigns/pitch";
import TeamDetails from "./compaigns/teamdetails";
import { useSelector } from "react-redux";
import CloseCard from "./compaigns/closecard";
import CloseInfo from "./compaigns/closeInfo";

const Dashboard = () => {
  const open_available_data = useSelector(
    (state) => state.viewPageData.view_available_data
  );
  const open_closed_data = useSelector(
    (state) => state.viewPageData.view_closed_data
  );

  return (
    <div className="col main">

        <div className="dashboard_jsx"
          style={{
            display:
              open_available_data === true || open_closed_data === true
                ? "none"
                : "",
          }}
        >
          <div style={{ display: open_closed_data === true ? "none" : "" }}>
            <CompaignsPage />
          </div>

          <div style={{ display: open_available_data === true ? "none" : "" }}>
            <CloseCard />
          </div>
        </div>

        <div
          style={{
            display:
              open_available_data === true || open_closed_data === true
                ? ""
                : "none",
          }}
        >
          <div style={{ display: open_closed_data === true ? "none" : "" }}>
            <Info />
          </div>
          <div style={{ display: open_available_data === true ? "none" : "" }}>
            <CloseInfo />
          </div>
          
          <DealTerms />
          <Documents />
          <Pitch />
          <TeamDetails />

        </div>
    </div>
  );
};

export default Dashboard;
