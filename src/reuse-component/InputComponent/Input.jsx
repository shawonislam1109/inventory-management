import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

const InputField = ({ formData, control, column }) => {
  const theme = useTheme();
  //common input types
  const commonInputTypes = ["text", "email", "number", "textarea"];
  const [showPassword, setShowPassword] = useState(false);

  const data = formData.map((item) => {
    if (item.visibility) {
      const itemColumn = item.column || column;
      if (commonInputTypes.includes(item.type)) {
        return (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel required={item.required}>{item.label}</InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  size={item.size}
                  inputRef={field.ref}
                  type={item.type}
                  placeholder={item.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={item.disabled}
                  fullWidth
                  {...(item.type === "textarea" && {
                    multiline: true,
                    minRows: 5,
                  })}
                  inputProps={{
                    ...(item.type === "number" && {
                      onWheel: (e) => e.currentTarget.blur(),
                    }),
                  }}
                />
              )}
            />
          </Grid>
        );
      } else if (item.type === "password") {
        return (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel color="error" required={item.required}>
              {item.label}
            </InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  <OutlinedInput
                    {...field}
                    size={item.size}
                    inputRef={field.ref}
                    placeholder={item.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={Boolean(error)}
                    disabled={item.disabled}
                    type={showPassword ? "text" : item.type}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    {...(item.type === "textarea" && {
                      multiline: true,
                      minRows: 5,
                    })}
                    inputProps={{
                      ...(item.type === "number" && {
                        onWheel: (e) => e.currentTarget.blur(),
                      }),
                    }}
                  />
                  {Boolean(error) && (
                    <FormHelperText error id={item.id}>
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
        );
      } else if (item.type === "single-select") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel required={item.required}>{item.label}</InputLabel>

            <Controller
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Autocomplete
                      id={item.id}
                      onChange={(_event, data) => field.onChange(data?.value)}
                      value={
                        item.options?.find(
                          (item) => item.value === field?.value
                        ) || null
                      }
                      options={item.options}
                      disabled={item.disabled}
                      fullWidth
                      size={item.size}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // inputProps={{ inputMode: field.ref }}
                          // inputMode={field.ref}
                          placeholder={item.placeholder}
                          sx={{
                            "& .MuiAutocomplete-input.Mui-disabled": {
                              WebkitTextFillColor: theme?.palette?.text.primary,
                            },
                          }}
                          error={Boolean(error)}
                        />
                      )}
                    />
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "checkbox") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel required={item.required}>{item.label}</InputLabel>
            <Controller
              name={item.name}
              control={control}
              defaultValue={[]}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Stack
                      {...field}
                      direction={item.direction}
                      component={FormGroup}
                      onChange={({ target: { checked, value } }) => {
                        if (checked) {
                          field.onChange([...field.value, value]);
                        } else {
                          field.onChange(
                            field.value.filter((element) => element !== value)
                          );
                        }
                      }}
                    >
                      {item?.options?.map((option) => {
                        return (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Checkbox size={item.size} />}
                            label={option.label}
                            disabled={
                              item.disabled ? item.disabled : option.disabled
                            }
                            labelPlacement="end"
                            checked={field.value.includes(option.value)}
                          />
                        );
                      })}
                    </Stack>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === "radio") {
        return (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn["xs"]}
            sm={12 / itemColumn["sm"]}
            md={12 / itemColumn["md"]}
            lg={12 / itemColumn["lg"]}
          >
            <InputLabel required={item.required}>{item.label}</InputLabel>
            <Controller
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <RadioGroup
                      {...field}
                      aria-label={item.label}
                      onChange={(e) => field.onChange(e.target.value)}
                      row={item.direction === "row"}
                      value={field.value}
                    >
                      {item.options.map((option) => {
                        return (
                          <FormControlLabel
                            key={option.value}
                            value={option.value}
                            disabled={
                              item.disabled ? item.disabled : option.disabled
                            }
                            control={<Radio size={item.size} />}
                            label={option.label}
                            labelPlacement="end"
                            checked={field.value === option.value}
                          />
                        );
                      })}
                    </RadioGroup>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      }
    }
  });
  return data;
};

InputField.propTypes = {
  formData: PropTypes.array,
  control: PropTypes.object,
  column: PropTypes.object,
  commonInputTypes: PropTypes.array,
};

export default InputField;
