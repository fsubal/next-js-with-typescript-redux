import { connect } from 'react-redux'

const Clock = ({ lastUpdate, light }) => {
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82FA58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  )
}

const format = t => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = n => n < 10 ? `0${n}` : n

const Examples = ({ lastUpdate, light }) => {
  return (
    <div>
      <Clock lastUpdate={lastUpdate} light={light} />
    </div>
  )
}

export default connect(function mapStateToProps (state) {
  const { lastUpdate, light } = state
  return { lastUpdate, light }
})(Examples)
