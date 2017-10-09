/* tslint:disable */
import * as cookiestore from 'cookiestore'
import * as React from 'react'
import { graphql } from 'react-relay'
// import { Route, IndexRoute, IndexRedirect, Redirect } from 'found'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import Redirect from 'found/lib/Redirect'

import Loading from './components/Loading/Loading'
import RedirectOnMount from './components/RedirectOnMount/RedirectOnMount'
import ActionsView from './views/ActionsView/ActionsView'
import AuthView from './views/AuthView/AuthView'
import CLIAuthView from './views/CLIAuthView/CLIAuthView/CLIAuthView'
import CLIAuthSuccessInitView from './views/CLIAuthView/CLIAuthSuccessInitView/CLIAuthSuccessInitView'
import CLIAuthSuccessView from './views/CLIAuthView/CLIAuthSuccessView'
import ProjectRootView from './views/ProjectRootView/ProjectRootView'
import RootRedirectView from './views/ProjectRootView/RootRedirectView'
import TokenRedirectView from './views/ProjectRootView/TokenRedirectView'
import ProjectSettingsView from './views/ProjectSettingsView/ProjectSettingsView'
import RootView from './views/RootView/RootView'
import AfterSignUpView from './views/AfterSignUpView/AfterSignUpView'
import AccountView from './views/account/AccountView/AccountView'
import SettingsTab from './views/account/AccountView/SettingsTab'
import DatabrowserView from './views/models/DatabrowserView/DatabrowserView'
import Settings from './views/Settings/Settings'
import General from './views/Settings/General/General'
import Authentication from './views/Settings/Authentication/Authentication'
import Export from './views/Settings/Export/Export'
import Team from './views/Settings/Team/Team'
import Billing from './views/Settings/Billing/Billing'
import ModelRedirectView from './views/models/ModelRedirectView'
import FieldPopup from './views/models/FieldPopup/FieldPopup'
import AuthProviderPopup from './views/models/AuthProviderPopup/AuthProviderPopup'
import PlaygroundView from './views/playground/PlaygroundView/PlaygroundView'
import PermissionsView from './views/PermissionsView/PermissionsView'
import PermissionPopup from './views/PermissionsView/PermissionPopup/PermissionPopup'
import RelationPermissionPopup from './views/PermissionsView/RelationPermissionPopup/RelationPermissionPopup'
import CloneProjectPopup from './views/ProjectRootView/CloneProjectPopup'
import AlgoliaView from './views/Integrations/Algolia/AlgoliaView'
import ShowRoom from './views/ShowRoom/ShowRoom'
import IntegrationsView from './views/Integrations/IntegrationsView'
import tracker from './utils/metrics'
import RelationPopup from './views/RelationsPopup/RelationPopup'
import ChangePricingPlan from './views/Settings/Billing/ChangePricingPlan'
import ConfirmPricingPlan from './views/Settings/Billing/ConfirmPricingPlan'
import SchemaView from './views/SchemaView/SchemaView'
import SchemaViewer from './views/SchemaView/SchemaViewer'
import AllRelationPermissionsList from './views/PermissionsView/RelationPermissionsList/AllRelationPermissionsList'
import PermissionsList from './views/PermissionsView/PermissionsList/PermissionsList'
import FunctionsView from './views/FunctionsView/FunctionsView'
import FunctionPopup from './views/FunctionsView/FunctionPopup/FunctionPopup'
import { FunctionLogs } from './views/FunctionsView/FunctionLogs/FunctionLogs'
import CliInfoPopup from './views/SchemaView/CliInfoPopup'
import CLIAuthorizeView from './views/CLIAuthView/CLIAuthorizeView'
import DashboardView from './views/DashboardView/DashboardView'

// const ViewerQuery = {
//   viewer: (Component, variables) => Relay.QL`
//     query {
//       viewer {
//         ${Component.getFragment('viewer', variables)}
//       }
//     }
//   `,
// }
//
// const NodeQuery = {
//   node: (Component, variables) => Relay.QL`
//     query {
//       node: node(id: $id) {
//         ${Component.getFragment('node', variables)}
//       }
//     }
//   `,
// }

function render({ Component, props, error, match }) {
  if (error) {
    if (error.response) {
      const { code } = error.response.errors[0]

      // project doesnt exist
      if (code === 4033) {
        graphcoolAlert("The requested project doesn't exist on your account.")
        return <RedirectOnMount to={`/`} />

        // not authorized
      } else if (code === 2001) {
        cookiestore.remove('graphcool_auth_token')
        cookiestore.remove('graphcool_customer_id')
        tracker.reset()
        return <RedirectOnMount to={`/login${match.location.search}`} />
      }
    }
  }

  if (Component === null || !props) {
    return (
      <div className="loader">
        <style jsx>{`
          .loader {
            @p: .top0, .left0, .right0, .bottom0, .fixed, .flex, .justifyCenter,
              .itemsCenter, .z999;
            pointer-events: none;
          }
        `}</style>
        <Loading color={'#666'} />
      </div>
    )
  }

  return <Component {...props} />
}

const ProjectViewerQuery = graphql`
  query routes_ProjectRootView_Query($projectName: String!) {
    viewer {
      ...ProjectRootView_viewer
    }
  }
`

const FunctionsViewerQuery = graphql`
  query routes_FunctionsView_Query($projectName: String!) {
    viewer {
      ...FunctionsView_viewer
    }
  }
`

const DashboardViewerQuery = graphql`
  query routes_DashboardView_Query($projectName: String!) {
    viewer {
      ...DashboardView_viewer
    }
  }
`

const RelationPopupQuery = graphql`
  query routes_RelationPopup_Query(
    $projectName: String!
    $relationName: String!
    $relationExists: Boolean!
  ) {
    viewer {
      ...RelationPopup_viewer
    }
  }
`

const FieldPopupQuery = graphql`
  query routes_FieldPopup_Query(
    $projectName: String!
    $modelName: String!
    $fieldName: String!
    $fieldExists: Boolean!
  ) {
    viewer {
      ...FieldPopup_viewer
    }
  }
`

const ModelRedirectViewQuery = graphql`
  query routes_ModelRedirectView_Query($projectName: String!) {
    viewer {
      ...ModelRedirectView_viewer
    }
  }
`

const PermissionPopupQuery = graphql`
  query routes_PermissionPopup_Query(
    $projectName: String!
    $modelName: String!
    $id: ID!
    $includeNode: Boolean!
  ) {
    viewer {
      ...PermissionPopup_viewer
    }
    node(id: $id) @include(if: $includeNode) {
      ...PermissionPopup_node
    }
  }
`

const RelationPermissionPopupQuery = graphql`
  query routes_RelationPermissionPopup_Query(
    $projectName: String!
    $relationName: String!
    $id: ID!
    $includeNode: Boolean!
  ) {
    viewer {
      ...RelationPermissionPopup_viewer
    }
    node(id: $id) @include(if: $includeNode) {
      ...RelationPermissionPopup_node
    }
  }
`

const FunctionLogsQuery = graphql`
  query routes_FunctionLogs_Query($projectName: String!, $id: ID!) {
    viewer {
      ...FunctionLogs_viewer
    }
    node(id: $id) {
      ...FunctionLogs_node
    }
  }
`

const FunctionPopupQuery = graphql`
  query routes_FunctionPopup_Query(
    $projectName: String!
    $id: ID!
    $includeNode: Boolean!
  ) {
    viewer {
      ...FunctionPopup_viewer
    }
    node(id: $id) @include(if: $includeNode) {
      ...FunctionPopup_node
    }
  }
`

export default makeRouteConfig(
  <Route path="/" Component={RootView}>
    <Route
      Component={RootRedirectView}
      query={graphql`
        query routes_RootRedirectView_Query {
          viewer {
            ...RootRedirectView_viewer
          }
        }
      `}
      render={render}
    />
    <Route
      path="signup"
      Component={({ location }) =>
        <AuthView initialScreen="signUp" location={location} />}
    />
    <Route
      path="login"
      Component={({ location }) =>
        <AuthView initialScreen="login" location={location} />}
    />
    <Route path="token" Component={TokenRedirectView} />
    <Route
      path="cli/auth"
      Component={CLIAuthView}
      render={CLIAuthView.renderRoute}
    />
    <Route path="cli/auth/success" Component={CLIAuthSuccessView} />
    <Route path="cli/auth/authorize" Component={CLIAuthorizeView} />
    <Route path="cli/auth/success-init" Component={CLIAuthSuccessInitView} />
    <Route
      path="after-signup"
      Component={AfterSignUpView}
      query={graphql`
        query routes_AfterSignUpView_Query {
          viewer {
            ...AfterSignUpView_viewer
          }
        }
      `}
      render={render}
    />
    <Route path="showroom" Component={ShowRoom} />
    <Route
      path=":projectName"
      Component={ProjectRootView}
      query={ProjectViewerQuery}
      render={render}
    >
      <Redirect to="/:projectName/models" />
      <Redirect from="settings" to="/:projectName/settings/general" />
      <Route
        path="dashboard"
        Component={DashboardView}
        query={DashboardViewerQuery}
        render={render}
      />
      <Route
        path="functions"
        Component={FunctionsView}
        query={FunctionsViewerQuery}
        render={render}
      >
        <Route
          path="create"
          Component={FunctionPopup}
          query={FunctionPopupQuery}
          render={render}
          prepareVariables={params => ({
            ...params,
            includeNode: false,
            id: '',
          })}
        >
          <Route path="fullscreen" Component={null} />
        </Route>
        <Route
          path=":id/logs"
          Component={FunctionLogs}
          query={FunctionLogsQuery}
          render={render}
        />
        <Route
          path=":id/edit"
          Component={FunctionPopup}
          query={FunctionPopupQuery}
          render={render}
          prepareVariables={params => ({ ...params, includeNode: true })}
        >
          <Route path="fullscreen" Component={() => null} />
        </Route>
      </Route>
      <Route
        path="playground"
        Component={PlaygroundView}
        render={render}
        query={graphql`
          query routes_PlaygroundView_Query($projectName: String!) {
            viewer {
              ...PlaygroundView_viewer
            }
          }
        `}
      />
      <Route
        path="account"
        Component={AccountView}
        query={graphql`
          query routes_AccountView_Query($projectName: String!) {
            viewer {
              ...AccountView_viewer
            }
          }
        `}
        render={render}
      >
        <Route
          Component={SettingsTab}
          query={graphql`
            query routes_SettingsTab_Query {
              viewer {
                ...SettingsTab_viewer
              }
            }
          `}
          render={render}
        />
      </Route>
      <Route
        path="schema"
        Component={SchemaView}
        query={graphql`
          query routes_SchemaView_Query($projectName: String!) {
            viewer {
              ...SchemaView_viewer
            }
          }
        `}
        render={render}
      >
        <Route path="cli-guide" Component={CliInfoPopup} render={render} />
        <Route path="types" Component={() => null} render={render} />
        <Route path="interfaces" Component={() => null} render={render} />
        <Route path="enums" Component={() => null} render={render}>
          <Route path="edit/:enumName" Component={() => null} render={render} />
        </Route>
        <Route path="relations">
          <Route
            path="create"
            Component={RelationPopup}
            query={RelationPopupQuery}
            render={render}
            prepareVariables={params => ({
              ...params,
              relationExists: false,
              relationName: '',
            })}
          />
          <Route
            path="edit/:relationName"
            Component={RelationPopup}
            query={RelationPopupQuery}
            render={render}
            prepareVariables={params => ({ ...params, relationExists: true })}
          />
        </Route>
        <Route path=":modelName">
          <Route path="edit" Component={() => null} render={render} />
          <Route
            path="edit/:fieldName"
            Component={FieldPopup}
            query={FieldPopupQuery}
            render={render}
            prepareVariables={params => ({ ...params, fieldExists: true })}
          />
          <Route
            path="create"
            Component={FieldPopup}
            query={FieldPopupQuery}
            render={render}
            prepareVariables={params => ({
              ...params,
              fieldExists: false,
              fieldName: '',
            })}
          />
        </Route>
      </Route>
      <Route
        path="graph-view"
        Component={SchemaViewer}
        query={graphql`
          query routes_SchemaViewer_Query($projectName: String!) {
            viewer {
              ...SchemaViewer_viewer
            }
          }
        `}
        render={render}
      />
      <Route path="models">
        <Route
          Component={ModelRedirectView}
          query={ModelRedirectViewQuery}
          render={render}
        />
        <Route
          path=":modelName/databrowser"
          Component={DatabrowserView}
          query={graphql`
            query routes_DatabrowserView_Query(
              $projectName: String!
              $modelName: String!
            ) {
              viewer {
                ...DatabrowserView_viewer
              }
            }
          `}
          render={render}
        />
        <Route
          path=":modelName"
          Component={ModelRedirectView}
          query={ModelRedirectViewQuery}
          render={render}
        />
      </Route>
      <Route
        path="permissions"
        Component={PermissionsView}
        query={graphql`
          query routes_PermissionsView_Query($projectName: String!) {
            viewer {
              ...PermissionsView_viewer
            }
          }
        `}
        render={render}
      >
        <Route Component={PermissionsList} />
        <Route path="relations" Component={AllRelationPermissionsList}>
          <Route
            path=":relationName/edit/:id"
            Component={RelationPermissionPopup}
            query={RelationPermissionPopupQuery}
            render={render}
            prepareVariables={params => ({ ...params, includeNode: true })}
          />
          <Route
            path=":relationName/create"
            Component={RelationPermissionPopup}
            query={RelationPermissionPopupQuery}
            render={render}
            prepareVariables={params => ({
              ...params,
              includeNode: false,
              id: '',
            })}
          />
        </Route>
        <Route Component={PermissionsList}>
          <Route
            path=":modelName/edit/:id"
            Component={PermissionPopup}
            query={PermissionPopupQuery}
            render={render}
            prepareVariables={params => ({ ...params, includeNode: true })}
          />
          <Route
            path=":modelName/create"
            Component={PermissionPopup}
            query={PermissionPopupQuery}
            render={render}
            prepareVariables={params => ({
              ...params,
              includeNode: false,
              id: '',
            })}
          />
        </Route>
      </Route>
      <Route
        path="actions"
        Component={ActionsView}
        query={graphql`
          query routes_ActionsView_Query($projectName: String!) {
            viewer {
              ...ActionsView_viewer
            }
          }
        `}
        render={render}
      />
      <Route
        path="settings"
        Component={ProjectSettingsView}
        query={graphql`
          query routes_ProjectSettingsView_Query($projectName: String!) {
            viewer {
              ...ProjectSettingsView_viewer
            }
          }
        `}
        render={render}
      />
      <Route
        path="algolia"
        Component={AlgoliaView}
        query={graphql`
          query routes_AlgoliaView_Query($projectName: String!) {
            viewer {
              ...AlgoliaView_viewer
            }
          }
        `}
        render={render}
      />
      <Route
        path="integrations"
        Component={IntegrationsView}
        query={graphql`
          query routes_IntegrationsView_Query($projectName: String!) {
            viewer {
              ...IntegrationsView_viewer
            }
          }
        `}
        render={render}
      >
        <Route
          path="authentication/:provider"
          Component={AuthProviderPopup}
          query={graphql`
            query routes_AuthProviderPopup_Query($projectName: String!) {
              viewer {
                ...AuthProviderPopup_viewer
              }
            }
          `}
          render={render}
        />
      </Route>
      <Route path="settings" Component={Settings} render={render}>
        <Redirect from="settings" to="settings/general" />
        <Route
          path="team"
          Component={Team}
          query={graphql`
            query routes_Team_Query($projectName: String!) {
              viewer {
                ...Team_viewer
              }
            }
          `}
          render={render}
        />
        <Route path="token" Component={TokenRedirectView} />
        <Route
          path="general"
          Component={General}
          query={graphql`
            query routes_General_Query($projectName: String!) {
              viewer {
                ...General_viewer
              }
            }
          `}
          render={render}
        />
        <Route
          path="authentication"
          Component={Authentication}
          query={graphql`
            query routes_Authentication_Query($projectName: String!) {
              viewer {
                ...Authentication_viewer
              }
            }
          `}
          render={render}
        />
        <Route
          path="export"
          Component={Export}
          query={graphql`
            query routes_Export_Query($projectName: String!) {
              viewer {
                ...Export_viewer
              }
            }
          `}
          render={render}
        />
        <Route
          path="billing"
          Component={Billing}
          query={graphql`
            query routes_Billing_Query($projectName: String!) {
              viewer {
                ...Billing_viewer
              }
            }
          `}
          render={render}
        >
          <Route
            path="change-plan/:plan"
            Component={ChangePricingPlan}
            render={render}
          />
          <Route
            path="confirm-plan/:plan"
            Component={ConfirmPricingPlan}
            query={graphql`
              query routes_ConfirmPricingPlan_Query($projectName: String!) {
                viewer {
                  ...ConfirmPricingPlan_viewer
                }
              }
            `}
            render={render}
          />
        </Route>
      </Route>
      <Route
        path="clone"
        Component={CloneProjectPopup}
        query={graphql`
          query routes_CloneProjectPopup_Query($projectName: String!) {
            viewer {
              ...CloneProjectPopup_viewer
            }
          }
        `}
        render={render}
      />
    </Route>
  </Route>,
)
