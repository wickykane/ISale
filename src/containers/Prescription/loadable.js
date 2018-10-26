// import Loadable from 'react-loadable';
// import LoadingIndicator from '../../components/LoadingIndicator/index'
// export default Loadable({
//     loader: () => import('./index'),
//     loading: () => LoadingIndicator,
// })

/**
 * Asynchronously loads the component for HomePage
 */
import loadable from 'loadable-components';
import LoadingIndicator from '../../components/LoadingIndicator'


export default loadable(() => import('./index'), {
  LoadingComponent: LoadingIndicator,
});
