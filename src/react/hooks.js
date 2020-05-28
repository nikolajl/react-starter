import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { InitialDataContext } from './context'


export const useInitialData = (asyncLoad) => {
  const initialData = useContext(InitialDataContext)
  const [data, setdata] = useState(initialData)

  useEffect(() => {
    if (!initialData) {
      (async () => {
        const result = await asyncLoad()
        setdata(result)
      })()
    }
  }, [])

  return data
}

