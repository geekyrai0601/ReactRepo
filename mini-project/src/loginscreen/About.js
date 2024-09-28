import React from "react";

function About() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>About Us</h1>
            <p style={styles.description}>
                About Page 
            </p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '50px auto',
        textAlign: 'center',
    },
    title: {
        color: '#333',
        fontSize: '2.5em',
        marginBottom: '20px',
    },
    description: {
        fontSize: '1.2em',
        color: '#555',
        lineHeight: '1.6',
    },
};

export default About;
