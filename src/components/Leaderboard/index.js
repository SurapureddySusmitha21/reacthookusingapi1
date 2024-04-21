import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {LeaderboardContainer, LoadingViewContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  prograss: 'IN_PROGRESS',
  success: 'SUCCESS',
  error: 'ERROR',
}

const Leaderboard = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  useEffect(() => {
    const getLeaderBoardData = async () => {
      setApiResponse({
        status: apiStatusConstants.prograss,
        data: null,
        errorMsg: null,
      })
      const url = 'https://apis.ccbp.in/leaderboard'
      const options = {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
    }

    getLeaderBoardData()
  }, [])

  const getProgressData = () => (
    <LoadingViewContainer>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoadingViewContainer>
  )

  const getSuccessData = () => console.log('Data')

  const getErrorData = () => console.log('Error')

  // Your code goes here...
  const renderLeaderboard = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.prograss:
        return getProgressData()
      case apiStatusConstants.success:
        return getSuccessData()
      case apiStatusConstants.error:
        return getErrorData()
      default:
        return null
    }
    // Your code goes here...
  }

  return <LeaderboardContainer>{renderLeaderboard()}</LeaderboardContainer>
}

export default Leaderboard
