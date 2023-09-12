import React from 'react'
import './style.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function GraphCompo({
    data,
    views,
    title,
    dataKey,
    type
}) {


    const matches = useMediaQuery('(min-width:900px)');
    const CustomTooltip = ({ active, payload, label, type }) => {
        if (active && payload && payload.length) {
            return (
                <div className="graph-custom-tool-tip">
                    <div>
                        <h3>Day :</h3>
                        <p>{label}</p>
                    </div>
                    <div>
                        <h3>{type} :</h3>
                        {("Total time" === type) ?
                            <p>{(payload[0].value / 60).toFixed(2)} Minutes</p> :
                            <p>{payload[0].value}</p>}
                    </div>
                </div>
            );
        }

        return null;
    };


    return <div className='dashboard-charts-cards'>

        <ResponsiveContainer width="100%" height={!matches ? 220 : 300}>
            <LineChart
                width="100%"
                height={!matches ? 230 : 300}
                data={data}
                margin={{
                    top: !matches ? 10 : 15,
                    right: !matches ? 20 : 50,
                    left: !matches ? -28 : -20,
                    bottom: !matches ? 1 : 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<CustomTooltip type={type} />} />
                <Line type="monotone" dataKey={dataKey} stroke="#000" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>

        <section>
            <p>{views}</p>
            <h3>{title}</h3>
        </section>
    </div >
}
