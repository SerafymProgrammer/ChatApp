
export default class AuthService {
    static loginUser = async (user) => {
      return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(user)
      })
    };
  
    // static getOneDay = (dayNumber) => {
    //   return fetch(
    //     environments.jsonServerUrl + '/trainingSchedule' + '/' + dayNumber,
    //     {
    //       method: 'GET',
    //     },
    //   );
    // };
  
    // static updateExercisesOfSelectedDay = (dayNumber, updatedExercisesList) => {
    //   return fetch(
    //     environments.jsonServerUrl + '/trainingSchedule' + '/' + dayNumber,
    //     {
    //       method: 'PUT',
    //       body: JSON.stringify({
    //         id: dayNumber,
    //         exercises: updatedExercisesList,
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     },
    //   );
    // };
  }