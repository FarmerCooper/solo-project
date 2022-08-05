import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

function HomePage(props) {

    const dispatch = useDispatch();

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
      </div>
    );
  }
  
  export default HomePage;