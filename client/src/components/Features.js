import React from 'react';
import Community from './Community'; // Keeps your existing functionality

const Features = ({ activeTab }) => {
    
    // --- Global Animations and Styles ---
    const globalStyles = `
        @keyframes meshGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseIcon {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-5px);
        }
        .interactive-item {
            transition: all 0.2s ease;
        }
        .interactive-item:hover {
            background: rgba(255, 255, 255, 0.3);
            padding-left: 15px !important;
            color: #fff !important;
        }
    `;

    // --- Inner Component: AKTU Notices ---
    const AktuNotices = () => (
        <div className="glass-card" style={styles.content}>
            <style>{globalStyles}</style>
            <div style={styles.headerRow}>
                <span style={styles.animatedIcon}>📢</span>
                <h3 style={styles.title}>Latest AKTU Notices</h3>
            </div>
            <ul style={styles.list}>
                <li className="interactive-item" style={styles.item} onClick={() => window.open('https://aktu.ac.in/notices.html')}>
                    <span style={{marginRight: '10px'}}>📌</span> View Official AKTU Notice Circulars
                </li>
                <li className="interactive-item" style={styles.item}>
                    <span style={{marginRight: '10px'}}>🎓</span> Final Semester Exam Schedule 2026
                </li>
                <li className="interactive-item" style={styles.item}>
                    <span style={{marginRight: '10px'}}>📝</span> Carry Over Paper Registration
                </li>
            </ul>
        </div>
    );

    // --- Inner Component: Study Material ---
    const MaterialSection = () => (
        <div className="glass-card" style={styles.content}>
            <style>{globalStyles}</style>
            <div style={styles.headerRow}>
                <span style={styles.animatedIcon}>📚</span>
                <h3 style={styles.title}>Handwritten Notes</h3>
            </div>
            <p style={styles.subtitle}>Curated resources for your success</p>
            
            <div style={styles.formGroup}>
                <label style={styles.label}>Select Your Semester</label>
                <select style={styles.select}>
                    <option>Semester 7</option>
                    <option>Semester 8 (Final Year)</option>
                </select>
            </div>
            
            <button style={styles.btn}>
                <span>Download Assets</span>
                <span style={{marginLeft: '10px'}}>⬇️</span>
            </button>
        </div>
    );

    // --- Main Render Logic ---
    switch (activeTab) {
        case 'aktu':
            return <AktuNotices />;
        case 'quantum':
            return <Community />; 
        case 'material':
            return <MaterialSection />;
        default:
            return null;
    }
};

const styles = {
    content: { 
        padding: '30px', 
        borderRadius: '24px', 
        marginTop: '20px', 
        animation: 'fadeInUp 0.6s ease-out',
        color: '#1f747f',
        fontFamily: "'Inter', sans-serif"
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
    },
    animatedIcon: {
        fontSize: '32px',
        marginRight: '15px',
        animation: 'pulseIcon 6s infinite ease-in-out'
    },
    title: { 
        margin: 0, 
        fontSize: '24px', 
        fontWeight: '800', 
        letterSpacing: '-0.5px',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    subtitle: {
        fontSize: '14px',
        opacity: 0.9,
        marginBottom: '25px'
    },
    list: { 
        listStyle: 'none', 
        padding: 0,
        margin: 0
    },
    item: { 
        padding: '15px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        cursor: 'pointer', 
        color: 'rgba(94, 154, 40, 0.9)',
        fontSize: '15px',
        fontWeight: '500',
        borderRadius: '12px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: '8px',
        letterSpacing: '1px',
        opacity: 0.8
    },
    select: { 
        width: '100%', 
        padding: '12px 15px', 
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        fontSize: '16px',
        outline: 'none',
        cursor: 'pointer'
    },
    btn: { 
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
        color: 'white', 
        border: 'none', 
        padding: '16px', 
        width: '100%', 
        borderRadius: '14px', 
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '700',
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.2s'
    }
};

export default Features;