import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_EDUCATION,
  EDUCATION_LOADING,
  CLEAR_CURRENT_EDUCATION
} from "../actions/types";

const initialState = {
  education: null,
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case EDUCATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EDUCATION:
      return {
        ...state,
        education: action.payload,
        loading: false
      };
      case CLEAR_CURRENT_EDUCATION:
      return {
        ...state,
        education: null
      };
    default:
      return state;
  }
}
