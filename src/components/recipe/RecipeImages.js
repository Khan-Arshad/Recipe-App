import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import MyButton from '../../util/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';
import { addImageToRecipe } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

class RecipeImages extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.addImageToRecipe(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  render() {
    const {
      recipe: {
        images: { imageUrl },
      },
    } = this.props;

    return (
      <div className='image-wrapper'>
        <img src={imageUrl} alt='profile' className='profile-image' />
        <input
          type='file'
          id='imageInput'
          hidden='hidden'
          onChange={this.handleImageChange}
        />
        <MyButton
          tip='Edit profile picture'
          onClick={this.handleEditPicture}
          btnClassName='button'
        >
          <EditIcon color='primary' />
        </MyButton>
      </div>
    );
  }
}

RecipeImages.propTypes = {
  recipe: PropTypes.object.isRequired,
  addRecipeDetails: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.data.recipe,
  UI: state.UI,
});

const mapActionsToProps = { addImageToRecipe };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(RecipeImages));
