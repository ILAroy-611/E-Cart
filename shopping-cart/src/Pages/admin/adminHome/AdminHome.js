import BasicCard from "../../../Components/card/BasicCard";
import { adminWorkItems } from "./helper";
import "./adminhome.css";

function AdminHome() {
  return (
    <div className="adminhome-container">
      <div className="admin-work-items flex">
        {adminWorkItems.map((tasks) => {
          return (
            <BasicCard
              key={tasks.card_title}
              card_content={tasks.card_content}
              card_title={tasks.card_title}
              path={tasks.path}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AdminHome;
