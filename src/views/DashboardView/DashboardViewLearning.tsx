import * as React from 'react'
import { Icon, $v } from 'graphcool-styles'

export default class DashboardViewLearning extends React.Component<{}, {}> {
  render() {
    let tutorials = [
      {
        title: 'Stripe Payment Workflow with Mutation Callbacks',
      },
      {
        title: 'Algolia Auto-Sync for Graphql backends',
      },
    ]
    tutorials = tutorials.concat(tutorials)
    tutorials = tutorials.concat(tutorials)
    return (
      <div className="dashboard-view-learning">
        <style jsx={true}>{`
          .dashboard-view-learning {
            @p: .ph20, .pt20, .bgDarkBlue07;
          }
          .header {
            @p: .flex, .justifyBetween, .ttu, .darkBlue30, .f12, .fw6;
          }
          .header .link {
            @p: .flex, .itemsCenter, .pointer:hover;
          }
          .header .link :global(svg) {
            @p: .ml6;
          }
          .cards {
            @p: .flex, .pv20;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .card {
            @p: .mr16,
              .bgWhite,
              .pv10,
              .ph16,
              .pointer:hover,
              .flex,
              .justifyBetween,
              .flexColumn;
            flex: 0 0 auto;
            width: 236px;
            height: 90px;
            transition: all 0.25s cubic-bezier(0.65, 0.05, 0.36, 1);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
          }
          .card:hover {
            transform: translateY(-3px);
          }
          .card .title {
            @p: .f14, .darkBlue80, .flex1;
            line-height: 18px;
          }
          .card .link {
            @p: .ttu, .f12, .darkBlue60, .fw6, .flex, .itemsCenter;
          }
          .card .link :global(svg) {
            @p: .ml6;
          }
        `}</style>
        <div className="header">
          <div>Learning ressources</div>
          <div className="link">
            See all
            <Icon
              width={12}
              height={12}
              src={require('graphcool-styles/icons/fill/fullArrowRight.svg')}
              color={$v.darkBlue50}
            />
          </div>
        </div>
        <div className="cards">
          {tutorials.map((tutorial, index) =>
            <div key={index} className="card">
              <div className="title">
                {tutorial.title}
              </div>
              <div className="link">
                Open tutorial
                <Icon
                  width={12}
                  height={12}
                  src={require('graphcool-styles/icons/fill/fullArrowRight.svg')}
                  color={$v.darkBlue50}
                />
              </div>
            </div>,
          )}
        </div>
      </div>
    )
  }
}
