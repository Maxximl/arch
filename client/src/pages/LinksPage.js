import React, { useEffect, useContext, useCallback, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from '../components/LinksList';
import {connect } from 'react-redux';
import { linksLoaded } from "../redux/actions";

const LinksPage = ({loadLinks}) => {
  const [links2, setLinks] = useState([]);
  setLinks([]);
  console.log(links2);
  
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
     loadLinks(fetched);
      console.log('fetched',fetched);
    } catch (error) {console.error(error)}
  }, [request, auth.token, loadLinks]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) return <Loader />;
  return (
    <div style={{padding: "15px"}}> {/* fix! */}
        <LinksList style={{margin: "15px"}}/>
    </div>
  );
};

const mapStateToProps = ({links}) => {
  return {links}
}
const mapDispatchToProps = dispatch => {
  return {
    loadLinks: (payload) => dispatch(linksLoaded(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksPage);
