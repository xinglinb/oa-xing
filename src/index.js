import dva from 'dva';
import './index.css';
// import { browserHistory } from 'dva/router';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/home').default);
app.model(require('./models/member').default);
app.model(require('./models/recruit').default);
app.model(require('./models/report').default);
app.model(require('./models/feedback').default);
app.model(require('./models/setting').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
