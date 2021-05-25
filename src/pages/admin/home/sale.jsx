import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

export default class Sale extends React.Component {
  render() {
    const data = [
      {
        year: "1月",
        sales: 32
      },
      {
        year: "2月",
        sales: 55
      },
      {
        year: "3月",
        sales: 66
      },
      {
        year: "4月",
        sales: 34
      },
      {
        year: "5月",
        sales: 57
      },
      {
        year: "6月",
        sales: 38
      },
      {
        year: "7月",
        sales: 54
      },
      {
        year: "8月",
        sales: 74
      },
      {
        year: "59月",
        sales: 54
      },
      {
        year: "10月",
        sales: 76
      },
      {
        year: "11月",
        sales: 35
      },
      {
        year: "12月",
        sales: 65
      }
    ]
    const cols = {
      sales: {
        tickInterval: 20
      }
    }
    return (
      <div style={{ width: '100%', marginLeft: -30 }}>
        <Chart height={ 338 } data={ data } scale={ cols } forceFit>
          <Axis name="year"/>
          <Axis name="sales"/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="year*sales"/>
        </Chart>
      </div>
    )
  }
}