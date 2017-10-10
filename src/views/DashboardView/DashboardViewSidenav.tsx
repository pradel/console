import * as React from 'react'
import { Icon, $v } from 'graphcool-styles'
import * as cx from 'classnames'

interface State {
  columnMode: string
}

export default class DashboardViewSidenav extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      columnMode: 'history',
    }
  }

  render() {
    // TODO good icon alert
    const { columnMode } = this.state
    return (
      <div className="container">
        <style jsx={true}>{`
          .container {
            @p: .pa16;
          }
          .box {
            @p: .white70, .br2, .mv16;
            background-color: #f18f01;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
          }
          .box-danger {
            background-color: #ec4d45;
          }
          .box.block,
          .box .block {
            @p: .pa16;
          }
          .box .box-content {
            background-color: #f25c54;
          }
          .box .header-info {
            @p: .fw6, .f12, .ttu, .mb10, .flex, .itemsCenter;
          }
          .box .header-info div {
            @p: .ml4;
          }
          .box .title {
            @p: .fw6, .f20, .white;
            line-height: 26px;
          }
          .box .separator {
            @p: .bt, .bWhite70;
          }
          .box p {
            @p: .f14;
            line-height: 20px;
          }
          .box .action {
            @p: .ttu,
              .white,
              .flex,
              .itemsCenter,
              .f14,
              .fw6,
              .pointer:hover,
              .mt16;
          }
          .box .action div {
            @p: .mr10;
          }
          .box .action.action-border {
            @p: .justifyBetween, .br2, .ba, .bWhite30, .pv6, .ph10;
          }
          .box .action.action-border div {
            @p: .mr16;
          }
          .switch {
            @p: .ttu, .flex, .f12, .fw6, .darkBlue20, .mb16, .mt20;
          }
          .switch div {
            @p: .pointer:hover, .mr16;
          }
          .switch div.active {
            @p: .darkBlue50;
          }
          .history .date,
          .changelog .date {
            @p: .darkBlue40, .f12, .flex, .itemsCenter;
          }
          .history .date .line,
          .changelog .date .line {
            @p: .bt, .bDarkBlue10, .flex1;
          }
          .history .date .text,
          .changelog .date .text {
            @p: .bgWhite, .mr6;
          }
          .history .item {
            @p: .darkBlue60, .f14, .mv16, .flex, .itemsCenter;
          }
          b {
            @p: .fw6;
          }
          .history .item .avatar {
            @p: .br100,
              .f12,
              .white,
              .mr10,
              .fw7,
              .flex,
              .itemsCenter,
              .justifyCenter;
            height: 21px;
            width: 21px;
            background-color: #f25c54;
          }
          .changelog .item {
            @p: .darkBlue80, .f14, .mv16, .relative;
          }
          .changelog .item:before {
            @p: .bSolid, .br100, .bDarkBlue20, .mr6, .absolute;
            border-width: 3px;
            content: '';
            top: 8px;
          }
          .changelog .item div {
            margin-left: 16px;
          }
          .changelog .item a {
            @p: .blue;
          }
        `}</style>
        <div className="box box-danger">
          <div className="block">
            <div className="header-info">
              <Icon
                width={12}
                height={12}
                src={require('graphcool-styles/icons/fill/triangle.svg')}
                color={$v.white70}
              />
              <div>Project health</div>
            </div>
            <div className="title">
              Your project is in an inconsistent state!
            </div>
          </div>
          <div className="block box-content">
            <p>A Permission Query for READ on type User is invalid.</p>
            <div className="action action-border">
              <div>Modify the permission query</div>
              <Icon
                width={12}
                height={12}
                src={require('graphcool-styles/icons/fill/fullArrowRight.svg')}
                color="#ffffff"
              />
            </div>
          </div>
          <div className="separator" />
          <div className="block box-content">
            <p>A Permission Query for READ on type User is invalid.</p>
            <div className="action action-border">
              <div>Modify the query</div>
              <Icon
                width={12}
                height={12}
                src={require('graphcool-styles/icons/fill/fullArrowRight.svg')}
                color="#ffffff"
              />
            </div>
          </div>
        </div>
        <div className="box block">
          <div className="header-info">
            <Icon
              width={12}
              height={12}
              src={require('graphcool-styles/icons/fill/triangle.svg')}
              color={$v.white70}
            />
            <div>Billing</div>
          </div>
          <p>Your Data usage will exceed your plan in approx. 8 Days.</p>
          <div className="action">
            <div>Upgrade plan</div>
            <Icon
              width={12}
              height={12}
              src={require('graphcool-styles/icons/fill/fullArrowRight.svg')}
              color="#ffffff"
            />
          </div>
        </div>
        <div className="switch">
          <div
            onClick={this.historyMode}
            className={cx({
              active: columnMode === 'history',
            })}
          >
            History
          </div>
          <div
            onClick={this.changelogMode}
            className={cx({
              active: columnMode === 'changelog',
            })}
          >
            Changelog
          </div>
        </div>
        {columnMode === 'history' &&
          <div className="history">
            <div className="date">
              <div className="text">12 Jun 17</div>
              <div className="line" />
            </div>
            <div className="item">
              <div className="avatar">S</div>
              <p>
                Soren changed type <b>Article</b>
              </p>
            </div>
            <div className="item">
              <div className="avatar">S</div>
              <p>
                Soren changed type <b>Article</b>
              </p>
            </div>
            <div className="date">
              <div className="text">12 Jun 17</div>
              <div className="line" />
            </div>
            <div className="item">
              <div className="avatar">S</div>
              <p>
                Soren changed type <b>Article</b>
              </p>
            </div>
            <div className="item">
              <div className="avatar">S</div>
              <p>
                Soren changed type <b>Article</b>
              </p>
            </div>
          </div>}
        {columnMode === 'changelog' &&
          <div className="changelog">
            <div className="date">
              <div className="text">
                <b>Week 25</b> (June 19 - June 25)
              </div>
              <div className="line" />
            </div>
            <div className="item">
              <div>
                Graphcool <a href="#">now runs in multiple regions</a> and
                performance improvements reduced response times by 80ms on
                average! 🏇
              </div>
            </div>
            <div className="item">
              <div>
                We fixed a problem <a href="#">with the File API</a> when
                renaming files.
              </div>
            </div>
          </div>}
      </div>
    )
  }

  private historyMode = () => {
    this.setState({ columnMode: 'history' })
  }

  private changelogMode = () => {
    this.setState({ columnMode: 'changelog' })
  }
}
