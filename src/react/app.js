import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route,  useLocation } from "react-router-dom";
import { routes } from './routes'
import { InitialDataContext } from './context'

export const App = ({data}) => (
  <InitialDataContext.Provider value={data}>
    <Switch>
      {routes.map((route, i) => (
        <Route {...route} key={i}/>
      ))}
    </Switch>
  </InitialDataContext.Provider>
)

export const Client = () => {
  const initialData = window.__INIT_DATA__
  const location = useLocation()

  useEffect(() => {
    delete window.__INIT_DATA__
  }, [location])

  return <App data={initialData}/>
}
