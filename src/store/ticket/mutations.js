import moment from 'moment'

import firebase from 'src/api/firebase';
const db = firebase.firestore()
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

export function fetchTrainCarsBegin(state) {
  state.trainCars = []
  state.error = null
  state.isLoadingTrainCar = true

}

export function fetchTrainCarsSuccess(state, {trainCars, IdTrain}) {
  state.idTrain = IdTrain
  state.trainCars = trainCars
  state.error = null
  state.isLoadingTrainCar = false
}

export function fetchTrainCarsError(state, error) {
  state.error = error
  state.isLoadingTrainCar = false
}

export function fetchSeatsBegin(state) {
  state.seats = []
  state.error = null
  state.isLoadingSeat = true

}

export function fetchSeatsSuccess(state, {seats, IdTrainCar}) {
  state.idTrainCar = IdTrainCar
  state.seats = seats
  state.error = null
  state.isLoadingSeat = false
}

export function fetchSeatsError(state, error) {
  state.error = error
  state.isLoadingSeat = false
}

export function updateCart(state, cartItem) {
  let id = `${cartItem.idTrainCar}-${cartItem.idSeat}-${cartItem.departureDay}`
  let rs = state.cart.some(
    item =>
      item.idTrainCar === cartItem.idTrainCar &&
      item.idSeat === cartItem.idSeat &&
      item.idTrain === cartItem.idTrain
  )
  if (rs) {
    state.cart.splice(
      state.cart.findIndex(
        x =>
          x.idTrainCar === cartItem.idTrainCar &&
          x.idSeat === cartItem.idSeat &&
          x.idTrain === cartItem.idTrain
      ), 1)
    db.collection("chosen-seats").doc(id).delete().then(function() {
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  } else {
    state.cart.push(cartItem)
    db.collection("chosen-seats")
      .doc(id)
      .set({
        departureDay: cartItem.departureDay,
        idSeat: cartItem.idSeat,
        idTrainCar: cartItem.idTrainCar,
        startIndex: cartItem.startIndex,
        endIndex: cartItem.endIndex,
        expiredAt: firebase.firestore.Timestamp.fromDate(moment().add(10, 'minutes').toDate())
      })
      .then(function () {
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

}

export function fetchObjectsBegin(state) {
  state.objects = []
  state.error = null
  state.isLoading = true

}

export function fetchObjectsSuccess(state, {objects}) {
  state.objects = objects
  state.error = null
  state.isLoading = false
}

export function fetchObjectsError(state, error) {
  state.error = error
  state.isLoading = false
}

export function saveOrderBegin(state) {
  state.error = null
  state.isSaved = false
  state.isSaving = true
}

export function saveOrderSuccess(state, {isSaved, response, typePayment}) {
  state.isSaved = isSaved
  state.isSaving = false
  state.cart = []
  if (typePayment === 2) {
    window.location.href = response;
  }
}

export function saveOrderError(state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

