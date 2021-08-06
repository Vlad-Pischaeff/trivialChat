import { useState, useCallback } from 'react'
// import { useGlobalCredentialsContext } from '../context/context'

function UserException(val, status) {
  this.status = status
  this.val = val
}

export const useFetch = () => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  // const { credentials } = useGlobalCredentialsContext()
  const credentials  = {}
  const header = Object.keys(credentials).length !== 0 
    ? { 'Content-Type': 'application/json', Authorization: credentials.token }
    : { 'Content-Type': 'application/json' }

  const request = useCallback( 
    async (url, method = 'GET', body = null, headers = header) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
        }

        const response = await fetch(url, {method, body, headers})
        const data = await response.json()
        
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
  }, [])

  return { request, loading, error, header }
}