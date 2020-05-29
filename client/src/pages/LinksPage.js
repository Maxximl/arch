import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from '../components/LinksList';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setLinks(fetched);
      console.log(fetched);
    } catch (error) {}
  }, [request, auth.token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) return <Loader />;
  return (
    <div>
        <LinksList links={links} />
    </div>
  );
};

export default LinksPage;
