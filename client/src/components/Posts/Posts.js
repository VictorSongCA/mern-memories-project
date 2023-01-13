import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts );
    const classes = useStyles();

    // console.log(posts);

    if (!posts.length && !isLoading) return 'No posts';

    return(
        isLoading ? <CircularProgress /> : (            
            // className={classes.container}, seems like there is no container in sytles.js, 
            // that means, className={classes.container} is not necessary
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts?.map((post) => (
                    // xs, extra small devices show 1 per row (1 * 12 = 12)
                    // sm, small devices show 1 per row ( 1 * 12 = 12)
                    // md, mdium devices show 2 per row ( 2 * 6 = 12)
                    // lg, large devices show 4 per row ( 4 * 3 = 12)
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;