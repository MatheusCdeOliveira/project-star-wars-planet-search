import React, { useContext } from 'react';
import planetContext from '../context/planetContext';

function Filters() {
  const { handlePopulation,
    handleComparison,
    handleValueFilter,
    handleClickFilter, valueFilter } = useContext(planetContext);
  return (
    <nav>
      <select
        data-testid="column-filter"
        onChange={ handlePopulation }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" onChange={ handleComparison }>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value-filter"
          value={ valueFilter }
          onChange={ handleValueFilter }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ handleClickFilter }
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </nav>
  );
}

export default Filters;
