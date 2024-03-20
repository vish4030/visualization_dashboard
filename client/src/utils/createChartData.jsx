

export default function createChartData(dataset, years) {

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        backgroundColor: "#48249c7f",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years?.map(
          (year) =>
            dataset.intensity[year].sum / dataset.intensity[year].arr.length
        ),
      },
      {
        label: "Likelihood",
        backgroundColor: "#fb17a07e",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years?.map(
          (year) =>
            dataset.likelihood[year].sum / dataset.likelihood[year].arr.length
        ),
      },
      {
        label: "Relevance",
        backgroundColor: "#1c5f117e",
        borderColor: "#6c794a",
        borderWidth: 1,
        data: years.map(
          (year) =>
            dataset?.relevance[year].sum / dataset.relevance[year].arr.length
        ),
      },
    ],
  };
  return chartData;
}
