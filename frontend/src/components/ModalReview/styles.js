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
    zIndex: 2
  },
  modal: {
    width: '73%',
    margin: '0 auto',
    padding: '3rem',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '22px'
  },
  cotainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  exit: {
    display: 'flex'
  },
  exit__btn: {
    marginLeft: 'auto',
    cursor: 'pointer'
  },
  body: {
    display: 'flex'
  },
  image: {
    marginRight: '2rem'
  },
  imageContent: {
    maxWidth: '19rem',
    height: 'auto',
    borderRadius: '12px',
    border: '2px solid #000'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginBottom: '2rem'
  },
  title__text: {
    fontWeight: '400',
    fontSize: '2rem'
  },
  title__movie: {
    display: 'flex',
    alignItems: 'baseline'
  },
  title__movie_name: {
    fontFamily: 'Bebas Neue',
    fontSize: '3rem'
  },
  title__movie_year: {
    fontSize: '2.25rem',
    marginLeft: '1rem'
  },
  description: {
    fontSize: '1.2em',
    color: '#555'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  textarea: {
    backgroundColor: '#F6F6F6',
    fontFamily: 'Be Vietnam Pro',
    flex: 1,
    width: '90%',
    marginRight: '0.5rem',
    marginBottom: '1.5rem',
    padding: '10px',
    fontSize: '1rem', // Change to 1rem as per your request
    border: '1px solid #000', // Border size 1 and color #000
    borderRadius: '6px' // Border radius 4px
  },
  form__bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%'
  },
  form__bottom__nota_label: {
    fontFamily: 'Be Vietnam Pro',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.8rem'
  },
  button: {
    cursor: 'pointer',
    backgroundColor: '#FF182C',
    border: 'none',
    borderRadius: '12px',
    fontFamily: 'Be Vietnam Pro',
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '700',
    padding: '10px 1rem'
  }
}

export default styles
