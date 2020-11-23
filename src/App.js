import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BusinessCard from './components/BusinessCard';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  const classes = useStyles();

  const [data, setData] = React.useState({})
  const [category, setCategory] = React.useState("all")
  const [categories, setCategories] = React.useState(["all", "italian", "seafood", "steakhouse", "japanese", "american", "mexican", "thai"])
  const [prices, setPrices] = React.useState(["all", "$", "$$", "$$$", "$$$$"])
  const [price, setPrice] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [priceMenu, setPriceMenu] = React.useState(null);
  const [checkOpen, setCheckOpen] = React.useState(true)
  const [query, setQuery] = React.useState(
    `{
        search(term: "burrito",
            location: "san francisco"
            categories: "${category}") {
        total
        business {
          id
          name
          rating
          review_count
          price
          photos
          categories {
              title
          }
          location {
            address1
            city
            state
            country
          }
          is_closed
        }
      }
    }`
  )

  React.useEffect(() => {
    fetch("/v3/graphql", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
        "Accept-Language": "en_US"
      },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(data => {
        Object.values(data).map(business => {
          Object.values(business).map(items => {
            setData(items["business"])
          })
        })
      })
      .catch(error => {
        setData(null)
        console.log(error)
      })
  }, [query])

  var handleCategoryChecked = (e) => {
    setCategory(e.target.name)
    setQuery(
      `{
        search(term: "burrito",
          location: "san francisco"
          categories: "${e.target.name}") {
        total
        business {
          id
          name
          rating
          review_count
          price
          photos
          categories {
              title
          }
          location {
            address1
            city
            state
            country
          }
        }
       }
      }`
    )
  }
  var handlePriceChecked = (e) => {
    if(e.target.name == "all") {
      setPrice("")
    }
    setPrice(e.target.name)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  var handleClickPrice = (event) => {
    setPriceMenu(event.currentTarget);
  }
  const handleClosePriceMenu = () => {
    setPriceMenu(null);
  };

  const toggleCheckOpen = () => {
    setCheckOpen(!checkOpen)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className={classes.root}>
          Filter By:
        <FormControlLabel
            control={<Checkbox checked={checkOpen} onClick={toggleCheckOpen}/>}
            label="Open"
          />
          <Button aria-controls="price-menu" aria-haspopup="true" onClick={handleClickPrice} className="button">
            Price
          </Button>
          <Menu
            id="price-menu"
            anchorEl={priceMenu}
            keepMounted
            open={Boolean(priceMenu)}
            onClose={handleClosePriceMenu}
          >
            {
              prices.map(checkPrice => {
                return (
                  <MenuItem onClick={handleClosePriceMenu}><Checkbox checked={price === checkPrice ? true : false} onChange={(e) => handlePriceChecked(e)} name={checkPrice} />{checkPrice.toUpperCase()}</MenuItem>
                )
              })
            }
          </Menu>
          <Button aria-controls="category-menu" aria-haspopup="true" onClick={handleClick}>
            {category}
          </Button>
          <Menu
            id="category-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {
              categories.map(checkCategory => {
                return (
                  <MenuItem onClick={handleClose}><Checkbox checked={category === checkCategory ? true : false} onChange={(e) => handleCategoryChecked(e)} name={checkCategory} />{checkCategory.toUpperCase()}</MenuItem>
                )
              })
            }
          </Menu>
        </form>
      </header>
      
      {data != null ?
        <BusinessCard data={data} listOpen={checkOpen} price={price} /> : null
      }
    </div>
  );
}

export default App;
