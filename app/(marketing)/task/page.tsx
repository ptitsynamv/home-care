"use client";

import InboxScreen from "@/app/_components/inbox-screen/InboxScreen";
import { Provider } from 'react-redux';
import store from '../../_lib/store/store';

export default function TaskPage() {

  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}
