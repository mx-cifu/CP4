import React, { useState, useEffect } from 'react';
import {
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { firebaseApp } from '../firebase';

const Login = () => {
    const auth = getAuth(firebaseApp);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUid = localStorage.getItem('uid');
        const storedDisplayName = localStorage.getItem('displayName');

        if (storedUid && storedDisplayName) {
            setUser({
                uid: storedUid,
                displayName: storedDisplayName,
            });
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                authHandler(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    const authHandler = (authData) => {
        console.log(authData);
        const uid = authData.user.uid;
    

        const displayName = authData.additionalUserInfo?.profile?.login || authData.user.displayName || 'Anonymous';


        localStorage.setItem('uid', uid);
        localStorage.setItem('displayName', displayName);

        setUser({ uid, displayName });
    };

    const handleLogout = async () => {
        console.log("Logging out!");
        await signOut(auth);
        localStorage.removeItem('uid');
        localStorage.removeItem('displayName');
        setUser(null);
    };

    const authenticate = (e) => {
        const providerName = e.target.value;
        let provider;

        if (providerName === 'github') {
            provider = new GithubAuthProvider();
        } else if (providerName === 'facebook') {
            provider = new FacebookAuthProvider();
        } else {
            provider = new TwitterAuthProvider();
        }

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                authHandler(result)
            })
            .catch((error) => console.error('Error during authentication:', error));
    };

    return (
        <div className="home-div">
            {user ? (
                <div className="home-container">
                    <section className = 'home-info'>
                        <h1>Welcome back, {user.displayName}!</h1>
                        <p>Enjoy your reading!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </section>
                </div>
            ) : (
                <div className="home-container">
                    <section className = 'home-info'>
                        <h1>Welcome to BookBlog!</h1>
                        <p>Please log in to get started.</p>
                        <button value="github" onClick={authenticate}>
                            Log in with GitHub
                        </button>
                        <button value="facebook" onClick={authenticate}>
                            Log in with Facebook
                        </button>
                        <button value="twitter" onClick={authenticate}>
                            Log in with X
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Login;
