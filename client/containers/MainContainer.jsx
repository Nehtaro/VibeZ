import React, { useState, useEffect } from 'react';
import Input from '../components/Input.jsx';
import Graph from '../components/Graph.jsx';

const MainContainer = () => {
  const [channel, setChannel] = useState('');
  const [allChannels, setAllChannels] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [data, setData] = useState(null);
  const [graphType, setGraphType] = useState('Line Graph');
  const [graph, setGraph] = useState(false);
  const [limit, setLimit] = useState(100);
  const [workspace, setWorkspace] = useState('Connect to a Slack Workspace');

  //displays graph on click of Enter button
  const displayGraph = () => {
    const oldDate = new Date(start).getTime()/1000; //milliseconds from 1970
    const lateDate = new Date(end).getTime()/1000; //milliseconds from 1970
    const fetchURL = `/slack/?channel=${channel}&oldest=${oldDate}&latest=${lateDate}&limit=${limit}`
    fetch(fetchURL)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setGraph(true);
      })
      .catch(err => console.log('MainContainer displayGraph ERROR: ', err));
  }

  useEffect(() => {
    // 1 month => 2.629746 * Math.pow(10, 9) milliseconds
    // 2 weeks => 1.2096 * Math.pow(10, 9) milliseconds
    // https://www.calculateme.com/time/hours/to-milliseconds/24
    const present = new Date(Date.now() - 25200000); //units = milli
    const defaultTime = new Date(present - (1.2096 * Math.pow(10, 9))); //units = milli
    
    //formats time in format: 2011-10-05T14:48:00.000Z
    const isoPresent = present.toISOString();
    const isoDefault = defaultTime.toISOString();

    //we just want the first 16 : no seconds or milliseconds
    const pTime = isoPresent.slice(0, 16); 
    const dTime = isoDefault.slice(0, 16);

    setEnd(pTime);
    setStart(dTime);
    //updates state.channel, state.allChannels, state.workspace on fetch
    fetch('/slack/channels')
      .then(res => res.json())
      .then(data => {
        if (data.channels) {
          setChannel(data.channels[0].id);
          setAllChannels(data.channels);
          setWorkspace(`Connected to: ${data.workspace}`);
        }
      })
      .catch(err => console.log('MainContainer.componentDidMount ERROR: ', err));
  }, []);

  return (
    <div className='main'>
      <nav>
        <h1>VibeZ</h1>
        <h2>{workspace}</h2>
      </nav>
      <a href="https://slack.com/oauth/authorize?client_id=653541339828.770547895078&scope=channels:history,channels:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
      <Input
        channel={channel} setChannel={setChannel}
        allChannels={allChannels}
        start={start} setStart={setStart}
        end={end} setEnd={setEnd}
        graphType={graphType} setGraphType={setGraphType}
        displayGraph={displayGraph}
        setLimit={setLimit}
      />
      <Graph graph={graph} graphType={graphType} data={data} />
    </div>
  );
}

export default MainContainer;
