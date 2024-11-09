import {useEffect, useState} from "react";
import axios from "axios";
export const User = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
          setMessage("You Are Not Logged In. Please Log In.")
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'http://localhost:8000/auth/user/', {
                             headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                             }
                            }
                           );
             setMessage('You are:'+data.username+'. Your last_pixel_time is:'+data.last_pixel_time+'.\n Your id is:'+data.id+'.\n Your pixels_count is:'+data.pixels_count+".\n");
        
             
          } catch (e) {
            setMessage('You are not nogged in. Please log in.')
          }
         })()};
     }, []);

     return (
        <div className="form-signin mt-5 text-center">
          <h3>{message}</h3>
        </div>)
}
export default User