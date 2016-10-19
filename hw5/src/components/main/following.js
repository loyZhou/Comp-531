import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div name="follower">
        <img className="followingImage" src={ avatar }/>
        <h3><strong>{ name }</strong></h3>
        <div id="status"><em>{ headline }</em></div>
        <span id="btn_unfollow" onClick={() => { dispatch(delFollower(name)) }}></span>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
        <div>
                <div id ="following">
                { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline}
                        dispatch={this.props.dispatch} />
                )}
              
                    <input id="add_new_follower" type="text"
                        placeholder="add a follower"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => {
                            this.forceUpdate()
                        }}/>
                { !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                    <input className="btn btn-primary" type="button"
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="add follower"/>
                }
                { this.props.error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        { this.props.error }
                    </div>
                }
                </div>

        </div>
    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)



/** WEBPACK FOOTER **
 ** ./src/components/main/following.js
 **/