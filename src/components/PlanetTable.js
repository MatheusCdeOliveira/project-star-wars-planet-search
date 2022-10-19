import React, { useContext } from 'react';
import planetContext from '../context/planetContext';

function PlanetTable() {
  const { planets, handleInput, searchPlanet } = useContext(planetContext);
  return (
    <section>
      <label htmlFor="planets">
        <input
          type="text"
          name="planets"
          data-testid="name-filter"
          value={ searchPlanet }
          onChange={ handleInput }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets?.filter((plane) => plane.name.includes(searchPlanet)).map((planet) => (
            <tr key={ planet.name }>
              <td>
                {planet.name}
              </td>
              <td>
                {planet.rotation_period}
              </td>
              <td>
                {planet.orbital_period}
              </td>
              <td>
                {planet.diameter}
              </td>
              <td>
                {planet.climate}
              </td>
              <td>
                {planet.gravity}
              </td>
              <td>
                {planet.terrain}
              </td>
              <td>
                {planet.surface_water}
              </td>
              <td>
                {planet.population}
              </td>
              <td>
                {planet.films}
              </td>
              <td>
                {planet.created}
              </td>
              <td>
                {planet.edited}
              </td>
              <td>
                {planet.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PlanetTable;
