import React, { useRef, useEffect } from 'react';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({
    TabOneDataSet,
    TabTwoDataSet,
    TabThreeDataSet,
    TabFourDataSet,
    tabOne,
    tabTwo,
    tabThree,
    tabFour
}) {

    const ref = React.useRef(0)
    const [dashChartWidth, setDashChartWidth] = React.useState(() => {
        if (ref.current) {
            return ref.current.offsetWidth;
        }
        return 300;
    })
    useEffect(() => {
        window.addEventListener("resize", (e) => {
            if (ref?.current) {
                setDashChartWidth(ref.current.offsetWidth)
            }
        })
        setDashChartWidth(document.querySelector(".blog-dash").clientWidth)
    }, [])


    const TabsPanel = [
        {
            name: <PanelTitleCompo
                title={tabOne.value}
                desc={tabOne.title}
            />,
            biography: <>
                <div>
                    <LineChart
                        width={dashChartWidth}
                        height={300}
                        data={TabOneDataSet}
                        margin={{
                            top: 15,
                            right: 50,
                            left: -20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ip" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </>
        },
        {
            name: <PanelTitleCompo
                title={tabTwo.value}
                desc={tabTwo.title}
            />
            , biography: <>
                <LineChart
                    width={dashChartWidth}
                    height={300}
                    data={TabTwoDataSet}
                    margin={{
                        top: 15,
                        right: 50,
                        left: -20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ip" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="totalTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>


            </>
        },
        {
            name: <PanelTitleCompo
                title={tabThree.value}
                desc={tabThree.title}
            />,
            biography: <>
                <div>
                    <LineChart
                        width={dashChartWidth}
                        height={300}
                        data={TabThreeDataSet}
                        margin={{
                            top: 15,
                            right: 50,
                            left: -20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ip" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </>
        },
        {
            name: <PanelTitleCompo
                title={tabFour.value}
                desc={tabFour.title}
            />,
            biography: <>
                <div>
                    <LineChart
                        width={dashChartWidth}
                        height={300}
                        data={TabFourDataSet}
                        margin={{
                            top: 15,
                            right: 50,
                            left: -20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ip" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalTime" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </div>
            </>
        }
    ];


    return <div>
        <div
            ref={ref}
            className='dash-charts'
            style={{
                overflow: "hidden"
            }}>
            <Tabs
                items={TabsPanel.map((president, index) => ({
                    title: president.name,
                    getContent: () => president.biography,
                    /* Optional parameters */
                    key: index,
                    tabClassName: 'tab',
                    panelClassName: 'panel',
                }))}
                // beforeChange:()=>{}
                transform={false}
            />
        </div>
    </div>;
}


const PanelTitleCompo = ({ title, desc }) => {
    return <div className='blog-dash-panel-title-compo'>
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
}