import { useState, useEffect } from "react";
import React from "react";
import { Grid } from "@mui/material";

// import { styled } from "@mui/material/styles";
import axios from "axios";
import { Button } from "@mui/material";

// import toast, { Toaster } from "react-hot-toast";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const MovieGraph = (props) => {
  const [data, setData] = useState([]);
  const [graphType, setGraphType] = useState("bar"); // added state to keep track of the current graph type
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF", "#1151F9"];
  
  const fetchData = () => {
    try {
    axios
      .get('http://localhost:4000/getMoviesGroupedByYear')
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          let data = [];
          response.data.forEach((element) => {
            if (element._id !== null) {
              data.push({ name: element._id, numberOfMovies: element.movies.length });
            }
          });

          let sortedData = [...data].sort((first, second) => first.name - second.name);
          setData(sortedData);
        }
      });
    } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function to handle button click and change the graphType state
  const handleGraphTypeChange = () => {
    if (graphType === "bar") {
      setGraphType("pie");
    } else {
      setGraphType("bar");
    }
  };

  return (
    <React.Fragment>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Grid
        container
        justifyItems="center"
        direction="column"
        alignItems="center">
          
        <Grid item xs={4} sx={{ mb: 2, mt:12 }} alignContent="center"> 
          <Button 
            color="primary"
            variant="outlined"
            onClick={handleGraphTypeChange}>
            Change Graph
          </Button>
        </Grid>

        <Grid item xs={8}>
          {graphType === "bar" ? (
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="name"/>
              <YAxis />
              <CartesianGrid strokeDasharray="2 2" />
              <Tooltip wrapperStyle={{ width: 200, backgroundColor: '#ccc' }}
                    formatter={function(numberOfMovies) {return `${numberOfMovies}`}}/>
              <Legend />
              <Bar dataKey="numberOfMovies" fill="#00a0fc" stroke="#094750" strokeWidth={1}>
              {
                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
              }
              </Bar>
            </BarChart>
          ) : (
            <PieChart width={700} height={350} data={data}>
              <Pie
                dataKey="numberOfMovies"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#00a0fc" 
                stroke="#094750"
                label
              >
              {
                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
              }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MovieGraph;