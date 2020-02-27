import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  let [array, setArray] = useState(
    [
      {
          numSurgeries: "0",
          numXrays: "0",
          timestamp: "None:"
      }
    ]
  )

  const [firstS, setFirstS] = useState("None");

  const [firstX, setFirstX] = useState("None");

  const callApi= () => {
    
    // axios.get('https://api.kanye.rest')
    //   .then(json => {
    //     // console.log(json.data.quote)
    //     setQuote(json.data.quote)
    //     document.title = json.data.quote
    //   })
    axios.get('http://localhost:8100/report/stats')
    .then(json => {
      console.log(json.data)
      setArray(json.data)
    })

    axios.get('http://localhost:8110/report/get_offset?offset=0')
    .then(json => {
      console.log(json.data.patient_id)
      setFirstX(json.data.patient_id)
    })

    axios.get('http://localhost:8110/report/get_last')
    .then(json => {
      console.log(json.data.patient_id)
      setFirstS(json.data.patient_id)
    })
  
  }

  useEffect(() => {
    setTimeout(callApi, 2000)
  }, [array])

  return (
    <div className="App">
      <img src={"https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png"} />
      <div>NumSurgeries = {array[0].numSurgeries}</div>
      <div>NumXrays = {array[0].numXrays}</div>
      <div>Time: {array[0].timestamp}</div>
      <div>First X-Ray: {firstX}</div>
      <div>First Surgery: {firstS}</div>
    </div>
  );
}

export default App;
