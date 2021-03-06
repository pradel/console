import * as React from 'react'
import mapProps from '../../../components/MapProps/MapProps'
import { createRefetchContainer, graphql, RelayProp } from 'react-relay'
import * as Modal from 'react-modal'
import modalStyle from '../../../utils/modalStyle'
import { Log, ServerlessFunction } from '../../../types/types'
import { withRouter } from 'found'
import { Icon, $v } from 'graphcool-styles'
import LogComponent from './Log'

interface Props {
  logs: Log[]
  node: ServerlessFunction
  router: any
  relay: RelayProp
}

const customModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    width: '100vw',
  },
}

class FunctionLogsComponent extends React.Component<Props, {}> {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { logs } = this.props
    return (
      <Modal
        contentLabel="Function Logs"
        style={customModalStyle}
        isOpen
        onRequestClose={this.close}
      >
        <style jsx={true}>{`
          .function-logs {
            @p: .overflowHidden, .pa60;
            height: 100vh;
            background-color: rgba(23, 42, 58, .94);
          }
          .logs {
            @p: .overflowAuto;
            max-height: calc(100vh - 100px);
          }
          .log {
            @p: .mt25, .br2, .bgLightOrange, .pa16;
          }
          table {
            @p: .w100;
            border-collapse: collapse;
            table-layout: fixed;
          }
          .head {
            @p: .justifyBetween, .flex, .pa25;
          }
          .title {
            @p: .white40, .f16, .fw6, .ttu, .ml16;
          }
          th {
            @p: .white40, .ttu, .fw6, .f14, .ph10, .pv12, .bb, .bWhite10, .tl;
            letter-spacing: 0.6px;
          }
          th:first-child {
            @p: .pl25;
            width: 250px;
          }
          th:nth-child(2) {
            width: 120px;
          }
          th:last-child {
            @p: .relative;
            width: 130px;
            right: -11px;
          }
          .logs :global(tr:first-child) :global(td) {
            @p: .pt16;
          }
          .head :global(i) {
            @p: .pointer;
          }
          .empty {
            @p: .white80, .tc, .pa25, .f20;
          }
        `}</style>
        <div className="function-logs">
          <div className="head">
            <div className="flex itemsCenter">
              <Icon
                src={require('graphcool-styles/icons/fill/logs.svg')}
                color={$v.white40}
                width={24}
                height={24}
              />
              <div className="title">Logs</div>
            </div>
            <Icon
              src={require('graphcool-styles/icons/stroke/cross.svg')}
              stroke
              strokeWidth={3}
              color={$v.white}
              width={26}
              height={26}
              onClick={this.close}
            />
          </div>
          <div className="logs">
            {logs.length > 0
              ? <table>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Duration</th>
                      <th>Output</th>
                      <th>
                        <div className="flex itemsCenter justifyBetween">
                          <span className="mr6">Time Ago</span>
                          <Icon
                            src={require('graphcool-styles/icons/fill/reload.svg')}
                            width={18}
                            height={18}
                            color={$v.white}
                            onClick={this.reload}
                            className="pointer"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => <LogComponent log={log} key={log.id} />)}
                  </tbody>
                </table>
              : <div className="empty">
                  There are no logs for this function yet
                </div>}
          </div>
        </div>
      </Modal>
    )
  }

  private close = () => {
    this.props.router.go(-1)
  }

  private reload = () => {
    this.props.relay.refetch(fragmentVariables => fragmentVariables)
  }
}

const MappedFunctionLogs = mapProps({
  project: props => props.viewer.project,
  logs: props => props.node.logs.edges.map(edge => edge.node),
})(withRouter(FunctionLogsComponent))

export const FunctionLogs = createRefetchContainer(
  MappedFunctionLogs,
  {
    viewer: graphql`
      fragment FunctionLogs_viewer on Viewer {
        id
        project: projectByName(projectName: $projectName) {
          id
          name
        }
        user {
          crm {
            information {
              isBeta
            }
          }
        }
      }
    `,
    node: graphql.experimental`
      fragment FunctionLogs_node on Node {
        id
        ... on Function {
          name
          logs(last: 500) {
            edges {
              node {
                id
                duration
                message
                requestId
                timestamp
                status
              }
            }
          }
        }
      }
    `,
  },
  graphql.experimental`
    query FunctionLogsRefetchQuery($id: ID!) {
      node(id: $id) {
        ...FunctionLogs_node
      }
    }
  `,
)
