import { reactive, ref } from 'vue'
import { Quote } from './interface'
import axios from './axios'

let page = 1
let currentAuthor = ''

export const storeQuote = reactive({
  quote : ref<Quote>({
    _id: '',
    quoteAuthor: '',
    quoteGenre: '',
    quoteText: ''
  }),
  quotes : ref<Quote[]>([]),
  loading : ref<boolean>(false),
  getQuote : async () => {
    storeQuote.loading = true
    const { data } = await axios.get('/quotes/random')
    storeQuote.quote = data.quote
    storeQuote.loading = false
  },
  getQuotes : async ( author: string ) => {
    if (currentAuthor == author) {
      page++
    } else {
      currentAuthor = author
      page = 1
    } 
    
    storeQuote.loading = true
    const { data } = await axios.get(`/authors/${ author }?page=${ page }&limit=10`)
    storeQuote.quotes = data.quotes
    storeQuote.loading = false

  }
})
