import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Card } from './Cards'

interface Props {
  card: Card
}

const FlashCard = ({ card }: Props) => {
  return (
    <>
      <Box
        sx={{
          background: 'black',
          color: 'white',
          width: '80%',
          height: '300px',
          m: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          transformStyle: 'preserve-3d',
          transition: 'all 0.4s ease-in-out',
          '&:hover': {
            transform: 'rotateY(180deg)',
            transition: 'all 0.4s ease-in-out',
          },
        }}
      >
        <Box
          sx={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            overflow: 'hidden',
          }}
        >
          <Typography variant='h2'>{card.english}</Typography>
        </Box>
        <Box
          sx={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            position: 'absolute',
            overflow: 'hidden',
          }}
        >
          <Typography variant='h2'>{card.vietnamese}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default FlashCard
