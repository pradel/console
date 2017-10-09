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
import DashboardViewSidenav from './DashboardViewSidenav'

interface Props {
  params: any
  project: Project
  crm: any
  showPopup: (popup: Popup) => void
}

class DashboardView extends React.Component<Props, {}> {
  render() {
    const { params, project, crm } = this.props
    const projectNode = crm.crm.customer.projects.edges.find(edge => {
      return edge.node.systemProjectId === this.props.project.id
    })
    return (
      <div>
        <style jsx={true}>{`
          .container {
            @p: .flex;
          }
          .left {
            @p: .flex1;
          }
          .right {
            flex: 0 280px;
          }
        `}</style>
        <DashboardViewHeader
          params={params}
          project={project}
          crmProject={projectNode}
          onOpenEnpoints={this.onOpenEnpoints}
        />
        <div className="container">
          <div className="left">
            <DashboardViewGraphs />
          </div>
          <div className="right">
            <DashboardViewSidenav />
          </div>
        </div>
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
  crm: props => props.viewer.crm,
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
        seats(first: 1000) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
      crm: user {
        name
        email
        crm {
          customer {
            id
            projects(first: 1000) {
              edges {
                node {
                  id
                  name
                  systemProjectId
                  projectBillingInformation {
                    plan
                    invoices(first: 1000) {
                      edges {
                        node {
                          usageRequests
                          usageStorage
                          overageStorage
                          overageRequests
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
})
