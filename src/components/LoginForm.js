import {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const authObject = {
            'Project-ID':'8540e6c1-76d5-4c3a-b6ac-8e9d11601f0d',
            'User-Name': username, 
            'User-Secret': password
        };
        try {
            await axios.get('https://api.chatengine.io/users/me/session/', {headers: authObject}).then((res)=>console.log(res));
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.reload();
            setError('');
        } catch (e){setError('Opps...incorrect credentials! Try again')}

    }

    return <div className='wrap'>
        <div className="form">
            <div className="title">
                Chat Application
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           className='input'
                           placeholder='Username'
                           required
                           value ={username}
                           onChange= {(e)=>setUsername(e.target.value)}>
                    </input>
                    <input type="password"
                           className='input'
                           placeholder='Password'
                           required
                           value ={password}
                           onChange= {(e)=>setPassword(e.target.value)}>
                    </input>
                    <div>
                        <button type="Submit"
                                className='button'>Login</button>
                    </div>
                </form>
                <h4 style={{color: 'red'}}>{error}</h4>
            </div>
        </div>

    </div>
}

export default LoginForm;