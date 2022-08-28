import { Close } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { Card } from './Cards'
import FlashCard from './FlashCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  cards: Card[]
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

const LearnModal = ({ cards }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [current, setCurrent] = useState(1)

  const handleNavigate = (position: 'left' | 'right') => {
    if (position === 'left' && current > 1) {
      setCurrent(current - 1)
    }

    if (position === 'right' && current < cards.length) {
      setCurrent(current + 1)
    }
  }

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        Learn
      </Button>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ background: 'black' }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Button>Đã Thuộc</Button>
            <IconButton aria-label='close' onClick={handleClose}>
              <Close fontSize='large' />
            </IconButton>
          </Box>
          <FlashCard card={cards[current - 1]} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <IconButton
              aria-label='left'
              onClick={() => handleNavigate('left')}
            >
              <ArrowBackIosIcon fontSize='large' />
            </IconButton>
            <Typography variant='h5' sx={{ mx: 3 }}>
              {`${current} / ${cards.length}`}
            </Typography>
            <IconButton
              aria-label='right'
              onClick={() => handleNavigate('right')}
            >
              <ArrowForwardIosIcon fontSize='large' />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default LearnModal
