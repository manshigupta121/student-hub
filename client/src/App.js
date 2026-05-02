import React, { useState, useEffect } from 'react';
import Features from './components/Features';
import Scheduler from './components/Scheduler';
import SelectionFlow from './components/SelectionFlow';
import Login from './components/Login'; 
import { 
    HiOutlineHome, 
    HiHome, 
    HiOutlineBookOpen, 
    HiBookOpen, 
    HiOutlineBell, 
    HiBell, 
    HiOutlineUserGroup, 
    HiUserGroup 
} from 'react-icons/hi';

const styles = {
    container: {
        padding: '20px',
        paddingBottom: '140px',
        minHeight: '100vh',
        fontFamily: "'Quicksand', 'Inter', sans-serif",
        background: 'linear-gradient(-45deg, #fdf2f8, #eef2ff, #f0fdf4, #fff7ed)',
        backgroundSize: '400% 400%',
        animation: 'meshGradient 12s ease infinite'
    },
    header: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '40px', 
        paddingTop: '30px',
        position: 'relative',
        animation: 'fadeInDown 0.8s ease-out'
    },
    logoutBtn: {
        position: 'absolute',
        right: '10px',
        top: '20px',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        padding: '8px 16px',
        borderRadius: '14px',
        fontSize: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    title: {
        fontSize: '38px',
        margin: 0,
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '800',
        letterSpacing: '-1px'
    },
    timeBadge: {
        display: 'inline-block',
        marginTop: '12px',
        padding: '6px 20px',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        borderRadius: '25px',
        fontSize: '15px',
        fontWeight: '700',
        color: '#4f46e5',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
    },
    formCard: { 
        padding: '30px', 
        borderRadius: '30px', 
        background: 'rgba(255, 255, 255, 0.6)', 
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.8)',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
    },
    sectionTitle: { marginTop: 0, fontSize: '20px', color: '#1e293b', fontWeight: '700', marginBottom: '20px' },
    inputGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    input: { 
        padding: '14px', 
        borderRadius: '16px', 
        border: '1px solid rgba(0,0,0,0.05)', 
        background: 'rgba(255,255,255,0.8)',
        outline: 'none',
        fontSize: '14px'
    },
    addButton: { 
        width: '100%', 
        marginTop: '20px', 
        padding: '16px', 
        borderRadius: '18px', 
        background: 'linear-gradient(135deg, #6366f1, #a855f7)', 
        color: 'white', 
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
    },
    listContainer: { display: 'grid', gap: '18px' },
    card: { 
        position: 'relative', 
        padding: '22px', 
        borderRadius: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.02)'
    },
    cardAccent: { position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', borderRadius: '0 4px 4px 0', background: '#6366f1' },
    subjectText: { margin: '0 0 5px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' },
    cardText: { margin: '0', fontSize: '14px', color: '#64748b' },
    booksText: { margin: '10px 0 0 0', fontSize: '12px', color: '#be185d', background: '#fff1f2', padding: '5px 12px', borderRadius: '10px', fontWeight: '600' },
    deleteBtn: { background: 'none', border: 'none', color: '#cbd5e1', fontSize: '20px', marginLeft: '10px', cursor: 'pointer', transition: 'color 0.2s' },
    bottomBar: { 
        position: 'fixed', 
        bottom: '25px', 
        left: '20px', 
        right: '20px', 
        height: '80px', 
        background: 'rgba(255, 255, 255, 0.6)', 
        backdropFilter: 'blur(25px) saturate(180%)', 
        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        borderRadius: '30px', 
        zIndex: 1000,
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
    },
    navItem: { 
        textAlign: 'center', 
        cursor: 'pointer', 
        color: '#94a3b8', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
};

function App() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [activeTab, setActiveTab] = useState('material'); 
    const [selection, setSelection] = useState({ branch: '', semester: '', subject: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        const clock = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(clock);
    }, []);

    const handleLogout = () => {
        localStorage.clear(); 
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div style={styles.container}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');
                
                @keyframes meshGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes iconBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                
                .nav-active { color: #6366f1 !important; }
                .nav-active .icon-circle { 
                    background: rgba(99, 102, 241, 0.15); 
                    transform: translateY(-5px) scale(1.1); 
                    filter: drop-shadow(0 5px 10px rgba(99, 102, 241, 0.2));
                }
                .nav-active small { color: #4f46e5; transform: translateY(-2px); }
                
                .logout-hover:hover { background: #fee2e2 !important; transform: scale(1.05); }
                .delete-hover:hover { color: #ef4444 !important; transform: scale(1.2); }
                
                .icon-circle {
                    width: 42px; height: 42px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 14px;
                    background: rgba(255, 255, 255, 0.2);
                    margin-bottom: 4px;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    font-size: 22px;
                }
                `}
            </style>

            <header style={styles.header}>
                <button onClick={handleLogout} className="logout-hover" style={styles.logoutBtn}>Logout</button>
                <h1 style={styles.title}>Student Hub</h1>
                <div style={styles.timeBadge}>✨ {currentTime}</div>
            </header>

            <main style={{ animation: 'fadeInUp 0.6s ease-out' }}>
                {activeTab === 'home' ? (
                    <Scheduler styles={styles} />
                ) : (activeTab === 'aktu' || activeTab === 'community') ? (
                    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                        <Features activeTab={activeTab === 'community' ? 'quantum' : 'aktu'} />
                    </div>
                ) : (
                    <SelectionFlow 
                        activeTab={activeTab} 
                        selection={selection} 
                        setSelection={setSelection} 
                    />
                )}
            </main>

            <nav style={styles.bottomBar}>
                {[
                    { 
                        id: 'material', 
                        label: 'Material', 
                        icon: <HiOutlineBookOpen />, 
                        activeIcon: <HiBookOpen /> 
                    },
                    { 
                        id: 'aktu', 
                        label: 'Notice', 
                        icon: <HiOutlineBell />, 
                        activeIcon: <HiBell /> 
                    },
                    { 
                        id: 'community', 
                        label: 'Community', 
                        icon: <HiOutlineUserGroup />, 
                        activeIcon: <HiUserGroup /> 
                    },
                    { 
                        id: 'home', 
                        label: 'Home', 
                        icon: <HiOutlineHome />, 
                        activeIcon: <HiHome /> 
                    }
                ].map((item) => (
                    <div
                        key={item.id}
                        className={activeTab === item.id ? 'nav-active' : ''}
                        style={styles.navItem}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <span className="icon-circle">
                            {activeTab === item.id ? item.activeIcon : item.icon}
                        </span>
                        <small style={{ fontWeight: '700', fontSize: '11px', transition: 'all 0.3s' }}>
                            {item.label}
                        </small>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default App;