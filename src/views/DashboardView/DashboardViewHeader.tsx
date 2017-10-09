import * as React from 'react'
import { Icon, $v } from 'graphcool-styles'
import { Link } from 'found'
import * as cx from 'classnames'

interface Props {
  params: any
}

export default function DashboardViewHeader({ params }: Props) {
  // TODO open popup endpoints
  // TODO shadow endpoints btn
  // TODO error and warning icon

  // Possible states: warning, error
  const projectHealth = {
    state: 'error',
    issues: 2,
  }
  const planHealth = {
    state: 'warning',
    mode: 'Free plan',
    firstLine: '33%',
    secondLine: '75%',
  }
  return (
    <div>
      <style jsx={true} global={true}>{`
        a.collaborator {
          @p: .br100, .f12, .white, .mr4, .fw7, .flex, .itemsCenter,
            .justifyCenter;
          height: 21px;
          width: 21px;
        }
        a.collaborator-add {
          @p: .bDarkBlue20, .ba;
        }
      `}</style>
      <style jsx={true}>{`
        .dashboard-view-header {
          @p: .bgDarkBlue07, .bb, .bDarkBlue10, .flex;
        }
        .header-item {
          @p: .pa16, .br, .bDarkBlue10;
        }
        .header-item-full {
          @p: .flex1;
        }
        .header-item-center {
          @p: .flex, .itemsCenter;
        }
        .header-item:last-child {
          border: none;
        }
        .title {
          @p: .ttu, .f12, .fw6, .darkBlue30, .mb6;
        }
        .warning .title {
          @p: .lightOrange;
        }
        .error .title {
          @p: .red;
        }
        .inline-list {
          @p: .flex;
        }
        .dotted-item {
          @p: .f14, .flex, .itemsCenter, .darkBlue60, .ml16;
        }
        .dotted-item:before {
          @p: .bSolid, .br100, .bGreen, .mr6;
          border-width: 4px;
          content: '';
        }
        .dotted-item:first-child {
          @p: .ml0;
        }
        .error .dotted-item {
          @p: .red;
        }
        .error .dotted-item:before {
          @p: .bRed;
        }
        .progress {
          @p: .relative, .w100, .br2, .overflowHidden, .mt4;
          background-color: #b1cbe5;
          height: 4px;
        }
        .progress:first-child {
          margin-top: 12px;
        }
        .progress-bar {
          @p: .absolute, .left0, .top0, .bottom0;
          background-color: #2a7ed3;
        }
        .warning .progress {
          background-color: #ecd0a6;
        }
        .warning .progress-bar {
          background-color: #f18f01;
        }
        .endpoints {
          @p: .bgGreen, .white, .br2, .ttu, .f14, .fw6, .flex, .itemsCenter,
            .pv6, .ph10;
        }
        .endpoints div {
          @p: .ml6;
        }
      `}</style>
      <div className="dashboard-view-header">
        <div className="header-item">
          <div className="title">System Status</div>
          <div className="inline-list">
            <div className="dotted-item">API</div>
            <div className="dotted-item">Database</div>
          </div>
        </div>
        <div className={cx('header-item', projectHealth.state)}>
          <div className="title">Project Health</div>
          <div className="inline-list">
            <div className="dotted-item">
              {projectHealth.issues === 0 ? 'No' : projectHealth.issues} issues
            </div>
          </div>
        </div>
        <div className={cx('header-item header-item-full', planHealth.state)}>
          <div className="title">
            {planHealth.mode}
          </div>
          <div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: planHealth.firstLine }}
              />
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: planHealth.secondLine }}
              />
            </div>
          </div>
        </div>
        <div className="header-item">
          <div className="title">Collaborators</div>
          <div className="inline-list">
            <Link
              className="collaborator"
              to={`/${params.projectName}/settings/team`}
              style={{ backgroundColor: '#F25C54' }}
            >
              S
            </Link>
            <Link
              className="collaborator"
              to={`/${params.projectName}/settings/team`}
              style={{ backgroundColor: '#F18F01' }}
            >
              J
            </Link>
            <Link
              className="collaborator"
              to={`/${params.projectName}/settings/team`}
              style={{ backgroundColor: '#2A7ED3' }}
            >
              N
            </Link>
            <Link
              className="collaborator"
              to={`/${params.projectName}/settings/team`}
              style={{ backgroundColor: '#A4036F' }}
            >
              A
            </Link>
            <Link
              className="collaborator collaborator-add"
              to={`/${params.projectName}/settings/team`}
            >
              <Icon
                width={21}
                height={21}
                stroke={true}
                src={require('graphcool-styles/icons/stroke/add.svg')}
                color={$v.darkBlue50}
              />
            </Link>
          </div>
        </div>
        <div className="header-item header-item-center">
          <div className="endpoints">
            <Icon
              width={16}
              height={16}
              src={require('graphcool-styles/icons/fill/endpoints.svg')}
              color="#ffffff"
            />
            <div>API Endpoints</div>
          </div>
        </div>
      </div>
    </div>
  )
}
