import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import chatSaga from './chat.saga';
import historySaga from './chatHistory.saga';
import { firstTimeSetupSaga } from './firsttimesetup.saga';
import familySaga from './family.saga';
import preferencesSaga from './preferences.saga';
import faqSaga from './faq.saga';
import { notificationSaga } from './notifications.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    chatSaga(),
    historySaga(),
    firstTimeSetupSaga(),
    familySaga(),
    preferencesSaga(),
    faqSaga(),
    notificationSaga(),
  ]);
}
