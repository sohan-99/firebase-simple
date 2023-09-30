/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
import app from '../../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const [user, setUser] = useState()
    const auth = getAuth(app)
    // console.log(app);
    const googlrprovider = new GoogleAuthProvider();
    const gitprovider  = new GithubAuthProvider()
    const handleGoogleSignIn = () => {
        // console.log('google is coming soon');
        signInWithPopup(auth, googlrprovider)
            .then(result => {
                const LogInUser = result.user;
                console.log(LogInUser);
                setUser(LogInUser);
            })
            .catch(error => {
                console.log('error', error.massage);
            })

    }
    const handleGitsignin= ()=>{
        signInWithPopup(auth, gitprovider)
        .then(result=>{
            const loginuser =result.user;
            console.log(loginuser);
            setUser(loginuser)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const handleSignOut =()=>{
        signOut(auth)
        .then(result=>{
            console.log(result);
            setUser(null)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
           <>
            <button onClick={handleGoogleSignIn}>Google Login</button>
            <button onClick={handleGitsignin}>github login</button>
           </>
            }
            {user && <div>
                <h2>User:{user.displayName
                }</h2>
                <h1>User Email :{user.email}</h1>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;

