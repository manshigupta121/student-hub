import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Using Lucide-React for clean, modern icons
import { 
    FiPlusCircle, 
    FiBookOpen, 
    FiClock, 
    FiCalendar, 
    FiBriefcase, 
    FiTrash2, 
    FiAlertCircle 
} from 'react-icons/fi';

const Scheduler = ({ styles }) => {
    const [schedule, setSchedule] = useState([]);
    const [form, setForm] = useState({ day: '', subject: '', time: '', books: '' });

    const fetchSchedule = () => {
        axios.get('http://localhost:5000/api/schedule')
            .then(res => setSchedule(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const deleteItem = (id) => {
        if (window.confirm("Are you sure you want to delete this lecture permanently?")) {
            axios.delete(`http://localhost:5000/api/schedule/${id}`)
                .then(() => {
                    setSchedule(schedule.filter(item => item._id !== id));
                })
                .catch(err => {
                    console.error("Delete failed:", err);
                    alert("Could not delete from database.");
                });
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hourMin = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            schedule.forEach(item => {
                if (item.time === hourMin && now.getSeconds() === 0) {
                    alert(`⏰ TIME FOR CLASS: ${item.subject}\nPack: ${item.books}`);
                    axios.post('http://localhost:5000/api/notifications', {
                        title: `Class Reminder: ${item.subject}`,
                        link: "/home",
                        date: new Date()
                    }).catch(err => console.error("Notification log failed:", err));
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [schedule]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.time || !form.subject) return alert("Please set a time and subject!");

        axios.post('http://localhost:5000/api/schedule', form)
            .then(() => {
                fetchSchedule();
                setForm({ day: '', subject: '', time: '', books: '' });
            })
            .catch(err => console.error("Save failed:", err));
    };

    // Custom UI Overrides for the "Modern" look
    const uiStyles = {
        labelIcon: { marginRight: '8px', verticalAlign: 'middle', color: '#6366f1' },
        inputContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
        formIcon: { position: 'absolute', left: '12px', color: '#94a3b8' }
    };

    return (
        <div style={{ animation: 'fadeInUp 0.6s ease' }}>
            <style>
                {`
                .glass-input {
                    padding-left: 40px !important;
                    transition: all 0.3s ease !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                }
                .glass-input:focus {
                    background: white !important;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1) !important;
                    border-color: #6366f1 !important;
                }
                .btn-glow:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 20px rgba(99, 102, 241, 0.3) !important;
                }
                .card-hover:hover {
                    transform: scale(1.02);
                    background: rgba(255, 255, 255, 0.9) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
                }
                .delete-btn-animated {
                    padding: 10px;
                    border-radius: 12px;
                    transition: all 0.2s;
                }
                .delete-btn-animated:hover {
                    background: #fee2e2;
                    color: #ef4444 !important;
                }
                `}
            </style>

            {/* Input Section */}
            <section className="glass-card" style={styles.formCard}>
                <h3 style={{...styles.sectionTitle, display: 'flex', alignItems: 'center'}}>
                    <FiPlusCircle style={uiStyles.labelIcon} /> Add New Lecture
                </h3>
                <div style={styles.inputGroup}>
                    <div style={uiStyles.inputContainer}>
                        <FiCalendar style={uiStyles.formIcon} />
                        <input className="glass-input" placeholder="Day (e.g. Monday)" value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} style={styles.input} />
                    </div>
                    <div style={uiStyles.inputContainer}>
                        <FiBookOpen style={uiStyles.formIcon} />
                        <input className="glass-input" placeholder="Subject Name" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={styles.input} />
                    </div>
                    <div style={uiStyles.inputContainer}>
                        <FiClock style={uiStyles.formIcon} />
                        <input className="glass-input" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={styles.input} />
                    </div>
                    <div style={uiStyles.inputContainer}>
                        <FiBriefcase style={uiStyles.formIcon} />
                        <input className="glass-input" placeholder="Books/Resources" value={form.books} onChange={e => setForm({ ...form, books: e.target.value })} style={styles.input} />
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn-glow" style={{...styles.addButton, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                    <FiPlusCircle /> Save to Schedule
                </button>
            </section>

            {/* List Section */}
            <div style={styles.listContainer}>
                {schedule.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.4)', borderRadius: '20px' }}>
                        <FiAlertCircle size={40} style={{color: '#94a3b8', marginBottom: '10px'}} />
                        <p style={{ color: '#64748b', fontWeight: '500' }}>Your schedule is empty.</p>
                    </div>
                ) : (
                    schedule.map((item, index) => (
                        <div
                            key={item._id}
                            className="glass-card card-hover"
                            style={{ 
                                ...styles.card, 
                                animation: `fadeInUp ${0.3 + index * 0.1}s ease`,
                                transition: 'all 0.3s ease',
                                marginBottom: '15px'
                            }}
                        >
                            <div style={styles.cardAccent}></div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{...styles.subjectText, color: '#1e293b', letterSpacing: '-0.5px'}}>{item.subject}</h4>
                                <div style={{display: 'flex', gap: '15px', marginTop: '5px'}}>
                                    <span style={{...styles.cardText, display: 'flex', alignItems: 'center', gap: '5px'}}>
                                        <FiClock size={14} style={{color: '#6366f1'}} /> {item.time}
                                    </span>
                                    <span style={{...styles.cardText, display: 'flex', alignItems: 'center', gap: '5px'}}>
                                        <FiCalendar size={14} style={{color: '#6366f1'}} /> {item.day}
                                    </span>
                                </div>
                                <div style={{...styles.booksText, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content'}}>
                                    <FiBriefcase size={12} /> {item.books || 'No resources added'}
                                </div>
                            </div>
                            <button
                                className="delete-btn-animated"
                                onClick={() => deleteItem(item._id)}
                                style={{...styles.deleteBtn, color: '#cbd5e1', border: 'none', background: 'transparent'}}
                            >
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Scheduler;