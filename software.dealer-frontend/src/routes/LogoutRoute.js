import React, { useState } from "react";

import axios from "axios";

function Logout() {
  React.useEffect(() => {
    document.title =
      "software.dealer - Die beste software fuer die besten Preise";

    localStorage.removeItem("access_token");

    window.location.href = "/login";
  }, []);
  return (
    <div>
      <h1>Logging u out...</h1>
    </div>
  );
}

export default Logout;
