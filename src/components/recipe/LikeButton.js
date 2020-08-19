import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// ICONS
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// REDUX
import { connect } from 'react-redux';
import { likeRecipe, unlikeRecipe } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedRecipe = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.recipeId === this.props.recipeId
      )
    )
      return true;
    else return false;
  };

  likeRecipe = () => {
    this.props.likeRecipe(this.props.recipeId);
  };

  unlikeRecipe = () => {
    this.props.unlikeRecipe(this.props.recipeId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedRecipe() ? (
      <MyButton tip='unlike' onClick={this.unlikeRecipe}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='like' onClick={this.likeRecipe}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired,
  likeRecipe: PropTypes.func.isRequired,
  unlikeRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeRecipe,
  unlikeRecipe,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
