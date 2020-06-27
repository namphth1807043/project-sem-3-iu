export function fetchStationsBegin (state) {
  state.stations = []
  state.error = null
  state.isLoading = true
}

export function fetchStationSuccess (state, { articles, paging }) {
  state.stations = articles
  state.error = null
  state.paging = paging
  state.isLoading = false
}

export function fetchStationsError (state, error) {
  state.error = error
  state.isLoading = false
}
