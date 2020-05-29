import React, { useCallback, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

const DetailPage = () => {
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const auth = useContext(AuthContext);

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [linkId, request, auth.token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if(loading) return <Loader/>
  return (
    <div>
      <>
        { !loading && link && <LinkCard link={link}/> }
      </>
      
    </div>
  );
};

export default DetailPage;