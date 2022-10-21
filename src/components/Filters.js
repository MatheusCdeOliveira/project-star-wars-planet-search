import React, { useContext } from 'react';
import planetContext from '../context/planetContext';

function Filters() {
  const { handlePopulation,
    handleComparison,
    handleValueFilter,
    handleClickFilter,
    valueFilter, filterByNumericValues, options } = useContext(planetContext);
  return (
    <nav>
      <select
        data-testid="column-filter"
        onChange={ handlePopulation }
      >
        {options
          .map((option) => (
            <option
              value={ option }
              key={ option }
            >
              {`${option}`}
            </option>
          ))}
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
      {filterByNumericValues.map((element) => (
        <p key={ element.columnFilter }>
          {`${element.columnFilter}
         ${element.comparison} ${element.valueFilter}`}

        </p>

      ))}
    </nav>
  );
}

export default Filters;
