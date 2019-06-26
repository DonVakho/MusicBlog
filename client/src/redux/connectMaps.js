import {LOG_IN_ACTION, LOG_OUT_ACTION} from './actions'

export const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        LOG_OUT_ACTION: () => {
            dispatch(LOG_OUT_ACTION())
        },
        LOG_IN_ACTION: (name) => {
            dispatch(LOG_IN_ACTION(name))
        }
    }
}