import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './signup.css';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const newUser = {
                fullName: fullName,
                email: user.email,
                signInMethod: 'email',
                mobile: mobile,
                emailVerified: user.emailVerified
            };

            await setDoc(doc(db, 'Users', user.uid), newUser);

            console.log('User signed up with email:', user.uid);
            window.alert('User signed up successfully!');
        } catch (error) {
            console.error('Error signing up with email:', error);
        }
    };

    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;

            const newUser = {
                fullName: user.displayName,
                email: user.email,
                mobile: user.phoneNumber,
                profilePic: user.photoURL,
                signInMethod: 'google',
                emailVerified: user.emailVerified
            };

            await setDoc(doc(db, 'users', user.uid), newUser);

            console.log('User signed up with Google:', user.uid);
            window.alert('User signed up successfully with Google!');
        } catch (error) {
            console.error('Error signing up with Google:', error);
        }
    };

    return (
        <div className='d-flex align-items-center main-height'>
            <Container className='signup-card px-0'>
                <Row className='gx-0'>
                    <Col md={6} className=''>
                        <div className='bg-white p-4 signup-left-card'>
                            <img src='https://inzint.com/wp-content/uploads/2024/05/inzint-logo-dark-1.png' alt='inzint-logo' height={30} />

                            <Row className='my-5 justify-content-center'>
                                <Col md={9} lg={9} xs={12} className='main-content'>
                                    <h1 className='text-center'>Sign Up</h1>
                                    <p className='text-center'>Create your account by filling the information below.</p>
                                    <Button variant='outline-dark' className='w-100 d-flex justify-content-center align-items-center my-4' onClick={signUpWithGoogle}>
                                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" height="25" alt="Google logo" />
                                        <span className='ms-2'>Sign Up with Google</span>
                                    </Button>

                                    <div className='divider'>
                                        <div className='line'></div>
                                        <div className='text'>Or</div>
                                    </div>
                                    <Form className='mt-5' onSubmit={signUpWithEmail}>
                                        <Form.Control type='text' className='mb-4' placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} required></Form.Control>
                                        <Form.Control type='email' className='mb-4' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                                        <Form.Control type='password' className='mb-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                                        <Form.Control type='tel' className='mb-4' placeholder='Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} required></Form.Control>
                                        <Button variant='dark' className='w-100 mt-4' type='submit'>Sign Up</Button>
                                    </Form>

                                    <div className='mt-4'>
                                        <p className='text-center text-secondary'>Already have an account? <a href='/' className='text-dark'>Login here</a></p>
                                    </div>

                                </Col>
                            </Row>

                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='signup-right-card p-4'>
                            {/* Optional right side content */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
