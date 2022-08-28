import { Add } from '@mui/icons-material'
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import LoadingComponent from '../LoadingComponent'
import Cards from './Cards'

const Category = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])
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

  if (loading) return <LoadingComponent message='Loading...' />

  return (
    <div>
      <Stack
        sx={{ py: 4, justifyContent: 'space-between' }}
        direction='row'
        spacing={2}
      >
        <Button variant='contained' color='secondary' startIcon={<Add />}>
          Add new word
        </Button>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={mix}
                onChange={(e: any) => setMix(e.target.checked)}
              />
            }
            label='Mix'
          />
          <Button variant='contained'>Learn</Button>
        </Box>
      </Stack>
      <Cards cards={cards} />
    </div>
  )
}

export default Category
