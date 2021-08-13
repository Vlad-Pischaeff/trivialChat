import { useState, useCallback } from 'react'
import { $G } from '../service/Service'

function UserException(val, status) {
  this.status = status
  this.val = val
}

export const useFetch = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const header = Object.keys($G.ACC).length !== 0 
    ? { 'Content-Type': 'application/json', Authorization: $G.ACC.token }
    : { 'Content-Type': 'application/json' }

  const request = useCallback( 
    async (url, method = 'GET', body = null, headers = header) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
        }

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
  }, [header])

  return { request, loading, error, header }
}