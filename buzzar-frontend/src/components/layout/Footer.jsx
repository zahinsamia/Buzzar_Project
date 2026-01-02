// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer
      style={{
        padding: "1rem",
        borderTop: "1px solid #ddd",
        marginTop: "2rem",
        textAlign: "center",
      }}
    >
      <small>© {new Date().getFullYear()} Buzzar. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
