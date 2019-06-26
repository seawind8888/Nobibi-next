
import fetch from 'isomorphic-unfetch';
import { take, put, fork } from 'redux-saga/effects';
import api from '../../constants/ApiUrlForBE';

import {
  FETCH_CHANNEL_LIST,
  FETCH_TOPIC_LIST,
  FETCH_CHANNEL_LIST_SUCCESS,
  FETCH_TOPIC_LIST_SUCCESS,
  FETCH_TOPIC_LIST_FAIL,
  FETCH_CHANNEL_LIST_FAIL
} from '../../constants/ActionTypes';

export function* channelList() {
  while (true) {
    yield take(FETCH_CHANNEL_LIST);
    try {
      const { data } = yield fetch(api.getChannelList);
      yield put({
        type: FETCH_CHANNEL_LIST_SUCCESS,
        channelList: data.list
      });
    } catch (error) {
      yield put({
        type: FETCH_CHANNEL_LIST_FAIL
      });
    }
  }
}

export function* topicList() {
  while (true) {
    yield take(FETCH_TOPIC_LIST);
    try {
      const res = yield fetch(api.getTopicList);
      const {data} = yield res.json();
      yield put({
        type: FETCH_TOPIC_LIST_SUCCESS,
        data
      });
    } catch (error) {
      yield put({
        type: FETCH_TOPIC_LIST_FAIL
      });
    }
  }
}

// function* watchFetchData() {

//   yield* takeEvery("FETCH_CHANNEL_LIST", channelList);
//   yield* takeEvery("FETCH_TOPIC_LIST", topicList);
// }
// export default watchFetchData;

export default [
  fork(channelList),
  fork(topicList)
];
