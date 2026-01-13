import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import useLoader from "../../hooks/useLoader";
import { Mosaic } from "react-loading-indicators";

const ReportsAnalytics = ({ soldItemsSummary, isPendingSoldItems }) => {
  const [revenueWeekly, isPendingWeekly, refetchWeekly] = useLoader(
    "revenueWeekly",
    `/revenueWeekly`
  );
  const [chartDataRaw, isPending, refetch] = useLoader(
    "ordersByPaymentMethod",
    "/ordersByPaymentMethod"
  );

  if (isPending) return <p>Loading...</p>;

  const data = [
    {
      method: "Cash",
      orders: chartDataRaw?.Cash || 0,
      revenue: chartDataRaw?.revenueCash || 0,
    },
    {
      method: "Stripe",
      orders: chartDataRaw?.Stripe || 0,
      revenue: chartDataRaw?.revenueStripe || 0,
    },
  ];
  return (
    <div className="  px-5 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-12">
        {isPendingWeekly ? (
          <div className="mt-20 flex justify-center">
            <div className="inline-block scale-[0.7] origin-top">
              <Mosaic
                size="small"
                color={[
                  "#000000",
                  "#475569",
                  "#4b5563",
                  "#52525b",
                  "#404040",
                  "#262626",
                  "#1c1917",
                ]}
                text=""
                textColor=""
              />
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white shadow-lg p-7">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">
              Revenue Growth Trend
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueWeekly}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="dailyRevenue"
                    stroke="#fb923c"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {isPendingSoldItems ? (
          <div className="mt-20 flex justify-center">
            <div className="inline-block scale-[0.7] origin-top">
              <Mosaic
                size="small"
                color={[
                  "#000000",
                  "#475569",
                  "#4b5563",
                  "#52525b",
                  "#404040",
                  "#262626",
                  "#1c1917",
                ]}
                text=""
                textColor=""
              />
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white shadow-lg p-7">
            <h3 className="font-semibold text-lg text-slate-900 mb-1">
              Revenue by Category
            </h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={soldItemsSummary.byType}>
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="totalQuantity"
                    fill={({ index }) => colors[index]}
                    radius={[10, 10, 0, 0]}
                  >
                    {soldItemsSummary.byType?.map((entry, index) => {
                      const colors = [
                        "#FFBB28",
                        "#FF8042",
                        "#DC143C",
                        "#191970",
                        "#FF7F50",
                        "#228B22",
                        "#7851A9",
                        "#008080",
                        "#F4C430",
                        "#708090",
                        "#40E0D0",
                        "#FFD700",
                        "#FF4500",
                        "#0088FE",
                        "#00C49F",
                        "#00CED1",
                      ];
                      const randomColor = colors[index % colors.length];
                      return <Cell key={`cell-${index}`} fill={randomColor} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      {isPendingSoldItems ? (
        <div className="mt-20 flex justify-center">
          <div className="inline-block scale-[0.7] origin-top">
            <Mosaic
              size="small"
              color={[
                "#000000",
                "#475569",
                "#4b5563",
                "#52525b",
                "#404040",
                "#262626",
                "#1c1917",
              ]}
              text=""
              textColor=""
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          <div className="bg-white p-6 rounded-xl  shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Orders by Payment Method
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#3b82f6" barSize={40}>
                  {data?.map((entry, index) => {
                    const colors = ["#FF4500", "#00CED1"];
                    const fillColor = colors[index % colors.length];
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl  shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Revenue by Payment Method
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip formatter={(value) => `৳ ${value}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" barSize={40}>
                  {data?.map((entry, index) => {
                    const colors = ["#FFBB28", "#FF8042"];
                    const fillColor = colors[index % colors.length];
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl  shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Revenue by Menu Section
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={soldItemsSummary.byMenuSection}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => `৳ ${value}`} />
                <Legend />
                <Bar dataKey="totalQuantity" barSize={40}>
                  {soldItemsSummary.byMenuSection?.map((entry, index) => {
                    const colors = ["#ff0000", "#0000ff", "#00ff00"];
                    const fillColor = colors[index % colors.length];
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
