const nameFilter = document.querySelector('.name-filter')
const usersJson = process.env.USERS || 'http://localhost:3000/admin/users'
const usersColumn = document.querySelector('#users')
const nameInput = document.querySelector('#name')


nameFilter.addEventListener('click', () => {
  axios
    .get(usersJson)
    .then((response) => {
      // usersColumn.innerHTML = response.data[0].name
      // response.data.forEach((el) => console.log(el.name))
      usersColumn.innerHTML = ''
      let results = []
      response.data.forEach((el) => {
        if (
          el.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              nameInput.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            )
        ) {
          results.push(el)
          console.log(results)
        }
      })
      results.forEach((el) => {
        const par = document.createElement('p')
        par.innerText = el.name
        usersColumn.appendChild(par)
      })
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})
const projnameFilter = document.querySelector('.projname-filter')
const projectsJson = process.env.PROJECTS || 'http://localhost:3000/admin/projects'
const projectsColumn = document.querySelector('#projects')
const projnameInput = document.querySelector('#projname')


projnameFilter.addEventListener('click', () => {
  axios
    .get(projectsJson)
    .then((response) => {
      projectsColumn.innerHTML = ''
      let results = []
      response.data.forEach((el) => {
        if (
          el.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              projnameInput.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            )
        ) {
          results.push(el)
          console.log(results)
        }
      })
      results.forEach((el) => {
        const par = document.createElement('p')
        par.innerText = el.name
        projectsColumn.appendChild(par)
      })
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})

axios
  .get(usersJson)
  .then(responseFromAPI => {

    console.log(responseFromAPI.data)
    let dates = []
    let numberOfUsers = []

    responseFromAPI.data.forEach(el => {
      dates.push(new Date(el.createdAt).toDateString())
    })
 
    const numberOfDates = dates.reduce((el, date) => {
      el[date] = (el[date] || 0) + 1;
      return el
    }, {})

    numberOfUsers = Object.values(numberOfDates)
    console.log(dates)
    console.log(numberOfUsers)


    new Chart(document.getElementById("my-chart"), {
    
      type: 'line',
      data: {
        labels: [...new Set(dates)],
        datasets: [
          {
            label: "Number of users",
            backgroundColor: 'rgba(252, 193, 24, 0.3)',
            borderColor: 'rgb(252, 193, 24)',
            fill: false,
            data: numberOfUsers
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
        legend: { display: false },
        title: {
          display: true,
          text: 'Users per day'
        }
      }
  });
    // printTheChart(kk); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));
 
  axios
  .all([axios.get(usersJson), axios.get(projectsJson)])
  .then(
    axios.spread(function (usersData, projectsData) {
      console.log(usersData.data)
      console.log(projectsData.data)
      let userDates = []
      let numberOfUsers = []
      usersData.data.forEach((el) => {
        userDates.push(new Date(el.createdAt).getMonth())
      })
      const numberOfDates = userDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1
        return el
      }, {})
      numberOfUsers = Object.values(numberOfDates)
      console.log(userDates)
      console.log(numberOfUsers)
      let projectDates = []
      let numberOfProjects = []
      projectsData.data.forEach((el) => {
        projectDates.push(new Date(el.createdAt).getMonth())
      })
      const numberOfUserDates = projectDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1
        return el
      }, {})
      numberOfProjects = Object.values(numberOfUserDates)
      console.log(projectDates)
      console.log(numberOfProjects)
      new Chart(document.getElementById('mix-canvas'), {
        type: 'line',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          datasets: [
            {
              label: 'Number of users',
              borderColor: 'red',
              fill: false,
              data: numberOfUsers
            },
            {
              label: 'Number of project',
              borderColor: 'green',
              fill: false,
              data: numberOfProjects
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                }
              }
            ]
          },
          legend: { display: false },
          title: {
            display: true,
            text: 'Users & Projects per day'
          }
        }
      })
    })
  )
  .catch((err) => console.log('Error while getting the data: ', err))

  

// function printTheChart(stockData) {
//   const dailyUsers = stockData;
 
//   const stockDates = Object.keys(dailyUsers);
//   const stockPrices = stockDates.map(date => dailyUsers[date]);
 
//   const ctx = document.getElementById('my-chart').getContext('2d');
//   const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: stockDates,
//       datasets: [
//         {
//           label: 'Stock Chart',
//           backgroundColor: 'rgb(255, 99, 132)',
//           borderColor: 'rgb(255, 99, 132)',
//           data: stockPrices
//         }
//       ]
//     }
//   }); // closes chart = new Chart()
// } // closes printTheChart()