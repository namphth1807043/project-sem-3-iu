export function fetchAllStationsBegin(state) {
  state.stations = []
  state.error = null
  state.isLoading = true

}

export function fetchAllStationsSuccess(state, {stations}) {
  state.stations = stations
  state.error = null
  state.isLoading = false
}

export function fetchAllStationsError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchRoutesBegin(state) {
  state.routes = []
  state.error = null
  state.isLoading = true

}

export function fetchRoutesSuccess(state, {departureDay, routes, startStation, endStation}) {
  state.departureDay = departureDay
  state.startStation = startStation
  state.endStation = endStation
  state.routes = routes
  state.error = null
  state.isLoading = false
}

export function fetchRoutesError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchSeatsBegin(state) {
  state.routes = []
  state.error = null
  state.isLoading = true

}

export function fetchSeatsSuccess(state, {idTrainCar, startStation, endStation, departureDay, seats}) {
  state.departureDay = departureDay
  state.startStation = startStation
  state.endStation = endStation
  state.idTrainCar = idTrainCar
  state.seats = seats
  state.error = null
  state.isLoading = false
}

export function fetchSeatsError(state, error) {
  state.error = error
  state.isLoading = false
}
