import * as React from 'react'
import * as Relay from 'react-relay'
import mapProps from '../../../../components/MapProps/MapProps'
import {Model, ModelPermission} from '../../../../types/types'
import {Icon, $p, variables} from 'graphcool-styles'
import PermissionIcon from './PermissionIcon'
import * as cx from 'classnames'

interface Props {
  model: Model
  permissions: ModelPermission[]
}

const operations = ['READ', 'UPDATE', 'CREATE', 'DELETE']

class ModelPermissionsHeader extends React.Component<Props, {}> {
  enhancePermissions(permissions: ModelPermission[]) {
    let todo = operations.slice()

    permissions.forEach(permission => {
      if (todo.includes(permission.operation)) {
        const i = todo.indexOf(permission.operation)
        todo.splice(i, 1)
      }
    })

    return todo.map(operation => ({
      operation,
      isActive: false,
    })).concat(permissions)
  }
  render() {
    const {model, permissions} = this.props
    const enhancedPermissions = this.enhancePermissions(permissions)
    return (
      <div className={cx($p.flex, $p.flexRow, $p.justifyBetween)}>
        <h2 className={cx($p.black50, $p.fw4)}>{model.name}</h2>
        <div className={cx($p.flex, $p.flexRow, $p.itemsCenter)}>
          <div className={cx($p.flex, $p.flexRow)}>
            {enhancedPermissions.map(permission => {
              return <PermissionIcon
                operation={permission.operation}
                isActive={permission.isActive}
                className={$p.ml6}
              />
            })}
          </div>
          <div
            className={cx(
              $p.f14,
              $p.pa10,
              $p.pointer,
              $p.ttu,
              $p.bgWhite,
              $p.black50,
              $p.lhSolid,
              $p.fw6,
              $p.buttonShadow,
              $p.tracked,
              $p.flex,
              $p.flexRow,

              // spacing
              $p.ml38,
            )}
          >
            <Icon
              src={require('graphcool-styles/icons/stroke/add.svg')}
              stroke={true}
              strokeWidth={2}
              color={variables.gray50}
            />
            New Permission
          </div>

        </div>
      </div>
    )
  }
}

const MappedPermissionsList = mapProps({
  model: props => props.model,
  permissions: props => props.model.permissions.edges.map(edge => edge.node),
})(ModelPermissionsHeader)

export default Relay.createContainer(MappedPermissionsList, {
  initialVariables: {
    projectName: null, // injected from router
  },
  fragments: {
    model: () => Relay.QL`
      fragment on Model {
        name
        permissions(first: 100) {
          edges {
            node {
              isActive
              operation
            }
          }
        }
      }
    `,
  },
})
