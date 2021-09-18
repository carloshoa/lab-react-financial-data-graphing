import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Graph(){
    const [state, setState] = useState({
        date: [],
        values: []
    })

    const [chartInstance, setChartInstance] = useState(null)

    useEffect(()=>{
        axios
            .get("http://api.coindesk.com/v1/bpi/historical/close.json")
            .then((response)=>{
                transformData(response)
           
            })
            .catch((err)=>console.log(err));

    },[]);

    useEffect(()=>{
        renderChart();
    },[state]);
    
    function transformData(data) {
            
        const dates = Object.keys(data.data.bpi);
    
        const values = Object.values(data.data.bpi);
    
        
        setState({
            ...state,
            dates: [...dates.reverse()],
            values: [...values.reverse()],
          });
        }

        function renderChart() {
            if (chartInstance) {
              chartInstance.destroy();
            }
        
            const chart = new Chart(document.getElementById("myChart"), {
              type: "line",
              data: {
                labels: state.dates,
                datasets: [
                  {
                    label: "Price of Bitcoin",
                    data: state.values,
                    fill: true,
                    borderColor: "#FF6383",
                    backgroundColor: "#FF6383",
                    tension: 0.1,
                  },
                ],
              },
            });
        
            setChartInstance(chart);
          }    
    return(
    <div>
        <canvas id="myChart"></canvas>
    </div>
    )
}

export default Graph;