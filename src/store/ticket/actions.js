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

export async function loadTrainCars({commit, dispatch}, {params}) {
  commit('fetchTrainCarsBegin');

  try {
    const queryParams = new URLSearchParams({
      ...params
    }).toString()

    const response = await httpClient.get(`/trainCars?${queryParams}`)
    commit('fetchTrainCarsSuccess', {
      ...params,
      trainCars: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchTrainCarsError', error)
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

export async function loadObjects({commit, dispatch}) {
  commit('fetchObjectsBegin');

  try {
    const response = await httpClient.get(`/objectPassengers`)
    commit('fetchObjectsSuccess', {
      objects: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchObjectsError', error)
    return null
  }
}

export async function updateCartItem({commit, dispatch}, cartItem) {
    commit('updateCart', cartItem)
}

export async function submitOrder({commit}, order) {
  commit('saveOrderBegin')
  try {
    let response =  await httpClient.post('/orders', order)
    commit('saveOrderSuccess', {
      response: response,
      isSaved: true
    })
  } catch (error) {
    commit('saveOrderError', error)
  }
}
