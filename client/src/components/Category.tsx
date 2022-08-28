import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import LoadingComponent from '../LoadingComponent'
import AddOrEditWordModal from './AddNewWordModal'
import Cards, { Card } from './Cards'
import { Category as Cat } from './Categories'
import LearnModal from './LearnModal'

const Category = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [category, setCategory] = useState<Cat | null>(null)
  const [englishFirst, setEnglishFirst] = useState(true)
  const [mix, setMix] = useState(false)
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        const [resCard, resCategory] = await Promise.all([
          axiosClient.get(`card/${id}`),
          axiosClient.get(`category/${id}`),
        ])
        setCards(resCard.data)
        setCategory(resCategory.data)
        setLoading(false)
      } catch (error) {
        setCards([])
        setCategory(null)
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

  if (loading || !category) return <LoadingComponent message='Loading...' />

  return (
    <div>
      <Stack
        sx={{ py: 4, justifyContent: 'space-between' }}
        direction='row'
        spacing={2}
      >
        {category!.isMain ? (
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
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
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
          <LearnModal
            cards={cards}
            setCards={setCards}
            category={category}
            englishFirst={englishFirst}
            mix={mix}
            amount={amount}
          />
        </Box>
      </Stack>
      <Cards cards={cards} updateCards={updateCards} />
    </div>
  )
}

export default Category
