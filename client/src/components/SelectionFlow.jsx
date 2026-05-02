import React, { useState, useEffect } from 'react';

const SelectionFlow = ({ activeTab, selection, setSelection }) => {
    const [step, setStep] = useState(1);

    const data = {
        branches: ['CSE', 'IT', 'ECE', 'ME', 'CE', 'EE'],
        semesters: ['1', '2', '3', '4', '5', '6', '7', '8'],
        subjects: {
            'CSE-1': ['Engineering Physics', 'Engineering Maths-I', 'Basic Electrical Engineering', 'AI for Engineering'],
            'IT-1': ['Engineering Physics', 'Engineering Maths-I', 'Basic Electrical Engineering', 'AI for Engineering'],
            'ECE-1': ['Engineering Physics', 'Engineering Maths-I', 'Basic Electrical Engineering', 'AI for Engineering'],
            'CSE-2': ['Engineering Chemistry', 'Engineering Maths-II', 'Programming for Problem Solving', 'Emerging Domain in Electronics'],
            'CSE-3': ['Data Structures', 'Discrete Structures', 'Computer Organization & Architecture', 'Digital Electronics'],
            'CSE-4': ['Operating Systems', 'Theory of Automata', 'Microprocessor', 'Advanced Java'],
            'CSE-5': ['DBMS', 'Design and Analysis of Algorithms', 'Compiler Design', 'Web Technology'],
            'CSE-6': ['Software Engineering', 'Computer Networks', 'Data Mining', 'Cloud Computing'],
            'CSE-7': ['Distributed Systems', 'Artificial Intelligence', 'Machine Learning', 'Big Data'],
            'CSE-8': ['Deep Learning', 'Quantum Computing', 'Project Management'],
        }
    };

    const handleAction = (type) => {
        const formattedSubject = selection.subject.toLowerCase().replace(/ /g, '_');
        const fileName = `${formattedSubject}_${type}.pdf`;
        const filePath = `/pdfs/${fileName}`;
        window.open(filePath, '_blank');
    };

    const currentKey = `${selection.branch}-${selection.semester}`;
    const availableSubjects = data.subjects[currentKey] || [];

    const handleInitialSubmit = () => {
        if (!selection.branch || !selection.semester) {
            alert("Please select both Branch and Semester");
            return;
        }
        setStep(2);
    };

    const handleSubjectSelect = (sub) => {
        setSelection({ ...selection, subject: sub });
        setStep(3);
    };

    return (
        <div style={innerStyles.mainWrapper}>
            {/* INJECTED GLOBAL ANIMATIONS */}
            <style>
                {`
                @keyframes meshGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.7) !important;
                    backdrop-filter: blur(12px) saturate(180%);
                    -webkit-backdrop-filter: blur(12px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.4) !important;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
                }
                .subject-card:hover {
                    background: rgba(255, 255, 255, 0.9) !important;
                    transform: translateX(8px);
                    transition: all 0.3s ease;
                }
                .resource-card:hover {
                    transform: scale(1.05);
                    transition: all 0.3s ease;
                }
                .floating-icon {
                    animation: float 3s ease-in-out infinite;
                }
                `}
            </style>

            <div style={{ padding: '10px', animation: 'fadeInUp 0.6s ease' }}>
                {/* STEP 1: Profile Setup */}
                {step === 1 && (
                    <div className="glass-card" style={innerStyles.card}>
                        <div className="floating-icon" style={innerStyles.iconHeader}>🎓</div>
                        <h3 style={{ marginBottom: '8px', color: '#1e293b', fontWeight: '800' }}>Academic Profile</h3>
                        <p style={{ fontSize: '13px', color: '#475569', marginBottom: '30px' }}>Your AKTU resources are being personalized</p>
                        
                        <select 
                            style={innerStyles.select}
                            onChange={(e) => setSelection({...selection, branch: e.target.value})}
                            value={selection.branch}
                        >
                            <option value="">-- Select Branch --</option>
                            {data.branches.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>

                        <select 
                            style={innerStyles.select}
                            onChange={(e) => setSelection({...selection, semester: e.target.value})}
                            value={selection.semester}
                        >
                            <option value="">-- Select Semester --</option>
                            {data.semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                        </select>

                        <button 
                            onClick={handleInitialSubmit} 
                            style={innerStyles.btn}
                            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
                            onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
                        >
                            Explore Subjects
                        </button>
                    </div>
                )}

                {/* STEP 2: Subject List */}
                {step === 2 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
                        <div style={innerStyles.breadcrumb}>
                            <button onClick={() => setStep(1)} style={innerStyles.backBtn}>← Back</button>
                            <span style={innerStyles.breadText}>{selection.branch} / Sem {selection.semester}</span>
                        </div>
                        
                        {availableSubjects.length > 0 ? (
                            availableSubjects.map((sub, idx) => (
                                <div 
                                    key={sub} 
                                    className="glass-card subject-card" 
                                    style={{...innerStyles.subjectItem, animationDelay: `${idx * 0.1}s`}} 
                                    onClick={() => handleSubjectSelect(sub)}
                                >
                                    <div style={innerStyles.subInfo}>
                                        <span style={innerStyles.subCode}>{selection.branch.substring(0,2)}-{idx + 101}</span>
                                        <span style={innerStyles.subTitle}>{sub}</span>
                                    </div>
                                    <span style={innerStyles.arrow}>→</span>
                                </div>
                            ))
                        ) : (
                            <div className="glass-card" style={innerStyles.emptyState}>
                                <div style={{fontSize: '40px', marginBottom: '10px'}}>🔄</div>
                                <p>No subjects found for <b>{currentKey}</b>.</p>
                                <small>The AKTU library is being updated...</small>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 3: Resource Portal */}
                {step === 3 && (
                    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
                        <div style={innerStyles.breadcrumb}>
                            <button onClick={() => setStep(2)} style={innerStyles.backBtn}>← Back to Subjects</button>
                            <span style={innerStyles.breadText}>{selection.subject}</span>
                        </div>
                        <div className="glass-card" style={innerStyles.contentCard}>
                            <div style={innerStyles.resourceGrid}>
                                {[
                                    { id: 'syllabus', title: 'Syllabus', icon: '📋', color: '#6366f1' },
                                    { id: 'quantum', title: 'Quantum PDF', icon: '📚', color: '#a855f7' },
                                    { id: 'pyqs', title: 'PYQ Papers', icon: '📝', color: '#ec4899' },
                                    { id: 'notes', title: 'Notes', icon: '✍️', color: '#f59e0b' }
                                ].map((res) => (
                                    <div 
                                        key={res.id} 
                                        className="resource-card"
                                        style={innerStyles.resourceCard}
                                        onClick={() => handleAction(res.id)}
                                    >
                                        <div style={{ ...innerStyles.iconCircle, backgroundColor: res.color + '15', color: res.color, boxShadow: `0 4px 15px ${res.color}30` }}>
                                            {res.icon}
                                        </div>
                                        <span style={innerStyles.resourceTitle}>{res.title}</span>
                                        <div style={innerStyles.actionRow}>
                                            <button style={{...innerStyles.miniBtn, background: `linear-gradient(135deg, ${res.color} 0%, #000 250%)`}}>View</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const innerStyles = {
    mainWrapper: {
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'meshGradient 15s ease infinite',
        display: 'flex',
        flexDirection: 'column',
    },
    card: { 
        padding: '40px 30px', 
        borderRadius: '35px', 
        textAlign: 'center', 
        margin: '20px auto',
        maxWidth: '400px'
    },
    iconHeader: { fontSize: '50px', marginBottom: '20px' },
    select: { 
        width: '100%', 
        padding: '16px', 
        marginBottom: '20px', 
        borderRadius: '18px', 
        border: '1px solid rgba(255, 255, 255, 0.3)', 
        fontSize: '15px', 
        background: 'rgba(255, 255, 255, 0.5)', 
        color: '#1e293b', 
        outline: 'none',
        fontWeight: '600'
    },
    btn: { 
        width: '100%', 
        padding: '18px', 
        borderRadius: '18px', 
        background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', 
        color: 'white', 
        border: 'none', 
        fontWeight: 'bold', 
        cursor: 'pointer', 
        fontSize: '16px', 
        marginTop: '15px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        transition: '0.3s'
    },
    breadcrumb: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    breadText: { fontSize: '13px', fontWeight: '800', color: '#1e293b', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)', padding: '6px 14px', borderRadius: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
    backBtn: { background: 'rgba(255,255,255,0.3)', border: 'none', color: '#1e293b', padding: '8px 15px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
    subjectItem: { padding: '22px 25px', borderRadius: '25px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
    subInfo: { display: 'flex', flexDirection: 'column' },
    subCode: { fontSize: '11px', color: '#4f46e5', fontWeight: '900', letterSpacing: '1.5px', marginBottom: '4px' },
    subTitle: { fontSize: '17px', color: '#1e293b', fontWeight: '800' },
    arrow: { color: '#6366f1', fontSize: '22px', fontWeight: 'bold' },
    contentCard: { padding: '25px', borderRadius: '35px' },
    emptyState: { padding: '60px 20px', textAlign: 'center', color: '#1e293b' },
    resourceGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '10px'
    },
    resourceCard: {
        background: 'rgba(255, 255, 255, 0.4)',
        padding: '25px 15px',
        borderRadius: '25px',
        textAlign: 'center',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: '0.3s'
    },
    iconCircle: {
        width: '60px',
        height: '60px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        marginBottom: '15px',
        transition: '0.3s'
    },
    resourceTitle: {
        fontSize: '15px',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '15px'
    },
    actionRow: {
        display: 'flex',
        gap: '8px',
        width: '100%'
    },
    miniBtn: {
        flex: 1,
        padding: '12px',
        fontSize: '12px',
        fontWeight: '900',
        borderRadius: '12px',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
};

export default SelectionFlow;