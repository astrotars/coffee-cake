import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import {
    StreamApp,
    FlatFeed,
    Activity,
    UserBar,
    CommentList,
    CommentField,
    CommentItem,
    ReactionToggleIcon,
    StatusUpdateForm,
    Feed,
    FeedContext,
} from 'react-activity-feed';

// Utils
import withSession from 'utils/withSession';

// Styles //
import styles from './Posts.module.scss';

// Components //
import Container from 'components/Container';
import CurrentUserWidget from 'components/Posts/CurrentUserWidget';
import SuggestedUsers from 'components/Posts/SuggestedUsers';
import Promo from 'components/Promo';

// Icons //
import like from 'assets/like.svg';
import liked from 'assets/liked.svg';

class Posts extends Component {
    static propTypes = {};
    render() {
        const { guid, avatar, token, history } = this.props;

        return (
            <StreamApp
                apiKey={process.env.REACT_APP_STREAM_KEY}
                appId={process.env.REACT_APP_STREAM_ID}
                token={token}
                sharedFeeds={[
                    {
                        feedGroup: 'timeline',
                        notify: true,
                    },
                ]}
            >
                <Container>
                    <div className={styles.root}>
                        <div className={styles.feed}>
                            <Feed feedGroup='timeline'>
                                <FeedContext.Consumer>
                                    {(feedCtx) => (
                                        <StatusUpdateForm
                                            userId={guid}
                                            feedGroup='user'
                                            activityVerb='post'
                                            onSuccess={(data) => {
                                                feedCtx.refresh();
                                            }}
                                        />
                                    )}
                                </FeedContext.Consumer>
                            </Feed>
                            <FlatFeed
                                options={{
                                    limit: 25,
                                    withRecentReactions: true,
                                }}
                                feedGroup='timeline'
                                notify={true}
                                Activity={(props) => {
                                    return (
                                        <Activity
                                            {...props}
                                            icon={avatar}
                                            onClickUser={(data) => {
                                                history.push(`/profile/${data.id}`);
                                            }}
                                            Header={
                                                <UserBar
                                                    avatar={props.activity.actor.data.profileImage}
                                                    username={props.activity.actor.data.name}
                                                    subtitle={props.activity.actor.data.username}
                                                    timestamp={props.activity.time}
                                                    onClickUser={() => {
                                                        history.push(`/user/${props.activity.actor.id}`);
                                                    }}
                                                />
                                            }
                                            Footer={
                                                <div>
                                                    <div>
                                                        <ReactionToggleIcon
                                                            counts={props.activity.reaction_counts}
                                                            own_reactions={props.activity.own_reactions}
                                                            kind='like'
                                                            onPress={() =>
                                                                props.onToggleReaction(
                                                                    'like',
                                                                    props.activity,
                                                                    {},
                                                                    {
                                                                        trackAnalytics: true,
                                                                    },
                                                                )
                                                            }
                                                            activeIcon={liked}
                                                            inactiveIcon={like}
                                                            labelSingle='like'
                                                            labelPlural='likes'
                                                        />
                                                    </div>
                                                    <div>
                                                        <CommentField
                                                            image={avatar}
                                                            activity={props.activity}
                                                            onAddReaction={(kind, activity, data, options) => {
                                                                props.onAddReaction(kind, activity, data, {
                                                                    ...options,
                                                                    trackAnalytics: true,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <CommentList
                                                            activityId={props.activity.id}
                                                            CommentItem={(props) => (
                                                                <CommentItem
                                                                    {...props}
                                                                    onClickUser={(data) => {
                                                                        history.push(`/${data.id}`);
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        />
                                    );
                                }}
                            />
                        </div>
                        <MediaQuery query={`(min-width: 900px)`}>
                            <div className={styles.sidebar}>
                                <CurrentUserWidget />
                                <SuggestedUsers />
                                <Promo />
                            </div>
                        </MediaQuery>
                    </div>
                </Container>
            </StreamApp>
        );
    }
}

export default withSession(Posts);
