/* eslint-disable no-use-before-define */

import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 280,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    position: 'absolute',
    display: 'flex',
    paddingTop: '79px',
    paddingLeft: '30px',
  },
}));

export default function FilterSelect({
  handleBack, filterSelection, setFilterSelection, availableKeywords, handleDrawerOpen
}) {
  const classes = useStyles();

  const handleFilterSelect = (e, selected) => {
    setFilterSelection(selected);
    handleDrawerOpen();
    handleBack();
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="checkboxes-tags"
        limitTags={3}
        options={Object.keys(availableKeywords)}
        disableCloseOnSelect
        getOptionLabel={option => option}
        onChange={handleFilterSelect}
        getOptionDisabled={option => (filterSelection.length > 4)}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
            {' '}
            &nbsp;&nbsp;
            {' '}
            <p style={{ fontStyle: 'italic', color: 'rgba(0, 0, 0, .4)' }}>{availableKeywords[option]}</p>
          </React.Fragment>
        )}
        style={{ width: 500 }}
        renderInput={params => (
          <TextField {...params} variant="outlined" label="Filters" />
        )}
      />
    </div>
  );
}

const categories = [
  { title: 'Urban' },
  { title: 'Rural' },
  { title: 'Streets' },
  { title: 'Blocks' },
  { title: 'Sidewalks' },
  { title: 'Public Space' },
  { title: 'Buildings' },
  { title: 'Urban Infrastructure' },
  { title: 'Housing' },
  { title: 'Waterways' },
  { title: 'Mobility' },
  { title: 'Natural Environment' },
  { title: 'Vegetation' },
  { title: 'Light' },
  { title: 'Density' },
  { title: 'Topography' },
  { title: 'Morphology' },
];
