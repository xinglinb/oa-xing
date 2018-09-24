import React from 'react'
import { Route, Switch, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'

function Routes({ indexUrl, role }) {
  const Member = dynamic({
    component: () => import('./../../../routes/Member')
  })
  const Home = dynamic({
    component: () => import('./../../../routes/Home')
  })
  const Report = dynamic({
    component: () => import('./../../../routes/Report')
  })
  const FeedBack = dynamic({
    component: () => import('./../../../routes/FeedBack')
  })
  const Setting = dynamic({
    component: () => import('./../../../routes/Setting')
  })
  const NotFoundPage = dynamic({
    component: () => import('./../../../routes/NotFoundPage')
  })
  return (
    <Switch>
      <Route exact path={`${indexUrl}`} component={Home} />
      <Route path={`${indexUrl}member`} component={Member} />
      <Route path={`${indexUrl}feedback`} component={FeedBack} />
      <Route path={`${indexUrl}report`} component={Report} />
      <Route path={`${indexUrl}setting`} component={Setting} />
      <Route path={`${indexUrl}404`} component={NotFoundPage} />
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

export default Routes
