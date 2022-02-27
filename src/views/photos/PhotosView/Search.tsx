import React, { FC, useState } from "react";
import { Box, Button, Container, makeStyles, TextField } from "@material-ui/core";
import { Search as SearchIcon} from '@material-ui/icons';

import { Theme } from "src/theme";

const useStyles = makeStyles((theme: Theme) => ({
  searchContainer:{
    padding: theme.spacing(3),
    position: 'relative'
  },
  searchTextField: {
    '& input': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(9),
    },
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    right: 15,
    top: 26,
    bottom: 0,
    height: 80,
    width: 80,
    cursor: 'pointer',
    borderRadius: '100%',
    [theme.breakpoints.down('xs')]:{
      top: 36,
      right: 24,
      width: 62,
      height: 62,
    }
  },
  searchIcon:{
    color: '#fff',
    fontSize: 42,
    [theme.breakpoints.down('xs')]:{
      fontSize: 32
    }
  }
}));

interface SearchProps {
    searchFn: (query:string) => void;
}

const Search: FC<SearchProps> = ({searchFn}) => {
  const classes = useStyles();

  const [query, setQuery] = useState<string>("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    searchFn(query);
  }

  return (
    <Container className={classes.searchContainer}>
      <Box>
        <form
              noValidate
              onSubmit={handleSearch}
            >
            <TextField
              fullWidth
              label="Search"
              margin="normal"
              name="search"
              className={classes.searchTextField}
              onChange={handleChange}
              type="text"
              value={query}
              variant="outlined"
            />
            <Button className={classes.searchButton} type="submit">
              <SearchIcon className={classes.searchIcon}></SearchIcon>
            </Button>
      </form>
      </Box>
    </Container>
  );
};

export default Search;