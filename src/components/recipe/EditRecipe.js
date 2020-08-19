import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// ICONS
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

// REDUX
import { connect } from 'react-redux';
import {
  //   getRecipe,
  addRecipeDetails,
  clearErrors,
} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.style,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '6%',
  },
});

class EditRecipe extends Component {
  state = {
    title: '',
    body: '',
    ingredients: '',
    open: false,
    errors: {},
  };

  mapRecipeDetailsToState = (recipe) => {
    this.setState({
      title: recipe.title ? recipe.title : '',
      body: recipe.body ? recipe.body : '',
      ingredients: recipe.ingredients ? recipe.ingredients : '',
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapRecipeDetailsToState(this.props.recipe);
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const recipeDetails = {
      title: this.state.title,
      body: this.state.body,
      ingredients: this.state.ingredients,
    };
    this.props.addRecipeDetails(recipeDetails);
    this.handleClose();
  };

  componentDidMount() {
    const { recipe } = this.props;
    this.mapRecipeDetailsToState(recipe);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Edit details'
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            onClick={this.handleClose}
            tip='Close'
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Edit this recipe</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='title'
                type='text'
                label='Title'
                multiline
                rows='3'
                value={this.state.title}
                error={errors.body ? true : false}
                helperText={errors.title}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='ingredients'
                type='text'
                label='Ingredients'
                multiline
                rows='3'
                value={this.state.ingredients}
                error={errors.body ? true : false}
                helperText={errors.ingredients}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='body'
                type='text'
                label='Method'
                multiline
                rows='3'
                value={this.state.body}
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditRecipe.propTypes = {
  //   getRecipe: PropTypes.func.isRequired,
  //   recipeId: PropTypes.string.isRequired,
  //   userHandle: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  addRecipeDetails: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.data.recipe,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  //   getRecipe,
  addRecipeDetails,
  clearErrors,
})(withStyles(styles)(EditRecipe));
