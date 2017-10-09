import * as React from 'react'
import { VictoryLabel, VictoryAxis, VictoryLine } from 'victory'
import { $v } from 'graphcool-styles'

function getStyles() {
  return {
    // Root element
    parent: {
      background: '#fff',
      boxSizing: 'border-box',
      display: 'inline',
      padding: 0,
      fontFamily: 'Open Sans,sans-serif',
      maxWidth: '100%',
      height: 'auto',
    },
    // Label
    labelOne: {
      fontSize: 14,
      fontFamily: 'inherit',
      fontWeight: 600,
      fill: $v.darkBlue30,
    },
    // Line
    lineOne: {
      data: { stroke: $v.green, strokeWidth: 2.5 },
    },
    // Axis left
    axisOne: {
      grid: {
        stroke: tick => (tick === 0 ? 'transparent' : $v.darkBlue10),
        strokeWidth: 1,
      },
      axis: { stroke: $v.darkBlue10, strokeWidth: 0 },
      ticks: { strokeWidth: 0 },
      tickLabels: {
        fill: $v.darkBlue40,
        fontFamily: 'inherit',
        fontSize: 16,
      },
    },
    // Axis bottom
    axisYears: {
      axis: { stroke: $v.darkBlue10, strokeWidth: 1 },
      tickLabels: {
        fill: $v.darkBlue40,
        fontFamily: 'inherit',
        fontSize: 14,
      },
    },
  }
}

const year = 2017
const month = 3
const numberOfDaysInMonth = new Date(year, month, 0).getDate()

function getTickValues() {
  const datesArray = []
  for (let i = 1; i < numberOfDaysInMonth; i++) {
    datesArray.push(new Date(year, month, i))
  }
  return datesArray
}

function getDataSetOne() {
  const datesArray = []
  for (let i = 1; i < numberOfDaysInMonth; i++) {
    datesArray.push({
      x: new Date(year, month, i),
      y: Math.floor(Math.random() * 100 + 1),
    })
  }
  return datesArray
}

function Graph() {
  const styles = getStyles()
  const dataSetOne = getDataSetOne()
  const tickValues = getTickValues()
  return (
    <div>
      <svg style={styles.parent} viewBox="0 0 450 350">
        <VictoryLabel
          x={16}
          y={25}
          style={styles.labelOne}
          text={'RESPONSE TIME'}
        />
        <g transform={'translate(0, 20)'}>
          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears}
            tickValues={tickValues}
            tickFormat={(x: Date) => {
              const day = x.getDate()
              if (day === 1 || day % 10 === 0) {
                return `Jun\n${day}`
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 100]}
            orientation="left"
            standalone={false}
            offsetX={50}
            tickCount={3}
            style={styles.axisOne}
          />
          <VictoryLine
            data={dataSetOne}
            domain={{
              x: [
                new Date(year, month, 1),
                new Date(year, month, numberOfDaysInMonth),
              ],
              y: [0, 100],
            }}
            interpolation="monotoneX"
            scale={{ x: 'time', y: 'linear' }}
            standalone={false}
            style={styles.lineOne}
          />
        </g>
      </svg>
    </div>
  )
}

/* tickFormat={(tick: number) => {
  // Only show ms non zero numbers
  if (tick === 0) {
    return tick
  }
  return `${tick}ms`;
}} */

export default function DashboardViewGraphs() {
  return (
    <div className="graph-container">
      <style jsx={true}>{`
        .graph-container {
          @p: .flex, .flexWrap;
        }
        .graph-item {
          @p: .br, .bb, .bDarkBlue10;
          width: 50%;
        }
      `}</style>
      <div className="graph-item">
        <Graph />
      </div>
      <div className="graph-item">
        <Graph />
      </div>
      <div className="graph-item">
        <Graph />
      </div>
      <div className="graph-item">
        <Graph />
      </div>
    </div>
  )
}
