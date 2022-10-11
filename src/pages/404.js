import React, { useEffect } from "react";
import { navigate } from "gatsby";

const NotFoundPage = () => {
  useEffect(() => {
    navigate("/");
  });
  return <>Not found.</>;
};

export default NotFoundPage;
