import React, { FC, useCallback, useEffect, useState } from "react";
import PhotoComponent from "src/components/PhotoComponent";
import { Link as RouterLink } from 'react-router-dom';
import UNSPLASH_API from "src/lib/unsplash";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Box, Button, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import LoadingScreen from "src/components/LoadingScreen";
import { floor } from "lodash";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery } from "react-photoswipe-gallery";
import { Theme } from "src/theme";
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) => ({
  scrollable: {
    position: 'relative',
    padding: theme.spacing(0, 6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 3),
    }
  },
  image: {
    maxWidth: '100%',
    width: 800,
    maxHeight: 500,
    height: 'auto'
  }
}));

interface PhotoContainerProps{
  query: string
}

const PhotoContainer: FC<PhotoContainerProps> = ({query}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [response, setResponse] = useState({
    photos: [],
    page: 1,
    perPage: 24,
    totalPages: null,
    hasMore: true,
    errors: null
  });

  const fetchPhotos = useCallback((page, perPage) => {
    if(query){
      UNSPLASH_API.search.getPhotos({query: query, page: page, perPage: perPage }).then(data => {
        if (data) {
          setIsLoading(false);
          setIsMounted(true);
          let paginatedData = data.response.results;
          const totalPages = data.response.total_pages;
          const hasMore = page < totalPages;
          console.log(page, totalPages);
          setResponse(prev => ({
            ...prev,
            photos:
              page === 1
                ? [...paginatedData]
                : prev.photos.concat([...paginatedData]),
            page,
            totalPages,
            hasMore,
          }));
        }
      });
    }else{
      UNSPLASH_API.photos.list({ page: page, perPage: perPage }).then(data => {
        if (data) {
          setIsLoading(false);
          setIsMounted(true);
          let paginatedData = data.response.results;
          const totalPages = floor(data.response.total / perPage);
          const hasMore = page < totalPages;        
          console.log(page, totalPages);
          setResponse(prev => ({
            ...prev,
            photos:
              page === 1
                ? [...paginatedData]
                : prev.photos.concat([...paginatedData]),
            page,
            totalPages,
            hasMore,
          }));
        }
      });
    }
  }, [query]);
  
  useEffect(() => {
    setIsLoading(true);
    setIsMounted(false);
    fetchPhotos(1, 24); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPhotos, query]);

  const fetchMorePhotos = () => {
    setIsLoading(true);
    fetchPhotos(response.page + 1, 24);
  };

 if (response.errors) {
    return (
      <div>
        <div>{response.errors[0]}</div>
      </div>
    );
  } else {
    return (
      <Gallery>
          {isLoading && !isMounted ?
            <Box>
              <LoadingScreen /> 
            </Box>
            : 
            <Box className={classes.scrollable}>
              {response.photos.length > 0 ? 
                <InfiniteScroll
                  dataLength={response.photos.length}
                  next={fetchMorePhotos}
                  hasMore={response.hasMore}
                  loader={<LoadingScreen />}
                  endMessage={
                    <Typography align="center"> Yep! That's all she wrote</Typography>
                  }>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{420: 1, 540: 2, 900: 3, 1200: 4}}>
                    <Masonry columnsCount={3} gutter="20px">
                      {response.photos.length &&
                        response.photos.map((photo, i) => (
                          <PhotoComponent photo={photo} photoId={i} key={i}/>
                        ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </InfiniteScroll>
                :<Box>
                  <Typography
                    align="center"
                    variant={mobileDevice ? 'h6' : 'h4'}
                    style={{color: '#ccc'}}>
                    Oops!, no results
                  </Typography>
                  <Typography
                    align="center"
                    style={{color: '#ccc'}}
                    variant="subtitle2">
                    Search for <span style={{color: '#8a85ff'}}>`{query}`</span> returned no results,<br/>
                    Try searching for a more popular keyword or phrase
                  </Typography>
                  <Box
                    mt={6}
                    display="flex"
                    justifyContent="center">
                    <img
                      alt="nothing found"
                      className={classes.image}
                      src="/static/images/nothing.png"/>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center">
                    <Button
                      color="secondary"
                      component={RouterLink}
                      to="/"
                      variant="outlined">
                        Refresh
                    </Button>
                  </Box>
                </Box>
              }
            </Box>
          }
      </Gallery>
    );
  }
};

export default PhotoContainer;