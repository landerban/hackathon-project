import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
          setMessage("You Are Not Logged In. Please Log In.")
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'http://localhost:8000/auth/home/', {
                             headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                             }
                            }
                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);

     return (
        <div className="form-signin mt-5 text-center">
          <h3>Hi! {message}</h3>
        </div>)
}
export default Home