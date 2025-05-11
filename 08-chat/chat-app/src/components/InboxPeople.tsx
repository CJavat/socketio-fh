import { Searchbox } from "./Searchbox";
import { Sidebar } from "./Sidebar";

export const InboxPeople = () => {
  return (
    <div className="inbox_people">
      {/* <!-- Searchbox inicio --> */}
      <Searchbox />
      {/* <!-- Searchbox Fin --> */}

      {/* <!-- Sidebar inicio --> */}
      <Sidebar />
      {/* <!-- Sidebar Fin --> */}
    </div>
  );
};
