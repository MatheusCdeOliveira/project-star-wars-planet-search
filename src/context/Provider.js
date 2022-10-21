import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import planetContext from './planetContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState();
  const [searchPlanet, setSearchPlanet] = useState('');
  const [columnFilter, setcolumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [options, setOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endpoint);
      const result = await response.json();
      const { results } = result;
      // const filteredAPI = results
      //   .filter((obj) => (Object.keys(obj) !== 'residents' ? delete obj.residents : obj));
      setPlanets(results);
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
      const obj = {
        columnFilter,
        comparison,
        valueFilter,
      };
      const newFilter = options.filter((option) => option !== obj.columnFilter);
      setfilterByNumericValues([...filterByNumericValues, obj]);
      setOptions(newFilter);
    }
    if (comparison === 'menor que') {
      const newPlanet = planets
        ?.filter((planet) => Number(planet[columnFilter]) < Number(valueFilter));
      setPlanets(newPlanet);
      const obj = {
        columnFilter,
        comparison,
        valueFilter,
      };
      const newFilter = options.filter((option) => option !== obj.columnFilter);
      setfilterByNumericValues([...filterByNumericValues, obj]);
      setOptions(newFilter);
    }
    if (comparison === 'igual a') {
      const newPlanet = planets
        ?.filter((planet) => Number(planet[columnFilter]) === Number(valueFilter));
      setPlanets(newPlanet);
      const obj = {
        columnFilter,
        comparison,
        valueFilter,
      };
      const newFilter = options.filter((option) => option !== obj.columnFilter);
      setfilterByNumericValues([...filterByNumericValues, obj]);
      setOptions(newFilter);
    }
    setcolumnFilter(options[0]);
  }, [columnFilter, comparison, valueFilter, planets, filterByNumericValues, options]);

  const valuePlanets = React
    .useMemo(() => ({ planets,
      handleInput,
      searchPlanet,
      columnFilter,
      handlePopulation,
      handleComparison,
      valueFilter,
      handleValueFilter,
      handleClickFilter,
      filterByNumericValues,
      options }), [planets,
      searchPlanet,
      columnFilter, valueFilter, handleClickFilter, filterByNumericValues, options]);

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
