/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

    } catch (error) {

    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>这玩意是主页</h1>
    </Layout>
  );
}

export default Home;
