import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'

interface Category {
  id: string
  name: string
  cardsCount: number
}
interface Props {
  categories: Category[]
}

const Categories = ({ categories }: Props) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 5,
          width: 250,
          height: 250,
        },
      }}
    >
      {categories.map((category) => (
        <Paper
          key={category.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`category/${category.id}`)}
        >
          <Typography variant='h4' gutterBottom>
            {category.name.toUpperCase()}
          </Typography>
          <Typography variant='h5'>{category.cardsCount} words</Typography>
        </Paper>
      ))}
    </Box>
  )
}

export default Categories
