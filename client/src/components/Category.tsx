import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import LoadingComponent from '../LoadingComponent'
import AddOrEditWordModal from './AddNewWordModal'
import Cards, { Card } from './Cards'
import LearnModal from './LearnModal'

const Category = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [englishFirst, setEnglishFirst] = useState(true)
  const [mix, setMix] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        const res = await axiosClient.get(`card/${id}`)
        setCards(res.data)
        setLoading(false)
      } catch (error) {
        setCards([])
        setLoading(false)
      }
    }

    fetchCards()
  }, [id])

  const updateCards = (type: string, card: Card) => {
    if (type === 'add') {
      setCards([{ ...card }, ...cards])
    } else {
      setCards(cards.map((c) => (c.id === card.id ? card : c)))
    }
  }

  if (loading) return <LoadingComponent message='Loading...' />

  return (
    <div>
      <Stack
        sx={{ py: 4, justifyContent: 'space-between' }}
        direction='row'
        spacing={2}
      >
        {id === '1' ? (
          <AddOrEditWordModal
            type='add'
            categoryId={Number(id)}
            updateCards={updateCards}
          />
        ) : (
          <span></span>
        )}
        <Box>
          <TextField
            id='amount'
            label='Amount'
            variant='outlined'
            size='small'
            sx={{ mr: 2, width: '100px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={englishFirst}
                onChange={(e: any) => setEnglishFirst(e.target.checked)}
              />
            }
            label='English'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mix}
                onChange={(e: any) => setMix(e.target.checked)}
              />
            }
            label='Mix'
          />
          <LearnModal cards={cards} />
        </Box>
      </Stack>
      <Cards cards={cards} updateCards={updateCards} />
    </div>
  )
}

export default Category
