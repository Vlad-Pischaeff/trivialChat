import { useState } from 'react'
import { $G } from '../service/Service'

function UserException(val, status) {
  this.status = status
  this.val = val
}

export const useFetch = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const header = { 'Content-Type': 'application/json', 
                    ...( $G.ACC && $G.ACC.token && { Authorization: $G.ACC.token } )
                  }

  const request = async (url, method = 'GET', body = null, headers = header) => {
      setLoading(true)
      try {
        body = body ? JSON.stringify(body) : null

        const response = await fetch(url, {method, body, headers})
        // console.log('useFetch response ...', response)
        const data = await response.json()
        // console.log('useFetch data ...', data)
        if (!response.ok) {
          throw new UserException(Object.values(data), response.status) 
        }

        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e)
        throw e
      }
  }

  return { request, loading, error, header }
}