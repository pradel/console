import * as React from 'react'
import { Link } from 'found'
import { connect } from 'react-redux'
import ClickOutside from 'react-click-outside'
import * as cx from 'classnames'
import styled from 'styled-components'
import { ConsoleEvents } from 'graphcool-metrics'
import { $p, variables, Icon } from 'graphcool-styles'

import ScrollBox from '../../components/ScrollBox/ScrollBox'
import tracker from '../../utils/metrics'
import { Project, Model } from '../../types/types'
import { ShowNotificationCallback } from '../../types/utils'
import { Popup } from '../../types/popup'
import { showNotification } from '../../actions/notification'
import { showPopup } from '../../actions/popup'

interface Props {
  params: any
  add: () => void
  selectedProject: Project
  projects: Project[]
  router: any
  model: Model
  project: Project
  showNotification: ShowNotificationCallback
  showPopup: (popup: Popup) => void
  sidebarExpanded: boolean
}

interface State {
  expanded: boolean
  userDropdownVisible: boolean
  search: string
}

const expandedRoot = `
  background: ${variables.green} !important
`

const Root: any = styled.div`
  flex: 0 0 auto;
  height: 64px;
  &:hover {
  }
  ${(props: any) => props.expanded && expandedRoot};
`

const turnedArrow = `
  transform: rotate(180deg);
  background: ${variables.gray20};
  svg {
    position: relative;
    top: 1px;
  }
`

const Arrow: any = styled.div`
  svg {
    stroke: ${variables.white70};
    stroke-width: 4px;
  }

  border-radius: 100%;
  background-color: ${variables.darkBlue};
  width: 26px;
  height: 26px;

  ${(props: any) => props.turned && turnedArrow};
`

const activeListItem = `
  color: ${variables.white};
  font-weight: 700;

  &:after {
    content: "";
    position: absolute;
    top: 15.5px;
    right: 16px;
    width: ${variables.size06};
    height: ${variables.size06};
    background: ${variables.white};
    border-radius: 100%;
  }
`

const ListItem: any = styled(Link)`
  transition: color ${variables.duration} linear;
  height: 35px;

  svg {
    display: none;
    fill: ${variables.white};
  }

  &:hover {
    color: ${variables.white};
    background-color: rgba(250, 250, 250, 0.10);

    svg {
      display: block;
    }
  }

  ${(props: any) => props.active && activeListItem}
`

const AddProject = styled.div`
  margin: -3px -4px 0 0;

  svg {
    stroke: ${variables.white};
    stroke-width: 4px;
  }
`

class ProjectSelection extends React.Component<Props, State> {
  state = {
    expanded: false,
    userDropdownVisible: false,
    search: '',
  }

  private refInput: any

  constructor(props) {
    super(props)
  }

  render() {
    const { sidebarExpanded, projects } = this.props
    const { expanded, search } = this.state
    let filteredProjects = projects
    if (search && search !== '') {
      filteredProjects = projects.filter(a => a.name.startsWith(search))
    }
    return (
      <ClickOutside
        onClickOutside={e => {
          this.close()
        }}
      >
        <Root
          expanded={expanded}
          className={cx(
            $p.relative,
            $p.w100,
            $p.h100,
            $p.white,
            $p.z5,
            $p.bgDarkerBlue,
          )}
        >
          <div
            onClick={this.openProjectsList}
            className={cx($p.h100, $p.w100, $p.f20, $p.flex, $p.itemsCenter)}
            data-test="logo"
          >
            {!expanded &&
              <div
                className={cx(
                  $p.bgGreen,
                  $p.flex,
                  $p.itemsCenter,
                  $p.justifyCenter,
                  $p.pointer,
                  $p.flexFixed,
                  $p.ml10,
                  $p.pt4,
                )}
                style={{
                  width: '50px',
                  height: '60px',
                  borderBottomLeftRadius: '2px',
                  borderBottomRightRadius: '2px',
                }}
              >
                <Icon
                  width={23}
                  height={28}
                  src={require('assets/icons/logo.svg')}
                  color="#fff"
                />
              </div>}
            {sidebarExpanded &&
              <div
                className={cx(
                  $p.flex,
                  $p.itemsCenter,
                  $p.ph16,
                  $p.pointer,
                  $p.w100,
                  $p.flexAuto,
                )}
              >
                <div className={cx('project-name-wrapper', { expanded })}>
                  <style jsx>{`
                    .project-name-wrapper {
                      @p: .overflowHidden, .w100, .relative;
                    }
                    .project-name-wrapper:after {
                      @p: .absolute, .right0, .top0, .bottom0;
                      pointer-events: none;
                      content: "";
                      width: 20px;
                    }
                    .project-name {
                      @p: .nowrap, .overflowAuto, .f16;
                    }
                    .last-deploy {
                      @p: .white50, .f12;
                    }
                    .input {
                      @p: .pv16;
                    }
                    .input input {
                      @p: .white70;
                      background-color: transparent;
                    }
                  `}</style>
                  {!expanded &&
                    <div
                      className="project-name"
                      title={this.props.selectedProject.name}
                    >
                      {this.props.selectedProject.name}
                    </div>}
                  {!expanded &&
                    <div className="last-deploy">Last deploy: 24min</div>}
                  {expanded &&
                    <div className="input">
                      <input
                        name="search"
                        placeholder="Filter Projects..."
                        value={this.state.search}
                        onChange={this.changeSearch}
                        ref={ref => (this.refInput = ref)}
                      />
                    </div>}
                </div>
                <Arrow
                  turned={expanded}
                  className={cx(
                    $p.flex,
                    $p.itemsCenter,
                    $p.justifyCenter,
                    $p.brPill,
                    $p.flexFixed,
                  )}
                  style={{
                    marginRight: '-3px',
                  }}
                  onclick={this.closeProjectsList}
                >
                  <Icon
                    width={18}
                    height={18}
                    stroke
                    src={require('graphcool-styles/icons/stroke/arrowDown.svg')}
                  />
                </Arrow>
              </div>}
          </div>
          {expanded &&
            <div
              className={cx(
                $p.absolute,
                $p.w100,
                $p.vh100,
                $p.bgGreen,
                $p.flex,
                $p.flexColumn,
              )}
            >
              <div
                className={cx($p.relative)}
                style={{
                  flexGrow: 2,
                }}
              >
                <ScrollBox
                  style={{
                    height: 'calc(100vh - 155px)',
                  }}
                >
                  <AddProject
                    className={cx(
                      $p.lhSolid,
                      $p.ba,
                      $p.brPill,
                      $p.bWhite,
                      $p.pointer,
                      $p.o80,
                      $p.z2,
                      {
                        ['absolute top38 right25']: sidebarExpanded,
                        ['inlineFlex ml25 mt16 mb10']: !sidebarExpanded,
                      },
                    )}
                    onClick={() => {
                      this.closeProjectsList()
                      this.props.add()
                    }}
                    data-test="add-project-button"
                  >
                    <Icon
                      width={18}
                      height={18}
                      stroke
                      src={require('graphcool-styles/icons/stroke/add.svg')}
                    />
                  </AddProject>
                  {filteredProjects.map((project, index) =>
                    <ListItem
                      key={project.id}
                      className={cx(
                        $p.relative,
                        $p.f16,
                        $p.fw4,
                        project.id !== this.props.selectedProject.id &&
                          $p.white60,
                        $p.flex,
                        $p.justifyBetween,
                        $p.itemsCenter,
                        {
                          [$p.ph16]: sidebarExpanded,
                          [$p.ph10]: !sidebarExpanded,
                          [$p.mb60]: index === this.props.projects.length - 1,
                        },
                      )}
                      onClick={() => this.onSelectProject(project.id)}
                      to={`/${project.name}`}
                      active={project.id === this.props.selectedProject.id}
                    >
                      <div className={cx($p.toe, $p.overflowHidden)}>
                        {sidebarExpanded
                          ? project.name
                          : project.name.slice(0, 2).toUpperCase()}
                      </div>
                      {sidebarExpanded &&
                        <Link to={`/${project.name}/clone`} title="Duplicate">
                          <Icon
                            src={require('graphcool-styles/icons/fill/duplicate.svg')}
                          />
                        </Link>}
                    </ListItem>,
                  )}
                </ScrollBox>
              </div>
            </div>}
        </Root>
      </ClickOutside>
    )
  }

  private close = () => {
    if (this.state.expanded) {
      this.setState({ expanded: false } as State)
    }
  }

  private toggle = () => {
    this.setState({ expanded: !this.state.expanded } as State)
  }

  private onSelectProject = (id: string) => {
    this.toggle()
    this.closeProjectsList()

    tracker.track(ConsoleEvents.Project.selected({ id }))
  }

  private openProjectsList = () => {
    this.setState({ expanded: true } as State, () => {
      this.refInput.focus()
    })
  }

  private closeProjectsList = () => {
    this.setState({ expanded: false } as State)
  }

  private changeSearch = e => {
    this.setState({ search: e.target.value } as State)
  }
}

export default connect(null, {
  showNotification,
  showPopup,
})(ProjectSelection)
