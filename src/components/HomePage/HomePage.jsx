import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

function HomePage(props) {

    const dispatch = useDispatch();

    const [address, setAddress] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({type: 'FETCH_GEOCODING', payload: address});
    }

    setTimeout(() => {
        if (store.photos.length > 0) {
          for(let i=0; i< store.photos.length; i++) {
            axios.put(`/api/photos/`, store.photos[i])
              .then((response) => {
                dispatch({type: 'FETCH_UPDATE'})
              })
              .catch((error) => {
                console.log('Error in /photos PUT', error);
              })
          }
        }
      }, 1000);

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