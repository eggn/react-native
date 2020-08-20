import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    // ProgressChart,
    // ContributionGraph,
    // StackedBarChart,
} from 'react-native-chart-kit';
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios';
//import { daily } from '../data/daily'
//import { weekly } from '../data/weekly'
//import { acumulatedDataByState } from '../data/data'


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const ChartsView = () => {
    const [dimensions, setDimensions] = useState({ window, screen });
    const [daily, setDaily] = useState(null)
    const [weekly, setWeekly] = useState(null)
    const [acumulatedDataByState, setAcumulatedDataByState] = useState(null)

    
    const LABEL_REGIOES = ['Nordeste', 'Sudeste', 'Norte', 'Sul', 'Centro-Oeste']
    const NORTE = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO']
    const NORDESTE = ['AL', 'BA', 'CE', 'MA', 'PB', 'PI',  'PE', 'RN', 'SE']
    const CENTRO_OESTE = ['DF', 'GO', 'MT', 'MS']
    const SUDESTE = ['ES', 'MG', 'RJ', 'SP']
    const SUL = ['PR', 'RS', 'SC']
    const TOTAL_BY_REGION = [0,0,0,0,0]


    useEffect(()=>{
        axios.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&place_type=state`)
        .then(res => {               
            setAcumulatedDataByState(res.data);
        })
        axios.get(`https://brasil.io/covid19/historical/daily`)
        .then(res => {          
            setDaily(res.data);
        })
        axios.get(`https://brasil.io/covid19/historical/weekly`)
        .then(res => {          
           setWeekly( res.data);
        })

    },[])

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    //Detectar se a tela mudou a orientação
    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });    
       
    if (!daily || !weekly || !acumulatedDataByState ) {

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#187bcd" />
            </View>
        )

    }

    const width = dimensions.window.width < dimensions.window.height ? dimensions.window.width - 12 : dimensions.window.width - 16
    const height = dimensions.window.width < dimensions.window.height ? dimensions.window.height / 2 : dimensions.window.height / 2 + 55
    const heightPie =  dimensions.window.width < dimensions.window.height ? dimensions.window.height / 2 -120 : dimensions.window.height / 2 + 120
    const paddingTop =  dimensions.window.width < dimensions.window.height ? 30 : 10
    const isLandscape =  dimensions.window.width < dimensions.window.height 
    const removedLabels = []
    daily.from_states.date.forEach((item, index) => {
        if (index % 5 !== 0) {
            removedLabels.push(index)
        }
    })
    
    /****Processamento por região */
    acumulatedDataByState.results.forEach(item=>{        
        if(NORTE.includes(item.state)){
            TOTAL_BY_REGION[0] += item.deaths 
        }else if(NORDESTE.includes(item.state)){
            TOTAL_BY_REGION[1] += item.deaths 
        }else if(CENTRO_OESTE.includes(item.state)){
            TOTAL_BY_REGION[2] += item.deaths 
        }else if(SUDESTE.includes(item.state)){
            TOTAL_BY_REGION[3] += item.deaths 
        }else if(SUL.includes(item.state)){
            TOTAL_BY_REGION[4] += item.deaths 
        }
    })   

    return (
        <View style={{paddingTop}}>
            <ScrollView>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,                        
                        marginTop: 18,
                    }}>
                    Casos confirmados acumulados por dia (Brasil)
                </Text>
                <LineChart
                    data={{
                        labels: daily.from_states.date,
                        datasets: [
                            {
                                data: daily.from_states.confirmed,
                                strokeWidth: 4,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional                                
                            },
                        ],
                        legend: ["Casos"],
                    }}
                    width={width}
                    height={height}
                    //withDots={false}
                    withOuterLines={true}                   
                    withVerticalLines={false}
                    withVerticalLabels={true}
                    hidePointsAtIndex={removedLabels}
                    verticalLabelRotation={270}
                    xLabelsOffset={isLandscape? 40: 18}
                    segments={8}                    
                    formatXLabel={label => moment(label).locale('pt-br').format(isLandscape?'DD/MMM/YY':'DD/MMM')}
                    chartConfig={{
                         backgroundGradientFrom: "#a3a3ff",
                         backgroundGradientTo: "blue",
                        backgroundGradientFromOpacity: 0.1,
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        propsForDots: {
                            r: "2",
                            strokeWidth: "2",
                            stroke: "blue",
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginHorizontal: 6
                    }}
                />

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,                        
                        marginTop: 18,
                    }}>
                    Óbitos confirmados acumulados por dia (Brasil)
                </Text>
                <LineChart
                    data={{
                        labels: daily.from_states.date,
                        datasets: [
                            {
                                data: daily.from_states.deaths,
                                strokeWidth: 4,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional                                
                            },
                        ],
                        legend: ["Casos"],
                    }}
                    width={width}
                    height={height}
                    //withDots={false}                   
                    withVerticalLines={false}
                    withVerticalLabels={true}
                    hidePointsAtIndex={removedLabels}
                    verticalLabelRotation={270}                    
                    xLabelsOffset={isLandscape? 40: 18}
                    segments={8}                    
                    formatXLabel={label => moment(label).locale('pt-br').format(isLandscape?'DD/MMM/YY':'DD/MMM')}
                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "gray",
                        backgroundGradientFromOpacity: 0.1,
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        propsForDots: {
                            r: "2",
                            strokeWidth: "2",
                            stroke: "red",
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginHorizontal: 6
                    }}
                />

                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,                   
                    marginTop: 18,
                }}>
                    Novos casos confirmados por dia (Brasil)
                </Text>
                <BarChart
                    data={{
                        labels: daily.from_states.date,
                        datasets: [
                            {
                                data: daily.from_states.new_confirmed,
                            },
                        ],
                    }}
                    width={width}
                    height={height + 60}
                    //yAxisLabel={'$'}                    
                    xLabelsOffset={isLandscape? 45: 35}                                        
                    verticalLabelRotation={-90}
                    hidePointsAtIndex={removedLabels}                    
                    segments={8}
                    chartConfig={{
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        barPercentage: 0.1,

                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />

                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,                    
                    marginTop: 18,
                }}>
                    Novos óbitos confirmados por dia (Brasil)
                </Text>
                <BarChart
                    data={{
                        labels: daily.from_states.date,
                        datasets: [
                            {
                                data: daily.from_states.new_deaths,
                            },
                        ],
                    }}
                    width={width}
                    height={height + 60}
                    //yAxisLabel={'$'}   
                    segments={9}                 
                    xLabelsOffset={isLandscape? 45: 35}                                        
                    verticalLabelRotation={-90}
                    hidePointsAtIndex={removedLabels}                                        
                    formatXLabel={label => moment(label).locale('pt-br').format(isLandscape?'DD/MMM/YY':'DD/MMM')}
                    chartConfig={{
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        color: (opacity = .7) => `rgba(120, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        barPercentage: 0.1,

                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,                        
                        marginTop: 8,
                    }}>
                    Casos confirmados x Mortes x Novos casos por semanada epidemiológica (Brasil)
                </Text>
                <LineChart
                    data={{
                        labels: weekly.from_states.epidemiological_week,
                        datasets: [
                            {
                                data: weekly.from_states.confirmed,
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_states.deaths,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_states.new_confirmed,
                                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})` // optional
                            },
                        ],
                        legend: ["Confirmados", "Mortes", "Novos Casos"],
                    }}
                    width={width}
                    height={height}
                    segments={10}
                    //formatYLabel={label=>(label/10000).toFixed(2)}
                    chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        backgroundGradientFromOpacity: 0.1,
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        propsForDots: {
                            r: "4",
                            strokeWidth: "1",
                            stroke: "#ffa726",
                        }
                    }}
                    // bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginHorizontal: 6
                    }}
                />

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,
                        padding: 16,
                        marginTop: 8,
                    }}>
                    Causas de óbitos por semanada epidemiológica (Brasil)
                </Text>
                <LineChart
                    data={{
                        labels: weekly.from_registries.epidemiological_week,
                        datasets: [
                            {
                                data: weekly.from_registries.new_deaths_pneumonia,
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_registries.new_deaths_covid19,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_registries.new_deaths_indeterminate,
                                color: (opacity = 1) => `rgba(255, 200, 0, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_registries.new_deaths_respiratory_failure,
                                color: (opacity = 1) => `rgba(255, 102, 204, ${opacity})` // optional
                            },
                            {
                                data: weekly.from_registries.new_deaths_others,
                                color: (opacity = 1) => `rgba(200, 200, 100, ${opacity})` // optional
                            },
                        ],
                        legend: ["Pneumonia", "COVID-19", "Indeterminada", "Insuf. Resp.", "Outras",],
                    }}
                    width={width}
                    height={height}
                    segments={10}
                    //formatYLabel={label=>(label/10000).toFixed(2)}
                    chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        backgroundGradientFromOpacity: 0.1,
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
                        propsForDots: {
                            r: "4",
                            strokeWidth: "1",
                            stroke: "#ffa726",
                        }
                    }}
                   // bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginHorizontal: 6
                    }}
                />

                {/*Example of Pie Chart*/}
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,                        
                        marginTop: 16,
                    }}>
                    Mortes por COVID-19 por Região (Brasil)
                </Text>
                <PieChart
                    data={[
                        {
                            name: LABEL_REGIOES[0],
                            cases: TOTAL_BY_REGION[0],
                            color: 'rgba(131, 167, 234, 1)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: LABEL_REGIOES[1],
                            cases: TOTAL_BY_REGION[1],
                            color: '#F00',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: LABEL_REGIOES[2],
                            cases: TOTAL_BY_REGION[2],
                            color: 'green',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: LABEL_REGIOES[3],
                            cases: TOTAL_BY_REGION[3],
                            color: 'rgb(0, 0, 255)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: LABEL_REGIOES[4],
                            cases: TOTAL_BY_REGION[4],
                            color: 'rgb(0, 255, 255)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={width}
                    height={heightPie}
                    chartConfig={{                        
                        backgroundGradientFrom: 'rgb(0, 0, 255)',
                        backgroundGradientTo: 'rgb(0, 0, 120)',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    accessor="cases"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute //for the absolute number remove if you want percentage
                />


            </ScrollView>
        </View>

    )
}
export default ChartsView


