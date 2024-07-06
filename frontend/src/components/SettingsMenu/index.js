import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { HiDotsVertical } from 'react-icons/hi'
import styles from './styles'
import DeletePost from '../../services/posts/DeletePost'

export default function SettingsMenu({ post, user_id, setModalOpen, setIsEditing, setReload }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    if (post.user_id == user_id) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDeletar = async () => {
    const response = await DeletePost(post.post_id, post.user_id, post.filme_id)
    if (response.status === 200) {
      setAnchorEl(null)
      setReload()
    }
  }
  const handleEditar = () => {
    setIsEditing()
    setAnchorEl(null)
    setModalOpen()
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={styles.settings__menu__button}
      >
        <HiDotsVertical />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
        <MenuItem onClick={handleDeletar}>Deletar</MenuItem>
      </Menu>
    </div>
  )
}
