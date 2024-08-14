import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './login.css';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleErrorClose = () => setShowErrorModal(false);
    const handleErrorShow = () => setShowErrorModal(true);

    const handleSuccessClose = () => setShowSuccessModal(false);
    const handleSuccessShow = () => setShowSuccessModal(true);

    const LoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                console.log(user);

                const newUser = {
                    fullName: user.displayName,
                    email: user.email,
                    mobile: user.phoneNumber,
                    profilePic: user.photoURL,
                    signInMethod: 'Google',
                    emailVerified: true,
                }

                try {
                    const ref = doc(db, 'Users', user.uid);
                    const newData = await setDoc(ref, newUser, { merge: true });
                    console.log(newData);
                    setSuccess(`User signed in: ${user.displayName}`);
                    handleSuccessShow();
                } catch (err) {
                    setError(err.message);
                    handleErrorShow();
                }
            }).catch((error) => {
                setError(error.message);
                handleErrorShow();
            });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setSuccess(`User signed in: ${user.email}`);
            handleSuccessShow();
        } catch (err) {
            setError(err.message);
            handleErrorShow();
        }
    }

    return (
        <div className='d-flex align-items-center main-height'>
            <Container className="login-card bg-white px-0">
                <Row className='gx-0'>
                    <Col md={6}>
                        <div className='bg-white login-left-card p-4'>
                            <img src={"https://inzint.com/wp-content/uploads/2024/05/inzint-logo-dark-1.png"} alt="Inzint Logo" height="60" />

                            <Row className='my-5 justify-content-center'>
                                <Col md={9} lg={9}>
                                    <h1 className='text-center'>Welcome Back</h1>
                                    <p className="text-center">Welcome Back! Please enter your credentials to login.</p>

                                    <Button onClick={LoginWithGoogle} variant="outline-dark" className='w-100 d-flex justify-content-center align-items-center my-4'>
                                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" height="25" alt="Google logo" />
                                        <span className='ms-2'>Login with Google</span>
                                    </Button>

                                    <div className='divider'>
                                        <div className='line'></div>
                                        <div className='text'>Or</div>
                                    </div>

                                    <Form className='mt-5' onSubmit={handleLogin}>
                                        <Form.Control
                                            type='email'
                                            placeholder='Email Address'
                                            className="mb-4"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Form.Control
                                            placeholder='Password'
                                            type='password'
                                            className="mb-2"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <a href="" className='d-block text-secondary text-end ms-auto mb-4'>Forgot Password?</a>
                                        <Button variant="dark" type="submit" className='w-100'>Login</Button>
                                    </Form>
                                </Col>
                            </Row>

                            <div className='mt-4'>
                                <p className='text-center text-secondary'>Don't have an account? <a href="/signup" className='text-dark'>Sign up for free</a></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='login-right-card p-4'></div>
                    </Col>
                </Row>
            </Container>

            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleErrorClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{success}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Login;

 