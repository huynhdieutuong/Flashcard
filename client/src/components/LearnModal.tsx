import { Close } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { Card } from './Cards'
import FlashCard from './FlashCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Category } from './Categories'
import axiosClient from '../api/axiosClient'
import { LoadingButton } from '@mui/lab'

interface Props {
  cards: Card[]
  setCards: (cards: Card[]) => void
  category: Category
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

const LearnModal = ({ cards, setCards, category }: Props) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setCurrent(0)
  }

  const handleNavigate = (position: 'left' | 'right') => {
    if (position === 'left' && current > 0) {
      setCurrent(current - 1)
    }

    if (position === 'right' && current < cards.length - 1) {
      setCurrent(current + 1)
    }
  }

  const changeCategory = async (categoryId: number) => {
    const countCards = cards.length - 1
    try {
      setLoading(true)
      await axiosClient.put(`card/${cards[current].id}`, {
        english: cards[current].english,
        vietnamese: cards[current].vietnamese,
        categoryId,
      })
      setCards(cards.filter((card) => card.id !== cards[current].id))
      if (current === countCards) setCurrent(current - 1)
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
            {category.isMain ? (
              <LoadingButton
                loading={loading}
                onClick={() => changeCategory(Number(category.id) + 1)}
              >
                Remembered
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={loading}
                onClick={() => changeCategory(Number(category.id) - 1)}
              >
                Not remember
              </LoadingButton>
            )}
            <IconButton aria-label='close' onClick={handleClose}>
              <Close fontSize='large' />
            </IconButton>
          </Box>
          <FlashCard card={cards[current]} />
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
              {`${current + 1} / ${cards.length}`}
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
