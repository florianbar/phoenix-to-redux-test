import { put } from 'redux-saga/effects';
import { connectPhoenix } from '@trixtateam/phoenix-to-redux';

// update login details
yield put(
    connectPhoenix({ 
        domainUrl: 'localhost:4000', 
        params : { 
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            agentId: 'john@doe.com'
        } 
    })
);