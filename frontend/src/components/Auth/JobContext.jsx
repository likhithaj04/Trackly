// context/JobContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../../utils/api';

const JobContext = createContext(null);

function jobReducer(state, action) {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, loading: false };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(j =>
          j._id === action.payload.id ? { ...j, ...action.payload.fields } : j
        ),
      };
    default:
      return state;
  }
}

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, { jobs: [], loading: true });

  useEffect(() => {
    api.get('job/alljob')
      .then(res => dispatch({ type: 'SET_JOBS', payload: res.data.data }))
      .catch(err => console.log(err));
  }, []);

  return (
    <JobContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => useContext(JobContext);