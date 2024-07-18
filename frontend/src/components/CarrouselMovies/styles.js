// Example styles object
const styles = {
  carousel: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    maxWidth: '75vw',
    backgroundColor: 'pink'
  },
  movie: {
    maxWidth: '100%',
    backgroundColor: 'pink',
    flex: 'none',
    margin: '14px   '
  },
  image_div: {
    width: '100%',
    height: '400px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    boxSizing: 'border-box',
    border: '2px solid black',
    borderRadius: '12px',
    maxWidth: '100%'
  },
  title: {
    display: 'block',
    textAlign: 'center',
    position: 'relative',
    bottom: '30px',
    color: 'white',
    fontFamily: 'Bebas Neue',
    fontSize: '1.5rem'
  }
}

export default styles
