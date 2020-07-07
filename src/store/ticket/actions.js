import {httpClient} from 'src/api/http';

export async function loadAllStations({commit, dispatch}) {
  commit('fetchAllStationsBegin');

  try {

    const response = await httpClient.get(`/stations/all`)
    commit('fetchAllStationsSuccess', {
      stations: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchAllStationsError', error)
    return null
  }
}

export async function loadRoutes({commit, dispatch}, {departureDay, params}) {
  commit('fetchRoutesBegin');

  try {
    const queryParams = new URLSearchParams({
      ...params
    }).toString()

    const response = await httpClient.get(`/routes?${queryParams}`)
    commit('fetchRoutesSuccess', {
      ...params,
      departureDay: departureDay,
      routes: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchRoutesError', error)
    return null
  }
}

export async function loadSeats({commit, dispatch}, {params}) {
  commit('fetchSeatsBegin');

  try {
    const queryParams = new URLSearchParams({
      ...params
    }).toString()

    const response = await httpClient.get(`/seats?${queryParams}`)
    commit('fetchSeatsSuccess', {
      ...params,
      seats: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchSeatsError', error)
    return null
  }
}
