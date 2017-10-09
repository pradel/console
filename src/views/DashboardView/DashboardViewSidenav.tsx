import * as React from 'react'

export default class DashboardViewSidenav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container">
        <style jsx={true}>{`
          .container {
            @p: .pa16;
          }
          .box {
            @p: .white70, .bgLightOrange, .pv16, .br2, .mv16;
          }
          .box-danger {
            @p: .bgRed;
          }
          .box .header-info {
            @p: .fw6, .f12, .ttu, .mb10, .ph16;
          }
          .box .title {
            @p: .fw6, .f20, .white, .ph16;
            line-height: 26px;
          }
          .box .separator {
            @p: .bt, .bWhite70, .mv16;
          }
          .box p {
            @p: .ph16, .f14;
            line-height: 20px;
          }
        `}</style>
        <div className="box box-danger">
          <div className="header-info">Project health</div>
          <div className="title">Your project is in an inconsistent state!</div>
          <p>A Permission Query for READ on type User is invalid.</p>
          <div className="separator" />
          <p>A Permission Query for READ on type User is invalid.</p>
        </div>
        <div className="box">
          <div className="header-info">Billing</div>
          <p>Your Data usage will exceed your plan in approx. 8 Days.</p>
        </div>
      </div>
    )
  }
}
