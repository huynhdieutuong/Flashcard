import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

interface Card {
  id: number
  english: string
  vietnamese: string
  categoryId: number
  ownerId: string
  createdDate: Date
  modifiedDate: Date
}

interface Props {
  cards: Card[]
}

const Cards = ({ cards }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Num.</TableCell>
            <TableCell align='right'>English</TableCell>
            <TableCell align='right'>Vietnames</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card, index) => (
            <TableRow
              key={card.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='right'>{card.english}</TableCell>
              <TableCell align='right'>{card.vietnamese}</TableCell>
              <TableCell align='right'>
                <Button color='secondary'>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Cards
