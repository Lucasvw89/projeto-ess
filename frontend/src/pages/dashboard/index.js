import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import StarsRating from '../../components/StarsRating';
import styles from './styles';
import CreatePost from '../../services/posts/CreatePost';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/")
    };

    const handlePost = async () => {
        const response = await CreatePost(1, "d9613d10-3330-11ef-808d-490c8ec6fe12", 5, "HAHAHAHHAHAHAHHAHAHAH");
        console.log(response)
    }

    return (
        <div style={styles.container}>
            <div>
                <h1>Bem vindo ao dashboard</h1>
                <StarsRating/>
                <Button variant="contained" color="primary" onClick={handleBack}>
                    Voltar
                </Button>
                <Button variant="contained" color="primary" onClick={handlePost}>
                    Criar post
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;