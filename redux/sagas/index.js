
import {  all, call, take, put, fork } from 'redux-saga/effects';
import { getTopicList } from '../../api';

import {
  FETCH_TOPIC_LIST,
  FETCH_TOPIC_LIST_SUCCESS
} from '../../constants/ActionTypes';

export function* topicList() {
  while (true) {
    const { payload = {}} = yield take(FETCH_TOPIC_LIST);
    const { data } = yield call(getTopicList, payload);
    yield put({
      type: FETCH_TOPIC_LIST_SUCCESS,
      data
    });
  }
}


export default function* rootSagas() {
  yield all([
    fork(topicList)
  ]);
}
