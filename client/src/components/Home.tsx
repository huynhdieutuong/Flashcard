import { Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import LoadingComponent from '../LoadingComponent'
import Categories from './Categories'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axiosClient.get('category')
        setCategories(res.data)
        setLoading(false)
      } catch (error) {
        setCategories([])
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <LoadingComponent message='Loading...' />

  return (
    <div>
      <Switch
        checked={checked}
        onChange={(e: any) => setChecked(e.target.checked)}
      />
      {checked && <Categories categories={categories} />}
    </div>
  )
}

export default Home
