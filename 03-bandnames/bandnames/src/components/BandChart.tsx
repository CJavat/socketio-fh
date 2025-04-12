import { useContext, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { SocketContext } from "../context/SocketContext";
import { Band } from "../interfaces";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null); // ← nueva ref

  useEffect(() => {
    socket?.on("current-bands", (bands) => {
      crearGrafica(bands);
    });

    return () => {
      socket?.off("current-bands");
      chartInstanceRef.current?.destroy();
    };
  }, [socket]);

  const crearGrafica = (bands: Band[] = []) => {
    if (!chartRef.current) return;

    // 🔥 destruir gráfico anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(95, 192, 75, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return <canvas ref={chartRef}></canvas>;
};
