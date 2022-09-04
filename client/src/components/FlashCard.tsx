import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FilledInput,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Card } from './Cards'

interface Props {
  card: Card
  englishFirst: boolean
  showWord: boolean
  setShowWord: (showWord: boolean) => void
}

const FlashCard = ({ card, englishFirst, setShowWord, showWord }: Props) => {
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
        }}
      >
        <Box>
          <Typography variant='h2'>
            {englishFirst ? card.english : card.vietnamese}
          </Typography>
          <FilledInput
            id='filled-adornment-password'
            type={showWord ? 'text' : 'password'}
            sx={{
              color: 'white',
              fontSize: '1.5rem',
              backgroundColor: 'unset',
              '&:hover': {
                backgroundColor: 'unset',
                '&:not(.Mui-disabled):before': { borderBottom: 'none' },
              },
              '&:before': { borderBottom: 'none' },
            }}
            value={englishFirst ? card.vietnamese : card.english}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowWord(!showWord)}
                  edge='end'
                  sx={{ color: 'white' }}
                >
                  {showWord ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Box>
    </>
  )
}

export default FlashCard
