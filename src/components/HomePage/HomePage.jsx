import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import axios from 'axios';

function HomePage(props) {

    const dispatch = useDispatch();
    const store = useReduxStore();

    const [address, setAddress] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({type: 'FETCH_GEOCODING', payload: address});

    }

    return (
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='Enter Address'
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
            {store.restaurants.map((restaurant, i) => (
                <div key={i}>
                    <p>{restaurant.name}</p>
                    <p>{restaurant.rating}</p>
                    <p>{restaurant.user_ratings_count}</p>
                    <img src={restaurant.photos_url} alt="" />
                </div>
            ))}
      </div>
    );
  }
  
  export default HomePage;