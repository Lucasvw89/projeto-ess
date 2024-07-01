import zIndex from "@mui/material/styles/zIndex";

// Example styles object
const styles = {
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    container: {
      maxWidth: '80%',
      margin: '0 auto',
      padding: '1rem',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
    },
    image: {
      paddingRight: '54px',
      paddingTop: '2rem',
    },
    imageContent: {
      maxWidth: '19rem',
      height: 'auto',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text: {
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2em',
      marginBottom: '1rem',
      color: '#333',
    },
    description: {
      fontSize: '1.2em',
      color: '#555',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      marginRight: '0.5rem',
      padding: '10px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 1rem',
      fontSize: '16px',
    },
  };

export default styles