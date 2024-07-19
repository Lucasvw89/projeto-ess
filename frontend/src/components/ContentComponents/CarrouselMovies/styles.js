// Example styles object
const styles = {
  carouselContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  carousel: {
    display: 'flex',
    overflowX: 'hidden',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    maxWidth: '86vw',
    backgroundColor: 'pink'
  },
  carouselDiv: {
    display: 'flex'
  },
  divTitle: {
    width: '92vw',
    display: 'flex',
    alignItems: 'left',
    backgroundColor: 'pink'
  },
  p: {
    margin: '0',
    padding: '0',
    paddingLeft: '28px',
    fontFamily: 'Bebas Neue',
    fontSize: '2rem',
    textAlign: 'left'
  },
  movie: {
    maxWidth: '100%',
    backgroundColor: 'pink',
    flex: 'none',
    margin: '14px'
  },
  image_div: {
    width: '100%',
    height: '400px'
    // background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.48679982246804976) 41%, rgba(255,255,255,0) 78%)'
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
  },
  leftClickArea: {
    backgroundColor: 'pink',
    border: 'none',
    width: '3vw',
    height: 'auto',
    cursor: 'pointer'
  },
  rightClickArea: {
    backgroundColor: 'pink',
    border: 'none',
    width: '3vw',
    height: 'auto',
    cursor: 'pointer'
  }
}

export default styles
