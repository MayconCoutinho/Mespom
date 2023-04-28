import React, { useState, useEffect } from "react";

export const Loading = (loadingTrue, loadingFalse) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return <div>{loading && loading ? loadingTrue : loadingFalse}</div>;
};
