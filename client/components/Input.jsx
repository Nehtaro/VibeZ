import React from 'react';

const Input = ({ setChannel, allChannels, start, setStart, end, setEnd, setGraphType, displayGraph, setLimit }) => {
  //updates state.start
  const updateStart = (event) => {
    setStart(event.target.value);
  }

  //updates state.end
  const updateEnd = (event) => {
    setEnd(event.target.value);
  }

  //updates state.channel
  const updateChannel = (event) => {
    for(let i = 0; i < allChannels.length; i++) {
      if (allChannels[i].name === event.target.value) {
        setChannel(allChannels[i].id);
        break;
      }
    }
  }

  //updates state.graphType
  const updateGraphType = (event) => {
    setGraphType(event.target.value);
  }

  //updates state.limit
  const updateLimit = (event) => {
    setLimit(event.target.value);
  }

  const channels = [];
  if (allChannels) {
    allChannels.forEach(channel => {
      channels.push(<option key={channel.id} value={channel.name}>{channel.name}</option>)
    })
  }

  return (
    <div className='input'>
      <div className='channelID'>
        <span>Channel: </span>
        <select onChange={e => updateChannel(e)}>
          {channels}
        </select>
      </div>
      <div className='options'>
        <span>Graph Type: </span>
        <select id='graphType' onChange={e => updateGraphType(e)}>
          <option value='Line Graph'>Line Graph</option>
          <option value='Bar Graph'>Bar Graph</option>
        </select>
      </div>
      <div className='options' >
        <span>Start Time: </span>
        <input type='datetime-local' defaultValue={start} onChange={e => updateStart(e)} />
      </div >
      <div className='options'>
        <span>End Time: </span>
        <input type='datetime-local' defaultValue={end} onChange={e => updateEnd(e)} />
      </div>
      <div className='options'>
        <span>Limit: </span>
        <input type='number' defaultValue={100} onChange={e => updateLimit(e)} />
      </div>
      <div>
        <button id="ent" onClick={() => displayGraph()}>Enter</button>
      </div>
    </div>
  );
}

export default Input;