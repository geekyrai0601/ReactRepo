import React, { useState } from 'react';
import './CityAddition.css'

const CityAddition = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setMessage(''); 
  };

  const handleAddCity = () => {
    if (city && !cities.includes(city)) {
      setCities([...cities, city]);
      setCity('');
      setMessage(''); 
    }
  };

  const handleRemoveCity = () => {
    if (city && cities.includes(city)) {
      setCities(cities.filter(c => c !== city));
      setCity('');
      setMessage(''); 
    } else if (city) {
      setMessage('No such city found');
      
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={handleAddCity}>Add City</button>
      <button onClick={handleRemoveCity}>Remove City</button>

      {message && <p className="message">{message}</p>} 

      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityAddition;
