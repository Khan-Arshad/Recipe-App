import React, { Component } from 'react';
import PropTypes from 'prop-types';

//PAGES
import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';
import RecipeSkeleton from '../util/RecipeSkeleton';

// MUI
import Grid from '@material-ui/core/Grid';

// REDUX
import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const { recipes, loading } = this.props.data;
    console.log(recipes);
    let recentRecipesMarkup = !loading ? (
      recipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe} />)
    ) : (
      <RecipeSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentRecipesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getRecipes })(home);
