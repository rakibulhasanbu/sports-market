import { useState } from "react";
import AppTabs from "../components/ui/AppTabs";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useGetSalesHistoryQuery } from "../redux/features/sales/saleApi";

const SalesHistory = () => {
    const { data, isLoading, isError } = useGetSalesHistoryQuery(undefined);

    const tabs = [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly" },
    ];

    const generateChartData = (data: any[], label: string) => {
        console.log(data);
        return {
            labels: data?.map((entry) => `${label} ${entry._id}`),
            datasets: [
                {
                    label: `${label} total Sales`,
                    data: data?.map((entry) => entry.totalSales),
                    backgroundColor: "#FF5A35",
                },
            ],
        };
    };

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <div className=''>
            <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="container">
                <h2 className="text-center text-2xl font-bold my-4 py-2 bg-primary/10">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                    Sales
                </h2>

                <Bar
                    data={generateChartData(
                        data?.data[activeTab],
                        activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    )}
                />
            </div>
        </div>
    );
};

export default SalesHistory;