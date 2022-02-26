import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import PhotoComponent from "src/components/PhotoComponent";
import PHOTOS_API from "src/lib/unsplash";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Box, makeStyles } from "@material-ui/core";
import LoadingScreen from "src/components/LoadingScreen";
import { floor } from "lodash";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery } from "react-photoswipe-gallery";
import { Theme } from "src/theme";

const useStyles = makeStyles((theme: Theme) => ({
  scrollable: {
    position: 'relative',
    padding: theme.spacing(0, 6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 3),
    }
  }
}));

interface PhotoContainerProps{
  query: string
}

const PhotoContainer: FC<PhotoContainerProps> = ({query}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      PHOTOS_API.search.getPhotos({query: query, page: page, perPage: perPage }).then(data => {
        if (data) {
          setIsLoading(false);
          let paginatedData = data.response.results;
          const totalPages = data.response.total_pages;
          const hasMore = page < totalPages;
          setResponse(prev => ({
            ...prev,
            photos:
              page === 1
                ? [...paginatedData]
                : prev.photos.concat([...paginatedData]),
            page: prev.page++,
            totalPages,
            hasMore,
          }));
        }
      });
    }else{
      PHOTOS_API.photos.list({ page: page, perPage: perPage }).then(data => {
        if (data) {
          setIsLoading(false);
          let paginatedData = data.response.results;
          const totalPages = floor(data.response.total / perPage);
          const hasMore = page < totalPages;        
          console.log(data);
          setResponse(prev => ({
            ...prev,
            photos:
              page === 1
                ? [...paginatedData]
                : prev.photos.concat([...paginatedData]),
              totalPages,
              hasMore,
          }));
        }
      });
    }
  }, [query]);
  
  useEffect(() => {
    setIsLoading(true);
    fetchPhotos(1, 24); 
    console.log(window.innerHeight, window.scrollY, document.body.offsetHeight, isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPhotos, query]);

  // const fetchMorePhotos = () => {
  //   fetchPhotos(response.page + 1, 24);
  // };

 if (response.errors) {
    return (
      <div>
        <div>{response.errors[0]}</div>
      </div>
    );
  } else {
    return (
      <Gallery>
          {isLoading ?
            <Box>
              <LoadingScreen /> 
            </Box>
            : 
            <Box className={classes.scrollable}>
              <ResponsiveMasonry
                columnsCountBreakPoints={{420: 1, 540: 2, 900: 3, 1200: 4}}>
                <Masonry columnsCount={3} gutter="20px">
                  {response.photos.length &&
                    response.photos.map((photo, i) => (
                      <PhotoComponent photo={photo} photoId={i} key={i}/>
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            </Box>
          }
      </Gallery>
    );
  }
};

export default PhotoContainer;