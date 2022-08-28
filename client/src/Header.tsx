import { Home } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from './api/axiosClient'
import { Card } from './components/Cards'
import useOutsideAlerter from './hooks/useOutsideAlerter'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 15,
  width: '60%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const Header = () => {
  const navigate = useNavigate()
  const ref = useRef<null | ReturnType<typeof setTimeout>>(null)
  const [values, setValues] = useState<Card[] | null>(null)
  const [hideSearch, setHideSearch] = useState(true)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, () => setHideSearch(true))

  const handleSearch = (e: any) => {
    if (ref.current) clearTimeout(ref.current)
    ref.current = setTimeout(async () => {
      try {
        const res = await axiosClient.get(`card?key=${e.target.value}`)
        setValues(res.data)
        setHideSearch(false)
      } catch (error) {
        setValues(null)
      }
    }, 500)
  }

  const renderTableSearch = (cards: Card[]) => {
    return (
      <TableContainer
        ref={wrapperRef}
        component={Paper}
        sx={{ position: 'absolute', top: '60px', zIndex: '100' }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Num.</TableCell>
              <TableCell align='right'>English</TableCell>
              <TableCell align='right'>Vietnames</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!cards.length ? (
              <TableRow>
                <TableCell>No words found!</TableCell>
              </TableRow>
            ) : (
              cards.map((card, index) => (
                <TableRow
                  key={card.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='right'>{card.english}</TableCell>
                  <TableCell align='right'>{card.vietnamese}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Toolbar sx={{ position: 'relative' }}>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { sm: 'block' } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                <Home fontSize='medium' /> HOME
              </Box>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
            </Search>
            {!hideSearch && values && renderTableSearch(values)}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header
