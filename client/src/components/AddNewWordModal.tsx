import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Add, Close } from '@mui/icons-material'
import { Alert, IconButton, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { Card } from './Cards'
import axiosClient from '../api/axiosClient'

interface Props {
  type: 'add' | 'edit'
  categoryId: number
  card?: Card
  updateCards: (type: string, card: Card) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 600 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
}

const AddOrEditWordModal = ({ type, categoryId, card, updateCards }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [loading, setLoading] = useState(false)
  const initData = {
    english: '',
    vietnamese: '',
    categoryId,
  }
  const [data, setData] = useState(initData)
  const [error, setError] = useState(null)

  const handleChangeData = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!data.english || !data.vietnamese) return
    try {
      setLoading(true)
      let res
      if (type === 'add') {
        res = await axiosClient.post('card', data)
      } else {
        res = await axiosClient.put(`card/${card?.id}`, data)
      }
      updateCards(type, res.data)
      setLoading(false)
      handleClose()
      setData(initData)
    } catch (error: any) {
      setLoading(false)
      setError(error.response.data.title)
    }
  }

  useEffect(() => {
    if (card) {
      setData({
        english: card.english,
        vietnamese: card.vietnamese,
        categoryId: card.categoryId,
      })
    }
  }, [card])

  return (
    <>
      {type === 'add' ? (
        <Button
          variant='contained'
          color='secondary'
          startIcon={<Add />}
          onClick={handleOpen}
        >
          Add new word
        </Button>
      ) : (
        <Button color='secondary' onClick={handleOpen}>
          Edit
        </Button>
      )}
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id='modal-modal-title' variant='h6'>
              {type === 'add' ? 'Add new word' : 'Edit word'}
            </Typography>
            <IconButton aria-label='close' onClick={handleClose}>
              <Close fontSize='large' />
            </IconButton>
          </Box>
          {error && <Alert severity='error'>{error}</Alert>}
          <Box
            id='modal-modal-description'
            noValidate
            component='form'
            sx={{ mt: 2 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='english'
              label='English'
              name='english'
              autoComplete='english'
              autoFocus
              value={data.english}
              onChange={handleChangeData}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='vietnamese'
              label='Vietnamese'
              id='vietnamese'
              autoComplete='vietnamese'
              value={data.vietnamese}
              onChange={handleChangeData}
            />
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              size='large'
              onClick={handleSubmit}
            >
              {type === 'add' ? 'Add' : 'Update'}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddOrEditWordModal
