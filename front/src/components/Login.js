import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../App.css';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser} className='login-container'>
                <input type="text" name="username" placeholder="Enter Username"  />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" className='button'/>
            </form>
        </div>
    )
}

export default LoginPage
