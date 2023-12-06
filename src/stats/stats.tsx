import React, {useState, useEffect} from 'react'
import "./stats.css";
import axios from "axios";
import {useUserContext} from "../useUserContext";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, BarElement, LinearScale, Tooltip, CategoryScale, Legend} from 'chart.js/auto';

ChartJS.register (
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
)


const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData<'bar', number[], string>>({
        labels:[],
        datasets: []
    });
    const {user, isAuthenticated} = useUserContext();
    //const [weeklyTime, setWeeklyTime] = useState({});



    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: 'red',
                    font: {
                        size: 11,
                        family: "Nunito-Bold",
                    },
                },
            },
            y: {
                ticks: {
                    color: 'blue',
                    font: {
                        size: 11,
                        family: "Nunito-Bold",
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'green',
                    font: {
                        size: 16,
                        famil: "Nunito-Bold",
                    },
                },
            },
        },
    };


    const transformLabels = {
        'sunday' : 'Sun',
        'monday' : 'Mon',
        'tuesday' : 'Tue',
        'wednesday' : 'Wed',
        'thursday' : 'Thu',
        'friday' : 'Fri',
        'saturday' : 'Sat',

    };


    const formatChartData = (data) => {
        const labels = Object.keys(data).map(day => transformLabels[day]);
        const values = Object.values(data).map(value => Number(value));
            

        return {
            labels,
            datasets: [{
                label: 'Hours Worked',
                data: values,
            }]
        };
    };

    const getWeeklyTime = async () => {
        if (isAuthenticated) {
            try {
                

                const userId = sessionStorage.getItem("userId");
                console.log(userId);
        
                const response = await axios.post("http://localhost:5000/getWeeklyTime",
                {
                userId: userId,
                })
               
                console.log('getting weekly time!')
                
                const formattedData = formatChartData(response.data.weeklyTime);
                setChartData(formattedData);
                console.log(formattedData);

            } catch (error){
                console.log("failed to retrieve stats!");
            }
        }
   
    };

    useEffect(() => {
        getWeeklyTime();

    }, [isAuthenticated]);
    
    return (

        <div>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
   
}

export const Stats = () => {

    const [hours, setHours] = useState(0);
    const [kibbles, setKibbles] = useState(0);
    const {user, isAuthenticated} = useUserContext();

    const getHoursAndKibbles = async () => {

        if (isAuthenticated) {
        
            try {
                const userId = sessionStorage.getItem("userId");
                console.log(userId);
            
                const response = await axios.post("http://localhost:5000/getTimeAndKibbles",
                {
                  userId: userId,
                })

                const hoursWorked = response.data.hours;
                const kibbleEarned = Math.floor(hoursWorked/20);
                setHours(hoursWorked);
                setKibbles(kibbleEarned);

                console.log("successfully retrieved data and kibbles!");

            } catch (error) {
                console.log('failed to retrieve hours and kibbles')


            }

        }
    }

    useEffect(() => {
        getHoursAndKibbles();
    }, [isAuthenticated, getHoursAndKibbles]);





    return (
        <div className="side-bar-container">
            <div className="nav-bar-form">
            <div className="profile-container">
              
                <label className = "my-stats-label">MY STATS</label>

                {/* Kibble and Total Hours worked */}
                <div className="row-container-2-items"> 
                    <div className= "itemContainer"> 
                        <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_140_795)">
<path d="M36.8867 29.7617H36.5315L33.6424 15.798C33.3325 14.2999 32.2077 13.1289 30.7931 12.7102C30.7978 12.63 30.8008 12.5496 30.8008 12.4688C30.8008 10.2437 29.0113 8.4288 26.796 8.38746C26.1946 7.30387 25.0488 6.60547 23.75 6.60547C23.0674 6.60547 22.4077 6.8092 21.8492 7.17213C21.0996 6.44226 20.0823 6.01172 19 6.01172C17.9177 6.01172 16.9004 6.44226 16.1508 7.17213C15.5922 6.80913 14.9327 6.60547 14.25 6.60547C12.9512 6.60547 11.8055 7.30387 11.2041 8.38746C8.98871 8.4288 7.19922 10.2437 7.19922 12.4688C7.19922 12.5496 7.20219 12.63 7.20686 12.7102C5.79218 13.1289 4.66739 14.2999 4.35753 15.798L1.46849 29.7617H1.11328C0.498453 29.7617 0 30.2602 0 30.875C0 31.4898 0.498453 31.9883 1.11328 31.9883H36.8867C37.5015 31.9883 38 31.4898 38 30.875C38 30.2602 37.5015 29.7617 36.8867 29.7617ZM11.2812 10.6133C11.4169 10.6133 11.5542 10.6286 11.6895 10.659C11.9777 10.7236 12.2797 10.6711 12.5291 10.5129C12.7785 10.3549 12.9549 10.1041 13.0194 9.81595C13.1471 9.2458 13.6646 8.83203 14.25 8.83203C14.6987 8.83203 15.1043 9.06293 15.3349 9.44961C15.5475 9.80623 15.9407 10.0149 16.3554 9.99088C16.7699 9.96691 17.1367 9.7142 17.3067 9.33546C17.6059 8.66897 18.2706 8.23828 19 8.23828C19.7293 8.23828 20.3941 8.66897 20.6933 9.33546C20.8633 9.71427 21.2301 9.96691 21.6445 9.99088C22.0589 10.0149 22.4524 9.80623 22.6651 9.44961C22.8956 9.06293 23.3012 8.83203 23.7499 8.83203C24.3353 8.83203 24.8528 9.2458 24.9805 9.81595C25.045 10.1041 25.2214 10.3549 25.4708 10.5129C25.7202 10.671 26.0223 10.7236 26.3103 10.659C26.4456 10.6286 26.5829 10.6133 26.7186 10.6133C27.7417 10.6133 28.5741 11.4456 28.5741 12.4688C28.5741 12.4936 28.5732 12.5183 28.5722 12.543H9.42764C9.42667 12.5183 9.42578 12.4936 9.42578 12.4688C9.42578 11.4456 10.2581 10.6133 11.2812 10.6133ZM3.74218 29.7617L6.53793 16.2491C6.71524 15.3918 7.47939 14.7695 8.35488 14.7695H29.645C30.5205 14.7695 31.2846 15.3918 31.462 16.2491L34.2578 29.7617H3.74218Z" fill="#B9835E"/>
<path d="M27.2383 21.9687C27.2383 21.4298 27.8207 20.6643 28.1027 20.3781C28.5346 19.9431 28.5336 19.2404 28.0998 18.8066C27.6651 18.3718 26.9602 18.3718 26.5254 18.8066C26.4079 18.924 25.5992 19.76 25.2145 20.8555H23.7892C23.9397 20.0534 24.1871 19.4207 24.1908 19.4117C24.4177 18.8412 24.14 18.1945 23.5699 17.9664C22.9989 17.7381 22.351 18.0158 22.1227 18.5866C22.1014 18.6398 21.7097 19.6313 21.5338 20.8555H19.5966C19.7441 19.7134 20.0526 18.7695 20.0566 18.7571C20.2503 18.1741 19.9351 17.5444 19.3521 17.3502C18.769 17.1557 18.1384 17.471 17.9439 18.0543C17.9225 18.1185 17.5135 19.361 17.3551 20.8555H15.9571V18.4063C15.9571 18.0791 15.8131 17.7684 15.5634 17.5569C15.3137 17.3453 14.9836 17.2543 14.6608 17.3082C10.3894 18.0201 9.6263 21.5984 9.59587 21.7504C9.567 21.8946 9.567 22.0429 9.59587 22.1871C9.62623 22.3391 10.3894 25.9175 14.6608 26.6294C14.7217 26.6395 14.7829 26.6445 14.8438 26.6445C15.1054 26.6445 15.3609 26.5522 15.5634 26.3807C15.8131 26.1691 15.9571 25.8585 15.9571 25.5312V23.082H17.3551C17.5135 24.5765 17.9225 25.819 17.9439 25.8832C18.0994 26.3496 18.5334 26.6442 18.9994 26.6442C19.1158 26.6442 19.2342 26.6258 19.3507 26.5871C19.9337 26.3936 20.2495 25.7636 20.0566 25.1803C20.0526 25.168 19.744 24.2241 19.5966 23.0819H21.5338C21.7097 24.3062 22.1014 25.2977 22.1227 25.3509C22.2967 25.7859 22.7142 26.0502 23.1557 26.0502C23.2929 26.0502 23.4324 26.0247 23.5676 25.9708C24.1382 25.7438 24.4168 25.0967 24.1908 24.5258C24.1872 24.5167 23.9398 23.8841 23.7892 23.0819H25.2146C25.5993 24.1775 26.408 25.0134 26.5255 25.1309C26.7432 25.3486 27.029 25.4577 27.3149 25.4577C27.5996 25.4577 27.8843 25.3493 28.1014 25.1323C28.5361 24.6975 28.5375 23.9941 28.1028 23.5593C27.8207 23.2731 27.2383 22.5076 27.2383 21.9687ZM13.7305 24.0299C12.4885 23.426 12.0067 22.4206 11.8461 21.9687C12.0067 21.5167 12.4885 20.5114 13.7305 19.9075V24.0299Z" fill="#B9835E"/>
</g>
<defs>
<clipPath id="clip0_140_795">
<rect width="38" height="38" fill="white"/>
</clipPath>
</defs>
</svg>

                        
                        <label className="item-container-textcss">Kibble</label>
                    </div> 
                    <div className = "itemContainer"> 
                        <svg width="26" height="26" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4999 0.583252C10.9452 0.583252 8.44794 1.3408 6.32381 2.7601C4.19967 4.1794 2.54411 6.19671 1.56648 8.55692C0.588849 10.9171 0.333055 13.5142 0.831448 16.0198C1.32984 18.5254 2.56003 20.827 4.36646 22.6334C6.17289 24.4398 8.47442 25.67 10.98 26.1684C13.4856 26.6668 16.0827 26.411 18.4429 25.4334C20.8031 24.4557 22.8204 22.8002 24.2397 20.676C25.659 18.5519 26.4166 16.0546 26.4166 13.4999C26.4166 11.8037 26.0825 10.124 25.4334 8.55692C24.7842 6.9898 23.8328 5.56588 22.6334 4.36646C21.434 3.16703 20.01 2.2156 18.4429 1.56647C16.8758 0.917351 15.1962 0.583252 13.4999 0.583252ZM13.4999 23.8333C11.4562 23.8333 9.45834 23.2272 7.75903 22.0918C6.05972 20.9563 4.73527 19.3425 3.95317 17.4543C3.17106 15.5661 2.96643 13.4885 3.36514 11.484C3.76386 9.47952 4.74801 7.63829 6.19315 6.19315C7.6383 4.74801 9.47952 3.76385 11.484 3.36514C13.4885 2.96642 15.5661 3.17106 17.4543 3.95316C19.3425 4.73527 20.9563 6.05972 22.0918 7.75903C23.2272 9.45833 23.8333 11.4562 23.8333 13.4999C23.8333 16.2405 22.7446 18.8688 20.8067 20.8067C18.8688 22.7446 16.2405 23.8333 13.4999 23.8333Z" fill="#B9835E"/>
<path d="M19.5 13H15V8.5C15 8.10218 14.842 7.72064 14.5607 7.43934C14.2794 7.15804 13.8978 7 13.5 7C13.1022 7 12.7206 7.15804 12.4393 7.43934C12.158 7.72064 12 8.10218 12 8.5V14.5C12 14.8978 12.158 15.2794 12.4393 15.5607C12.7206 15.842 13.1022 16 13.5 16H19.5C19.8978 16 20.2794 15.842 20.5607 15.5607C20.842 15.2794 21 14.8978 21 14.5C21 14.1022 20.842 13.7206 20.5607 13.4393C20.2794 13.158 19.8978 13 19.5 13Z" fill="#B9835E"/>
</svg>

                        <label className="item-container-textcss">Total Hours</label>
                    </div>
                </div>

                {/* kibble and hours numericaly values */}
                <div className = "row-container-2-items">
                    <div className = "item-container kibble-css"> {kibbles} </div>
                    <div className = "item-container hours-css"> {hours}</div>
                    


                </div>
                
              
              
            </div>

            {/* outside of container */}
            <label className="activity-row-label">Total Activity</label>
            <label className="last-7-days">last 7 days</label>


            <BarChart />

          </div>

          
        </div>
      );
}

export default Stats;