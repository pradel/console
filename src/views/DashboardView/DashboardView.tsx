import * as React from 'react'
import DashboardViewHeader from './DashboardViewHeader'
import DashboardViewGraphs from './DashboardViewGraphs'

interface Props {
  params: any
}

export default function DashboardView({ params }: Props) {
  return (
    <div>
      <DashboardViewHeader params={params} />
      <DashboardViewGraphs />
    </div>
  )
}
