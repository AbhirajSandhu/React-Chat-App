import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
    return (
        <Router>
          <div>
            <Switch>

              <Route path="/chat">
                <Chat />
              </Route>

              <Route path="/">
                <Join />
              </Route>

            </Switch>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          </div>
        </Router>
      );
    // use single "/" in end else it handles all the paths not mentioned above

    // <Router>
    //     <Route path = "/" exact component={Join}/>
    //     <Route path = "/chat" component={Chat}/>
    // </Router>
};

export default App;
