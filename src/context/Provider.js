import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import planetContext from './planetContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [searchPlanet, setSearchPlanet] = useState('');
  const [columnFilter, setcolumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

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

  const handlePopulation = ({ target }) => {
    setcolumnFilter(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleValueFilter = ({ target }) => {
    setValueFilter(target.value);
  };

  const handleClickFilter = useCallback(() => {
    if (comparison === 'maior que') {
      const newPlanet = planets
        ?.filter((planet) => Number(planet[columnFilter]) > Number(valueFilter));
      setPlanets(newPlanet);
    }
    if (comparison === 'menor que') {
      const newPlanet = planets
        ?.filter((planet) => Number(planet[columnFilter]) < Number(valueFilter));
      setPlanets(newPlanet);
    }
    if (comparison === 'igual a') {
      const newPlanet = planets
        ?.filter((planet) => Number(planet[columnFilter]) === Number(valueFilter));
      setPlanets(newPlanet);
    }
  }, [columnFilter, comparison, valueFilter, planets]);

  const valuePlanets = React
    .useMemo(() => ({ planets,
      handleInput,
      searchPlanet,
      columnFilter,
      handlePopulation,
      handleComparison,
      valueFilter,
      handleValueFilter,
      handleClickFilter }), [planets,
      searchPlanet, columnFilter, valueFilter, handleClickFilter]);

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
