import React, { useState } from 'react';

const QuantumSection = () => {
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [quantums, setQuantums] = useState([]);

    const fetchQuantums = (branch) => {
        setSelectedBranch(branch);
        // Fetching from your MongoDB based on branch
        fetch(`https://student-hub-l8yf.onrender.com/api/quantums/${branch}/all`)
            .then(res => res.json())
            .then(data => setQuantums(data))
            .catch(err => console.error("Error fetching quantums:", err));
    };

    return (
        <div style={styles.content}>
            <h3>Quantum Series (PDFs)</h3>
            
            {/* Branch Selection Grid */}
            {!selectedBranch ? (
                <div style={styles.grid}>
                    {['CS/IT', 'Mechanical', 'Electrical', 'Civil'].map(b => (
                        <div 
                            key={b} 
                            style={styles.box} 
                            onClick={() => fetchQuantums(b)}
                        >
                            {b}
                        </div>
                    ))}
                </div>
            ) : (
                /* The Quantum List (Download Section) */
                <div>
                    <button 
                        onClick={() => setSelectedBranch(null)} 
                        style={styles.backButton}
                    >
                        ← Back
                    </button>
                    <h4>Available PDFs for {selectedBranch}:</h4>
                    <ul style={styles.list}>
                        {quantums.length > 0 ? (
                            quantums.map((item, index) => (
                                <li key={index} style={styles.item}>
                                    <span>📄 {item.subjectName}</span>
                                    <a 
                                        href={item.pdfUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        download 
                                        style={styles.downloadLink}
                                    >
                                        Download
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Loading PDFs...</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Inline Styles Object
const styles = {
    content: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginTop: '20px'
    },
    box: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        border: '1px solid #ddd',
        transition: 'transform 0.2s',
    },
    backButton: {
        marginBottom: '15px',
        padding: '5px 10px',
        cursor: 'pointer'
    },
    list: {
        listStyle: 'none',
        padding: 0
    },
    item: {
        padding: '12px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    downloadLink: {
        color: 'green',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default QuantumSection;