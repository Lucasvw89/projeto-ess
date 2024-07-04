// src/pages/FilmDetail.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles'
import GetPage from '../../services/pages/GetPage'
import Post from '../../components/Post'
import { Button } from '@mui/material'
import ModalReview from '../../components/ModalReview'

const FilmDetail = () => {
  const { id } = useParams()
  const [user_id] = useState('Miguel Oliveira')
  const [page, setPage] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [reload, setReload] = useState(false)
  const [editingPostInfo, setEditingPostInfo] = useState([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const response = await GetPage(id)
      setPage(response.data)
    }
    fetchData()
  }, [openModal, reload])
  // Fetch the film details using the id, or use a state management solution.

  const handleOpenModal = () => {
    setIsEditing(false)
    setOpenModal(true)
  }

  return (
    <div style={styles.container}>
      <ModalReview
        isOpen={openModal}
        setModalOpen={() => {
          setOpenModal(!openModal)
        }}
        imageUrl={page.poster}
        user_id={user_id}
        filme_id={id}
        filme_ano={page.ano}
        filme_nome={page.nome}
        isEditing={isEditing}
        editingPostInfo={editingPostInfo}
        setIsEditing={() => {
          setIsEditing(!isEditing)
        }}
      />
      <div style={styles.content}>
        <h1 style={styles.title}>Detalhes do filme com id: {id}</h1>
        <p style={styles.synopsis}>{page.sinopse}</p>
        <div style={styles.detail}>
          <p>Diretor: {page.diretor}</p>
          <p>Ano: {page.ano}</p>
          <p>Genero: {page.genero}</p>
          <Button variant='contained' color='primary' onClick={handleOpenModal}>
            Poste um Review
          </Button>
        </div>
      </div>
      <div style={styles.forum}>
        <h3 style={styles.forum__title}>FÓRUM:</h3>
        {page.posts &&
          page.posts.map((post) => (
            <Post
              key={post.post_id}
              post={post}
              user_id={user_id}
              setModalOpen={() => {
                setOpenModal(!openModal)
              }}
              setIsEditing={() => {
                setEditingPostInfo(post)
                setIsEditing(true)
              }}
              setReload={() => {
                setReload(!reload)
              }}
            />
          ))}
      </div>
    </div>
  )
}

export default FilmDetail
