const GlobalPages = { state: 'login' }

export const usePages = () => {
  
  const setGlobalPages = (i) => {
    GlobalPages.state = i
  }

  return { 
    GlobalPages,
    setGlobalPages  }
}