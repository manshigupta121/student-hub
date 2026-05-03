import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Community = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const chatEndRef = useRef(null);

    // Initial Setup
    useEffect(() => {
        let savedName = localStorage.getItem("aktu_user");
        if (!savedName) {
            savedName = prompt("Enter your name for the community:") || "Student_" + Math.floor(Math.random() * 1000);
            localStorage.setItem("aktu_user", savedName);
        }
        setUserName(savedName);

        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get('https://student-hub-l8yf.onrender.com/api/messages');
            setMessages(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setIsLoading(false);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            const res = await axios.post('https://student-hub-l8yf.onrender.com/api/messages', {
                text: input,
                user: userName
            });
            setMessages([...messages, res.data]);
            setInput("");
        } catch (err) {
            alert("Message failed to send");
        }
    };

    const renderText = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, i) => {
            if (part.match(urlRegex)) {
                return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color: '#818cf8', textDecoration: 'underline', fontWeight: '600'}}>{part}</a>;
            }
            return part;
        });
    };

    return (
        <div style={commStyles.wrapper}>
            {/* INJECTED ANIMATIONS & DYNAMIC BACKGROUND */}
            <style>
                {`
                @keyframes meshMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes messagePop {
                    from { opacity: 0; transform: scale(0.9) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes pulseBadge {
                    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                }
                .glass-container {
                    background: rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                }
                .message-bubble {
                    animation: messagePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
                }
                .mesh-bg {
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: meshMove 15s ease infinite;
                }
                `}
            </style>

            <div className="glass-container" style={commStyles.header}>
                <div style={commStyles.headerInfo}>
                    <span style={commStyles.animatedIcon}>💬</span>
                    <span style={commStyles.headerTitle}>Student Community</span>
                </div>
                <span className="pulse" style={commStyles.userBadge}>
                    <span style={commStyles.onlineDot}></span> {userName}
                </span>
            </div>

            <div className="mesh-bg" style={commStyles.chatContainer}>
                {isLoading ? (
                    <div style={commStyles.loadingContainer}>
                        <div className="spinner"></div>
                        <p style={commStyles.loadingText}>Syncing with Hub...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div style={commStyles.loadingText}>Be the first to share something!</div>
                ) : (
                    messages.map((m, i) => (
                        <div key={i} className="message-bubble" style={{
                            ...commStyles.bubble,
                            alignSelf: m.user === userName ? 'flex-end' : 'flex-start',
                            background: m.user === userName 
                                ? 'rgba(99, 102, 241, 0.85)' 
                                : 'rgba(255, 255, 255, 0.85)',
                            color: m.user === userName ? 'white' : '#1e293b',
                            borderRadius: m.user === userName ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                        }}>
                            <small style={{
                                ...commStyles.username, 
                                color: m.user === userName ? '#5668b1' : '#4f46e5'
                            }}>{m.user}</small>
                            <p style={commStyles.text}>{renderText(m.text)}</p>
                            <small style={{
                                ...commStyles.time,
                                color: m.user === userName ? '#7481ad' : '#64748b'
                            }}>
                                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                        </div>
                    ))
                )}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={sendMessage} className="glass-container" style={commStyles.inputRow}>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={commStyles.input}
                />
                <button type="submit" style={commStyles.sendBtn}>
                    <span>🚀</span>
                </button>
            </form>
        </div>
    );
};

const commStyles = {
    wrapper: { 
        height: '75vh', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '30px', 
        overflow: 'hidden', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        fontFamily: "'Inter', sans-serif"
    },
    header: { 
        padding: '18px 25px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        zIndex: 10
    },
    headerInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    animatedIcon: { fontSize: '24px' },
    headerTitle: { fontWeight: '800', color: '#9d63c3', letterSpacing: '0.5px', fontSize: '18px' },
    userBadge: { 
        fontSize: '11px', 
        background: 'rgba(255,255,255,0.2)', 
        padding: '6px 14px', 
        borderRadius: '20px', 
        color: 'white', 
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        border: '1px solid rgba(255,255,255,0.3)'
    },
    onlineDot: { width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' },
    chatContainer: { 
        flex: 1, 
        overflowY: 'auto', 
        padding: '25px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px',
        scrollBehavior: 'smooth'
    },
    loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' },
    loadingText: { textAlign: 'center', color: 'white', fontSize: '15px', fontWeight: '500', opacity: 0.8 },
    bubble: { 
        padding: '12px 18px', 
        maxWidth: '75%', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative'
    },
    username: { fontWeight: '800', fontSize: '10px', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    text: { margin: '0', fontSize: '15px', lineHeight: '1.5', fontWeight: '400' },
    time: { fontSize: '9px', display: 'block', textAlign: 'right', marginTop: '6px', fontWeight: '600' },
    inputRow: { 
        display: 'flex', 
        padding: '20px 25px', 
        gap: '12px',
        alignItems: 'center'
    },
    input: { 
        flex: 1, 
        border: '1px solid rgba(255,255,255,0.3)', 
        borderRadius: '15px', 
        padding: '14px 20px', 
        outline: 'none', 
        fontSize: '15px',
        background: 'rgba(255,255,255,0.1)',
        color: 'white',
        placeholderColor: 'rgba(255,255,255,0.5)'
    },
    sendBtn: { 
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
        border: 'none', 
        borderRadius: '15px', 
        width: '50px', 
        height: '50px', 
        color: 'white', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '20px',
        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
        transition: 'transform 0.2s'
    }
};

export default Community;