import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import planetContext from './planetContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [searchPlanet, setSearchPlanet] = useState('');

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endpoint);
      const result = await response.json();
      const { results } = result;
      const filteredAPI = results
        .filter((obj) => (Object.keys(obj) !== 'residents' ? delete obj.residents : obj));
      setPlanets(filteredAPI);
    };
    getAPI();
  }, []);

  const handleInput = ({ target }) => {
    setSearchPlanet(target.value);
  };

  const valuePlanets = React
    .useMemo(() => ({ planets, handleInput, searchPlanet }), [planets, searchPlanet]);

  return (
    <planetContext.Provider value={ valuePlanets }>
      {children}
    </planetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
