const usersJson = '/admin/users'
const projectsJson = '/admin/projects'
const nameFilter = document.querySelector('.name-filter')
const projnameFilter = document.querySelector('.projname-filter')
const usersColumn = document.querySelector('.users-result')
const projectsColumn = document.querySelector('.project-result')
const nameInput = document.querySelector('#name')
const projnameInput = document.querySelector('#projname')

//User filter

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
        const info = document.createElement('div')
        const hr = document.createElement('hr')
        info.setAttribute('class', 'info')
        info.innerHTML = `
              <p>${el.name}</p>
              <form action="/user-profile/${el._id}/edit" method="POST">
                <button type="submit" class="btn-delete"><svg width="1em" height="1em" viewBox="0 0 16 16"
                    class="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z" />
                    <path fill-rule="evenodd"
                      d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z" />
                    <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z" />
                  </svg></button>
                <a href="/user-profile/${el._id}/delete" class="btn-delete"><svg width="1em" height="1em"
                    viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg></a>
              </form>
            `
        usersColumn.appendChild(info)
        usersColumn.appendChild(hr)
      })
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})

//Project filter

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
        const info = document.createElement('div')
        const hr = document.createElement('hr')
        info.setAttribute('class', 'info')
        info.innerHTML = `
              <p>${el.name}</p>
              <form action="/project/${el._id}/edit" method="POST">
                <button type="submit" class="btn-delete"><svg width="1em" height="1em" viewBox="0 0 16 16"
                    class="bi bi-pen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z" />
                    <path fill-rule="evenodd"
                      d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z" />
                    <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z" />
                  </svg></button>
                <a href="/project/${el._id}/delete" class="btn-delete"><svg width="1em" height="1em"
                    viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg></a>
              </form>`
        projectsColumn.appendChild(info)
        projectsColumn.appendChild(hr)
      })
    })
    .catch((err) => console.log('Error while getting the data: ', err))
})

//User graph

axios
  .get(usersJson)
  .then((responseFromAPI) => {
    console.log(responseFromAPI.data)
    let dates = []
    let numberOfUsers = []
    responseFromAPI.data.forEach((el) => {
      dates.push(new Date(el.createdAt).toDateString())
    })
    const numberOfDates = dates.reduce((el, date) => {
      el[date] = (el[date] || 0) + 1
      return el
    }, {})
    numberOfUsers = Object.values(numberOfDates)
    console.log(dates)
    console.log(numberOfUsers)
    new Chart(document.getElementById('my-chart'), {
      type: 'line',
      data: {
        labels: [...new Set(dates)],
        datasets: [
          {
            label: 'Number of users',
            borderColor: '#04adbf',
            fill: false,
            data: numberOfUsers
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
          text: 'Users per day'
        }
      }
    })
  })
  .catch((err) => console.log('Error while getting the data: ', err))

//Projects & Users graph

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
              borderColor: '#04adbf',
              fill: false,
              data: numberOfUsers
            },
            {
              label: 'Number of project',
              borderColor: '#a0a603',
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