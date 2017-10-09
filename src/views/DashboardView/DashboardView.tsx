import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { connect } from 'react-redux'
import cuid from 'cuid'
import mapProps from '../../components/MapProps/MapProps'
import { Project } from '../../types/types'
import { Popup } from '../../types/popup'
import { showPopup } from '../../actions/popup'
import EndpointPopup from '../ProjectRootView/EndpointPopup'
import DashboardViewHeader from './DashboardViewHeader'
import DashboardViewGraphs from './DashboardViewGraphs'

interface Props {
  params: any
  project: Project
  showPopup: (popup: Popup) => void
}

class DashboardView extends React.Component<Props, {}> {
  render() {
    const { params, project } = this.props
    return (
      <div>
        <DashboardViewHeader
          params={params}
          onOpenEnpoints={this.onOpenEnpoints}
        />
        <DashboardViewGraphs />
      </div>
    )
  }

  private onOpenEnpoints = () => {
    const id = cuid()
    this.props.showPopup({
      element: (
        <EndpointPopup
          id={id}
          projectId={this.props.project.id}
          alias={this.props.project.alias}
          region={this.props.project.region}
        />
      ),
      id,
    })
  }
}

const ReduxContainer = connect(null, {
  showPopup,
})(DashboardView)

const MappedFunctionsView = mapProps({
  project: props => props.viewer.project,
})(ReduxContainer)

export default createFragmentContainer(MappedFunctionsView, {
  viewer: graphql`
    fragment DashboardView_viewer on Viewer {
      id
      project: projectByName(projectName: $projectName) {
        id
        name
        alias
        region
      }
    }
  `,
})
