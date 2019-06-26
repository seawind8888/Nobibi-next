
import { all } from 'redux-saga/effects';
import homeSagas from './home';

export default function* rootSagas() {
  yield all([
    ...homeSagas
  ]);
}
