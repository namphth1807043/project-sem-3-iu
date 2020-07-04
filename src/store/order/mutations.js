export function fetchOrdersBegin(state) {
  state.orders = []
  state.error = null
  state.isLoading = true

}

export function fetchOrdersSuccess(state, {orders, paging}) {
  state.orders = orders
  state.error = null
  state.paging.page = paging.Page
  state.paging.rowsPerPage = paging.Size
  state.paging.rowsNumber = paging.Total
  state.isLoading = false
}

export function fetchOrderError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchOrderBegin(state) {
  state.orderDetail = []
  state.error = null
  state.isLoading = true

}

export function fetchOrderSuccess(state, {orderDetail}) {
  state.orderDetail = orderDetail
  state.error = null
  state.isLoading = false
}

export function fetchOrdersError(state, error) {
  state.error = error
  state.isLoading = false
}

export function updateOrderBegin (state) {
  state.error = null
  state.isSaved = false
  state.order = {}
  state.isSaving = true
}

export function updateOrderSuccess (state, { order, isSaved }) {
  state.order = order
  state.orderDetail.order = order
  state.isSaved = isSaved
  state.isSaving = false
}

export function updateOrderError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function clearStateFilter(state) {
  state.filter = {}
}
