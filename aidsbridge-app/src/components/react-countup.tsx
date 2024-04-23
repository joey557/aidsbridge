import React from 'react';
import CountUp from 'react-countup';
import { Typography, Box } from '@mui/material';

//set up count for pages
interface StatisticProps {
    
    endValue: number;
    decimals: number;
    duration: number;
    label: string;
    description: string;
}

const Statistic: React.FC<StatisticProps> = ({endValue,decimals, duration, label, description}) =>{
    return (
        <Box textAlign= "center" >
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: "#cf233a" }} gutterBottom>
                <CountUp 
                end={endValue} 
                decimals={decimals}
                duration={duration} 
                enableScrollSpy
                scrollSpyDelay={100} // 100 milliseconds delay
                /><br/>
                {label}
            </Typography>
            <hr style={{ width: '300px', border: '1px solid #cf233a', marginBottom: '20px' }} />
            <Typography variant='subtitle2' gutterBottom style={{ color: '#3c3c3c' }}>
                {description}
            </Typography>
            
        </Box>
    );
};

export default Statistic;