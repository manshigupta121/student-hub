import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? '/api/auth/register' : '/api/auth/login';
        
        const payload = {
            email: formData.email.trim().toLowerCase(),
            password: formData.password
        };
        
        if (isRegister) {
            payload.name = formData.name;
        }

        try {
            const res = await axios.post(`https://student-hub-l8yf.onrender.com${url}`, payload);
            
            if (!isRegister) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('aktu_user', res.data.user.name);
                onLoginSuccess();
            } else {
                alert("Registration successful! Please login.");
                setIsRegister(false);
            }
        } catch (err) {
            console.error("Auth Error Detail:", err.response?.data);
            alert(err.response?.data?.error || "Connection to server failed");
        }
    };

    return (
        <div style={loginStyles.container}>
            <style>
                {`
                @keyframes floatBackground {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes pulseSoft {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }
                .aesthetic-card {
                    background: rgba(255, 255, 255, 0.6) !important;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.8) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.04);
                    animation: scaleIn 0.6s ease-out forwards;
                }
                .input-aesthetic {
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.5) !important;
                    border: 1px solid #e2e8f0 !important;
                }
                .input-aesthetic:focus {
                    background: #fff !important;
                    border-color: #93c5fd !important;
                    box-shadow: 0 0 0 4px rgba(147, 197, 253, 0.2);
                    outline: none;
                }
                .btn-aesthetic {
                    transition: all 0.3s ease;
                    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                }
                .btn-aesthetic:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 15px rgba(99, 102, 241, 0.2);
                }
                .floating-icon {
                    animation: pulseSoft 3s ease-in-out infinite;
                }
                `}
            </style>

            <div style={loginStyles.contentWrapper}>
                <form className="aesthetic-card" style={loginStyles.card} onSubmit={handleSubmit}>
                    <div className="floating-icon" style={loginStyles.icon}>
                        {isRegister ? "✨" : "👋"}
                    </div>
                    
                    <h2 style={loginStyles.title}>
                        {isRegister ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p style={loginStyles.subtitle}>
                        {isRegister ? "Join our student community" : "Enter your credentials to continue"}
                    </p>

                    {isRegister && (
                        <input 
                            placeholder="Your Name" 
                            className="input-aesthetic"
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            style={loginStyles.input}
                        />
                    )}
                    
                    <input 
                        placeholder="Email Address" 
                        type="email"
                        className="input-aesthetic"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        style={loginStyles.input}
                    />
                    
                    <input 
                        placeholder="Password" 
                        type="password"
                        className="input-aesthetic"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        style={loginStyles.input}
                    />

                    <button type="submit" className="btn-aesthetic" style={loginStyles.btn}>
                        {isRegister ? "Get Started" : "Sign In"}
                    </button>

                    <p onClick={() => setIsRegister(!isRegister)} style={loginStyles.toggle}>
                        {isRegister ? (
                            <span>Already have an account? <b style={{color: '#6366f1'}}>Login</b></span>
                        ) : (
                            <span>New here? <b style={{color: '#6366f1'}}>Create an account</b></span>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

const loginStyles = {
    container: { 
        height: '100vh', 
        width: '100%',
        background: 'linear-gradient(-45deg, #fdf2f8, #eef2ff, #f0fdf4, #fff7ed)',
        backgroundSize: '400% 400%',
        animation: 'floatBackground 12s ease infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Quicksand', sans-serif"
    },
    contentWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
    },
    card: { 
        padding: '3rem 2rem', 
        borderRadius: '30px', 
        width: '100%',
        maxWidth: '380px',
        textAlign: 'center'
    },
    icon: {
        fontSize: '2.5rem',
        marginBottom: '1rem'
    },
    title: { 
        fontSize: '1.6rem', 
        fontWeight: '700', 
        color: '#1e293b',
        margin: '0 0 0.5rem 0'
    },
    subtitle: {
        fontSize: '0.9rem',
        color: '#64748b',
        marginBottom: '2rem'
    },
    input: { 
        width: '100%', 
        marginBottom: '1rem', 
        padding: '14px 18px', 
        borderRadius: '16px', 
        fontSize: '15px',
        color: '#1e293b',
        boxSizing: 'border-box'
    },
    btn: { 
        width: '100%', 
        padding: '16px', 
        color: 'white', 
        border: 'none', 
        borderRadius: '16px', 
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '700',
        marginTop: '0.5rem'
    },
    toggle: { 
        fontSize: '13px', 
        textAlign: 'center', 
        marginTop: '1.5rem', 
        color: '#64748b', 
        cursor: 'pointer' 
    }
};

export default Login;