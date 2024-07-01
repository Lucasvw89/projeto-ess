import React, { useState } from 'react';
import { Rating } from '@mui/material';
import styles from './styles';
import CreatePost from '../../services/posts/CreatePost';

const ModalReview = ({ isOpen, setModalOpen, imageUrl, filme_id, filme_nome, filme_ano }) => {
    const [postText, setPostText] = useState('');
    const [rating, setRating] = useState(0);
    
    const handleCreatePost = async () => {
        const response = await CreatePost("Miguel Oliveira", filme_id, rating, postText);
        setModalOpen();
    };
    
    if (isOpen) {
        return (
            <div style={styles.background}>
                <div style={styles.container}>
                <div style={styles.image}>
                    <img src={imageUrl} alt="Modal Image" style={styles.imageContent} />
                </div>
                <div style={styles.content}>
                    <div onClick={setModalOpen}>X</div>
                    <div style={styles.text}>
                    <h2 style={styles.title}>{filme_nome}</h2>
                    <p style={styles.description}>{filme_ano}</p>
                    </div>
                    <div style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Enter something" 
                        style={styles.input} 
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />
                    <Rating 
                        name="simple-controlled" 
                        value={rating}
                        precision={0.5} 
                        onChange={(_, value) => {
                            setRating(value);
                          }}  
                    />
                    <button style={styles.button} onClick={handleCreatePost}>ENVIAR</button>
                    </div>
                </div>
                </div>
            </div>
          );
    } 
    return null;
};

export default ModalReview;
