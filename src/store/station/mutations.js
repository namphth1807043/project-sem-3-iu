export function fetchStationsBegin(state) {
  state.stations = []
  state.error = null
  state.isLoading = true

}

export function fetchStationSuccess(state, {stations, paging}) {
  state.stations = stations
  state.error = null
  state.pagination.page = paging.Page
  state.pagination.rowsPerPage = paging.Size
  state.pagination.rowsNumber = paging.Total
  state.isLoading = false
}

export function fetchStationsError(state, error) {
  state.error = error
  state.isLoading = false
}
