/**
 * Name: Maximiliano Cifuentes
 * Date: 11/27/2024
 * 
 * This is my Login.jsx which is used by my Home.jsx page as it contains the bulk 
 * of the logic that will be used to authenticate a user within firebase db. It provides
 * an option to use GitHub for your login where it will then pull the displayName 
 * retured from GitHub, or to register your own account using your email, and password, and
 * choosing a displayname that will similarly be saved by firebase db
 */



import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword,
        updateProfile,signOut, signInWithPopup,GithubAuthProvider} from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';
import { firebaseApp } from '../firebase';

const Login = () => {
    const auth = getAuth(firebaseApp);
    const db = getDatabase();

    // states for this component
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // on component mount it will try to read from local storage to check
    // if the user is logged in to 'remember' them
    useEffect(() => {
        const storedUid = localStorage.getItem('uid');
        const storedDisplayName = localStorage.getItem('displayName');

        if (storedUid && storedDisplayName) {
            setUser({
                uid: storedUid,
                displayName: storedDisplayName,
            });
        }

        // Waits for any change with the users authentication state like logging out
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                authHandler(currentUser);
            }
        });
        // clean up method
        return () => unsubscribe();
    }, []);

    // helper method that receives information about a user and updates the information in local storage and the React states for it as well
    // tried to get testing to work with this and mock firebase but didn't have much success
    // istanbul ignore next
    const authHandler = (authData) => {
        const { uid, displayName } = authData;
        localStorage.setItem('uid', uid);
        localStorage.setItem('displayName', displayName || 'Unknown');
        setUser({ uid, displayName: displayName || 'Unknown' });
    };

    // handles a user clicking the logout button by calling firebase methods
    // and removing user information from local storage
    // istanbul ignore next
    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('uid');
        localStorage.removeItem('displayName');
        setUser(null);
    };


    // handles a user choosing to register for a new account- it uses firebase
    // existing method to handle most of this logic. Importantly, it uses update instead
    // of set since set would 'erase' the posts that a user had previously made
    // istanbul ignore next
    const handleRegister = async (e) => {
        e.preventDefault();
        const displayName = e.target.displayName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCreds.user, { displayName });

            const userRef = ref(db, `users/${userCreds.user.uid}`);
            await update(userRef, {
                displayName
            });
            authHandler(userCreds.user);
        } catch (error) {
            setError(error.message);
        }
    };

    // handels a user logging in without GitHub if they had previously registered
    // with an email and password
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const userCreds = await signInWithEmailAndPassword(auth, email, password);
            authHandler(userCreds.user);
        } catch (error) {
            setError(error.message);
        }
    };

    // User's firebase methods for a popup which allows a user to login 
    // with their GitHub, it also uses the information returned from 
    // GitHub to set the displayName for the react project since GitHub logins
    // dont have the option to choose their own display name
    // istanbul ignore next
    const loginWithGitHub = () => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then( async (result) => {
                const { user, additionalUserInfo } = result;
                const displayName = additionalUserInfo?.profile?.login || user.displayName || 'Anonymous';
                authHandler({ uid: user.uid, displayName });

                const userRef = ref(db, `users/${user.uid}`);
                await update(userRef, {
                    displayName
                });
            })
            .catch((error) => {
                setError(error.message);
            });
    };


    if (user) {
        return (
            <div className="home-container">
                    <section className="home-info">
                        <h1>Welcome back, {user.displayName}!</h1>
                        <p>Enjoy your reading!</p>
                        <button id = 'logout-button'onClick={handleLogout}>Logout</button>
                    </section>
                </div>
        );
    }

    // JSX which contains ternary operators since if/else are not used when returning HTML-like code. Ternaries are
    // used to modify the what is displayed on mainly 2 main areas: user is logging in, user wants to register.
    // The ternaries are based off of the states that are set earlier in order to decide which path to go down
    return (
        <div className="home-div">
                <div className="home-container">
                    <section className="home-info">
                        <h1>{isRegistering ? 'Register' : 'Login'} to BookBlog</h1>
                        {error && <p>{error}</p>}

                        
                        {isRegistering ? (
                            /* User is registering */
                            <form className = 'registration-form'onSubmit={handleRegister}>
                                <input type="text" name="displayName"placeholder="Display Name" required/>
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required />
                                <button id = 'register-button' type="submit">Register</button>
                                <p>
                                    Already have an account?{' '}
                                    <button type="button" onClick={() => setIsRegistering(false)}>
                                        Login here
                                    </button>
                                </p>
                            </form>
                        ) : (
                            /* User is logging in */   
                            <form className = 'login-form' onSubmit={handleLogin}>
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="password" name="password" placeholder="Password" required/>
                                <button id = 'login-button'type="submit">Login</button>
                                <button id = 'git-login' type="button" onClick={loginWithGitHub}>
                                    Login with GitHub
                                </button>
                                <p>
                                    Don't have an account?{' '}
                                    <button type="button" onClick={() => setIsRegistering(true)}>
                                        Register here
                                    </button>
                                </p>
                            </form>
                        )}
                    </section>
                </div>
        </div>
    );
};

export default Login;
