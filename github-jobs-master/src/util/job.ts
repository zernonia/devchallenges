import { reactive } from 'vue'
import { Job } from './interface'

export const state = reactive({
  joblist: [] as Job[],
  job: {} as Job,
  loading: false,
  searchTerm: '',
  searchFullTime: false,
  searchLocation: '',
  currentPage: 1,
  jobListArray: [] as Array<Job[]>,
  totalPage: (count = 5) => {
    state.jobListArray = []
    const loopCount = state.joblist.length/count
    for( let i = 0 ; i < loopCount ; i++){
      const temp: [] = state.joblist.slice(i*count,i*count + count) as []
      state.jobListArray.push(temp)
    } 
  },
  getData: async (description: string, fullTime = false, location = "") => {
    state.loading = true
    const data = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&full_time=${fullTime}&location=${location}`).then(res => res.json())
    state.loading = false
    state.joblist = data
    state.totalPage(5)
    
  },
  getSingleData: async (id: string) => {
    const data = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${id}.json`).then(res => res.json())
    state.job = data
  },
  getSelectedData: (id: string) => {
    const data =  state.joblist.filter( job => {
      return job.id == id
    })
    state.job = data[0]
  },
  convertTime: (createdAt: string) => {
    const now: number = Date.now() 
    const created: number = Date.parse(createdAt)
    const diff: number = now - created

    const Month: number = 1000*60*60*24*30
    const Week: number = 1000*60*60*24*7
    const Day: number = 1000*60*60*24
    const Hour: number = 1000*60*60

    let val: string
    
    diff > Month ? val = `${ Math.floor(diff / Month) } Months ago` : 
    diff > Week ? val =`${ Math.floor(diff / Week) } Weeks ago` :
    diff > Day ? val =`${ Math.floor(diff / Day) } Days ago` :
    diff > Hour ? val =`${ Math.floor(diff / Hour) } Hours ago` : val =`Recently`
    return val
  }
})