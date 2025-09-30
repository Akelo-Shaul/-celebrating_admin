// Multi-timeframe users growth sample data
// keys: '1d', '1w', '1m', '6m', '1y'
export const usersGrowthData = { 
  '1d': {
    // Last 24 hours with 4-hour intervals
    labels: ['10PM', '2AM', '6AM', '10AM', '2PM', '6PM', '10PM'],
    datasets: [
      {
        label: 'Celebrities',
        // mapped from the same underlying trend but shortened
        data: [1200, 2200, 3500, 4800, 5900, 6500, 7000],
        borderColor: '#FFA500',
        backgroundColor: null, // will be set to gradient
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FFA500',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Members',
        data: [800, 1800, 2800, 3600, 4200, 4800, 5200],
        borderColor: '#4169E1',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4169E1',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  },

  '1w': {
    // Last 7 days with weekdays
    labels: ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24', 'Sat 25', 'Sun 26'],
    datasets: [
      {
        label: 'Celebrities',
        data: [2000, 2400, 3100, 4200, 5000, 6200, 7000],
        borderColor: '#FFA500',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FFA500',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Members',
        data: [1500, 1800, 2400, 3200, 3800, 4500, 5200],
        borderColor: '#4169E1',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4169E1',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  },

  '1m': {
    // Last month with weekly intervals
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    datasets: [
      {
        label: 'Celebrities',
        data: [2500, 3800, 4900, 5500, 6800],
        borderColor: '#FFA500',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FFA500',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Members',
        data: [1800, 2900, 3800, 4200, 5200],
        borderColor: '#4169E1',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4169E1',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  },

  '6m': {
    // Last 6 months
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Celebrities',
        data: [4800, 5200, 5000, 6000, 6400, 7000],
        borderColor: '#FFA500',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FFA500',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Members',
        data: [3600, 4000, 3900, 4700, 5000, 5400],
        borderColor: '#4169E1',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4169E1',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  },

  '1y': {
    // Last 12 months by quarter
    labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
    datasets: [
      {
        label: 'Celebrities',
        data: [4500, 5800, 6500, 7500],
        borderColor: '#FFA500',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FFA500',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Members',
        data: [3500, 4200, 4900, 5800],
        borderColor: '#4169E1',
        backgroundColor: null,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4169E1',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  },
}