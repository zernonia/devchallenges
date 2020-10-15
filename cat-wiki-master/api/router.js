const express = require('express')
const axios = require('axios')
const Search = require('./model')

axios.defaults = {
  headers: {
    'x-api-key': process.env.API_KEY,
  },
}

const router = express.Router()

router.get('/listCats', (req, res) => {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((e) => res.status(400).json(e))
})

router.get('/getCatImages/:id', (req, res) => {
  axios
    .get(
      `https://api.thecatapi.com/v1/images/search?size=thumb&breed_id=${req.params.id}&limit=8`
    )
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((e) => res.status(400).json(e))
})

router.get('/getSearchCount', (req, res) => {
  Search.find()
    .sort({ count: -1 })
    .limit(10)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
})

router.get('/updateSearchCount/:id', (req, res) => {
  const breed_id = req.params.id
  Search.findOne({ breed_id })
    .then(async (response) => {
      if (response == null) {
        const { data } = await axios.get(
          `https://api.thecatapi.com/v1/images/search?size=thumb&breed_id=${breed_id}&limit=1`
        )
        Search.create({
          breed_id,
          description: data[0].breeds[0].description,
          name: data[0].breeds[0].name,
          count: 1,
          image: data[0].url,
        })
          .then((createNewResponse) => res.status(200).json(createNewResponse))
          .catch((e) => {
            res.status(400).json(e)
          })
      } else {
        response.count++
        response.save()
        res.status(200).json(response)
      }
    })
    .catch((e) => {
      res.status(400).json(e)
    })
})

module.exports = router
