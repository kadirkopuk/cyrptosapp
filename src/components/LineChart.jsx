import React from "react";
import Chart from "react-apexcharts";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(parseFloat(coinHistory?.data?.history[i].price));
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString(
        "tr-TR"
      )
    );
  }

  const data = {
    options: {
      chart: {
        id: "basic-line",
      },
      xaxis: {
        categories: coinTimestamp,
      },
      yaxis: {
        title: {
          text: "Price In USD",
        },
        labels: {
          formatter: function (value) {
            return parseInt(value).toLocaleString();
          },
        },
      },
    },
    series: [
      {
        name: "Price In USD",
        data: coinPrice,
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    </>
  );
};

export default LineChart;
