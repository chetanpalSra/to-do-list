import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About This To-Do List App</h1>
      <p style={styles.text}>
        This To-Do List application is designed to help you stay organized and
        productive. Whether you need to track daily tasks, manage a project, or
        simply jot down reminders, this app provides an easy-to-use interface to
        manage your to-dos effectively.
      </p>
      <h2 style={styles.subheader}>Key Features:</h2>
      <ul style={styles.list}>
        <li>🌟 Add tasks quickly and effortlessly.</li>
        <li>
          <i className="fas fa-edit" style={styles.icon}></i> Edit tasks to
          update details and keep your to-do list up to date.
        </li>
        <li>🗑️ Delete tasks you no longer need.</li>
        <li>🎨 User-friendly interface with responsive design.</li>
      </ul>
      <p style={styles.text}>
        Get started now and take control of your tasks to achieve more every
        day!
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
  },
  text: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
  },
  subheader: {
    fontSize: "1.5rem",
    color: "#444",
    marginTop: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    color: "#666",
  },
};

export default About;
