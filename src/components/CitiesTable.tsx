import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCities } from '../redux/weatherSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const CitiesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={() => dispatch(fetchCities())}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Country</th>
              <th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city) => (
              <tr key={city.name}>
                <td>
                  <Link to={`/weather/${city.name}`}>{city.name}</Link>
                </td>
                <td>{city.country}</td>
                <td>{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
